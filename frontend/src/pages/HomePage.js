import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Truck, Shield, ArrowRight, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Premium Quality",
      description: "Hand-selected, grade-A meat from trusted farms"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Fresh meat delivered to your doorstep in 2 hours"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety First",
      description: "Temperature controlled delivery and packaging"
    },
    {
      icon: <ChefHat className="w-6 h-6" />,
      title: "Expert Cut",
      description: "Professionally butchered and prepared by experts"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Best quality meat I've ever ordered online. Fast delivery and perfect packaging!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b86e-02d1?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "The chicken is incredibly fresh and the cuts are perfect. Highly recommended!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Emma Wilson",
      rating: 5,
      comment: "MeatCraft has become my go-to for all premium meat. Excellent service!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1588347818987-84e6a8a02aca?w=1920&h=1080&fit=crop")',
          }}
        ></div>
        
        <div className="relative z-20 container-width section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="text-white">Premium </span>
              <span className="text-gradient">Meat</span>
              <br />
              <span className="text-white">Delivered </span>
              <span className="text-gradient">Fresh</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Experience the finest selection of premium meats, expertly sourced and 
              delivered fresh to your doorstep with our lightning-fast delivery service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/products')}
                className="btn-primary text-lg px-8 py-4 flex items-center justify-center group"
              >
                Shop Premium Meats
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/about')}
                className="btn-secondary text-lg px-8 py-4"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 right-20 glass p-4 rounded-full hidden lg:block"
        >
          <ChefHat className="w-8 h-8 text-primary-400" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="container-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Why Choose <span className="text-gradient">MeatCraft</span>?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              We're committed to delivering the highest quality meat with unmatched service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="card text-center group"
              >
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-dark-800">
        <div className="container-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Our <span className="text-gradient">Premium</span> Selection
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Discover our carefully curated selection of the finest meats
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-display font-bold mb-4">
                  Fresh <span className="text-gradient">Chicken</span>
                </h3>
                <p className="text-white/70 text-lg mb-4">
                  Free-range, organic chicken sourced from local farms. Perfect for 
                  grilling, roasting, or your favorite recipes.
                </p>
                <ul className="space-y-2 text-white/60">
                  <li>✓ Antibiotic-free</li>
                  <li>✓ Farm-fresh quality</li>
                  <li>✓ Expert butchering</li>
                  <li>✓ Multiple cuts available</li>
                </ul>
              </div>

              <div>
                <h3 className="text-3xl font-display font-bold mb-4">
                  Premium <span className="text-gradient">Mutton</span>
                </h3>
                <p className="text-white/70 text-lg mb-4">
                  Tender, flavorful mutton from grass-fed sheep. Ideal for 
                  traditional recipes and gourmet cooking.
                </p>
                <ul className="space-y-2 text-white/60">
                  <li>✓ Grass-fed quality</li>
                  <li>✓ Rich, natural flavor</li>
                  <li>✓ Traditional cuts</li>
                  <li>✓ Restaurant-grade meat</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="card aspect-square overflow-hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop"
                  alt="Fresh Chicken"
                  className="w-full h-full object-cover rounded-lg"
                />
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="card aspect-square overflow-hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1588347818987-84e6a8a02aca?w=400&h=400&fit=crop"
                  alt="Premium Mutton"
                  className="w-full h-full object-cover rounded-lg"
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button 
              onClick={() => navigate('/products')}
              className="btn-primary text-lg px-8 py-4"
            >
              Explore All Products
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-dark-800 to-dark-900">
        <div className="container-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              What Our <span className="text-gradient">Customers</span> Say
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust MeatCraft
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white/70 italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900/20 to-accent-900/20">
        <div className="container-width section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Experience <span className="text-gradient">Premium Quality</span>?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Order now and taste the difference that quality makes
            </p>
            <button 
              onClick={() => navigate('/products')}
              className="btn-primary text-lg px-8 py-4"
            >
              Start Shopping Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;