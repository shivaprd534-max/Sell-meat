import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ChefHat } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../App';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await login(formData);
      
      // Redirect based on user type
      if (response.user_type === 'admin') {
        navigate('/admin');
      } else {
        navigate('/products');
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const adminLogin = () => {
    setFormData({
      email: 'shiv',
      password: '123'
    });
  };

  const demoCustomerLogin = () => {
    setFormData({
      email: 'demo@customer.com',
      password: 'demo123'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="container-width section-padding">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Welcome Back
            </h1>
            <p className="text-white/60">
              Sign in to your MeatCraft account
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card"
          >
            {/* Demo Login Buttons */}
            <div className="mb-6 space-y-3">
              <p className="text-center text-white/60 text-sm mb-4">Quick Demo Login:</p>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={adminLogin}
                  className="btn-secondary text-xs py-2"
                >
                  Admin Demo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={demoCustomerLogin}
                  className="btn-secondary text-xs py-2"
                >
                  Customer Demo
                </motion.button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-dark-900 text-white/60">Or login manually</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Email or Username
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field w-full pl-10"
                      placeholder="Enter your email or username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="input-field w-full pl-10 pr-10"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="sr-only"
                  />
                  <div className="w-4 h-4 border border-white/30 rounded bg-transparent mr-2"></div>
                  <span className="text-sm text-white/60">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                  isLoading
                    ? 'bg-white/20 text-white/50 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/60">
                Don't have an account?{' '}
                <Link 
                  to="/register"
                  className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Admin Credentials Helper */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 glass rounded-lg p-4 text-center"
          >
            <p className="text-xs text-white/60 mb-2">Demo Credentials:</p>
            <div className="text-xs text-white/80 space-y-1">
              <div><strong>Admin:</strong> username: shiv, password: 123</div>
              <div><strong>Customer:</strong> Any email with any password (auto-register)</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;