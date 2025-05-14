import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Share, 
  ChevronLeft, 
  ChevronRight,
  StarIcon,
  Truck,
  ShieldCheck
} from 'lucide-react';
import { fetchProductById } from '../api/products';
import { addToCart } from '../store/slices/cartSlice';
import { Product } from '../types';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch product data
  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        const productId = parseInt(id || '0');
        const productData = await fetchProductById(productId);
        setProduct(productData);
        setError(null);
      } catch (err) {
        setError('Failed to load product information');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    getProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity }));
    }
  };
  
  // Mock additional product images
  const productImages = product
    ? [
        product.image,
        product.image,
        product.image,
        product.image,
        // `https://source.unsplash.com/random/400x400/?${product.category}`,
        // `https://source.unsplash.com/random/400x400/?product`,
        // `https://source.unsplash.com/random/400x400/?${product.category}2`,
      ]
    : [];
  
  if (isLoading) {
    return (
      <div className="container py-16 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Product not found'}
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the product you're looking for.
          </p>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <nav className="text-sm">
          <ol className="flex items-center flex-wrap">
            <li>
              <Link to="/" className="text-gray-500 hover:text-primary-600">
                Home
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-primary-600">
                Products
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link 
                to={`/products/category/${product.category}`} 
                className="text-gray-500 hover:text-primary-600 capitalize"
              >
                {product.category}
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-900 font-medium line-clamp-1">{product.title}</li>
          </ol>
        </nav>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product Images */}
          <div className="md:w-1/2 p-6">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img 
                src={productImages[activeImageIndex]} 
                alt={product.title} 
                className="w-full h-[400px] object-contain"
              />
              
              {/* Navigation arrows */}
              {productImages.length > 1 && (
                <>
                  <button 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                    onClick={() => setActiveImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))}
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail images */}
            <div className="flex space-x-2">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`rounded-md overflow-hidden w-20 h-20 border-2 ${
                    activeImageIndex === idx ? 'border-primary-500' : 'border-transparent'
                  }`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img 
                    src={img} 
                    alt={`${product.title} thumbnail ${idx + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2 p-6">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating.rate) ? 'fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
              
              <div className="text-3xl font-bold text-gray-900 mb-4">
                ${product.price.toFixed(2)}
              </div>
              
              <p className="text-gray-700 mb-6">
                {product.description}
              </p>
              
              <div className="flex flex-col space-y-4 mb-6">
                <div className="flex items-center text-sm text-gray-700">
                  <Truck className="w-5 h-5 mr-2 text-green-600" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <ShieldCheck className="w-5 h-5 mr-2 text-green-600" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <span className="text-gray-700 mr-4">Quantity</span>
                <div className="flex items-center border rounded-md">
                  <button 
                    className="px-3 py-1 border-r"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button 
                    className="px-3 py-1 border-l"
                    onClick={() => setQuantity(q => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary flex-1 py-3"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </motion.button>
                
                <button className="btn btn-outline flex-1 py-3">
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Wishlist
                </button>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Category:</span>
                <Link 
                  to={`/products/category/${product.category}`}
                  className="text-primary-600 hover:text-primary-700 capitalize"
                >
                  {product.category}
                </Link>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Share:</span>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-primary-600" aria-label="Share on Facebook">
                    <Share size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;