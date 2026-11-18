'use client';

import { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Plus, X, ImageIcon } from 'lucide-react';
import Link from 'next/link';

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
  isbn?: string;
  publisher?: string;
  publishYear?: string;
  pages?: number;
  language?: string;
}

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Biography', 'Self-Help', 'Thriller', 'Fantasy', 'Mystery', 'Romance', 'History'];

  // Function to format Indian Rupees
  const formatIndianRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    // Load books from mainBooks (which is used by user page)
    const mainBooks = JSON.parse(localStorage.getItem('mainBooks') || '[]');
    if (mainBooks.length === 0) {
      // Default books with Indian Rupees prices
      const defaultBooks = [
        {
          id: 1,
          title: 'The Midnight Library',
          author: 'Matt Haig',
          price: 499,
          coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
          category: 'Fiction',
          description: 'Between life and death there is a library...',
          rating: 4.5,
          inStock: true,
        },
        {
          id: 2,
          title: 'Atomic Habits',
          author: 'James Clear',
          price: 550,
          coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800',
          category: 'Self-Help',
          description: 'Transform your life with small changes...',
          rating: 4.8,
          inStock: true,
        },
        {
          id: 3,
          title: 'Dune',
          author: 'Frank Herbert',
          price: 699,
          coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800',
          category: 'Science Fiction',
          description: 'The epic science fiction masterpiece...',
          rating: 4.7,
          inStock: true,
        },
        {
          id: 4,
          title: 'Becoming',
          author: 'Michelle Obama',
          price: 599,
          coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
          category: 'Biography',
          description: 'An intimate memoir by the former First Lady...',
          rating: 4.9,
          inStock: true,
        },
        {
          id: 5,
          title: 'The Silent Patient',
          author: 'Alex Michaelides',
          price: 450,
          coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800',
          category: 'Thriller',
          description: 'A psychological thriller about a woman\'s silence...',
          rating: 4.6,
          inStock: true,
        },
        {
          id: 6,
          title: 'Project Hail Mary',
          author: 'Andy Weir',
          price: 560,
          coverImage: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=800',
          category: 'Science Fiction',
          description: 'A lone astronaut must save humanity...',
          rating: 4.9,
          inStock: true,
        },
      ];
      setBooks(defaultBooks);
      localStorage.setItem('mainBooks', JSON.stringify(defaultBooks));
    } else {
      setBooks(mainBooks);
    }
  };

  const saveBooks = (updatedBooks: Book[]) => {
    setBooks(updatedBooks);
    localStorage.setItem('mainBooks', JSON.stringify(updatedBooks));
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this book? This will also remove it from user view.')) {
      const updatedBooks = books.filter((book: Book) => book.id !== id);
      saveBooks(updatedBooks);
      alert('Book deleted successfully!');
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook({ ...book });
    setShowEditModal(true);
    setShowAdvanced(false);
  };

  const handleUpdateBook = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBook) {
      const updatedBooks = books.map((book: Book) => 
        book.id === editingBook.id ? editingBook : book
      );
      saveBooks(updatedBooks);
      setShowEditModal(false);
      setEditingBook(null);
      alert('Book updated successfully!');
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (editingBook) {
      let value: string | number = e.target.value;
      if (e.target.type === 'number') {
        value = parseFloat(e.target.value);
        if (e.target.name === 'price') {
          // Ensure price is a positive integer for Indian Rupees
          value = Math.max(0, Math.floor(value));
        }
      }
      setEditingBook({
        ...editingBook,
        [e.target.name]: value,
      });
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Books ({books.length})</h1>
        <Link href="/admin/add-book">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Book
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative h-64 overflow-hidden bg-gray-100">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800';
                }}
              />
              {!book.inStock && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Out of Stock
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{book.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{book.author}</p>
              <p className="text-sm text-blue-600 mt-1">{book.category}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xl font-bold text-blue-600">{formatIndianRupees(book.price)}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="p-2 rounded-lg border border-gray-300 text-blue-600 hover:bg-blue-50 transition"
                    title="Edit Book"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="p-2 rounded-lg border border-gray-300 text-red-600 hover:bg-red-50 transition"
                    title="Delete Book"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No books found</p>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingBook && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Edit Book</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateBook} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Basic Information</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={editingBook.title}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
                  <input
                    type="text"
                    name="author"
                    value={editingBook.author}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price * (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                    <input
                      type="number"
                      step="1"
                      name="price"
                      value={editingBook.price}
                      onChange={handleEditChange}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter price in Rupees"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Enter amount in Indian Rupees (₹)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    name="category"
                    value={editingBook.category}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">In Stock</label>
                  <select
                    name="inStock"
                    value={editingBook.inStock ? 'true' : 'false'}
                    onChange={(e) => setEditingBook({ ...editingBook, inStock: e.target.value === 'true' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="url"
                      name="coverImage"
                      value={editingBook.coverImage}
                      onChange={handleEditChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={editingBook.description}
                    onChange={handleEditChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                  >
                    {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
                  </button>
                </div>

                {showAdvanced && (
                  <>
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Advanced Information</h3>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                      <input
                        type="text"
                        name="isbn"
                        value={(editingBook as any).isbn || ''}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="978-3-16-148410-0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
                      <input
                        type="text"
                        name="publisher"
                        value={(editingBook as any).publisher || ''}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Publisher name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Publish Year</label>
                      <input
                        type="number"
                        name="publishYear"
                        value={(editingBook as any).publishYear || ''}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="2024"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pages</label>
                      <input
                        type="number"
                        name="pages"
                        value={(editingBook as any).pages || ''}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Number of pages"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                      <select
                        name="language"
                        value={(editingBook as any).language || 'English'}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Italian</option>
                        <option>Portuguese</option>
                        <option>Chinese</option>
                        <option>Japanese</option>
                        <option>Russian</option>
                        <option>Arabic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-5)</label>
                      <input
                        type="number"
                        step="0.1"
                        name="rating"
                        value={editingBook.rating}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max="5"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition"
                >
                  Update Book
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}