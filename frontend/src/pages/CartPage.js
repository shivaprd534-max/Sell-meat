import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingBag, CreditCard, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, getCartTotal, user } = useApp();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!deliveryAddress || !pinCode) {
      alert('Please fill in delivery address and pin code');
      return;
    }

    setIsCheckingOut(true);

    // Simulate checkout process
    setTimeout(() => {
      alert('Order placed successfully! (Demo Mode)');
      setIsCheckingOut(false);
      navigate('/products');
    }, 2000);
  };

  const deliveryFee = 49;
  const subtotal = getCartTotal();
  const total = subtotal + (subtotal > 500 ? 0 : deliveryFee);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-white/40" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">Your cart is empty</h2>
          <p className="text-white/60 mb-8">Add some delicious meat products to get started</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Start Shopping
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-width section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
            Your <span className="text-gradient">Cart</span>
          </h1>
          <p className="text-white/60">Review your items and proceed to checkout</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item, index) => (
                <CartItem
                  key={item.id}
                  item={item}
                  index={index}
                  onUpdateQuantity={updateCartQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card sticky top-8"
            >
              <h3 className="text-2xl font-display font-bold mb-6">Order Summary</h3>

              {/* Order Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-white/70">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Delivery Fee</span>
                  <span className="font-medium">
                    {subtotal > 500 ? (
                      <span className="text-green-400">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-gradient">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Delivery Address
                  </label>
                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter your full delivery address..."
                    rows={3}
                    className="input-field w-full resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="Enter pin code"
                    className="input-field w-full"
                    maxLength={6}
                  />
                </div>
              </div>

              {/* Free Delivery Notice */}
              {subtotal <= 500 && (
                <div className="bg-accent-500/20 border border-accent-500/50 rounded-lg p-3 mb-6 text-center">
                  <p className="text-accent-400 text-sm">
                    Add ₹{(500 - subtotal).toFixed(2)} more for FREE delivery!
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${
                  isCheckingOut
                    ? 'bg-white/20 text-white/50 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {isCheckingOut ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </motion.button>

              <p className="text-xs text-white/40 text-center mt-4">
                Secure checkout powered by industry-leading encryption
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item, index, onUpdateQuantity, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card"
    >
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate">{item.name}</h3>
          <p className="text-white/60 text-sm">{item.weight} • {item.category}</p>
          <p className="text-primary-400 font-bold">₹{item.price}</p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="glass w-10 h-10 rounded-lg flex items-center justify-center"
          >
            <Minus className="w-4 h-4" />
          </motion.button>
          
          <span className="w-8 text-center font-medium text-lg">{item.quantity}</span>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="glass w-10 h-10 rounded-lg flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Remove Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(item.id)}
          className="text-red-400 hover:text-red-300 p-2"
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Item Total */}
      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
        <span className="text-white/60">Item Total:</span>
        <span className="text-lg font-bold text-gradient">
          ₹{(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </motion.div>
  );
};

export default CartPage;