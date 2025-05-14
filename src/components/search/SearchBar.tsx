import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search as SearchIcon } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { searchProducts } from '../../api/products';
import { Product } from '../../types';

interface SearchBarProps {
  onClose: () => void;
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const debouncedQuery = useDebounce(query, 300);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  useEffect(() => {
    if (debouncedQuery.length > 2) {
      setIsLoading(true);
      searchProducts(debouncedQuery)
        .then(data => {
          setResults(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Search error:', error);
          setIsLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      onClose();
    }
  };
  
  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
    onClose();
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Search Products</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="input w-full pl-10"
          />
          <SearchIcon 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
        </div>
      </form>
      
      {isLoading ? (
        <div className="py-4 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      ) : (
        <div>
          {debouncedQuery.length > 2 && (
            <p className="text-sm text-gray-500 mb-2">
              {results.length === 0
                ? 'No products found'
                : `Found ${results.length} result${results.length === 1 ? '' : 's'}`}
            </p>
          )}
          
          <ul className="divide-y">
            {results.map(product => (
              <li key={product.id} className="py-2">
                <button
                  onClick={() => handleProductClick(product.id)}
                  className="flex items-center w-full text-left hover:bg-gray-50 p-2 rounded"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium line-clamp-1">{product.title}</p>
                    <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {query.length > 2 && results.length > 0 && (
        <button
          onClick={() => {
            navigate(`/products?search=${encodeURIComponent(query)}`);
            onClose();
          }}
          className="mt-4 w-full btn btn-outline"
        >
          View all results
        </button>
      )}
    </div>
  );
}