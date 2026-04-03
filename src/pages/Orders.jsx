import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Package, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const Orders = () => {
  const { language, user, orders } = useAppContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8F7FF] dark:bg-[#0A0E0C]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-serif text-[#1D2E28] dark:text-[#EAECE9] mb-2 flex items-center space-x-3">
              <Package size={40} className="text-[#9CAF88]" />
              <span>{language === 'en' ? 'Your Orders' : 'మీ ఆర్డర్‌లు'}</span>
            </h1>
            <p className="text-[#758467] dark:text-[#A4B396]">
              {language === 'en' ? 'Track and manage your past purchases' : 'మీ గత కొనుగోళ్లను ట్రాక్ చేయండి మరియు నిర్వహించండి'}
            </p>
          </div>
        </motion.div>

        {(!orders || orders.length === 0) ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white dark:bg-[#111814] rounded-3xl border border-[#DFE6DA] dark:border-[#2A3630] shadow-sm"
          >
            <div className="w-24 h-24 bg-[#DFE6DA] dark:bg-[#2A3630] rounded-full flex items-center justify-center mx-auto mb-6 text-[#758467] dark:text-[#A4B396]">
              <Package size={40} />
            </div>
            <h2 className="text-3xl font-serif text-[#1D2E28] dark:text-[#EAECE9] mb-4">
              {language === 'en' ? 'No orders found' : 'ఆర్డర్‌లు కనుగొనబడలేదు'}
            </h2>
            <p className="text-[#758467] dark:text-[#A4B396] mb-8 max-w-md mx-auto">
              {language === 'en' 
                ? "You haven't placed any orders yet. Discover our collection of healthy millets." 
                : "మీరు ఇంకా ఎలాంటి ఆర్డర్‌లు చేయలేదు. మా ఆరోగ్యకరమైన సిరిధాన్యాలను కనుగొనండి."}
            </p>
            <Link to="/products" className="inline-block bg-[#1D2E28] dark:bg-[#EAECE9] text-white dark:text-[#1D2E28] px-8 py-3 rounded-xl font-bold shadow-lg hover:-translate-y-1 transition-all">
              {language === 'en' ? 'Start Shopping' : 'షాపింగ్ ప్రారంభించండి'}
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={order.id}
                className="bg-white dark:bg-[#111814] rounded-2xl border border-[#DFE6DA] dark:border-[#2A3630] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6 border-b border-[#DFE6DA] dark:border-[#2A3630] bg-[#F8F7FF]/50 dark:bg-[#0A0E0C]/50 flex flex-wrap gap-4 items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#758467] dark:text-[#A4B396] uppercase tracking-wider mb-1">
                      {language === 'en' ? 'Order ID' : 'ఆర్డర్ ID'}
                    </p>
                    <p className="font-mono text-[#1D2E28] dark:text-white font-bold">{order.id}</p>
                  </div>
                  <div>
                     <p className="text-sm font-bold text-[#758467] dark:text-[#A4B396] uppercase tracking-wider mb-1">
                      {language === 'en' ? 'Date' : 'తేదీ'}
                    </p>
                    <p className="text-[#1D2E28] dark:text-white flex items-center">
                      <Clock size={16} className="mr-2" />
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                     <p className="text-sm font-bold text-[#758467] dark:text-[#A4B396] uppercase tracking-wider mb-1">
                      {language === 'en' ? 'Status' : 'స్థితి'}
                    </p>
                    <span className="inline-flex items-center space-x-1 text-sm bg-[#9CAF88]/10 text-[#9CAF88] px-3 py-1 rounded-full font-bold">
                      <ShieldCheck size={16} />
                      <span>{order.status || 'Processing'}</span>
                    </span>
                  </div>
                  <div className="text-right">
                     <p className="text-sm font-bold text-[#758467] dark:text-[#A4B396] uppercase tracking-wider mb-1">
                      {language === 'en' ? 'Total' : 'మొత్తం'}
                    </p>
                    <p className="font-bold text-xl text-[#F8B324]">₹{order.total}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, idx) => {
                       const activeSize = item.sizes.find(s => s.size === item.size);
                       const price = activeSize ? activeSize.price : 0;
                       return (
                        <div key={`${item.id}-${item.size}-${idx}`} className="flex items-center gap-6">
                          <img src={item.image} alt={item.name[language]} className="w-20 h-20 object-cover rounded-xl border border-[#DFE6DA]/50 dark:border-[#2A3630]/50" />
                          <div className="flex-1">
                            <h4 className="font-bold text-[#1D2E28] dark:text-[#EAECE9]">{item.name[language]}</h4>
                            <p className="text-[#758467] dark:text-[#A4B396] text-sm mb-1">{item.size} • Qty: {item.quantity}</p>
                            <p className="font-bold text-[#1D2E28] dark:text-white text-sm">₹{price} / each</p>
                          </div>
                        </div>
                       )}
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
