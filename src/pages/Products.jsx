import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { products, getDiscountPercentage } from '../data/products';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';

const Products = () => {
  const { user, addToCart, toggleWishlist, wishlist } = useAppContext();
  const navigate = useNavigate();
  
  // Local state to track selected size for each product
  const [selectedSizes, setSelectedSizes] = useState(
    products.reduce((acc, product) => ({ ...acc, [product.id]: product.sizes[1].size }), {})
  );

  const handleSizeChange = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8F7FF] dark:bg-[#0A0E0C]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif text-[#1D2E28] dark:text-[#EAECE9] mb-4"
          >
            Our Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#758467] dark:text-[#A4B396] max-w-2xl mx-auto"
          >
            Discover the ancient Indian supergrains mentioned by Dr. Khadar Valli.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, i) => {
            const currentSizeName = selectedSizes[product.id];
            const activeSize = product.sizes.find(s => s.size === currentSizeName);
            const discount = getDiscountPercentage(activeSize.price, activeSize.originalPrice);
            const isWishlisted = wishlist.includes(product.id);

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
                    onClick={(e) => {

                      e.preventDefault();
                      if (!user) {
                        navigate('/login');
                      } else {
                        toggleWishlist(product.id);
                      }
                    }}
                    className="absolute bottom-4 right-4 z-10 w-10 h-10 bg-white/80 dark:bg-[#111814]/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-[#111814] transition-colors pointer-events-auto"
                  >
                    <Heart size={20} className={isWishlisted ? "text-[#e63946] fill-current" : "text-[#1D2E28] dark:text-[#EAECE9]"} />
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
                  <p className="text-[#758467] dark:text-[#A4B396] text-sm mb-6 line-clamp-2">
                    {product.description.en}
                  </p>

                  <div className="mt-auto pointer-events-auto relative z-10">
                    {/* Size Selector */}
                    <div className="flex space-x-2 mb-4">
                      {product.sizes.map(sizeObj => (
                        <button
                          key={sizeObj.size}
                          onClick={() => handleSizeChange(product.id, sizeObj.size)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                            currentSizeName === sizeObj.size 
                              ? 'bg-[#1D2E28] dark:bg-[#EAECE9] text-white dark:text-[#1D2E28] border-[#1D2E28] dark:border-[#EAECE9]' 
                              : 'bg-transparent text-[#758467] dark:text-[#A4B396] border-[#DFE6DA] dark:border-[#2A3630] hover:border-[#1D2E28] dark:hover:border-[#EAECE9]'
                          }`}
                        >
                          {sizeObj.size}
                        </button>
                      ))}
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        {activeSize.originalPrice > activeSize.price && (
                          <span className="text-[#A4B396] line-through text-sm">₹{activeSize.originalPrice}</span>
                        )}
                        <span className="text-3xl font-bold text-[#1D2E28] dark:text-white">₹{activeSize.price}</span>
                      </div>
                      
                      <button 
                        onClick={() => addToCart(product, currentSizeName)}
                        className="bg-[#1D2E28] dark:bg-[#EAECE9] text-white dark:text-[#1D2E28] w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
};

export default Products;
