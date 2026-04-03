import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowRight, ShieldCheck, Tag, CheckCircle, MapPin, Truck } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CheckoutProgress from '../components/CheckoutProgress';

const Checkout = () => {
  const { language, cart, user, orders } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const directBuyItem = location.state?.directBuyItem;
  const checkoutItems = directBuyItem ? [directBuyItem] : cart;
  
  const [checkoutPhase, setCheckoutPhase] = useState(location.state?.phase || 'order'); // 'order' or 'address'
  
  // Address form state
  const [address, setAddress] = useState(location.state?.address || {
    name: '',
    phone: '',
    street: '',
    city: '',
    pincode: ''
  });
  const [showAddressError, setShowAddressError] = useState(false);

  const [discountAmount, setDiscountAmount] = useState(location.state?.discountAmount || 0);
  const [couponApplied, setCouponApplied] = useState(location.state?.discountAmount > 0);

  const subtotal = checkoutItems.reduce((acc, item) => {

    const sizeConfig = item.sizes.find(s => s.size === item.size);
    const price = sizeConfig ? sizeConfig.price : 0;
    return acc + (price * item.quantity);
  }, 0);

  const handleApplyCoupon = () => {
    setDiscountAmount(Math.round(subtotal * 0.10));
    setCouponApplied(true);
  };

  const handleRemoveCoupon = () => {
    setDiscountAmount(0);
    setCouponApplied(false);
  };
  
  const hasOrderedBefore = orders?.length > 0;
  const shippingFee = hasOrderedBefore ? 50 : 0;
  const total = subtotal + shippingFee - discountAmount;

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-[#F8F7FF] dark:bg-[#0A0E0C]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-[#DFE6DA] dark:bg-[#2A3630] rounded-full flex items-center justify-center mx-auto mb-6 text-[#758467] dark:text-[#A4B396]">
            <Trash2 size={40} />
          </div>
          <h2 className="text-3xl font-serif text-[#1D2E28] dark:text-[#EAECE9] mb-4">
            {language === 'en' ? 'Your cart is empty' : 'మీ కార్ట్ ఖాళీగా ఉంది'}
          </h2>
          <Link to="/products" className="inline-block bg-[#1D2E28] dark:bg-[#EAECE9] text-white dark:text-[#1D2E28] px-8 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-all">
            {language === 'en' ? 'Continue Shopping' : 'షాపింగ్ కొనసాగించండి'}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8F7FF] dark:bg-[#0A0E0C]">
      <div className="max-w-6xl mx-auto">
          <CheckoutProgress 
            currentStep={checkoutPhase === 'order' ? 1 : 2} 
            onStepClick={(step) => {
              if (step === 1) setCheckoutPhase('order');
              if (step === 2) setCheckoutPhase('address');
              if (step === 3) {
                if (!address.name || !address.street || !address.phone || !address.city || !address.pincode) {
                  setShowAddressError(true);
                  return;
                }
                setShowAddressError(false);
                navigate('/payment', { state: { directBuyItem, address, subtotal, discountAmount, shippingFee, total } });
              }
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {checkoutPhase === 'order' ? (
            <>
              <h1 className="text-4xl font-serif text-[#1D2E28] dark:text-[#EAECE9] mb-8">
                {language === 'en' ? 'Review Your Order' : 'మీ ఆర్డర్ పరిశీలించండి'}
              </h1>
              
              {checkoutItems.map((item, i) => {
                const activeSize = item.sizes.find(s => s.size === item.size);
                const price = activeSize ? activeSize.price : 0;
                return (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={`${item.id}-${item.size}`}
                    className="bg-white dark:bg-[#111814] p-4 rounded-2xl flex items-center gap-6 border border-[#DFE6DA] dark:border-[#2A3630]"
                  >
                    <img src={item.image} alt={item.name[language]} className="w-24 h-24 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#1D2E28] dark:text-[#EAECE9]">
                        {item.name[language]}
                      </h3>
                      <p className="text-sm text-[#758467] dark:text-[#A4B396] mb-2">{item.size}</p>
                      <div className="text-[#1D2E28] dark:text-white font-bold">₹{price} <span className="text-xs font-normal text-[#758467]">x {item.quantity}</span></div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#1D2E28] dark:text-white">₹{price * item.quantity}</div>
                    </div>
                  </motion.div>
                )
              })}
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#111814] p-8 rounded-3xl border border-[#DFE6DA] dark:border-[#2A3630]"
            >
              <div className="flex items-center space-x-3 mb-6 border-b border-[#DFE6DA] dark:border-[#2A3630] pb-4">
                <MapPin className="text-[#9CAF88]" size={28} />
                <h1 className="text-3xl font-serif text-[#1D2E28] dark:text-[#EAECE9]">
                  {language === 'en' ? 'Shipping Details' : 'షిప్పింగ్ వివరాలు'}
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-[#758467] dark:text-[#A4B396] mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={address.name}
                    onChange={(e) => setAddress({...address, name: e.target.value})}
                    className="w-full bg-[#F8F7FF] dark:bg-[#0A0E0C] border border-[#DFE6DA] dark:border-[#2A3630] rounded-xl px-4 py-3 text-[#1D2E28] dark:text-white focus:outline-none focus:border-[#9CAF88] transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-[#758467] dark:text-[#A4B396] mb-2">Street Address</label>
                  <textarea 
                    rows="2"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                    className="w-full bg-[#F8F7FF] dark:bg-[#0A0E0C] border border-[#DFE6DA] dark:border-[#2A3630] rounded-xl px-4 py-3 text-[#1D2E28] dark:text-white focus:outline-none focus:border-[#9CAF88] transition-colors resize-none"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#758467] dark:text-[#A4B396] mb-2">Mobile Number</label>
                  <input 
                    type="tel" 
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({...address, phone: e.target.value})}
                    className="w-full bg-[#F8F7FF] dark:bg-[#0A0E0C] border border-[#DFE6DA] dark:border-[#2A3630] rounded-xl px-4 py-3 text-[#1D2E28] dark:text-white focus:outline-none focus:border-[#9CAF88] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#758467] dark:text-[#A4B396] mb-2">City / Location</label>
                  <input 
                    type="text" 
                    required
                    value={address.city}
                    onChange={(e) => setAddress({...address, city: e.target.value})}
                    className="w-full bg-[#F8F7FF] dark:bg-[#0A0E0C] border border-[#DFE6DA] dark:border-[#2A3630] rounded-xl px-4 py-3 text-[#1D2E28] dark:text-white focus:outline-none focus:border-[#9CAF88] transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-[#758467] dark:text-[#A4B396] mb-2">Pincode</label>
                  <input 
                    type="text" 
                    required
                    value={address.pincode}
                    onChange={(e) => setAddress({...address, pincode: e.target.value})}
                    className="w-full md:w-1/2 bg-[#F8F7FF] dark:bg-[#0A0E0C] border border-[#DFE6DA] dark:border-[#2A3630] rounded-xl px-4 py-3 text-[#1D2E28] dark:text-white focus:outline-none focus:border-[#9CAF88] transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Order Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#111814] p-8 rounded-3xl border border-[#DFE6DA] dark:border-[#2A3630] h-fit sticky top-32 shadow-xl"
        >
          <h2 className="text-2xl font-serif text-[#1D2E28] dark:text-[#EAECE9] mb-6">
            {language === 'en' ? 'Order Summary' : 'ఆర్డర్ సారాంశం'}
          </h2>
          
          <div className="space-y-4 text-[#758467] dark:text-[#A4B396] border-b border-[#DFE6DA] dark:border-[#2A3630] pb-6 mb-6">
            <div className="flex justify-between">
              <span>{language === 'en' ? 'Subtotal' : 'ఉపమొత్తం'}</span>
              <span className="text-[#1D2E28] dark:text-white font-medium">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>{language === 'en' ? 'Shipping' : 'షిప్పింగ్'}</span>
              <div className="flex items-center space-x-2">
                {shippingFee === 0 ? (
                   <>
                     <span className="line-through text-xs text-[#e63946]">₹50</span>
                     <span className="text-[#9CAF88] font-bold tracking-wider uppercase text-sm">Free</span>
                   </>
                ) : (
                   <span className="font-bold text-[#1D2E28] dark:text-white">₹50</span>
                )}
              </div>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#e63946]">
                <span>{language === 'en' ? 'Discount' : 'డిస్కౌంట్'}</span>
                <span className="font-bold">-₹{discountAmount}</span>
              </div>
            )}
          </div>

          {/* Coupon Code Section */}
          <div className="mb-6">
            <h3 className="text-[#1D2E28] dark:text-[#EAECE9] font-bold mb-3 flex items-center space-x-2">
              <Tag size={16} className="text-[#9CAF88]" />
              <span>Available Coupons</span>
            </h3>
            
            <div className={`border-2 rounded-xl p-4 flex items-center justify-between transition-colors ${couponApplied ? 'border-[#9CAF88] bg-[#9CAF88]/10' : 'border-[#DFE6DA] dark:border-[#2A3630] bg-[#F8F7FF] dark:bg-[#111814] hover:border-[#1D2E28] cursor-pointer'}`}
                 onClick={!couponApplied ? handleApplyCoupon : undefined}>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[#1D2E28] dark:text-white bg-[#F8B324]/20 px-2 py-1 rounded text-sm tracking-wider">FIRST10</span>
                  {couponApplied && <CheckCircle size={16} className="text-[#9CAF88]" />}
                </div>
                <p className="text-xs text-[#758467] dark:text-[#A4B396] mt-1">Get 10% off your entire order instantly</p>
              </div>
              
              {couponApplied ? (
                <button 
                  onClick={(e) => { e.stopPropagation(); handleRemoveCoupon(); }}
                  className="text-xs font-bold text-[#e63946] hover:underline"
                >
                  Remove
                </button>
              ) : (
                <button className="text-xs font-bold text-[#1D2E28] dark:text-[#EAECE9]">
                  Apply
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-between items-end mb-8">
            <span className="text-lg font-bold text-[#1D2E28] dark:text-[#EAECE9]">
              {language === 'en' ? 'Total' : 'మొత్తం'}
            </span>
            <span className="text-4xl font-bold text-[#1D2E28] dark:text-white border-b-4 border-[#F8B324]">₹{Math.max(0, total)}</span>
          </div>

          {checkoutPhase === 'order' ? (
            <button 
              onClick={() => {
                if (!user) {
                  navigate('/login');
                } else {
                  setCheckoutPhase('address');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="w-full bg-[#1D2E28] dark:bg-[#EAECE9] text-white dark:text-[#1D2E28] py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-[#9CAF88] dark:hover:bg-[#A4B396] transition-colors mb-4 shadow-lg hover:shadow-xl"
            >
              <span>{language === 'en' ? 'Proceed to Address' : 'చిరునామాకు కొనసాగండి'}</span>
              <ArrowRight size={20} />
            </button>
          ) : (
             <div className="space-y-4">
              <AnimatePresence>
                {showAddressError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="bg-[#e63946]/10 text-[#e63946] border-2 border-[#e63946]/20 px-5 py-3 rounded-xl flex items-center space-x-3 mb-2"
                  >
                    <ShieldCheck size={20} className="shrink-0" />
                    <span className="text-sm font-bold">
                      {language === 'en' ? 'Please complete all shipping details to proceed.' : 'దయచేసి అన్ని షిప్పింగ్ చిరునామా వివరాలను పూరించండి.'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                onClick={() => {
                  if (!address.name || !address.street || !address.phone || !address.city || !address.pincode) {
                    setShowAddressError(true);
                    return;
                  }
                  setShowAddressError(false);
                  navigate('/payment', { state: { directBuyItem, address, subtotal, discountAmount, shippingFee, total } });
                }}
                className="w-full bg-[#1D2E28] dark:bg-[#EAECE9] text-white dark:text-[#1D2E28] py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-[#9CAF88] dark:hover:bg-[#A4B396] transition-colors shadow-lg hover:shadow-xl"
              >
                <span>{language === 'en' ? 'Proceed to Payment' : 'చెల్లింపుకు కొనసాగండి'}</span>
                <ArrowRight size={20} />
              </button>
              <button onClick={() => setCheckoutPhase('order')} className="w-full py-4 text-sm font-bold text-[#758467] hover:text-[#1D2E28] dark:hover:text-white transition-colors">
                Back to Order
              </button>
             </div>
          )}
          
          <div className="flex items-center justify-center space-x-2 text-xs text-[#758467] dark:text-[#A4B396]">
            <ShieldCheck size={16} className="text-[#9CAF88]" />
            <span>{language === 'en' ? 'Secure Encrypted Checkout' : 'సురక్షితమైన చెల్లింపు'}</span>
          </div>
        </motion.div>

      </div>
    </div>
  </div>
);
};

export default Checkout;
