import { Product } from '../types';

// Simulated API call delays
const DELAY = 600;

// Mock data
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 149.99,
    description: "Experience exceptional sound quality with these over-ear wireless headphones featuring active noise cancellation and 30-hour battery life.",
    category: "electronics",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.8, count: 278 }
  },
  {
    id: 2,
    title: "Men's Casual Slim-Fit Shirt",
    price: 39.99,
    description: "A comfortable slim-fit casual shirt with breathable fabric, perfect for any occasion.",
    category: "clothing",
    image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.3, count: 124 }
  },
  {
    id: 3,
    title: "Women's Designer Handbag",
    price: 89.99,
    description: "Elegant designer handbag with multiple compartments and premium materials.",
    category: "clothing",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.6, count: 156 }
  },
  {
    id: 4,
    title: "4K Ultra HD Smart TV - 55 inch",
    price: 699.99,
    description: "Immerse yourself in stunning 4K clarity with this smart TV featuring HDR technology and built-in streaming apps.",
    category: "electronics",
    image: "https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.7, count: 89 }
  },
  {
    id: 5,
    title: "Modern Coffee Table",
    price: 129.99,
    description: "Sleek modern coffee table with tempered glass top and wooden legs, perfect for any living room.",
    category: "furniture",
    image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.4, count: 63 }
  },
  {
    id: 6,
    title: "Professional Chef Knife Set",
    price: 79.99,
    description: "High-quality stainless steel knife set for professional and home chefs alike.",
    category: "home",
    image: "https://images.pexels.com/photos/4226864/pexels-photo-4226864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.9, count: 42 }
  },
  {
    id: 7,
    title: "Fitness Smartwatch",
    price: 199.99,
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and water resistance.",
    category: "electronics",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.5, count: 118 }
  },
  {
    id: 8,
    title: "Women's Running Shoes",
    price: 89.99,
    description: "Lightweight and comfortable running shoes with responsive cushioning for maximum performance.",
    category: "clothing",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.2, count: 87 }
  },
  {
    id: 9,
    title: "Ergonomic Office Chair",
    price: 159.99,
    description: "Comfortable ergonomic office chair with adjustable height, lumbar support, and breathable mesh back.",
    category: "furniture",
    image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.6, count: 54 }
  },
  {
    id: 10,
    title: "Wireless Bluetooth Speaker",
    price: 69.99,
    description: "Portable Bluetooth speaker with rich sound, 12-hour battery life, and water resistance for outdoor use.",
    category: "electronics",
    image: "https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.4, count: 93 }
  },
  {
    id: 11,
    title: "Stainless Steel Water Bottle",
    price: 24.99,
    description: "Vacuum insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    category: "home",
    image: "https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.8, count: 76 }
  },
  {
    id: 12,
    title: "Designer Sunglasses",
    price: 129.99,
    description: "Classic designer sunglasses with UV protection and durable frame.",
    category: "clothing",
    image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.3, count: 31 }
  },
  {
    id: 13,
    title: "Digital SLR Camera",
    price: 699.99,
    description: "Professional digital SLR camera with 24.2MP sensor, 4K video recording, and interchangeable lenses.",
    category: "electronics",
    image: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.9, count: 49 }
  },
  {
    id: 14,
    title: "Modern Bookshelf",
    price: 149.99,
    description: "Contemporary bookshelf with multiple compartments, perfect for displaying books and decorative items.",
    category: "furniture",
    image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.5, count: 28 }
  },
  {
    id: 15,
    title: "Premium Yoga Mat",
    price: 49.99,
    description: "Eco-friendly, non-slip yoga mat with optimal cushioning for comfortable practice.",
    category: "sports",
    image: "https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.7, count: 64 }
  },
  {
    id: 16,
    title: "Men's Leather Wallet",
    price: 39.99,
    description: "Genuine leather wallet with multiple card slots and RFID protection.",
    category: "clothing",
    image: "https://images.pexels.com/photos/2442888/pexels-photo-2442888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.4, count: 57 }
  },
  {
    id: 17,
    title: "Portable External SSD - 1TB",
    price: 159.99,
    description: "Fast, compact 1TB external SSD with USB-C connectivity for quick file transfers.",
    category: "electronics",
    image: "https://images.pexels.com/photos/47344/dollar-currency-money-us-dollar-47344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.8, count: 38 }
  },
  {
    id: 18,
    title: "Dining Table Set",
    price: 499.99,
    description: "Elegant dining table set with table and four chairs, perfect for family meals.",
    category: "furniture",
    image: "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.6, count: 22 }
  },
  {
    id: 19,
    title: "Essential Oil Diffuser",
    price: 34.99,
    description: "Ultrasonic essential oil diffuser with 7 LED light colors and auto shut-off feature.",
    category: "home",
    image: "https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.3, count: 71 }
  },
  {
    id: 20,
    title: "Wireless Gaming Mouse",
    price: 79.99,
    description: "High-precision wireless gaming mouse with customizable RGB lighting and programmable buttons.",
    category: "electronics",
    image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: { rate: 4.5, count: 83 }
  }
];

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, DELAY));
  return MOCK_PRODUCTS;
};

// Fetch a single product by ID
export const fetchProductById = async (id: number): Promise<Product> => {
  await new Promise(resolve => setTimeout(resolve, DELAY));
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  return product;
};

// Fetch products by category
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, DELAY));
  
  if (category.toLowerCase() === 'all') {
    return MOCK_PRODUCTS;
  }
  
  return MOCK_PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
};

// Search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, DELAY));
  
  const searchTerm = query.toLowerCase();
  return MOCK_PRODUCTS.filter(
    p => p.title.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm)
  );
};

// Get featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, DELAY));
  
  // Return top rated products as featured
  return [...MOCK_PRODUCTS]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 6);
};

// Get product categories
export const getCategories = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, DELAY));
  
  const categories = new Set(MOCK_PRODUCTS.map(p => p.category));
  return Array.from(categories);
};