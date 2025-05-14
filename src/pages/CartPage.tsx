import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Trash, ArrowRight, ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { RootState } from '../store';
import { 
  removeFromCart, 
  updateCartItemQuantity, 
  clearCart 
} from '../store/slices/cartSlice';

function CartPage() {
  const { items } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  };
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
    }
  };
  
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  
  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };
  
  // Calculate cart summary
  const subtotal = items.reduce((total, item) => 
    total + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;
  
  // Empty cart
  if (items.length === 0) {
    return (
      <div className="container py-16">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <ShoppingCart size={64} className="mx-auto text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products" className="btn btn-primary px-8 py-3">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 lg:mb-0">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {items.length} Item{items.length !== 1 ? 's' : ''}
                </h2>
                <button 
                  onClick={handleClearCart}
                  className="text-sm text-red-600 hover:text-red-800 flex items-center"
                >
                  <X size={16} className="mr-1" />
                  Clear Cart
                </button>
              </div>
              
              <div className="divide-y">
                {items.map((item) => (
                  <motion.div 
                    key={item.product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-6 flex flex-col sm:flex-row"
                  >
                    <div className="sm:flex-shrink-0 mb-4 sm:mb-0">
                      <Link to={`/product/${item.product.id}`}>
                        <img 
                          src={item.product.image} 
                          alt={item.product.title} 
                          className="w-24 h-24 object-contain bg-gray-100 rounded-md mx-auto sm:mx-0"
                        />
                      </Link>
                    </div>
                    
                    <div className="sm:ml-6 flex-1">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div>
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="text-lg font-medium text-gray-900 hover:text-primary-600"
                          >
                            {item.product.title}
                          </Link>
                          <p className="mt-1 text-sm text-gray-500 capitalize">
                            Category: {item.product.category}
                          </p>
                        </div>
                        
                        <div className="mt-2 sm:mt-0 flex items-center">
                          <span className="text-lg font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="flex items-center border rounded-md">
                          <button 
                            className="p-2 text-gray-600 hover:text-gray-800"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-2">{item.quantity}</span>
                          <button 
                            className="p-2 text-gray-600 hover:text-gray-800"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="mt-2 sm:mt-0 flex items-center text-red-600 hover:text-red-800"
                          aria-label="Remove item"
                        >
                          <Trash size={18} className="mr-1" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    'Free'
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold text-primary-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <button 
                onClick={handleCheckout}
                className="btn btn-primary w-full py-3 flex items-center justify-center"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              <Link 
                to="/products" 
                className="btn btn-outline w-full"
              >
                Continue Shopping
              </Link>
            </div>
            
            <div className="mt-8 text-sm text-gray-500">
              <p className="mb-2">We accept:</p>
              <div className="flex space-x-2">
                <div className="h-6 w-10 bg-gray-200 rounded"></div>
                <div className="h-6 w-10 bg-gray-200 rounded"></div>
                <div className="h-6 w-10 bg-gray-200 rounded"></div>
                <div className="h-6 w-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;