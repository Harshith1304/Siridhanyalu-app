import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { products, getDiscountPercentage } from '../data/products';
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const { user, wishlist, toggleWishlist, addToCart } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    window.scrollTo(0, 0);
  }, [user, navigate]);

  if (!user) return null;

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8F7FF] dark:bg-[#0A0E0C]">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/products" className="inline-flex items-center text-[#758467] hover:text-[#1D2E28] dark:hover:text-[#EAECE9] mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </Link>
        
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif text-[#1D2E28] dark:text-[#EAECE9] mb-4"
          >
            Your Wishlist
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#758467] dark:text-[#A4B396]"
          >
            {wishlistedProducts.length === 0 
              ? "You haven't added any products to your wishlist yet." 
              : `You have ${wishlistedProducts.length} item(s) in your wishlist.`}
          </motion.p>
        </div>

        {wishlistedProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {wishlistedProducts.map((product, i) => {
              const activeSize = product.sizes[1];
              const discount = getDiscountPercentage(activeSize.price, activeSize.originalPrice);

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={product.id}
                  className="relative bg-white dark:bg-[#111814] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-[#DFE6DA] dark:border-[#2A3630] flex flex-col group"
                >
                  {/* Global Card Link */}
                  <Link to={`/product/${product.id}`} className="absolute inset-0 z-0"></Link>

                  {/* Image & Badges */}
                  <div className="relative aspect-[4/3] overflow-hidden pointer-events-none">

                    {discount > 0 && (
                      <div className="absolute top-4 left-4 z-10 bg-[#e63946] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        -{discount}% OFF
                      </div>
                    )}
                    {product.badge && (
                      <div className="absolute top-4 right-4 z-10 bg-[#F8B324] text-[#1D2E28] text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {product.badge}
                      </div>
                    )}
                    
                    <button 
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute bottom-4 right-4 z-10 w-10 h-10 bg-white/80 dark:bg-[#111814]/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-[#111814] transition-colors pointer-events-auto"
                    >
                      <Heart size={20} className="text-[#e63946] fill-current" />
                    </button>

                    <img 
                      src={product.image} 
                      alt={product.name.en} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 pointer-events-none">
                    <div className="group-hover:text-[#9CAF88] transition-colors">
                      <h3 className="text-2xl font-serif font-bold text-[#1D2E28] dark:text-[#EAECE9] mb-1">
                        {product.name.en}
                      </h3>
                      <h4 className="text-lg font-serif text-[#F8B324] mb-2 font-medium">
                        {product.name.te}
                      </h4>
                    </div>

                    <div className="mt-auto pt-6 border-t border-[#DFE6DA] dark:border-[#2A3630] pointer-events-auto relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-[#1D2E28] dark:text-white">₹{activeSize.price}</span>
                        </div>
                        
                        <button 
                          onClick={() => {
                            addToCart(product, activeSize.size);
                            toggleWishlist(product.id);
                          }}
                          className="bg-[#1D2E28] dark:bg-[#EAECE9] text-white dark:text-[#1D2E28] px-4 py-2 rounded-xl text-sm font-bold shadow hover:shadow-lg transition-all flex items-center space-x-2"
                        >
                          <ShoppingCart size={16} />
                          <span>Move</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
