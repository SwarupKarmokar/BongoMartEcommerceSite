import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';
import { addToCart } from '../../store/slices/cartSlice';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
  };
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
          <div className="relative pt-[100%] bg-gray-100">
            <img 
              src={product.image} 
              alt={product.title} 
              className="absolute inset-0 w-full h-full object-contain p-4"
            />
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              <button 
                onClick={handleAddToCart}
                className="p-2 bg-white rounded-full shadow-md hover:bg-primary-50 transition-colors text-gray-700 hover:text-primary-600"
                aria-label="Add to cart"
              >
                <ShoppingCart size={18} />
              </button>
              <button 
                className="p-2 bg-white rounded-full shadow-md hover:bg-primary-50 transition-colors text-gray-700 hover:text-primary-600"
                aria-label="Add to favorites"
              >
                <Heart size={18} />
              </button>
            </div>
          </div>
          
          <div className="p-4 flex-grow flex flex-col">
            <div className="flex-grow">
              <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.title}</h3>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">
                  ({product.rating.count})
                </span>
              </div>
            </div>
            
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xl font-semibold">${product.price.toFixed(2)}</span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                In Stock
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}