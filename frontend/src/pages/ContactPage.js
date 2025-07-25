import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Headphones,
  Award,
  Shield
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Message sent successfully! (Demo Mode)');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: '+91 98765 43210',
      subtitle: 'Available 24/7 for urgent orders'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: 'support@meatcraft.com',
      subtitle: 'We respond within 2 hours'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Address',
      details: '123 Meat Street, Food District',
      subtitle: 'Mumbai, Maharashtra 400001'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Hours',
      details: '6 AM - 11 PM',
      subtitle: 'Monday to Sunday'
    }
  ];

  const supportOptions = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      action: 'Start Chat',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: 'Call Support',
      description: 'Speak directly with our customer service',
      action: 'Call Now',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email Support',
      description: 'Send us your questions and concerns',
      action: 'Send Email',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const faqs = [
    {
      question: 'How fresh is the meat?',
      answer: 'All our meat is sourced daily from certified farms and delivered within 24 hours of processing.'
    },
    {
      question: 'What are your delivery areas?',
      answer: 'We currently deliver across Mumbai, Pune, Delhi, and Bangalore. More cities coming soon!'
    },
    {
      question: 'Do you offer bulk orders?',
      answer: 'Yes! Contact us for special pricing on bulk orders for events, restaurants, and businesses.'
    },
    {
      question: 'What if I\'m not satisfied?',
      answer: 'We offer a 100% satisfaction guarantee. If you\'re not happy, we\'ll make it right or refund your money.'
    }
  ];

  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container-width section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
              Have questions? Need help with your order? Our friendly team is here to assist you 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="py-12 bg-dark-800">
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="card text-center"
              >
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                <p className="text-white font-medium mb-1">{info.details}</p>
                <p className="text-white/60 text-sm">{info.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card"
            >
              <h2 className="text-3xl font-display font-bold mb-6">
                Send Us a <span className="text-gradient">Message</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field w-full"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field w-full"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field w-full"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-field w-full"
                    >
                      <option value="">Select a subject</option>
                      <option value="order_inquiry">Order Inquiry</option>
                      <option value="product_question">Product Question</option>
                      <option value="delivery_issue">Delivery Issue</option>
                      <option value="bulk_order">Bulk Order</option>
                      <option value="general">General Question</option>
                      <option value="complaint">Complaint</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-field w-full resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${
                    isSubmitting
                      ? 'bg-white/20 text-white/50 cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Support Options & Info */}
            <div className="space-y-8">
              {/* Quick Support */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="card"
              >
                <h3 className="text-2xl font-display font-bold mb-6">
                  Need <span className="text-gradient">Immediate</span> Help?
                </h3>
                
                <div className="space-y-4">
                  {supportOptions.map((option, index) => (
                    <motion.div
                      key={option.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                      className="glass p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/20"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`bg-gradient-to-r ${option.color} p-3 rounded-lg`}>
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold mb-1">{option.title}</h4>
                          <p className="text-white/70 text-sm mb-2">{option.description}</p>
                          <span className="text-primary-400 text-sm font-medium">
                            {option.action} →
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quality Guarantee */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">100% Satisfaction Guarantee</h3>
                  <p className="text-white/70 mb-4">
                    Not happy with your order? We'll make it right or refund your money. 
                    No questions asked.
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-white/60">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      Premium Quality
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      Secure Payment
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Find quick answers to common questions about our products and services
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <h3 className="text-lg font-bold mb-3 text-primary-400">{faq.question}</h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-white/60 mb-4">Still have questions?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              Contact Our Support Team
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;