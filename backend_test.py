#!/usr/bin/env python3
"""
Backend Testing Suite for FabriControl AI Chatbot API
Tests the /api/chat endpoint to verify correct installation information
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get backend URL from frontend environment
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        print("❌ Frontend .env file not found")
        return None
    return None

BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("❌ Could not determine backend URL")
    sys.exit(1)

API_BASE = f"{BACKEND_URL}/api"
print(f"🔗 Testing backend at: {API_BASE}")

class TestResults:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.errors = []
    
    def add_pass(self, test_name):
        self.passed += 1
        print(f"✅ {test_name}")
    
    def add_fail(self, test_name, error):
        self.failed += 1
        self.errors.append(f"{test_name}: {error}")
        print(f"❌ {test_name}: {error}")
    
    def summary(self):
        total = self.passed + self.failed
        print(f"\n📊 Test Summary: {self.passed}/{total} passed")
        if self.errors:
            print("\n🚨 Failed Tests:")
            for error in self.errors:
                print(f"   - {error}")
        return self.failed == 0

def test_enterprise_quote_valid_data():
    """Test POST /api/enterprise-quote with valid complete data"""
    test_data = {
        "companyName": "Test Industries S.A.",
        "contactName": "Juan Test",
        "email": "test@testcompany.com",
        "phone": "+54 11 1234-5678",
        "industry": "Metalurgia y Fabricación",
        "currentUsers": "20-25 users",
        "requirements": "Necesitamos integración con sistema legacy",
        "timeline": "2-3 meses",
        "budget": "$10,000 - $25,000"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/enterprise-quote",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("message") and data.get("quote_id"):
                return True, "Valid data accepted successfully"
            else:
                return False, f"Invalid response format: {data}"
        else:
            return False, f"HTTP {response.status_code}: {response.text}"
            
    except requests.exceptions.RequestException as e:
        return False, f"Request failed: {str(e)}"

def test_enterprise_quote_minimal_data():
    """Test POST /api/enterprise-quote with minimal required data"""
    test_data = {
        "companyName": "Minimal Corp",
        "contactName": "Jane Doe",
        "email": "jane@minimal.com"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/enterprise-quote",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("message") and data.get("quote_id"):
                return True, "Minimal data accepted successfully"
            else:
                return False, f"Invalid response format: {data}"
        else:
            return False, f"HTTP {response.status_code}: {response.text}"
            
    except requests.exceptions.RequestException as e:
        return False, f"Request failed: {str(e)}"

def test_enterprise_quote_missing_company():
    """Test POST /api/enterprise-quote with missing companyName (should fail)"""
    test_data = {
        "contactName": "John Test",
        "email": "john@test.com"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/enterprise-quote",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 422:  # Validation error expected
            return True, "Correctly rejected missing companyName"
        elif response.status_code == 200:
            return False, "Should have rejected missing companyName but accepted it"
        else:
            return False, f"Unexpected status code {response.status_code}: {response.text}"
            
    except requests.exceptions.RequestException as e:
        return False, f"Request failed: {str(e)}"

def test_enterprise_quote_missing_contact():
    """Test POST /api/enterprise-quote with missing contactName (should fail)"""
    test_data = {
        "companyName": "Test Corp",
        "email": "test@corp.com"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/enterprise-quote",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 422:  # Validation error expected
            return True, "Correctly rejected missing contactName"
        elif response.status_code == 200:
            return False, "Should have rejected missing contactName but accepted it"
        else:
            return False, f"Unexpected status code {response.status_code}: {response.text}"
            
    except requests.exceptions.RequestException as e:
        return False, f"Request failed: {str(e)}"

def test_enterprise_quote_invalid_email():
    """Test POST /api/enterprise-quote with invalid email (should fail)"""
    test_data = {
        "companyName": "Test Corp",
        "contactName": "John Test",
        "email": "invalid-email"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/enterprise-quote",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 422:  # Validation error expected
            return True, "Correctly rejected invalid email"
        elif response.status_code == 200:
            return False, "Should have rejected invalid email but accepted it"
        else:
            return False, f"Unexpected status code {response.status_code}: {response.text}"
            
    except requests.exceptions.RequestException as e:
        return False, f"Request failed: {str(e)}"

def test_enterprise_quote_missing_email():
    """Test POST /api/enterprise-quote with missing email (should fail)"""
    test_data = {
        "companyName": "Test Corp",
        "contactName": "John Test"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/enterprise-quote",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 422:  # Validation error expected
            return True, "Correctly rejected missing email"
        elif response.status_code == 200:
            return False, "Should have rejected missing email but accepted it"
        else:
            return False, f"Unexpected status code {response.status_code}: {response.text}"
            
    except requests.exceptions.RequestException as e:
        return False, f"Request failed: {str(e)}"

def test_backend_health():
    """Test if backend is accessible"""
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        if response.status_code == 200:
            return True, "Backend is accessible"
        else:
            return False, f"Backend returned HTTP {response.status_code}"
    except requests.exceptions.RequestException as e:
        return False, f"Backend not accessible: {str(e)}"

def main():
    print("🧪 Starting Enterprise Quote Backend Tests")
    print("=" * 60)
    
    results = TestResults()
    
    # Test backend health first
    success, message = test_backend_health()
    if success:
        results.add_pass("Backend Health Check")
    else:
        results.add_fail("Backend Health Check", message)
        print("\n❌ Backend is not accessible. Stopping tests.")
        return False
    
    # Test valid data scenarios
    success, message = test_enterprise_quote_valid_data()
    if success:
        results.add_pass("Enterprise Quote - Valid Complete Data")
    else:
        results.add_fail("Enterprise Quote - Valid Complete Data", message)
    
    success, message = test_enterprise_quote_minimal_data()
    if success:
        results.add_pass("Enterprise Quote - Minimal Required Data")
    else:
        results.add_fail("Enterprise Quote - Minimal Required Data", message)
    
    # Test validation scenarios (should fail)
    success, message = test_enterprise_quote_missing_company()
    if success:
        results.add_pass("Enterprise Quote - Missing Company Validation")
    else:
        results.add_fail("Enterprise Quote - Missing Company Validation", message)
    
    success, message = test_enterprise_quote_missing_contact()
    if success:
        results.add_pass("Enterprise Quote - Missing Contact Validation")
    else:
        results.add_fail("Enterprise Quote - Missing Contact Validation", message)
    
    success, message = test_enterprise_quote_missing_email()
    if success:
        results.add_pass("Enterprise Quote - Missing Email Validation")
    else:
        results.add_fail("Enterprise Quote - Missing Email Validation", message)
    
    success, message = test_enterprise_quote_invalid_email()
    if success:
        results.add_pass("Enterprise Quote - Invalid Email Validation")
    else:
        results.add_fail("Enterprise Quote - Invalid Email Validation", message)
    
    print("\n" + "=" * 60)
    success = results.summary()
    
    if success:
        print("🎉 All backend tests passed!")
    else:
        print("⚠️  Some backend tests failed. Check the details above.")
    
    return success

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)