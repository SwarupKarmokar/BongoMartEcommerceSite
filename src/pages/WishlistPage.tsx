import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import { removeFromWishlist, clearWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import { Product } from '../types';

function WishlistPage() {
  const { items } = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (productId: number) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Heart size={64} className="mx-auto text-gray-400 mb-6" />
          <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">
            Start adding items you love to your wishlist!
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <button
          onClick={handleClearWishlist}
          className="btn btn-outline flex items-center"
        >
          <Trash size={18} className="mr-2" />
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Link to={`/product/${product.id}`} className="block relative pt-[100%]">
              <img
                src={product.image}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
            </Link>

            <div className="p-4">
              <Link
                to={`/product/${product.id}`}
                className="text-lg font-medium text-gray-900 hover:text-primary-600 line-clamp-2 mb-2"
              >
                {product.title}
              </Link>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-1">
                    ({product.rating.count})
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-primary flex-1 py-2"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="btn btn-outline py-2"
                  aria-label="Remove from wishlist"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;