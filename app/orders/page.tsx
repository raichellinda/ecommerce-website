'use client';

import { useState, useEffect } from 'react';
import { useOrder } from '@/context/OrderContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Package, Eye } from 'lucide-react';

export default function OrdersPage() {
  const { getUserOrders } = useOrder();
  const { user } = useAuth();
  const [userOrders, setUserOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      // Get orders only for the currently logged-in user using getUserOrders
      const filteredOrders = getUserOrders(user.email);
      setUserOrders(filteredOrders);
    } else {
      setUserOrders([]);
    }
  }, [user, getUserOrders]);

  // Format Indian Rupees function
  const formatIndianRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date in Indian format
  const formatIndianDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Login</h2>
        <p className="text-gray-500 mb-6">You need to be logged in to view your orders</p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
          Login to Continue
        </Link>
      </div>
    );
  }

  // If user has no orders
  if (userOrders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">You haven't placed any orders yet</p>
        <Link href="/books" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>
      
      <div className="space-y-6">
        {userOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold text-gray-800">{order.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="text-gray-800">{formatIndianDate(order.orderDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-bold text-blue-600">{formatIndianRupees(order.totalAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {order.status === 'delivered' ? 'Delivered ✓' :
                     order.status === 'shipped' ? 'Shipped 🚚' :
                     order.status === 'pending' ? 'Pending ⏳' :
                     order.status}
                  </span>
                </div>
                <Link href={`/order/${order.orderId}`}>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105">
                    <Eye size={16} />
                    View Details
                  </button>
                </Link>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-600">Items: {order.items.length}</p>
                <p className="text-xs text-gray-400">Estimated delivery: {formatIndianDate(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000))}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {order.items.slice(0, 3).map((item: any) => (
                  <div key={item.id} className="flex items-center gap-2 text-sm bg-gray-50 px-3 py-1 rounded-full">
                    <span className="text-gray-800 font-medium">{item.title}</span>
                    <span className="text-gray-500">x{item.quantity}</span>
                    <span className="text-blue-600 text-xs">{formatIndianRupees(item.price * item.quantity)}</span>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    +{order.items.length - 3} more items
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}