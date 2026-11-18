'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, BookOpen, DollarSign, LogOut, Eye, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [adminEmail, setAdminEmail] = useState('');
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [adminName, setAdminName] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const isAdmin = localStorage.getItem('isAdmin');
    const email = localStorage.getItem('adminEmail');
    
    if (isAdmin !== 'true' || !email) {
      router.push('/admin/login');
    } else {
      setAdminEmail(email);
      setAdminName(email?.split('@')[0] || 'Admin');
      
      // Load real data from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      setTotalUsers(users.length);
      setTotalOrders(orders.length);
      
      const revenue = orders.reduce((sum: number, order: any) => {
        return sum + (order.totalAmount || 0);
      }, 0);
      setTotalRevenue(revenue);
      
      const recent = [...orders].reverse().slice(0, 5);
      setRecentOrders(recent);
    }
    
    setIsCheckingAuth(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminLoginTime');
    router.push('/home');  // Redirect to home page
  };

  const handleViewOrder = (orderId: string) => {
    router.push(`/orders`);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = orders.filter((order: any) => order.orderId !== orderId);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      
      setTotalOrders(updatedOrders.length);
      const revenue = updatedOrders.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);
      setTotalRevenue(revenue);
      const recent = [...updatedOrders].reverse().slice(0, 5);
      setRecentOrders(recent);
      
      alert('Order deleted successfully!');
    }
  };

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers.toString(),
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      icon: BookOpen,
      color: 'bg-green-500',
    },
    {
      title: 'Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-indigo-500',
    },
  ];

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {adminName}! 👋</h1>
              <p className="text-blue-100">Here's what's happening with your store today.</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-2">Total {stat.title.toLowerCase()}</p>
                  </div>
                  <div className={`${stat.color} p-4 rounded-full`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
            <button
              onClick={() => router.push('/orders')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All Orders →
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {totalOrders === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No orders yet
                      </td>
                    </tr>
                  ) : (
                    recentOrders.map((order: any, i: number) => (
                      <tr key={i} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {order.orderId || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {order.shippingAddress?.fullName || 'Customer'}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-green-600">
                          ${(order.totalAmount || 0).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {order.status || 'pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewOrder(order.orderId)}
                              className="text-blue-600 hover:text-blue-800 transition"
                              title="View Order"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteOrder(order.orderId)}
                              className="text-red-600 hover:text-red-800 transition"
                              title="Delete Order"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}