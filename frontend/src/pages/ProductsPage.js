import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ShoppingCart, Filter, Search, Star } from 'lucide-react';
import { useApp } from '../App';

const ProductsPage = () => {
  const { products, addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'chicken', name: 'Chicken', count: products.filter(p => p.category === 'chicken').length },
    { id: 'mutton', name: 'Mutton', count: products.filter(p => p.category === 'mutton').length },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container-width section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Our <span className="text-gradient">Premium</span> Products
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover our carefully selected range of premium meats, sourced from the finest farms
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative max-w-md mx-auto"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full pl-10"
            />
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow'
                    : 'glass text-white/80 hover:bg-white/20'
                }`}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchTerm}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="glass w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-12 h-12 text-white/40" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">No products found</h3>
            <p className="text-white/60">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({ product, index }) => {
  const { addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product, quantity);
    
    // Show feedback animation
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card group overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Stock Badge */}
        <div className="absolute top-3 right-3 glass px-3 py-1 rounded-full text-sm">
          {product.stock} in stock
        </div>

        {/* Quick Add Button */}
        <motion.button
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <span className="text-accent-400 text-sm font-medium uppercase tracking-wide">
            {product.category}
          </span>
          <h3 className="text-xl font-semibold group-hover:text-primary-400 transition-colors">
            {product.name}
          </h3>
        </div>

        <p className="text-white/70 text-sm line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gradient">
              ₹{product.price}
            </span>
            <span className="text-white/60 text-sm ml-2">
              / {product.weight}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-accent-400 fill-current" />
            ))}
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-white/60">Qty:</span>
            <div className="flex items-center space-x-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                disabled={quantity <= 1}
                className="glass w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-50"
              >
                <Minus className="w-4 h-4" />
              </motion.button>
              
              <span className="w-8 text-center font-medium">{quantity}</span>
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(quantity + 1)}
                className="glass w-8 h-8 rounded-lg flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isAdding
                ? 'bg-green-500 text-white'
                : 'btn-primary text-sm'
            }`}
          >
            {isAdding ? 'Added!' : 'Add to Cart'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsPage;