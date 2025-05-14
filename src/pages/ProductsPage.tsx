import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, Check, X } from 'lucide-react';
import { ProductCard } from '../components/products/ProductCard';
import { RootState } from '../store';
import { getProducts, getProductsByCategory, setFilters, clearFilters } from '../store/slices/productsSlice';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

function ProductsPage() {
  const dispatch = useDispatch();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const { filteredItems, isLoading, filters } = useSelector((state: RootState) => state.products);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // When component mounts or category/search changes
  useEffect(() => {
    if (categoryId) {
      dispatch(getProductsByCategory(categoryId));
    } else {
      dispatch(getProducts());
      if (searchQuery) {
        dispatch(setFilters({ searchQuery }));
      }
    }
  }, [dispatch, categoryId, searchQuery]);
  
  const handlePriceRangeChange = (minPrice: number | null, maxPrice: number | null) => {
    dispatch(setFilters({ minPrice, maxPrice }));
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilters({ sortBy: e.target.value as any }));
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">
        {categoryId 
          ? `${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Products`
          : searchQuery
            ? `Search Results for "${searchQuery}"`
            : 'All Products'
        }
      </h1>
      
      <div className="md:grid md:grid-cols-4 md:gap-8">
        {/* Mobile Filters Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="w-full flex items-center justify-between bg-white p-3 border rounded-md"
          >
            <span className="flex items-center">
              <Filter size={18} className="mr-2" />
              Filters
            </span>
            <SlidersHorizontal size={18} />
          </button>
        </div>
        
        {/* Sidebar Filters */}
        <motion.aside
          className={`bg-white rounded-lg shadow-md p-6 mb-6 md:mb-0 ${
            isMobileFilterOpen ? 'block' : 'hidden md:block'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => dispatch(clearFilters())}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Clear All
            </button>
          </div>
          
          {/* Price Range */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="price-all"
                  name="price-range"
                  className="mr-2"
                  checked={filters.minPrice === null && filters.maxPrice === null}
                  onChange={() => handlePriceRangeChange(null, null)}
                />
                <label htmlFor="price-all">All Prices</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="price-under-50"
                  name="price-range"
                  className="mr-2"
                  checked={filters.maxPrice === 50}
                  onChange={() => handlePriceRangeChange(0, 50)}
                />
                <label htmlFor="price-under-50">Under $50</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="price-50-100"
                  name="price-range"
                  className="mr-2"
                  checked={filters.minPrice === 50 && filters.maxPrice === 100}
                  onChange={() => handlePriceRangeChange(50, 100)}
                />
                <label htmlFor="price-50-100">$50 - $100</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="price-100-200"
                  name="price-range"
                  className="mr-2"
                  checked={filters.minPrice === 100 && filters.maxPrice === 200}
                  onChange={() => handlePriceRangeChange(100, 200)}
                />
                <label htmlFor="price-100-200">$100 - $200</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="price-over-200"
                  name="price-range"
                  className="mr-2"
                  checked={filters.minPrice === 200 && filters.maxPrice === null}
                  onChange={() => handlePriceRangeChange(200, null)}
                />
                <label htmlFor="price-over-200">Over $200</label>
              </div>
            </div>
          </div>
          
          {/* Rating */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`rating-${rating}`}
                    className="mr-2"
                  />
                  <label htmlFor={`rating-${rating}`} className="flex items-center">
                    <div className="flex text-yellow-400 mr-1">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    & Up
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Applied Filters */}
          {(filters.minPrice !== null || filters.maxPrice !== null || filters.searchQuery) && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-3">Applied Filters</h3>
              <div className="flex flex-wrap gap-2">
                {filters.minPrice !== null && filters.maxPrice !== null && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100">
                    ${filters.minPrice} - ${filters.maxPrice}
                    <button
                      onClick={() => handlePriceRangeChange(null, null)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                {filters.minPrice !== null && filters.maxPrice === null && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100">
                    Over ${filters.minPrice}
                    <button
                      onClick={() => handlePriceRangeChange(null, null)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                {filters.minPrice === null && filters.maxPrice !== null && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100">
                    Under ${filters.maxPrice}
                    <button
                      onClick={() => handlePriceRangeChange(null, null)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                {filters.searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100">
                    Search: {filters.searchQuery}
                    <button
                      onClick={() => dispatch(setFilters({ searchQuery: '' }))}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </motion.aside>
        
        {/* Product Grid */}
        <div className="md:col-span-3">
          {/* Sort and Result Count */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="mb-3 sm:mb-0">
              Showing <span className="font-medium">{filteredItems.length}</span> products
            </p>
            
            <div className="flex items-center">
              <label htmlFor="sort-by" className="mr-2 text-sm text-gray-600">
                Sort by:
              </label>
              <select
                id="sort-by"
                className="input py-1"
                value={filters.sortBy}
                onChange={handleSortChange}
              >
                <option value="default">Featured</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
                <option value="rating">Best Rating</option>
              </select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search criteria.
              </p>
              <button
                onClick={() => dispatch(clearFilters())}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;