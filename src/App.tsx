import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthState } from './store/slices/authSlice';
import { fetchCart } from './store/slices/cartSlice';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import WishlistPage from './pages/WishlistPage';

// Lazy loaded components
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderConfirmationPage = lazy(() => import('./pages/OrderConfirmationPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const UserDashboardPage = lazy(() => import('./pages/UserDashboardPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(checkAuthState());
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={<div className="flex items-center justify-center h-[calc(100vh-80px)]"><LoadingSpinner /></div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/category/:categoryId" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } />
          <Route path="/order-confirmation/:orderId" element={
            <ProtectedRoute>
              <OrderConfirmationPage />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <UserDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;