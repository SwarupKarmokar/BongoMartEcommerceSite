import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getFeaturedProducts, getCategories } from '../api/products';
import { Product } from '../types';
import { ProductCard } from '../components/products/ProductCard';
import { ChevronRight, ShoppingBag } from 'lucide-react';

export function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getFeaturedProducts(),
          getCategories()
        ]);
        
        setFeaturedProducts(productsData);
        setCategories(categoriesData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching home page data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Hero section animation variants
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  // Category images mapping
  const categoryImages: Record<string, string> = {
    electronics: "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    clothing: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    furniture: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    home: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    sports: "https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    jewelery: "https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  };
  
  return (
    <div>
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="container py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                variants={itemVariants}
              >
                Shop the Latest Trends
              </motion.h1>
              <motion.p 
                className="text-lg mb-8 text-gray-300"
                variants={itemVariants}
              >
                Discover premium products at amazing prices with free shipping on all orders.
              </motion.p>
              <motion.div variants={itemVariants}>
                <Link 
                  to="/products" 
                  className="btn bg-white text-gray-900 hover:bg-gray-200 px-6 py-3 rounded-md font-semibold inline-flex items-center"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                </Link>
              </motion.div>
            </div>
            <motion.div 
              className="hidden md:block"
              variants={itemVariants}
            >
              <img 
                src="https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Shopping" 
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path 
              fill="#f9fafb" 
              fillOpacity="1" 
              d="M0,96L48,106.7C96,117,192,139,288,144C384,149,480,139,576,122.7C672,107,768,85,864,96C960,107,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            </path>
          </svg>
        </div>
      </motion.section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our wide selection of carefully curated products across various categories.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category} 
                to={`/products/category/${category}`} 
                className="group"
              >
                <motion.div 
                  className="relative rounded-lg overflow-hidden bg-white shadow-md h-48 md:h-64"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                  <img 
                    src={categoryImages[category] || "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
                    alt={category} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-semibold capitalize">{category}</h3>
                    <span className="text-sm flex items-center mt-1 group-hover:translate-x-2 transition-transform">
                      Shop now <ChevronRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-gray-600 mt-2">
                Handpicked products that our customers love.
              </p>
            </div>
            <Link 
              to="/products" 
              className="text-primary-600 font-medium flex items-center hover:text-primary-700"
            >
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Special Offer</h2>
            <p className="text-xl mb-8">
              Get 20% off on your first order! Use code: <span className="font-bold">WELCOME20</span>
            </p>
            <Link 
              to="/products" 
              className="btn bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Read what our customers have to say about their shopping experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "The quality of the products exceeded my expectations. Shipping was fast and the packaging was excellent. Highly recommend!"
              </p>
              <div className="font-medium">Sarah J.</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Customer service was amazing! They helped me find the perfect product and were very responsive to all my questions."
              </p>
              <div className="font-medium">Michael T.</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "I've been shopping here for years and have always been impressed with the quality and selection. My go-to store for all my needs."
              </p>
              <div className="font-medium">Emily R.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}