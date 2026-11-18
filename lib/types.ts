export interface Book {
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

export interface CartItem extends Book {
  quantity: number;
}