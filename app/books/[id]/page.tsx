'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  description: string;
  category: string;
  rating: number;
  inStock: boolean;
}

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load books from localStorage
    const loadBook = () => {
      const storedBooks = localStorage.getItem('mainBooks');
      if (storedBooks) {
        const books = JSON.parse(storedBooks);
        const foundBook = books.find((b: Book) => b.id === parseInt(params.id as string));
        setBook(foundBook || null);
      } else {
        // Default books if nothing in localStorage
        const defaultBooks = [
          {
            id: 1,
            title: 'The Midnight Library',
            author: 'Matt Haig',
            price: 24.99,
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
            price: 19.99,
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
            price: 29.99,
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
            price: 32.99,
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
            price: 18.99,
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
            price: 27.99,
            coverImage: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=800',
            category: 'Science Fiction',
            description: 'A lone astronaut must save humanity...',
            rating: 4.9,
            inStock: true,
          },
        ];
        const foundBook = defaultBooks.find((b) => b.id === parseInt(params.id as string));
        setBook(foundBook || null);
      }
      setLoading(false);
    };
    
    loadBook();
  }, [params.id]);

  const handleBuyNow = () => {
    if (book) {
      addToCart(book);
      router.push('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Book not found</h2>
          <Link href="/books" className="text-blue-600 hover:underline">
            Back to Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link href="/books" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Books
      </Link>

      {/* Book Details */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Book Image */}
          <div className="md:w-1/2 relative h-96 md:h-auto">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Book Info */}
          <div className="md:w-1/2 p-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
            </div>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(book.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 ml-2">{book.rating} / 5</span>
            </div>

            {/* Category */}
            <div className="mb-4">
              <span className="text-sm text-gray-500">Category: </span>
              <span className="text-sm font-semibold text-blue-600">{book.category}</span>
            </div>

            {/* Stock Status */}
            <div className="mb-4">
              {book.inStock ? (
                <span className="text-green-600 text-sm font-semibold">✓ In Stock</span>
              ) : (
                <span className="text-red-500 text-sm font-semibold">✗ Out of Stock</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">{book.description}</p>

            {/* Price and Buttons */}
            <div className="border-t pt-6">
              <div className="mb-4">
                <span className="text-4xl font-bold text-blue-600">₹{book.price.toLocaleString("en-IN")}</span>
                {book.price > 500 && (
                  <span className="ml-3 text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Free Shipping
                  </span>
                )}
              </div>
              
              <div className="flex gap-4">
                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(book)}
                  disabled={!book.inStock}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    book.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  disabled={!book.inStock}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    book.inStock
                      ? 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}6364657660