import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, ShoppingBag, Menu, X, User, Heart, Home, Package, LogOut } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import { SearchBar } from '../search/SearchBar';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    navigate('/');
  };
  
  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container py-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button 
            className="p-2 md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Package className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold tracking-tight">BongoMart</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium hover:text-primary-600 transition-colors">
              All Products
            </Link>
            <Link to="/products/category/electronics" className="text-sm font-medium hover:text-primary-600 transition-colors">
              Electronics
            </Link>
            <Link to="/products/category/clothing" className="text-sm font-medium hover:text-primary-600 transition-colors">
              Clothing
            </Link>
            <Link to="/products/category/furniture" className="text-sm font-medium hover:text-primary-600 transition-colors">
              Furniture
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-500 hover:text-primary-600 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 text-gray-500 hover:text-primary-600 transition-colors flex items-center"
                  aria-label="User menu"
                >
                  <User size={20} />
                  <span className="hidden md:block ml-2 text-sm font-medium">
                    {user?.name ? user.name.split(' ')[0] : 'Account'}
                  </span>
                </button>
                
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg"
                    >
                      <Link 
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User size={16} className="mr-2" />
                        <span>Dashboard</span>
                      </Link>
                      <Link 
                        to="/dashboard/orders"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package size={16} className="mr-2" />
                        <span>My Orders</span>
                      </Link>
                      <Link 
                        to="/dashboard/favorites"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Heart size={16} className="mr-2" />
                        <span>Favorites</span>
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                      >
                        <LogOut size={16} className="mr-2" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <nav className="flex flex-col space-y-4 py-4">
                <Link 
                  to="/" 
                  className="flex items-center text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home size={16} className="mr-2" />
                  <span>Home</span>
                </Link>
                <Link 
                  to="/products" 
                  className="flex items-center text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package size={16} className="mr-2" />
                  <span>All Products</span>
                </Link>
                <Link 
                  to="/products/category/electronics" 
                  className="text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Electronics
                </Link>
                <Link 
                  to="/products/category/clothing" 
                  className="text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Clothing
                </Link>
                <Link 
                  to="/products/category/furniture" 
                  className="text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Furniture
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4"
            >
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}