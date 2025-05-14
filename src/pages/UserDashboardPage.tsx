import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Package, 
  User, 
  MapPin, 
  CreditCard, 
  Heart, 
  LogOut,
  ChevronRight,
  Edit,
  Plus
} from 'lucide-react';
import { RootState } from '../store';
import { fetchUserOrders } from '../api/orders';
import { Order } from '../types';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

function UserDashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadOrders = async () => {
      try {
        if (user) {
          const userOrders = await fetchUserOrders(user.id);
          setOrders(userOrders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadOrders();
  }, [user]);
  
  // Dashboard Overview Component
  const DashboardOverview = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-primary-600" />
              </div>
              <span className="text-sm text-gray-500">Orders</span>
            </div>
            <p className="text-2xl font-bold">{orders.length}</p>
            <p className="text-sm text-gray-500">Total Orders</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-secondary-100 p-3 rounded-full">
                <Heart className="h-6 w-6 text-secondary-600" />
              </div>
              <span className="text-sm text-gray-500">Wishlist</span>
            </div>
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-gray-500">Saved Items</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-accent-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-accent-600" />
              </div>
              <span className="text-sm text-gray-500">Addresses</span>
            </div>
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-gray-500">Saved Addresses</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Payment Methods</span>
            </div>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-gray-500">Saved Cards</p>
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
            <Link 
              to="/dashboard/orders" 
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          
          {isLoading ? (
            <LoadingSpinner />
          ) : orders.length > 0 ? (
            <div className="divide-y">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No orders found</p>
          )}
        </div>
        
        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-6">Account Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium">Personal Information</p>
                  <p className="text-sm text-gray-500">Update your personal details</p>
                </div>
              </div>
              <Link 
                to="/dashboard/profile" 
                className="text-primary-600 hover:text-primary-700"
              >
                <Edit size={18} />
              </Link>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium">Addresses</p>
                  <p className="text-sm text-gray-500">Manage your shipping addresses</p>
                </div>
              </div>
              <Link 
                to="/dashboard/addresses" 
                className="text-primary-600 hover:text-primary-700"
              >
                <Edit size={18} />
              </Link>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium">Payment Methods</p>
                  <p className="text-sm text-gray-500">Manage your payment options</p>
                </div>
              </div>
              <Link 
                to="/dashboard/payment" 
                className="text-primary-600 hover:text-primary-700"
              >
                <Edit size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Orders List Component
  const OrdersList = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Order #{order.id}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 text-right">
                      <p className="font-semibold text-lg">
                        ${order.total.toFixed(2)}
                      </p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t border-b py-4 my-4">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.productId} className="flex items-center">
                          <img 
                            src={item.productImage} 
                            alt={item.productTitle} 
                            className="w-16 h-16 object-contain bg-gray-100 rounded-md"
                          />
                          <div className="ml-4 flex-1">
                            <p className="font-medium">{item.productTitle}</p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="font-medium">
                            ${(item.quantity * item.price).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Shipped to:</p>
                      <p className="font-medium">{order.shippingAddress.name}</p>
                      <p className="text-sm text-gray-500">
                        {order.shippingAddress.street}, {order.shippingAddress.city}
                      </p>
                    </div>
                    <Link 
                      to={`/order-confirmation/${order.id}`}
                      className="btn btn-outline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
            <p className="text-gray-500 mb-4">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    );
  };
  
  // Profile Settings Component
  const ProfileSettings = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={40} className="text-gray-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">{user?.name}</h3>
                <p className="text-gray-500">{user?.email}</p>
              </div>
            </div>
            
            <button className="btn btn-outline">
              Change Profile Picture
            </button>
          </div>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input 
                  type="text" 
                  className="input w-full"
                  defaultValue={user?.name?.split(' ')[0]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input 
                  type="text" 
                  className="input w-full"
                  defaultValue={user?.name?.split(' ')[1]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  className="input w-full"
                  defaultValue={user?.email}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  className="input w-full"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Change Password</h4>
              <div className="space-y-4">
                <input 
                  type="password" 
                  className="input w-full"
                  placeholder="Current Password"
                />
                <input 
                  type="password" 
                  className="input w-full"
                  placeholder="New Password"
                />
                <input 
                  type="password" 
                  className="input w-full"
                  placeholder="Confirm New Password"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button type="button" className="btn btn-outline">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  // Addresses Component
  const Addresses = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">My Addresses</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mb-2">
                  Default
                </span>
                <h3 className="font-medium">Home</h3>
              </div>
              <button className="text-gray-400 hover:text-gray-500">
                <Edit size={18} />
              </button>
            </div>
            
            <div className="text-gray-500">
              <p>John Doe</p>
              <p>123 Main Street</p>
              <p>San Francisco, CA 94105</p>
              <p>United States</p>
              <p className="mt-2">+1 (555) 123-4567</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">Office</h3>
              </div>
              <button className="text-gray-400 hover:text-gray-500">
                <Edit size={18} />
              </button>
            </div>
            
            <div className="text-gray-500">
              <p>John Doe</p>
              <p>456 Market Street</p>
              <p>San Francisco, CA 94105</p>
              <p>United States</p>
              <p className="mt-2">+1 (555) 987-6543</p>
            </div>
          </div>
          
          <button className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 transition-colors">
            <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <span className="font-medium text-gray-900">Add New Address</span>
          </button>
        </div>
      </div>
    );
  };
  
  // Payment Methods Component
  const PaymentMethods = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mb-2">
                  Default
                </span>
                <h3 className="font-medium">Visa ending in 4242</h3>
              </div>
              <button className="text-gray-400 hover:text-gray-500">
                <Edit size={18} />
              </button>
            </div>
            
            <div className="text-gray-500">
              <p>John Doe</p>
              <p>Expires 12/25</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">Mastercard ending in 8888</h3>
              </div>
              <button className="text-gray-400 hover:text-gray-500">
                <Edit size={18} />
              </button>
            </div>
            
            <div className="text-gray-500">
              <p>John Doe</p>
              <p>Expires 08/24</p>
            </div>
          </div>
          
          <button className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 transition-colors">
            <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <span className="font-medium text-gray-900">Add New Card</span>
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container py-8">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 lg:mb-0">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-3">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50"
              >
                <User className="mr-3 h-5 w-5 text-gray-400" />
                Dashboard
              </Link>
              
              <Link
                to="/dashboard/orders"
                className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50"
              >
                <Package className="mr-3 h-5 w-5 text-gray-400" />
                Orders
              </Link>
              
              <Link
                to="/dashboard/addresses"
                className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50"
              >
                <MapPin className="mr-3 h-5 w-5 text-gray-400" />
                Addresses
              </Link>
              
              <Link
                to="/dashboard/payment"
                className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50"
              >
                <CreditCard className="mr-3 h-5 w-5 text-gray-400" />
                Payment Methods
              </Link>
              
              <Link
                to="/dashboard/profile"
                className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50"
              >
                <User className="mr-3 h-5 w-5 text-gray-400" />
                Profile Settings
              </Link>
            </nav>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="lg:col-span-3">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="orders" element={<OrdersList />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="payment" element={<PaymentMethods />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default UserDashboardPage;