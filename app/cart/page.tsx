'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, ShoppingBag, ArrowLeft, CreditCard, BookOpen, User, LogIn, LogOut, UserCircle, Package, Settings, X, ShoppingCart, IndianRupee } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';

// Header Component with cart badge and user dropdown
function Header() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('english');

  // Format Indian Rupees function
  const formatIndianRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
    setShowSettingsModal(false);
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/home" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-800">BookStore</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/home" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</Link>
              <Link href="/books" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Books</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">About</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
                {totalItems > 0 && (<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{totalItems}</span>)}
              </Link>
              {user ? (
                <div className="relative">
                  <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">{getUserInitials()}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden sm:inline">{user?.name?.split(' ')[0] || 'User'}</span>
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 border">
                      <div className="py-2">
                        <div className="px-4 py-3 border-b"><p className="text-sm font-semibold text-gray-800">{user?.name}</p><p className="text-xs text-gray-500 mt-1">{user?.email}</p></div>
                        <button onClick={() => { setShowProfileModal(true); setShowDropdown(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"><UserCircle className="h-4 w-4" /><span>My Profile</span></button>
                        <Link href="/orders" onClick={() => setShowDropdown(false)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"><Package className="h-4 w-4" /><span>My Orders</span></Link>
                        <button onClick={() => { setShowSettingsModal(true); setShowDropdown(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"><Settings className="h-4 w-4" /><span>Settings</span></button>
                        <div className="border-t my-1"></div>
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3"><LogOut className="h-4 w-4" /><span>Sign Out</span></button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"><LogIn className="h-4 w-4" /><span className="text-sm font-medium">Login</span></Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {showProfileModal && user && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
              <button onClick={() => setShowProfileModal(false)} className="p-1 rounded-lg hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 -mx-6 -mt-6 px-6 py-8 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center"><User className="h-10 w-10 text-white" /></div>
                  <div><h2 className="text-2xl font-bold text-white">{user?.name}</h2><p className="text-blue-100 mt-1">Member since 2024</p></div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div><p className="text-sm text-gray-500">Full Name</p><p className="text-gray-800">{user?.name}</p></div>
                    <div><p className="text-sm text-gray-500">Email Address</p><p className="text-gray-800">{user?.email}</p></div>
                    <div><p className="text-sm text-gray-500">Account Created</p><p className="text-gray-800">January 2024</p></div>
                  </div>
                </div>
                <div><button onClick={() => { setShowProfileModal(false); setShowSettingsModal(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Edit Profile Settings</button></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Settings</h2>
              <button onClick={() => setShowSettingsModal(false)} className="p-1 rounded-lg hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="border-b pb-6"><h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer"><span className="text-gray-700">Push Notifications</span><input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} className="w-4 h-4" /></label>
                  <label className="flex items-center justify-between cursor-pointer"><span className="text-gray-700">Email Updates</span><input type="checkbox" checked={emailUpdates} onChange={(e) => setEmailUpdates(e.target.checked)} className="w-4 h-4" /></label>
                </div>
              </div>
              <div className="border-b pb-6"><h3 className="text-lg font-semibold text-gray-800 mb-4">Appearance</h3>
                <label className="flex items-center justify-between cursor-pointer"><span className="text-gray-700">Dark Mode</span><input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} className="w-4 h-4" /></label>
              </div>
              <div className="border-b pb-6"><h3 className="text-lg font-semibold text-gray-800 mb-4">Language</h3>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option value="english">English</option><option value="spanish">Spanish</option><option value="french">French</option><option value="german">German</option></select>
              </div>
              <div><button onClick={handleSaveSettings} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold">Save Changes</button></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-sm">
          <span className="text-gray-400">© {new Date().getFullYear()} BookStore. All rights reserved.</span>
          <span className="text-gray-600 hidden sm:inline">•</span>
          <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
          <span className="text-gray-600 hidden sm:inline">•</span>
          <Link href="/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link>
          <span className="text-gray-600 hidden sm:inline">•</span>
          <Link href="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart();

  // Format Indian Rupees function
  const formatIndianRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Check if user is logged in
    if (!user) {
      // Store the current cart in sessionStorage to restore after login
      sessionStorage.setItem('redirectAfterLogin', '/checkout');
      sessionStorage.setItem('pendingCheckout', 'true');
      router.push('/');
    } else {
      router.push('/checkout');
    }
  };

  // Calculate tax (GST) - 18% for India
  const calculateTax = () => {
    return totalPrice * 0.18;
  };

  const calculateTotal = () => {
    return totalPrice + calculateTax();
  };

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any books to your cart yet.</p>
            <Link href="/books" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart ({totalItems} items)</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                    <div className="relative h-32 w-24 flex-shrink-0">
                      <Image src={item.coverImage} alt={item.title} fill className="object-cover rounded" />
                    </div>
                    
                    <div className="flex-1">
                      <Link href={`/books/${item.id}`}>
                        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">{item.title}</h3>
                      </Link>
                      <p className="text-gray-600">{item.author}</p>
                      <p className="text-blue-600 font-semibold mt-1">{formatIndianRupees(item.price)}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 min-w-[50px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <button 
                onClick={clearCart} 
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Clear Cart
              </button>
              <Link href="/books" className="text-blue-600 hover:text-blue-700 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-blue-600" />
                Order Summary
              </h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">{formatIndianRupees(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-semibold">{formatIndianRupees(calculateTax())}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-blue-600">{formatIndianRupees(calculateTotal())}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Including GST</p>
                </div>
              </div>
              
              {/* Free shipping threshold message */}
              {totalPrice < 999 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700 text-center">
                    Add {formatIndianRupees(999 - totalPrice)} more to get FREE shipping!
                  </p>
                  <div className="mt-2 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((totalPrice / 999) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              
              <button 
                onClick={handleCheckout} 
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <CreditCard className="h-5 w-5" /> Proceed to Checkout
              </button>
              
              <div className="mt-4 text-center">
                <div className="flex justify-center gap-4 text-xs text-gray-500">
                  <span>🔒 Secure payment</span>
                  <span>🔄 Easy returns</span>
                  <span>💬 24/7 support</span>
                </div>
              </div>
              
              {/* Accepted payment methods */}
              <div className="mt-4 pt-4 border-t text-center">
                <p className="text-xs text-gray-500 mb-2">We accept</p>
                <div className="flex justify-center gap-2 text-gray-600">
                  <span className="text-sm">💳 Cards</span>
                  <span className="text-sm">📱 UPI</span>
                  <span className="text-sm">💰 COD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}