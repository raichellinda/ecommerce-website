'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '@/lib/types';

export interface Order {
  id: string;
  orderId: string;
  userEmail: string;  // ✅ Stores which user placed this order
  items: CartItem[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

interface OrderContextType {
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderId' | 'orderDate' | 'status' | 'userEmail'>) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (userEmail: string) => Order[];  // ✅ Filter orders by user email
  clearOrders: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const generateOrderId = () => {
    const prefix = 'ORD';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderId' | 'orderDate' | 'status' | 'userEmail'>) => {
    // Get current logged in user from localStorage
    const currentUser = localStorage.getItem('user');
    const userEmail = currentUser ? JSON.parse(currentUser).email : orderData.shippingAddress?.email || 'guest@example.com';
    
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      orderId: generateOrderId(),
      userEmail: userEmail,  // ✅ Store the user's email with the order
      orderDate: new Date().toISOString(),
      status: 'pending',
    };
    
    setOrders(prev => [...prev, newOrder]);
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.orderId === orderId);
  };

  const getUserOrders = (userEmail: string) => {
    return orders.filter(order => order.userEmail === userEmail);  // ✅ Filter by user email
  };

  const clearOrders = () => {
    setOrders([]);
    localStorage.removeItem('orders');
  };

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      getOrderById,
      getUserOrders,
      clearOrders,
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}