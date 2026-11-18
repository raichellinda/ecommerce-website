'use client';

import { useParams, useRouter } from 'next/navigation';
import { useOrder } from '@/context/OrderContext';
import Link from 'next/link';
import { ArrowLeft, Truck, Clock, MapPin, CreditCard, IndianRupee } from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getOrderById } = useOrder();
  const order = getOrderById(params.orderId as string);

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
  const formatIndianDateTime = (date: Date | string) => {
    return new Date(date).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatIndianDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Calculate estimated delivery date
  const getEstimatedDelivery = () => {
    if (!order) return '';
    const date = new Date(order.orderDate);
    date.setDate(date.getDate() + 5);
    return formatIndianDate(date);
  };

  // Get status badge color and text
  const getStatusInfo = () => {
    if (!order) return { color: 'bg-gray-100 text-gray-600', text: 'Unknown', icon: '❓' };
    switch (order.status) {
      case 'delivered':
        return { color: 'bg-green-100 text-green-600', text: 'Delivered ✓', icon: '✅' };
      case 'shipped':
        return { color: 'bg-blue-100 text-blue-600', text: 'Shipped 🚚', icon: '🚚' };
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-600', text: 'Pending ⏳', icon: '⏳' };
      default:
        return { color: 'bg-gray-100 text-gray-600', text: order.status.toUpperCase(), icon: '📦' };
    }
  };

  // Early return if order is not found
  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order not found</h2>
          <p className="text-gray-500 mb-6">The order you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/orders" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Orders
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Order Details</h1>
          <p className="text-blue-100">Order ID: {order.orderId}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Status */}
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Clock size={20} className="text-blue-600" />
              Order Status
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.color}`}>
                {statusInfo.text}
              </span>
              <span className="text-sm text-gray-500">
                Ordered on {formatIndianDateTime(order.orderDate)}
              </span>
            </div>
            {order.status !== 'delivered' && (
              <div className="mt-3 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <p className="flex items-center gap-2">
                  <span>📦</span>
                  Estimated delivery: {getEstimatedDelivery()}
                </p>
              </div>
            )}
          </div>

          {/* Shipping Info */}
          {order.shippingAddress && (
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Truck size={20} className="text-blue-600" />
                Shipping Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-800">{order.shippingAddress.fullName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">{order.shippingAddress.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-800">{order.shippingAddress.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-800">
                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Info */}
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <CreditCard size={20} className="text-blue-600" />
              Payment Information
            </h3>
            <div className="space-y-2">
              <p className="font-medium text-gray-800">Method: {order.paymentMethod || 'N/A'}</p>
              {order.paymentMethod === 'Cash on Delivery' && (
                <p className="text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                  💰 Pay when you receive the order
                </p>
              )}
              {order.paymentMethod === 'UPI' && (
                <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded-lg">
                  📱 Payment processed via UPI
                </p>
              )}
              {order.paymentMethod === 'Credit/Debit Card' && (
                <p className="text-sm text-purple-600 bg-purple-50 p-2 rounded-lg">
                  💳 Payment processed via Card
                </p>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="border rounded-lg overflow-hidden">
            <h3 className="font-semibold text-gray-800 p-4 bg-gray-50 border-b flex items-center gap-2">
              <IndianRupee size={18} />
              Order Items ({order.items?.length || 0})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Book</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Quantity</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Price</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item: any) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-800 font-medium">{item.title}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 text-center">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 text-right">{formatIndianRupees(item.price)}</td>
                        <td className="px-4 py-3 text-sm text-gray-800 font-semibold text-right">{formatIndianRupees(item.price * item.quantity)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                        No items found in this order
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-right font-semibold text-gray-800">Total Amount:</td>
                    <td className="px-4 py-3 text-right font-bold text-blue-600 text-lg">{formatIndianRupees(order.totalAmount)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Link 
              href="/books" 
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition text-center transform hover:scale-105"
            >
              Continue Shopping
            </Link>
            <Link 
              href="/orders" 
              className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition text-center transform hover:scale-105"
            >
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}