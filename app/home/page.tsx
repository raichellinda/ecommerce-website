'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { books } from '@/lib/books';
import { Book } from '@/lib/types';
import { Star, ShoppingCart, BookOpen, Mail, Phone, MapPin, User, LogIn, LogOut, UserCircle, Package, Settings, X } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

// Header Component
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
            {/* Logo */}
            <Link href="/home" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-800">BookStore</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/home" className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/books" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Books
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                About
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Cart Icon with Badge */}
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-blue-600 transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User Profile Dropdown */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-2 transition-colors"
                  >
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">{getUserInitials()}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                      {user?.name?.split(' ')[0] || 'User'}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 border">
                      <div className="py-2">
                        <div className="px-4 py-3 border-b">
                          <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                        </div>
                        
                        <button
                          onClick={() => {
                            setShowProfileModal(true);
                            setShowDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                        >
                          <UserCircle className="h-4 w-4" />
                          <span>My Profile</span>
                        </button>
                        
                        <Link
                          href="/orders"
                          onClick={() => setShowDropdown(false)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                        >
                          <Package className="h-4 w-4" />
                          <span>My Orders</span>
                        </Link>
                        
                        <button
                          onClick={() => {
                            setShowSettingsModal(true);
                            setShowDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </button>
                        
                        <div className="border-t my-1"></div>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  <LogIn className="h-4 w-4" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
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
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 -mx-6 -mt-6 px-6 py-8 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                    <p className="text-blue-100 mt-1">Member since 2024</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-gray-800">{user?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="text-gray-800">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Account Created</p>
                      <p className="text-gray-800">January 2024</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <button
                    onClick={() => {
                      setShowProfileModal(false);
                      setShowSettingsModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Edit Profile Settings
                  </button>
                </div>
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
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-700">Push Notifications</span>
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                      className="w-4 h-4"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-700">Email Updates</span>
                    <input
                      type="checkbox"
                      checked={emailUpdates}
                      onChange={(e) => setEmailUpdates(e.target.checked)}
                      className="w-4 h-4"
                    />
                  </label>
                </div>
              </div>

              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Appearance</h3>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-gray-700">Dark Mode</span>
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    className="w-4 h-4"
                  />
                </label>
              </div>

              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Language</h3>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                </select>
              </div>

              <div>
                <button
                  onClick={handleSaveSettings}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700"
                >
                  Save Changes
                </button>
              </div>
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
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">BookStore</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your premier destination for discovering and purchasing the finest books from around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/home" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/books" className="text-gray-400 hover:text-white transition-colors">Books</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/cart" className="text-gray-400 hover:text-white transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Return Policy</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Shipping Information</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>support@bookstore.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>123 Book Street, Mumbai 400001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright with Privacy & Terms Links */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} BookStore. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms & Conditions
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);

  // Format Indian Rupees function
  const formatIndianRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    // Get books from localStorage or use default
    const storedBooks = localStorage.getItem('mainBooks');
    if (storedBooks) {
      const allBooks = JSON.parse(storedBooks);
      setFeaturedBooks(allBooks.slice(0, 4));
    } else {
      setFeaturedBooks(books.slice(0, 4));
    }
  }, []);

  const handleAddToCart = (book: Book) => {
    addToCart(book);
    // Optional: Show a toast notification
    console.log(`Added ${book.title} to cart`);
  };

  return (
    <>
      <Header />
      <div>
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold mb-4">
                Welcome back, {user?.name?.split(' ')[0] || 'Reader'}! 👋
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Discover thousands of books at amazing prices. Your next favorite read is just a click away.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/books"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
                >
                  Browse Books
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Books */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Books</h2>
              <p className="text-gray-500">Hand-picked just for you</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group">
                  <Link href={`/books/${book.id}`}>
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {!book.inStock && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Out of Stock
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/books/${book.id}`}>
                      <h3 className="font-bold text-gray-800 hover:text-blue-600 transition line-clamp-1">
                        {book.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{book.author}</p>
                    <p className="text-xs text-blue-600 mt-1">{book.category}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">{book.rating}</span>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xl font-bold text-blue-600">{formatIndianRupees(book.price)}</span>
                      <button
                        onClick={() => handleAddToCart(book)}
                        disabled={!book.inStock}
                        className={`p-2 rounded-lg transition transform hover:scale-105 ${
                          book.inStock 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link href="/books" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                View All Books
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Reading?</h2>
          <p className="text-gray-500 mb-6">Join thousands of happy readers today</p>
          <Link href="/books" className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition">
            Shop Now
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}