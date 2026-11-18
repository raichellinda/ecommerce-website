'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Book } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden book-card-hover cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/books/${book.id}`}>
        <div className="relative h-64 w-full overflow-hidden bg-gray-100">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          {!book.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold px-4 py-2 bg-red-500 rounded-full text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-5">
        <Link href={`/books/${book.id}`}>
          <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors line-clamp-1">
            {book.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mt-1">{book.author}</p>
        
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(book.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">({book.rating})</span>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-2xl font-bold text-blue-600">${book.price}</span>
            {book.price > 25 && (
              <span className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                Free Shipping
              </span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 rounded-full bg-gray-100 hover:bg-red-100 transition-colors"
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
            </button>
            
            <button
              onClick={() => addToCart(book)}
              disabled={!book.inStock}
              className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                book.inStock
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}