import { Book } from './types';

export const books: Book[] = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 24.99,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    description: "Between life and death there is a library...",
    category: "Fiction",
    rating: 4.5,
    inStock: true
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 19.99,
    coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800",
    description: "Transform your life with small changes...",
    category: "Self-Help",
    rating: 4.8,
    inStock: true
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    price: 29.99,
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800",
    description: "The epic science fiction masterpiece...",
    category: "Science Fiction",
    rating: 4.7,
    inStock: true
  },
  {
    id: 4,
    title: "Becoming",
    author: "Michelle Obama",
    price: 32.99,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
    description: "An intimate memoir by the former First Lady...",
    category: "Biography",
    rating: 4.9,
    inStock: true
  },
  {
    id: 5,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 18.99,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800",
    description: "A psychological thriller about a woman's silence...",
    category: "Thriller",
    rating: 4.6,
    inStock: true
  },
  {
    id: 6,
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 27.99,
    coverImage: "https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=800",
    description: "A lone astronaut must save humanity...",
    category: "Science Fiction",
    rating: 4.9,
    inStock: false
  }
];

export const categories = ["All", "Fiction", "Self-Help", "Science Fiction", "Biography", "Thriller"];