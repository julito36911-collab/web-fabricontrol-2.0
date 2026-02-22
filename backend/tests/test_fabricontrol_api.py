"""
FabriControl API Tests - Cloud pivot and endpoint verification
Tests the backend APIs for license requests, enterprise quotes, and AI chat
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://cloud-fabric-control.preview.emergentagent.com').rstrip('/')

class TestBackendHealth:
    """Basic health check tests"""
    
    def test_api_root(self):
        """Test that API root endpoint responds"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"✓ API root working: {data}")
    
    def test_chat_health(self):
        """Test chat health endpoint"""
        response = requests.get(f"{BASE_URL}/api/chat/health")
        assert response.status_code == 200
        data = response.json()
        assert data.get("configured") == True
        assert data.get("knowledge_base_loaded") == True
        print(f"✓ Chat health check passed: {data}")


class TestLicenseRequestEndpoint:
    """Tests for /api/license-request endpoint"""
    
    def test_license_request_success(self):
        """Test successful license request submission"""
        payload = {
            "nombre": "TEST_Juan Perez",
            "empresa": "TEST_Taller Industrial",
            "email": "test_juan@example.com",
            "telefono": "+52 555 1234567",
            "cantidadUsuarios": "1-5",
            "planDeseado": "anual"
        }
        response = requests.post(
            f"{BASE_URL}/api/license-request",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("success") == True
        assert "message" in data
        assert "request_id" in data
        print(f"✓ License request successful: {data}")
    
    def test_license_request_minimal_data(self):
        """Test license request with minimal required fields"""
        payload = {
            "nombre": "TEST_MinimalUser",
            "email": "test_minimal@example.com",
            "cantidadUsuarios": "1-5"
        }
        response = requests.post(
            f"{BASE_URL}/api/license-request",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("success") == True
        print(f"✓ Minimal license request successful: {data}")
    
    def test_license_request_invalid_email(self):
        """Test license request with invalid email"""
        payload = {
            "nombre": "TEST_User",
            "email": "invalid-email",
            "cantidadUsuarios": "1-5"
        }
        response = requests.post(
            f"{BASE_URL}/api/license-request",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        # Should fail validation with 422
        assert response.status_code == 422
        print(f"✓ Invalid email correctly rejected: {response.status_code}")


class TestEnterpriseQuoteEndpoint:
    """Tests for /api/enterprise-quote endpoint"""
    
    def test_enterprise_quote_success(self):
        """Test successful enterprise quote submission"""
        payload = {
            "companyName": "TEST_Global Manufacturing Inc",
            "contactName": "TEST_Maria Garcia",
            "email": "test_maria@globalmanuf.com",
            "phone": "+1 555 9876543",
            "industry": "Manufacturing",
            "currentUsers": "50-100",
            "requirements": "Integration with existing SAP system, custom modules for quality control",
            "timeline": "Q2 2026",
            "budget": "$10,000-$20,000"
        }
        response = requests.post(
            f"{BASE_URL}/api/enterprise-quote",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("success") == True
        assert "message" in data
        assert "quote_id" in data
        print(f"✓ Enterprise quote successful: {data}")
    
    def test_enterprise_quote_minimal_data(self):
        """Test enterprise quote with minimal required fields"""
        payload = {
            "companyName": "TEST_Small Corp",
            "contactName": "TEST_John",
            "email": "test_john@smallcorp.com"
        }
        response = requests.post(
            f"{BASE_URL}/api/enterprise-quote",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data.get("success") == True
        print(f"✓ Minimal enterprise quote successful: {data}")


class TestChatAI:
    """Tests for /api/chat endpoint - Cloud pivot verification"""
    
    def test_chat_cloud_response(self):
        """Test that chatbot confirms 100% cloud - no installation needed"""
        payload = {
            "messages": [{"role": "user", "content": "Do I need to install anything?"}],
            "language": "auto"
        }
        response = requests.post(
            f"{BASE_URL}/api/chat",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        response_text = data["response"].lower()
        
        # Should mention cloud/no installation
        assert any(term in response_text for term in ["cloud", "no install", "no download", "browser", "100%"])
        # Should NOT mention download/install positively
        assert "download and install" not in response_text
        print(f"✓ Chat correctly responds about cloud: {data['response'][:200]}...")
    
    def test_chat_pricing_response(self):
        """Test that chatbot mentions only $195/year and $290/year (no monthly)"""
        payload = {
            "messages": [{"role": "user", "content": "What are your prices?"}],
            "language": "auto"
        }
        response = requests.post(
            f"{BASE_URL}/api/chat",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        response_text = data["response"]
        
        # Should mention $195 and/or $290
        assert "$195" in response_text or "$290" in response_text
        print(f"✓ Chat mentions correct pricing: {response_text[:200]}...")
    
    def test_chat_spanish_response(self):
        """Test that chatbot responds in Spanish when asked in Spanish"""
        payload = {
            "messages": [{"role": "user", "content": "¿Necesito descargar algo?"}],
            "language": "auto"
        }
        response = requests.post(
            f"{BASE_URL}/api/chat",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        data = response.json()
        response_text = data["response"].lower()
        
        # Should be in Spanish and mention cloud
        assert any(term in response_text for term in ["nube", "no", "navegador", "instalar"])
        print(f"✓ Chat responds in Spanish: {data['response'][:200]}...")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
