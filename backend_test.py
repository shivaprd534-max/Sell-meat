#!/usr/bin/env python3
"""
MeatCraft Backend API Testing Suite
Tests all backend endpoints for the premium meat delivery application
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class MeatCraftAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.admin_token = None
        self.user_token = None
        self.user_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.created_user_id = None
        self.created_order_id = None
        self.demo_products = []

    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED {details}")
        else:
            print(f"❌ {name} - FAILED {details}")

    def make_request(self, method: str, endpoint: str, data: Dict = None, headers: Dict = None) -> tuple:
        """Make HTTP request and return success status and response"""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        
        default_headers = {'Content-Type': 'application/json'}
        if headers:
            default_headers.update(headers)

        try:
            if method == 'GET':
                response = requests.get(url, headers=default_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=default_headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=default_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=default_headers, timeout=10)
            else:
                return False, {"error": f"Unsupported method: {method}"}

            return response.status_code < 400, response.json() if response.content else {}
        
        except requests.exceptions.RequestException as e:
            return False, {"error": str(e)}
        except json.JSONDecodeError:
            return False, {"error": "Invalid JSON response"}

    def test_root_endpoint(self):
        """Test the root endpoint"""
        success, response = self.make_request('GET', '/')
        expected_message = "Premium Meat Delivery API"
        
        if success and response.get('message') == expected_message:
            self.log_test("Root Endpoint", True, f"- Message: {response.get('message')}")
        else:
            self.log_test("Root Endpoint", False, f"- Expected: {expected_message}, Got: {response}")

    def test_get_products(self):
        """Test getting all products"""
        success, response = self.make_request('GET', '/api/products')
        
        if success and 'products' in response:
            products = response['products']
            self.demo_products = products  # Store for later tests
            product_count = len(products)
            categories = set(p.get('category') for p in products)
            
            self.log_test("Get All Products", True, 
                         f"- Found {product_count} products with categories: {categories}")
            
            # Validate product structure
            if products:
                sample_product = products[0]
                required_fields = ['id', 'name', 'category', 'description', 'price', 'weight', 'image', 'stock']
                missing_fields = [field for field in required_fields if field not in sample_product]
                
                if not missing_fields:
                    self.log_test("Product Structure Validation", True, "- All required fields present")
                else:
                    self.log_test("Product Structure Validation", False, f"- Missing fields: {missing_fields}")
        else:
            self.log_test("Get All Products", False, f"- Response: {response}")

    def test_get_products_by_category(self):
        """Test getting products by category"""
        categories = ['chicken', 'mutton']
        
        for category in categories:
            success, response = self.make_request('GET', f'/api/products/{category}')
            
            if success and 'products' in response:
                products = response['products']
                # Verify all products belong to the requested category
                correct_category = all(p.get('category') == category for p in products)
                
                if correct_category:
                    self.log_test(f"Get {category.title()} Products", True, 
                                 f"- Found {len(products)} {category} products")
                else:
                    self.log_test(f"Get {category.title()} Products", False, 
                                 "- Some products don't match category")
            else:
                self.log_test(f"Get {category.title()} Products", False, f"- Response: {response}")

    def test_user_registration(self):
        """Test user registration"""
        test_user = {
            "email": f"test_user_{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "9876543210",
            "password": "testpass123",
            "name": "Test User",
            "address": "123 Test Street, Test City"
        }
        
        success, response = self.make_request('POST', '/api/auth/register', test_user)
        
        if success and 'user_id' in response:
            self.created_user_id = response['user_id']
            self.log_test("User Registration", True, f"- User ID: {self.created_user_id}")
            return test_user
        else:
            self.log_test("User Registration", False, f"- Response: {response}")
            return None

    def test_user_login(self, user_credentials):
        """Test user login"""
        if not user_credentials:
            self.log_test("User Login", False, "- No user credentials available")
            return
            
        login_data = {
            "email": user_credentials["email"],
            "password": user_credentials["password"]
        }
        
        success, response = self.make_request('POST', '/api/auth/login', login_data)
        
        if success and response.get('user_type') == 'customer':
            self.user_token = response.get('token')
            self.user_id = response.get('user_id')
            self.log_test("User Login", True, f"- User Type: {response.get('user_type')}")
        else:
            self.log_test("User Login", False, f"- Response: {response}")

    def test_admin_login(self):
        """Test admin login"""
        admin_credentials = {
            "email": "shiv",
            "password": "123"
        }
        
        success, response = self.make_request('POST', '/api/auth/login', admin_credentials)
        
        if success and response.get('user_type') == 'admin':
            self.admin_token = response.get('token')
            self.log_test("Admin Login", True, f"- User Type: {response.get('user_type')}")
        else:
            self.log_test("Admin Login", False, f"- Response: {response}")

    def test_invalid_login(self):
        """Test login with invalid credentials"""
        invalid_credentials = {
            "email": "invalid@example.com",
            "password": "wrongpassword"
        }
        
        success, response = self.make_request('POST', '/api/auth/login', invalid_credentials)
        
        # Should fail with 401 or similar error
        if not success:
            self.log_test("Invalid Login Rejection", True, "- Correctly rejected invalid credentials")
        else:
            self.log_test("Invalid Login Rejection", False, "- Invalid credentials were accepted")

    def test_create_order(self):
        """Test order creation"""
        if not self.user_id or not self.demo_products:
            self.log_test("Create Order", False, "- Missing user ID or products")
            return
            
        # Create order with first available product
        product = self.demo_products[0]
        order_data = {
            "user_id": self.user_id,
            "items": [
                {
                    "product_id": product['id'],
                    "quantity": 2
                }
            ],
            "total_amount": product['price'] * 2,
            "delivery_address": "123 Test Street, Test City",
            "status": "pending"
        }
        
        success, response = self.make_request('POST', '/api/orders', order_data)
        
        if success and 'order_id' in response:
            self.created_order_id = response['order_id']
            self.log_test("Create Order", True, f"- Order ID: {self.created_order_id}")
        else:
            self.log_test("Create Order", False, f"- Response: {response}")

    def test_admin_dashboard(self):
        """Test admin dashboard endpoint"""
        success, response = self.make_request('GET', '/api/admin/dashboard')
        
        if success:
            required_fields = ['total_orders', 'total_earnings', 'total_customers', 'active_deliveries', 'recent_orders']
            missing_fields = [field for field in required_fields if field not in response]
            
            if not missing_fields:
                self.log_test("Admin Dashboard", True, 
                             f"- Orders: {response.get('total_orders')}, "
                             f"Earnings: ${response.get('total_earnings'):.2f}, "
                             f"Customers: {response.get('total_customers')}")
            else:
                self.log_test("Admin Dashboard", False, f"- Missing fields: {missing_fields}")
        else:
            self.log_test("Admin Dashboard", False, f"- Response: {response}")

    def test_admin_orders(self):
        """Test admin orders endpoint"""
        success, response = self.make_request('GET', '/api/admin/orders')
        
        if success and 'orders' in response:
            orders = response['orders']
            self.log_test("Admin Orders", True, f"- Found {len(orders)} orders")
        else:
            self.log_test("Admin Orders", False, f"- Response: {response}")

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting MeatCraft Backend API Tests")
        print("=" * 50)
        
        # Basic endpoint tests
        self.test_root_endpoint()
        
        # Product tests
        self.test_get_products()
        self.test_get_products_by_category()
        
        # Authentication tests
        user_creds = self.test_user_registration()
        self.test_user_login(user_creds)
        self.test_admin_login()
        self.test_invalid_login()
        
        # Order tests
        self.test_create_order()
        
        # Admin tests
        self.test_admin_dashboard()
        self.test_admin_orders()
        
        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed")
            return 1

def main():
    """Main function to run tests"""
    # Use the public endpoint from frontend/.env
    tester = MeatCraftAPITester("http://localhost:8001")
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())