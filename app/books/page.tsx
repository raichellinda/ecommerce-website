"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ShoppingCart, BookOpen, User, LogIn, LogOut, UserCircle, Package, Settings, X, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  category: string;
  description: string;
  rating: number;
  inStock: boolean;
}

// Toast Message Component
function ToastMessage({ message, bookTitle, onClose }: { message: string; bookTitle: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 min-w-[280px]">
        <div className="bg-white/20 rounded-full p-2">
          <CheckCircle className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">{message}</p>
          <p className="text-xs text-green-100">{bookTitle}</p>
        </div>
        <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1 transition">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

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
    return user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Format Indian Rupees function
  const formatIndianRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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
              <Link href="/books" className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium">Books</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">About</Link>
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

export default function BooksPage() {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [toast, setToast] = useState<{ show: boolean; message: string; bookTitle: string }>({ show: false, message: "", bookTitle: "" });
  const router = useRouter();

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
    const loadBooks = () => {
      const storedBooks = localStorage.getItem('mainBooks');
      if (storedBooks) {
        setBooks(JSON.parse(storedBooks));
      } else {
        // Default books with Indian Rupee prices
        const defaultBooks = [
          { id: 1, title: 'The Midnight Library', author: 'Matt Haig', price: 499, coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800', category: 'Fiction', description: 'Between life and death there is a library...', rating: 4.5, inStock: true },
          { id: 2, title: 'Atomic Habits', author: 'James Clear', price: 550, coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800', category: 'Self-Help', description: 'Transform your life with small changes...', rating: 4.8, inStock: true },
          { id: 3, title: 'Dune', author: 'Frank Herbert', price: 699, coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800', category: 'Science Fiction', description: 'The epic science fiction masterpiece...', rating: 4.7, inStock: true },
          { id: 4, title: 'Becoming', author: 'Michelle Obama', price: 599, coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800', category: 'Biography', description: 'An intimate memoir by the former First Lady...', rating: 4.9, inStock: true },
          { id: 5, title: 'The Silent Patient', author: 'Alex Michaelides', price: 450, coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800', category: 'Thriller', description: 'A psychological thriller about a woman\'s silence...', rating: 4.6, inStock: true },
          { id: 6, title: 'Project Hail Mary', author: 'Andy Weir', price: 560, coverImage: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=800', category: 'Science Fiction', description: 'A lone astronaut must save humanity...', rating: 4.9, inStock: true },
        ];
        setBooks(defaultBooks);
        localStorage.setItem('mainBooks', JSON.stringify(defaultBooks));
      }
    };
    loadBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuyNow = (book: Book) => {
    // Check if user is logged in
    if (!user) {
      // Store the intended book in sessionStorage to redirect back after login
      sessionStorage.setItem('redirectAfterLogin', `/checkout?book=${book.id}`);
      sessionStorage.setItem('pendingBook', JSON.stringify(book));
      router.push('/');
    } else {
      // Add to cart and proceed to checkout
      addToCart(book);
      router.push('/checkout');
    }
  };

  const handleAddToCart = (book: Book) => {
    addToCart(book);
    setToast({
      show: true,
      message: "Added to cart!",
      bookTitle: book.title
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen px-6 py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto mb-10">
          <input 
            type="text" 
            placeholder="Search books by title or author..." 
            className="w-full p-3 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-white border rounded-xl shadow hover:shadow-lg transition relative overflow-hidden group">
              <div onClick={() => router.push(`/books/${book.id}`)} className="cursor-pointer">
                <Image src={book.coverImage} alt={book.title} width={300} height={400} className="w-full h-[260px] object-cover" />
                {!book.inStock && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Out of Stock
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg text-black line-clamp-1">{book.title}</h2>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p className="text-xs text-blue-600 mt-1">{book.category}</p>
                <p className="mt-2 font-bold text-xl text-blue-600">{formatIndianRupees(book.price)}</p>
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => handleAddToCart(book)} 
                    disabled={!book.inStock}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded transition transform hover:scale-105 ${
                      book.inStock 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={16} /> Add
                  </button>
                  <button 
                    onClick={() => handleBuyNow(book)} 
                    disabled={!book.inStock}
                    className={`flex-1 py-2 rounded transition font-medium transform hover:scale-105 ${
                      book.inStock 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No books found matching your search.</p>
          </div>
        )}
      </div>
      <Footer />
      
      {/* Toast Message */}
      {toast.show && (
        <ToastMessage 
          message={toast.message} 
          bookTitle={toast.bookTitle} 
          onClose={() => setToast({ show: false, message: "", bookTitle: "" })} 
        />
      )}
    </>
  );
}