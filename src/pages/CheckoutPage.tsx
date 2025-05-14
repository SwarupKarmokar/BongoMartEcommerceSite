import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { CheckCircle, CreditCard, Truck, ChevronsRight } from 'lucide-react';
import { RootState } from '../store';
import { createOrder } from '../api/orders';
import { clearCart } from '../store/slices/cartSlice';

function CheckoutPage() {
  const { items } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });
  
  // Calculate order summary
  const subtotal = items.reduce((total, item) => 
    total + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep(2);
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep(3);
    window.scrollTo(0, 0);
  };
  
  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Generate full name from first and last name
      const fullName = `${shippingInfo.firstName} ${shippingInfo.lastName}`;
      
      // Create full address
      const fullAddress = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}, ${shippingInfo.country}`;
      
      // Create order
      const order = await createOrder(
        user?.id || 1,
        items,
        {
          name: fullName,
          street: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
          country: shippingInfo.country,
        }
      );
      
      // Clear cart
      dispatch(clearCart());
      
      // Navigate to order confirmation page
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            checkoutStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {checkoutStep > 1 ? <CheckCircle size={20} /> : 1}
          </div>
          <div className={`h-1 flex-1 mx-2 ${
            checkoutStep > 1 ? 'bg-primary-600' : 'bg-gray-200'
          }`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            checkoutStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {checkoutStep > 2 ? <CheckCircle size={20} /> : 2}
          </div>
          <div className={`h-1 flex-1 mx-2 ${
            checkoutStep > 2 ? 'bg-primary-600' : 'bg-gray-200'
          }`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            checkoutStep >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={checkoutStep >= 1 ? 'text-primary-600 font-medium' : 'text-gray-500'}>
            Shipping
          </span>
          <span className={checkoutStep >= 2 ? 'text-primary-600 font-medium' : 'text-gray-500'}>
            Payment
          </span>
          <span className={checkoutStep >= 3 ? 'text-primary-600 font-medium' : 'text-gray-500'}>
            Review
          </span>
        </div>
      </div>
      
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            {/* Step 1: Shipping Information */}
            {checkoutStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className="flex items-center mb-6">
                  <Truck className="h-6 w-6 text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold">Shipping Information</h2>
                </div>
                
                <form onSubmit={handleShippingSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        className="input w-full"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        className="input w-full"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="input w-full"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address*
                      </label>
                      <input
                        type="text"
                        id="address"
                        required
                        className="input w-full"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City*
                      </label>
                      <input
                        type="text"
                        id="city"
                        required
                        className="input w-full"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province*
                      </label>
                      <input
                        type="text"
                        id="state"
                        required
                        className="input w-full"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP/Postal Code*
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        required
                        className="input w-full"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country*
                      </label>
                      <select
                        id="country"
                        required
                        className="input w-full"
                        value={shippingInfo.country}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="btn btn-primary w-full sm:w-auto"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {/* Step 2: Payment Information */}
            {checkoutStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className="flex items-center mb-6">
                  <CreditCard className="h-6 w-6 text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold">Payment Information</h2>
                </div>
                
                <form onSubmit={handlePaymentSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card*
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        required
                        className="input w-full"
                        value={paymentInfo.cardName}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number*
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        required
                        placeholder="**** **** **** ****"
                        maxLength={19}
                        className="input w-full"
                        value={paymentInfo.cardNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiration Date*
                        </label>
                        <input
                          type="text"
                          id="expDate"
                          required
                          placeholder="MM/YY"
                          maxLength={5}
                          className="input w-full"
                          value={paymentInfo.expDate}
                          onChange={(e) => {
                            let value = e.target.value;
                            if (value.length === 2 && paymentInfo.expDate.length === 1) {
                              value += '/';
                            }
                            if (value.length <= 5) {
                              setPaymentInfo({ ...paymentInfo, expDate: value });
                            }
                          }}
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV*
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          required
                          placeholder="123"
                          maxLength={4}
                          className="input w-full"
                          value={paymentInfo.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            if (value.length <= 4) {
                              setPaymentInfo({ ...paymentInfo, cvv: value });
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4">
                    <button
                      type="button"
                      className="btn btn-outline mb-3 sm:mb-0"
                      onClick={() => setCheckoutStep(1)}
                    >
                      Back to Shipping
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {/* Step 3: Review Order */}
            {checkoutStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>
                
                <div className="mb-8">
                  <h3 className="font-medium mb-3">Items in Your Order</h3>
                  <div className="divide-y">
                    {items.map((item) => (
                      <div key={item.product.id} className="py-4 flex">
                        <img 
                          src={item.product.image} 
                          alt={item.product.title} 
                          className="w-16 h-16 object-contain bg-gray-100 rounded-md"
                        />
                        <div className="ml-4">
                          <p className="font-medium">{item.product.title}</p>
                          <p className="text-gray-600">
                            Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                          </p>
                          <p className="font-medium">
                            ${(item.quantity * item.product.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium mb-3">Shipping Information</h3>
                    <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                    <p>{shippingInfo.country}</p>
                    <p className="mt-2">{shippingInfo.email}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium mb-3">Payment Information</h3>
                    <p>{paymentInfo.cardName}</p>
                    <p>**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                    <p>Expires: {paymentInfo.expDate}</p>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4">
                  <button
                    type="button"
                    className="btn btn-outline mb-3 sm:mb-0"
                    onClick={() => setCheckoutStep(2)}
                  >
                    Back to Payment
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary flex items-center justify-center"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center">
                        Processing
                        <svg className="animate-spin ml-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Place Order
                        <ChevronsRight className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Items ({items.reduce((total, item) => total + item.quantity, 0)})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-2">Items in Cart</h3>
              <div className="max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center py-2">
                    <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden">
                      <img 
                        src={item.product.image} 
                        alt={item.product.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.product.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;