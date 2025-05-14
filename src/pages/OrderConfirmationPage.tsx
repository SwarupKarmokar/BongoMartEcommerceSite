import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowLeft, Home, User } from 'lucide-react';
import { fetchOrderById } from '../api/orders';
import { Order } from '../types';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const getOrder = async () => {
      try {
        if (orderId) {
          const data = await fetchOrderById(orderId);
          setOrder(data);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getOrder();
  }, [orderId]);
  
  if (isLoading) {
    return (
      <div className="container py-16 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="container py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Order Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the order you're looking for.
          </p>
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }
  
  // Format order date
  const orderDate = new Date(order.date);
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary-600 text-white p-6 text-center">
            <CheckCircle size={50} className="mx-auto mb-4" />
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Thank You for Your Order!</h1>
            <p className="text-primary-100">
              Your order has been placed successfully.
            </p>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <p className="text-gray-600">Order Number:</p>
                <p className="text-xl font-semibold">#{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Order Date:</p>
                <p className="font-medium">{formattedDate}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Order Details</h3>
              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.productId} className="py-4 flex">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0">
                      <img 
                        src={item.productImage} 
                        alt={item.productTitle} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="font-medium">{item.productTitle}</p>
                      <div className="flex justify-between mt-1">
                        <p className="text-gray-600">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                        <p className="font-medium">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium flex items-center mb-3">
                  <Package size={18} className="mr-2" />
                  Shipping Address
                </h3>
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${(order.total * 0.92).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>
                      {order.total > 50 ? 'Free' : '$10.00'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${(order.total * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold">
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-8">
              <h3 className="font-medium text-yellow-800 mb-2">
                What's Next?
              </h3>
              <p className="text-yellow-700 text-sm">
                You will receive an email confirmation with your order details and tracking information once your order ships.
                You can also check the status of your order in the Orders section of your account dashboard.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <Link 
                to="/" 
                className="btn btn-outline mb-3 sm:mb-0 flex items-center justify-center"
              >
                <Home size={18} className="mr-2" />
                Continue Shopping
              </Link>
              <Link 
                to="/dashboard/orders" 
                className="btn btn-primary flex items-center justify-center"
              >
                <User size={18} className="mr-2" />
                View My Orders
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default OrderConfirmationPage;