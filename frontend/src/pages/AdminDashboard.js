import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Package, 
  Truck, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Search,
  Filter,
  MapPin,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useApp } from '../App';
import axios from 'axios';

const AdminDashboard = () => {
  const { user, API_BASE } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState({
    total_orders: 0,
    total_earnings: 0,
    total_customers: 0,
    active_deliveries: 0,
    recent_orders: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/admin/dashboard`);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'orders', name: 'Orders', icon: <Package className="w-5 h-5" /> },
    { id: 'products', name: 'Products', icon: <Package className="w-5 h-5" /> },
    { id: 'customers', name: 'Customers', icon: <Users className="w-5 h-5" /> },
    { id: 'deliveries', name: 'Live Tracking', icon: <Truck className="w-5 h-5" /> },
  ];

  // Redirect if not admin
  if (user?.user_type !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-white/60">Admin access required</p>
        </div>
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
            Admin <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-white/60">Manage your meat delivery business</p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow'
                    : 'glass text-white/80 hover:bg-white/20'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && <DashboardOverview data={dashboardData} />}
            {activeTab === 'orders' && <OrdersManagement />}
            {activeTab === 'products' && <ProductsManagement />}
            {activeTab === 'customers' && <CustomersManagement />}
            {activeTab === 'deliveries' && <LiveDeliveryTracking />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = ({ data }) => {
  const stats = [
    {
      title: 'Total Orders',
      value: data.total_orders,
      icon: <Package className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    {
      title: 'Total Earnings',
      value: `₹${data.total_earnings.toFixed(2)}`,
      icon: <DollarSign className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      change: '+18%'
    },
    {
      title: 'Total Customers',
      value: data.total_customers,
      icon: <Users className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      change: '+5%'
    },
    {
      title: 'Active Deliveries',
      value: data.active_deliveries,
      icon: <Truck className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-600',
      change: '+3%'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl text-white`}>
                {stat.icon}
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-white/60 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="card"
        >
          <h3 className="text-xl font-bold mb-4">Sales Analytics</h3>
          <div className="h-64 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/60">Sales chart visualization</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="card"
        >
          <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {data.recent_orders.slice(0, 5).map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 glass rounded-lg">
                <div>
                  <p className="font-medium">Order #{index + 1001}</p>
                  <p className="text-sm text-white/60">₹{(Math.random() * 1000 + 200).toFixed(2)}</p>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                  Processing
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Orders Management Component
const OrdersManagement = () => {
  const mockOrders = [
    { id: '1001', customer: 'John Doe', total: 899.99, status: 'processing', items: 3 },
    { id: '1002', customer: 'Jane Smith', total: 599.99, status: 'delivered', items: 2 },
    { id: '1003', customer: 'Mike Johnson', total: 1299.99, status: 'in_transit', items: 5 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing': return 'text-yellow-400 bg-yellow-500/20';
      case 'in_transit': return 'text-blue-400 bg-blue-500/20';
      case 'delivered': return 'text-green-400 bg-green-500/20';
      default: return 'text-white/60 bg-white/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Orders Management</h3>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              className="input-field pl-10 w-64"
            />
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4">Order ID</th>
                <th className="text-left py-4 px-4">Customer</th>
                <th className="text-left py-4 px-4">Items</th>
                <th className="text-left py-4 px-4">Total</th>
                <th className="text-left py-4 px-4">Status</th>
                <th className="text-left py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4 font-medium">#{order.id}</td>
                  <td className="py-4 px-4">{order.customer}</td>
                  <td className="py-4 px-4">{order.items} items</td>
                  <td className="py-4 px-4 font-bold">₹{order.total}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 glass rounded-lg"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 glass rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Products Management Component
const ProductsManagement = () => {
  const { products } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Products Management</h3>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="card"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h4 className="font-bold text-lg mb-2">{product.name}</h4>
            <p className="text-white/60 text-sm mb-4">{product.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gradient">₹{product.price}</span>
              <span className="text-sm text-white/60">Stock: {product.stock}</span>
            </div>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 btn-secondary text-sm py-2"
              >
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium hover:bg-red-500/30 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Customers Management Component
const CustomersManagement = () => {
  const mockCustomers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', orders: 12, spent: 2899.99 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 8, spent: 1599.99 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', orders: 15, spent: 3299.99 },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Customers Management</h3>
      
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4">Name</th>
                <th className="text-left py-4 px-4">Email</th>
                <th className="text-left py-4 px-4">Orders</th>
                <th className="text-left py-4 px-4">Total Spent</th>
                <th className="text-left py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((customer, index) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4 font-medium">{customer.name}</td>
                  <td className="py-4 px-4 text-white/70">{customer.email}</td>
                  <td className="py-4 px-4">{customer.orders}</td>
                  <td className="py-4 px-4 font-bold">₹{customer.spent}</td>
                  <td className="py-4 px-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 glass rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Live Delivery Tracking Component
const LiveDeliveryTracking = () => {
  const mockDeliveries = [
    { id: 'DEL001', customer: 'John Doe', address: '123 Main St', status: 'picked_up', eta: '25 min' },
    { id: 'DEL002', customer: 'Jane Smith', address: '456 Oak Ave', status: 'in_transit', eta: '15 min' },
    { id: 'DEL003', customer: 'Mike Johnson', address: '789 Pine St', status: 'delivered', eta: 'Completed' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'picked_up': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'in_transit': return <Truck className="w-5 h-5 text-blue-400" />;
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-400" />;
      default: return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Live Delivery Tracking</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map Placeholder */}
        <div className="card">
          <h4 className="text-xl font-semibold mb-4">Live Map</h4>
          <div className="h-96 bg-gradient-to-br from-dark-700 to-dark-600 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/60">Live delivery map will appear here</p>
              <p className="text-white/40 text-sm mt-2">Porter API integration pending</p>
            </div>
          </div>
        </div>

        {/* Active Deliveries */}
        <div className="card">
          <h4 className="text-xl font-semibold mb-4">Active Deliveries</h4>
          <div className="space-y-4">
            {mockDeliveries.map((delivery, index) => (
              <motion.div
                key={delivery.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass p-4 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{delivery.id}</span>
                  {getStatusIcon(delivery.status)}
                </div>
                <p className="text-white/80 mb-1">{delivery.customer}</p>
                <p className="text-white/60 text-sm mb-2">{delivery.address}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/50">ETA: {delivery.eta}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary text-xs py-1 px-3"
                  >
                    Track
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;