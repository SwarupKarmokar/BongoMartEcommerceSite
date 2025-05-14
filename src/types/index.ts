// Product Types
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductFilters {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  searchQuery: string;
  sortBy: 'default' | 'price_low_high' | 'price_high_low' | 'rating';
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

// User Types
export interface User {
  id: number;
  name?: string;
  email: string;
}

// Order Types
export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  productTitle: string;
  productImage: string;
}

export interface Order {
  id: string;
  userId: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled';
  total: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
}