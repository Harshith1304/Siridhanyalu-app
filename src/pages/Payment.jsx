import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Banknote, CheckCircle, ArrowLeft, RefreshCw, CreditCard, Shield, MapPin } from 'lucide-react';
import CheckoutProgress from '../components/CheckoutProgress';

const Payment = () => {
  const { user, language, cart, clearCart, addOrder } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [captchaCode, setCaptchaCode] = useState(Math.floor(1000 + Math.random() * 9000).toString());
  const [userInput, setUserInput] = useState('');
  const purchasedItemsRef = useRef([]);

  const directBuyItem = location.state?.directBuyItem;
  const address = location.state?.address;
  const subtotal = location.state?.subtotal || 0;
  const discountAmount = location.state?.discountAmount || 0;
  const shippingFee = location.state?.shippingFee || 0;
  const total = location.state?.total || 0;
  
  const checkoutItems = directBuyItem ? [directBuyItem] : cart;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (!isSuccess && checkoutItems.length === 0) {
      navigate('/products');
    }
    window.scrollTo(0, 0);
  }, [user, checkoutItems.length, navigate, isSuccess]);

  if (!user || (!isSuccess && checkoutItems.length === 0)) return null;

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#F8F7FF] dark:bg-[#0A0E0C] absolute inset-0 z-50 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 pt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 bg-[#9CAF88]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#9CAF88]">
              <CheckCircle size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#1D2E28] dark:text-[#EAECE9] mb-4">
              {language === 'en' ? 'Order Placed Successfully!' : 'ఆర్డర్ విజయవంతంగా పూర్తయింది!'}
            </h1>
            <p className="text-[#758467] dark:text-[#A4B396]">
              {language === 'en' ? 'Your healthy millets are on their way.' : 'సిరిధాన్యాలు ఎంచుకున్నందుకు ధన్యవాదాలు.'}
            </p>
          </motion.div>

          {/* Digital Receipt / Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-[#111814] rounded-3xl border border-[#DFE6DA] dark:border-[#2A3630] p-8 md:p-10 shadow-xl mb-12"
          >
            <div className="border-b border-[#DFE6DA] dark:border-[#2A3630] pb-6 mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-serif text-[#1D2E28] dark:text-[#EAECE9]">
                {language === 'en' ? 'Order Summary' : 'ఆర్డర్ సారాంశం'}
              </h2>
              <span className="text-sm font-bold text-[#9CAF88] bg-[#9CAF88]/10 px-3 py-1 rounded-full uppercase tracking-wider">Confirmed</span>
            </div>
            
            <div className="mb-8">
               <h3 className="text-xs font-bold text-[#758467] dark:text-[#A4B396] uppercase tracking-widest mb-4">Items Ordered</h3>
               <div className="space-y-4">
                 {(purchasedItemsRef.current.length > 0 ? purchasedItemsRef.current : checkoutItems).map((item, i) => {
                   const activeSize = item.sizes.find(s => s.size === item.size);
                   const price = activeSize ? activeSize.price : 0;
                   return (
                     <div key={`${item.id}-${item.size}`} className="flex items-center gap-4 bg-[#F8F7FF] dark:bg-[#0A0E0C] p-4 rounded-xl border border-[#DFE6DA]/50 dark:border-[#2A3630]/50">
                       <img src={item.image} alt={item.name[language]} className="w-16 h-16 object-cover rounded-lg" />
                       <div className="flex-1">
                         <h4 className="font-bold text-[#1D2E28] dark:text-[#EAECE9]">{item.name[language]}</h4>
                         <p className="text-sm text-[#758467] dark:text-[#A4B396]">{item.size} × {item.quantity}</p>
                       </div>
                       <div className="font-bold text-[#1D2E28] dark:text-white">₹{price * item.quantity}</div>
                     </div>
                   );
                 })}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8 border-t border-[#DFE6DA] dark:border-[#2A3630] pt-8">
              <div>
                <h3 className="text-xs font-bold text-[#758467] dark:text-[#A4B396] uppercase tracking-widest mb-3 flex items-center"><MapPin size={16} className="mr-2"/> Shipping Address</h3>
                {address ? (
                  <div className="text-[#1D2E28] dark:text-[#EAECE9] font-medium leading-relaxed bg-[#F8F7FF] dark:bg-[#0A0E0C] p-5 rounded-xl border border-[#DFE6DA]/50 dark:border-[#2A3630]/50">
                    <p className="font-bold text-lg mb-1">{address.name}</p>
                    <p>{address.street}</p>
                    <p>{address.city} - {address.pincode}</p>
                    <p className="text-[#758467] dark:text-[#A4B396] mt-2 text-sm text-bold flex items-center">📞 {address.phone}</p>
                  </div>
                ) : (
                  <p className="text-[#1D2E28] dark:text-[#EAECE9] font-medium p-4 bg-[#F8F7FF] dark:bg-[#0A0E0C] rounded-xl border border-[#DFE6DA]/50 dark:border-[#2A3630]/50">Digital Delivery Mode</p>
                )}
              </div>
              
              <div>
                <h3 className="text-xs font-bold text-[#758467] dark:text-[#A4B396] uppercase tracking-widest mb-3 flex items-center"><Banknote size={16} className="mr-2"/> Payment Details</h3>
                <div className="text-[#1D2E28] dark:text-[#EAECE9] font-medium space-y-3 bg-[#F8F7FF] dark:bg-[#0A0E0C] p-5 rounded-xl border border-[#DFE6DA]/50 dark:border-[#2A3630]/50">
                  <div className="flex justify-between items-center border-b border-[#DFE6DA] dark:border-[#2A3630] pb-3">
                    <span className="text-[#758467] dark:text-[#A4B396] text-sm">Method Selected:</span>
                    <span className="uppercase font-bold tracking-wider text-sm bg-white dark:bg-[#111814] px-3 py-1 rounded shadow-sm">{selectedMethod}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 text-sm">
                    <span className="text-[#758467] dark:text-[#A4B396]">Subtotal:</span>
                    <span className="font-bold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 text-sm">
                    <span className="text-[#758467] dark:text-[#A4B396]">Shipping Fee:</span>
                    {shippingFee === 0 ? (
                      <span className="font-bold text-[#9CAF88] bg-[#9CAF88]/10 px-2 py-0.5 rounded text-xs tracking-wider uppercase">Free</span>
                    ) : (
                      <span className="font-bold">₹50</span>
                    )}
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between items-center pt-1 text-[#e63946] text-sm">
                      <span>Coupon Applied:</span>
                      <span className="font-bold">-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-t border-[#DFE6DA] dark:border-[#2A3630] pt-3 mt-3">
                    <span className="font-bold text-lg text-[#1D2E28] dark:text-[#EAECE9]">Total Paid:</span>
                    <span className="font-bold text-2xl text-[#F8B324] tracking-tight">₹{Math.max(0, total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-10">
               <Link to="/products" className="inline-flex items-center space-x-2 bg-[#1D2E28] dark:bg-[#EAECE9] text-white dark:text-[#1D2E28] px-10 py-5 rounded-xl font-bold hover:bg-[#9CAF88] transition-colors shadow-lg hover:shadow-xl">
                 <ArrowLeft size={20} />
                 <span>{language === 'en' ? 'Back to Shop' : 'షాపింగ్ కొనసాగించండి'}</span>
               </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const paymentMethods = [
    { 
      id: 'gpay', 
      name: 'Google Pay', 
      icon: <img src="https://cdn.worldvectorlogo.com/logos/google-pay-1.svg" alt="GPay" className="h-6 w-auto" />, 
      color: 'hover:border-gray-300' 
    },
    { 
      id: 'phonepe', 
      name: 'PhonePe', 
      icon: <img src="https://cdn.worldvectorlogo.com/logos/phonepe-1.svg" alt="PhonePe" className="h-[28px] w-auto" />, 
      color: 'hover:border-[#5f259f]' 
    },
    { 
      id: 'paytm', 
      name: 'Paytm', 
      icon: <img src="https://cdn.worldvectorlogo.com/logos/paytm-1.svg" alt="Paytm" className="h-8 w-auto mix-blend-multiply dark:mix-blend-normal" />, 
      color: 'hover:border-[#00baf2]' 
    },
    { id: 'credit', name: 'Credit Card', icon: <CreditCard size={24} className="text-[#1D2E28] dark:text-[#EAECE9]" />, color: 'hover:border-[#1D2E28]' },
    { id: 'debit', name: 'Debit Card', icon: <div className="text-[#1A1F71] dark:text-blue-400 font-bold text-2xl italic font-serif tracking-tighter">VISA</div>, color: 'hover:border-[#1A1F71]' },
    { id: 'cod', name: 'Cash on Delivery', icon: <Banknote size={24} className="text-[#F8B324]" />, color: 'hover:border-[#F8B324]' },
  ];

  const refreshCaptcha = () => {
    setCaptchaCode(Math.floor(1000 + Math.random() * 9000).toString());
    setUserInput('');
  };

  const handlePlaceOrder = () => {
    purchasedItemsRef.current = checkoutItems;
    
    // Create the order object
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString(),
      items: checkoutItems,
      subtotal,
      shippingFee,
      discountAmount,
      total,
      method: selectedMethod,
      address,
      status: 'Processing'
    };
    
    if (selectedMethod === 'cod') {
      if (userInput === captchaCode) {
        setIsSuccess(true);
        addOrder(newOrder);
        if (!directBuyItem && clearCart) clearCart();
      }
    } else {
      setIsSuccess(true);
      addOrder(newOrder);
      if (!directBuyItem && clearCart) clearCart();
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8F7FF] dark:bg-[#0A0E0C]">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-10">
          <CheckoutProgress 
            currentStep={isSuccess ? 4 : 3} 
            onStepClick={(step) => {
              if (isSuccess) return;
              if (step === 1) navigate('/checkout', { state: { phase: 'order', address, directBuyItem, discountAmount, subtotal, total } });
              if (step === 2) navigate('/checkout', { state: { phase: 'address', address, directBuyItem, discountAmount, subtotal, total } });
            }}
          />
        </div>

        <div className="flex items-center justify-between mb-10 border-b border-[#DFE6DA] dark:border-[#2A3630] pb-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-serif text-[#1D2E28] dark:text-[#EAECE9]"
          >
            {language === 'en' ? 'Select Payment Method' : 'చెల్లింపు పద్ధతిని ఎంచుకోండి'}
          </motion.h1>
          <div className="flex items-center space-x-2 text-[#9CAF88] bg-[#9CAF88]/10 px-4 py-2 rounded-full text-sm font-bold">
            <Shield size={16} />
            <span>Secure Checkout</span>
          </div>
        </div>

        <div className="grid gap-4 max-w-2xl mx-auto">
          {paymentMethods.map((method, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`cursor-pointer bg-white dark:bg-[#111814] border rounded-2xl p-5 flex items-center justify-between transition-all ${
                selectedMethod === method.id 
                  ? 'border-[#9CAF88] shadow-lg ring-4 ring-[#9CAF88]/10 -translate-y-1' 
                  : `border-[#DFE6DA] dark:border-[#2A3630] hover:shadow-md ${method.color}`
              }`}
            >
              <div className="flex items-center space-x-5">
                <div className="w-12 h-12 bg-[#F8F7FF] dark:bg-[#0A0E0C] rounded-xl flex items-center justify-center border border-[#DFE6DA]/50 dark:border-[#2A3630]/50">
                  {method.icon}
                </div>
                <span className="text-lg font-bold text-[#1D2E28] dark:text-[#EAECE9]">{method.name}</span>
              </div>
              
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === method.id ? 'border-[#9CAF88] bg-[#9CAF88]' : 'border-[#DFE6DA] dark:border-[#2A3630]'
              }`}>
                {selectedMethod === method.id && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <AnimatePresence>
            {selectedMethod === 'cod' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-8 bg-white dark:bg-[#111814] border border-[#DFE6DA] dark:border-[#2A3630] rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="flex flex-col items-center">
                  <p className="text-[#1D2E28] dark:text-[#EAECE9] font-bold mb-2">
                    {language === 'en' ? 'Security Verification' : 'భద్రత ధృవీకరణ'}
                  </p>
                  <p className="text-[#758467] dark:text-[#A4B396] mb-6 text-sm">
                    {language === 'en' ? 'Please type the characters shown below to proceed.' : 'దయచేసి క్రింద చూపిన అక్షరాలను నమోదు చేయండి.'}
                  </p>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-[#DFE6DA]/50 dark:bg-[#2A3630]/50 tracking-[0.3em] text-[#1D2E28] dark:text-white px-8 py-3 rounded-lg text-3xl font-serif font-bold italic line-through decoration-[#758467] decoration-2 select-none relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent transform -skew-x-12"></div>
                      {captchaCode}
                    </div>
                    <button onClick={refreshCaptcha} className="w-12 h-12 rounded-full border border-[#DFE6DA] dark:border-[#2A3630] flex items-center justify-center text-[#9CAF88] hover:bg-[#F8F7FF] dark:hover:bg-[#0A0E0C] hover:text-[#1D2E28] dark:hover:text-white transition-colors" title="Refresh Captcha">
                      <RefreshCw size={20} />
                    </button>
                  </div>
                  
                  <input 
                    type="text" 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter code"
                    className="bg-[#F8F7FF] dark:bg-[#0A0E0C] border-2 border-[#DFE6DA] dark:border-[#2A3630] rounded-xl px-4 py-3 text-center text-xl font-bold w-48 tracking-widest text-[#1D2E28] dark:text-white focus:outline-none focus:border-[#9CAF88] transition-colors"
                    maxLength={4}
                  />
                  
                  {userInput.length === 4 && userInput !== captchaCode && (
                     <p className="text-[#e63946] text-sm mt-3 font-bold">Incorrect code.</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            disabled={!selectedMethod || (selectedMethod === 'cod' && userInput !== captchaCode)}
            onClick={handlePlaceOrder}
            className="w-full bg-[#1D2E28] dark:bg-[#EAECE9] text-white dark:text-[#1D2E28] py-4 rounded-xl font-bold flex items-center justify-center space-x-2 disabled:bg-[#DFE6DA] dark:disabled:bg-[#2A3630] disabled:text-[#758467] dark:disabled:text-[#758467] transition-all hover:shadow-lg disabled:hover:shadow-none mt-8"
          >
            <CheckCircle size={20} />
            <span>{language === 'en' ? 'Place Order & Pay' : 'ఆర్డర్ చేయండి'}</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;
