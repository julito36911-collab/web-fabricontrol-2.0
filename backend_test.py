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

def test_chat_spanish_installation():
    """Test Spanish installation question - should mention BOTH Local and Cloud options"""
    test_data = {
        "messages": [
            {
                "role": "user",
                "content": "¿Cómo se instala FabriControl? ¿Es 100% basado en la nube?"
            }
        ]
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/chat",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            response_text = data.get("response", "").lower()
            
            # Check for both installation options
            has_local = any(word in response_text for word in ["local", "pc", "500 mb", "mongodb"])
            has_cloud = any(word in response_text for word in ["nube", "cloud", "atlas", "150 mb"])
            
            # Check it doesn't claim 100% cloud-based
            not_100_cloud = "no es 100%" in response_text or "not 100%" in response_text
            
            if has_local and has_cloud and not_100_cloud:
                return True, f"Correctly explains both installation options. Response: {data.get('response', '')[:200]}..."
            else:
                issues = []
                if not has_local:
                    issues.append("Missing Local installation info")
                if not has_cloud:
                    issues.append("Missing Cloud installation info")
                if not not_100_cloud:
                    issues.append("Still claims 100% cloud-based")
                return False, f"Issues: {', '.join(issues)}. Response: {data.get('response', '')[:200]}..."
        else:
            return False, f"HTTP {response.status_code}: {response.text}"
            
    except requests.exceptions.RequestException as e:
        return False, f"Request failed: {str(e)}"

def test_chat_english_installation():
    """Test English installation question - should mention BOTH Local and Cloud options"""
    test_data = {
        "messages": [
            {
                "role": "user",
                "content": "How is FabriControl installed? Is it cloud-based?"
            }
        ]
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/chat",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            response_text = data.get("response", "").lower()
            
            # Check for both installation options
            has_local = any(word in response_text for word in ["local", "pc", "500 mb", "mongodb"])
            has_cloud = any(word in response_text for word in ["cloud", "atlas", "150 mb"])
            
            # Check it doesn't claim 100% cloud-based
            not_100_cloud = "not 100%" in response_text or "no es 100%" in response_text
            
            if has_local and has_cloud and not_100_cloud:
                return True, f"Correctly explains both installation options. Response: {data.get('response', '')[:200]}..."
            else:
                issues = []
                if not has_local:
                    issues.append("Missing Local installation info")
                if not has_cloud:
                    issues.append("Missing Cloud installation info")
                if not not_100_cloud:
                    issues.append("Still claims 100% cloud-based")
                return False, f"Issues: {', '.join(issues)}. Response: {data.get('response', '')[:200]}..."
        else:
            return False, f"HTTP {response.status_code}: {response.text}"
            
    except requests.exceptions.RequestException as e:
        return False, f"Request failed: {str(e)}"

def test_chat_offline_functionality():
    """Test offline functionality question - should explain Local installation works offline"""
    test_data = {
        "messages": [
            {
                "role": "user",
                "content": "Does FabriControl work offline?"
            }
        ]
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/chat",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            response_text = data.get("response", "").lower()
            
            # Check for offline capability explanation
            has_offline_info = any(phrase in response_text for phrase in [
                "local", "offline", "sin internet", "without internet", 
                "red local", "local network", "pc"
            ])
            
            # Check for login requirement
            has_login_info = any(phrase in response_text for phrase in [
                "iniciar sesión", "log in", "login", "licencia", "license"
            ])
            
            if has_offline_info and has_login_info:
                return True, f"Correctly explains offline functionality. Response: {data.get('response', '')[:200]}..."
            else:
                issues = []
                if not has_offline_info:
                    issues.append("Missing offline capability info")
                if not has_login_info:
                    issues.append("Missing login requirement info")
                return False, f"Issues: {', '.join(issues)}. Response: {data.get('response', '')[:200]}..."
        else:
            return False, f"HTTP {response.status_code}: {response.text}"
            
    except requests.exceptions.RequestException as e:
        return False, f"Request failed: {str(e)}"

def test_chat_pricing():
    """Test pricing question - should show correct prices"""
    test_data = {
        "messages": [
            {
                "role": "user",
                "content": "Cuánto cuesta FabriControl?"
            }
        ]
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/chat",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            response_text = data.get("response", "")
            
            # Check for correct pricing
            has_basic_price = "$49" in response_text
            has_pro_price = "$129" in response_text
            
            if has_basic_price and has_pro_price:
                return True, f"Correctly shows pricing. Response: {data.get('response', '')[:200]}..."
            else:
                issues = []
                if not has_basic_price:
                    issues.append("Missing Basic plan price ($49)")
                if not has_pro_price:
                    issues.append("Missing Professional plan price ($129)")
                return False, f"Issues: {', '.join(issues)}. Response: {data.get('response', '')[:200]}..."
        else:
            return False, f"HTTP {response.status_code}: {response.text}"
            
    except requests.exceptions.RequestException as e:
        return False, f"Request failed: {str(e)}"

def test_chat_health():
    """Test chat health endpoint"""
    try:
        response = requests.get(f"{API_BASE}/chat/health", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("configured") and data.get("model"):
                return True, f"Chat service is properly configured. Model: {data.get('model')}"
            else:
                return False, f"Chat service not properly configured: {data}"
        else:
            return False, f"HTTP {response.status_code}: {response.text}"
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
    print("🧪 Starting FabriControl AI Chatbot Backend Tests")
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
    
    # Test chat health
    success, message = test_chat_health()
    if success:
        results.add_pass("Chat Service Health Check")
    else:
        results.add_fail("Chat Service Health Check", message)
    
    # Test Spanish installation question
    success, message = test_chat_spanish_installation()
    if success:
        results.add_pass("Spanish Installation Question")
    else:
        results.add_fail("Spanish Installation Question", message)
    
    # Test English installation question
    success, message = test_chat_english_installation()
    if success:
        results.add_pass("English Installation Question")
    else:
        results.add_fail("English Installation Question", message)
    
    # Test offline functionality question
    success, message = test_chat_offline_functionality()
    if success:
        results.add_pass("Offline Functionality Question")
    else:
        results.add_fail("Offline Functionality Question", message)
    
    # Test pricing question
    success, message = test_chat_pricing()
    if success:
        results.add_pass("Pricing Question")
    else:
        results.add_fail("Pricing Question", message)
    
    print("\n" + "=" * 60)
    success = results.summary()
    
    if success:
        print("🎉 All chatbot tests passed!")
    else:
        print("⚠️  Some chatbot tests failed. Check the details above.")
    
    return success

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)