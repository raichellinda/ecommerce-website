'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ShoppingCart, User, LogIn, LogOut, UserCircle, Package, Settings, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

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
    return user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
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
              <Link href="/about" className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium">About</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-600" />
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
    <footer className="bg-gray-900 text-white mt-16 py-6">
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

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white p-12 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About BookStore</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">Your premier destination for discovering and purchasing the finest books from around the world.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
            <div className="w-16 h-1 bg-blue-600 mb-6"></div>
            <p className="text-gray-600 mb-4 leading-relaxed">Founded in 2024, BookStore was born from a simple idea: to create a seamless online shopping experience for book lovers everywhere.</p>
            <p className="text-gray-600 mb-4 leading-relaxed">We believe that books have the power to transform lives, inspire change, and open doors to new worlds. Our mission is to connect readers with stories that matter.</p>
            <p className="text-gray-600 leading-relaxed">Today, we're proud to serve thousands of happy customers with a carefully curated collection of books across all genres.</p>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
            <Image src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1000" alt="Bookshelf" fill className="object-cover" />
          </div>
        </div>
        <div className="bg-gray-50 rounded-2xl p-12 mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">To make quality books accessible to everyone, foster a love for reading, and build a community of passionate readers worldwide.</p>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Reading?</h2>
          <p className="text-lg mb-6 text-white/90">Join thousands of happy readers today</p>
          <Link href="/books" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105">Browse Collection</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}