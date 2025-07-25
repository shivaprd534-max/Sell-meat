import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Truck, Users, Heart, Zap, ChefHat, Star } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'We source only the finest, grade-A meat from certified organic farms across the region.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Food Safety',
      description: 'Every product undergoes rigorous quality checks and follows strict food safety protocols.'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Fast Delivery',
      description: 'Temperature-controlled delivery ensures your meat arrives fresh in under 2 hours.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond to exceed expectations.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      description: 'Former head chef with 15+ years in premium meat sourcing'
    },
    {
      name: 'Priya Sharma',
      role: 'Quality Director',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b86e-02d1?w=300&h=300&fit=crop&crop=face',
      description: 'Food safety expert ensuring the highest standards'
    },
    {
      name: 'Arjun Singh',
      role: 'Operations Head',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      description: 'Logistics specialist managing our delivery network'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Customers' },
    { number: '10,000+', label: 'Orders Delivered' },
    { number: '99.9%', label: 'Quality Rating' },
    { number: '24/7', label: 'Customer Support' }
  ];

  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=1920&h=1080&fit=crop")',
          }}
        ></div>
        
        <div className="relative z-20 container-width section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Our <span className="text-gradient">Story</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              Born from a passion for premium quality and a commitment to bringing 
              the finest meat directly to your doorstep.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-dark-800">
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Our <span className="text-gradient">Mission</span>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                At MeatCraft, we believe everyone deserves access to premium, ethically-sourced 
                meat. Our mission is to bridge the gap between traditional butchery and modern 
                convenience, delivering restaurant-quality meat to home kitchens.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                We work directly with local farms and trusted suppliers who share our commitment 
                to animal welfare, sustainability, and exceptional quality. Every cut that reaches 
                your table has been carefully selected and prepared by our expert butchers.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-3 rounded-full">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">Expert Butchery</h4>
                  <p className="text-white/60 text-sm">Traditional techniques, modern standards</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1588347818987-84e6a8a02aca?w=600&h=600&fit=crop"
                  alt="Premium meat preparation"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Everything we do is guided by these core principles that define who we are
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="card text-center group"
              >
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900/20 to-accent-900/20">
        <div className="container-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              By The <span className="text-gradient">Numbers</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <p className="text-white/70 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              The passionate experts behind MeatCraft's commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="card text-center"
              >
                <div className="relative mb-6">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-primary-500/50"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-500 to-accent-500 px-3 py-1 rounded-full text-xs font-medium">
                    <Star className="w-3 h-3 inline mr-1" />
                    Expert
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary-400 font-medium mb-3">{member.role}</p>
                <p className="text-white/70 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900/30 to-accent-900/30">
        <div className="container-width section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Taste the <span className="text-gradient">Difference</span>?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Join thousands of satisfied customers who trust MeatCraft for their premium meat needs
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
              onClick={() => window.location.href = '/products'}
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;