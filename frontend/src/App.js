import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Star, 
  Plus, 
  Minus, 
  MapPin,
  Clock,
  Shield,
  Award,
  Truck,
  Phone,
  Mail,
  ChefHat,
  BarChart3,
  Users,
  Package,
  Settings,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import axios from 'axios';
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import AdminDashboard from './pages/AdminDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Context for global state
const AppContext = createContext();

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  
  const API_BASE = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/products`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE}/api/auth/login`, credentials);
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <AppContext.Provider value={{
      user,
      cart,
      isMenuOpen,
      setIsMenuOpen,
      products,
      login,
      logout,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      getCartTotal,
      getCartItemsCount,
      API_BASE
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Navigation Component
const Navigation = () => {
  const { user, isMenuOpen, setIsMenuOpen, getCartItemsCount, logout } = useApp();
  const navigate = useNavigate();

  return (
    <nav className="glass-dark fixed w-full top-0 z-50 transition-all duration-300">
      <div className="container-width section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
          >
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-lg">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-gradient">MeatCraft</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <button 
                  onClick={() => navigate('/login')}
                  className="btn-secondary text-sm py-2 px-4"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="btn-primary text-sm py-2 px-4"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                {user.user_type === 'admin' ? (
                  <button 
                    onClick={() => navigate('/admin')}
                    className="btn-primary text-sm py-2 px-4"
                  >
                    Admin Dashboard
                  </button>
                ) : (
                  <>
                    <CartIcon />
                    <UserMenu />
                  </>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden glass p-2 rounded-lg"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark border-t border-white/10"
          >
            <div className="section-padding py-4 space-y-4">
              <MobileNavLink to="/">Home</MobileNavLink>
              <MobileNavLink to="/products">Products</MobileNavLink>
              <MobileNavLink to="/about">About</MobileNavLink>
              <MobileNavLink to="/contact">Contact</MobileNavLink>
              {user && user.user_type !== 'admin' && (
                <MobileNavLink to="/cart">Cart ({getCartItemsCount()})</MobileNavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ to, children }) => {
  const navigate = useNavigate();
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(to)}
      className="text-white/80 hover:text-white font-medium transition-colors"
    >
      {children}
    </motion.button>
  );
};

const MobileNavLink = ({ to, children }) => {
  const { setIsMenuOpen } = useApp();
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(to);
    setIsMenuOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      className="block w-full text-left text-white/80 hover:text-white font-medium transition-colors py-2"
    >
      {children}
    </button>
  );
};

const CartIcon = () => {
  const { getCartItemsCount } = useApp();
  const navigate = useNavigate();
  const itemCount = getCartItemsCount();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate('/cart')}
      className="relative glass p-2 rounded-lg"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {itemCount}
        </motion.div>
      )}
    </motion.button>
  );
};

const UserMenu = () => {
  const { user, logout } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="glass p-2 rounded-lg"
      >
        <User className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 glass rounded-xl py-2 shadow-xl"
          >
            <div className="px-4 py-2 border-b border-white/10">
              <p className="text-sm font-medium">Welcome back!</p>
              <p className="text-xs text-white/60">{user.email || 'User'}</p>
            </div>
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          <Navigation />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}