import { Order, OrderItem } from '../types';
import { CartItem } from '../types';

// Simulated API call delays
const DELAY = 800;

// Mock orders
const MOCK_ORDERS: Order[] = [
  {
    id: '1001',
    userId: 1,
    date: '2025-03-15T10:30:00Z',
    status: 'delivered',
    total: 329.98,
    items: [
      {
        productId: 1,
        quantity: 1,
        price: 149.99,
        productTitle: 'Premium Wireless Headphones',
        productImage: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        productId: 6,
        quantity: 1,
        price: 79.99,
        productTitle: 'Professional Chef Knife Set',
        productImage: 'https://images.pexels.com/photos/4226864/pexels-photo-4226864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        productId: 11,
        quantity: 4,
        price: 24.99,
        productTitle: 'Stainless Steel Water Bottle',
        productImage: 'https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA'
    }
  },
  {
    id: '1002',
    userId: 1,
    date: '2025-04-02T14:45:00Z',
    status: 'shipped',
    total: 249.97,
    items: [
      {
        productId: 8,
        quantity: 1,
        price: 89.99,
        productTitle: 'Women\'s Running Shoes',
        productImage: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        productId: 12,
        quantity: 1,
        price: 129.99,
        productTitle: 'Designer Sunglasses',
        productImage: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        productId: 19,
        quantity: 1,
        price: 34.99,
        productTitle: 'Essential Oil Diffuser',
        productImage: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA'
    }
  },
  {
    id: '1003',
    userId: 1,
    date: '2025-04-18T09:15:00Z',
    status: 'processing',
    total: 699.99,
    items: [
      {
        productId: 13,
        quantity: 1,
        price: 699.99,
        productTitle: 'Digital SLR Camera',
        productImage: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA'
    }
  }
];

// Fetch user orders
export const fetchUserOrders = async (userId: number): Promise<Order[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, DELAY));
  
  return MOCK_ORDERS.filter(order => order.userId === userId);
};

// Fetch order by ID
export const fetchOrderById = async (orderId: string): Promise<Order | null> => {
  await new Promise(resolve => setTimeout(resolve, DELAY));
  
  return MOCK_ORDERS.find(order => order.id === orderId) || null;
};

// Create a new order
export const createOrder = async (
  userId: number,
  items: CartItem[],
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }
): Promise<Order> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, DELAY));
  
  // Calculate total
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  // Create order items
  const orderItems: OrderItem[] = items.map(item => ({
    productId: item.product.id,
    quantity: item.quantity,
    price: item.product.price,
    productTitle: item.product.title,
    productImage: item.product.image,
  }));
  
  // Generate order ID (in a real app this would be done by the backend)
  const newOrderId = `${1000 + MOCK_ORDERS.length + 1}`;
  
  // Create new order
  const newOrder: Order = {
    id: newOrderId,
    userId,
    date: new Date().toISOString(),
    status: 'pending',
    total,
    items: orderItems,
    shippingAddress,
  };
  
  // In a real app, this would be saved to a database
  MOCK_ORDERS.push(newOrder);
  
  return newOrder;
};