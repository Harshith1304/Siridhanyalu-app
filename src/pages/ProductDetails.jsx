import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { products, getDiscountPercentage } from '../data/products';
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addToCart, toggleWishlist, wishlist } = useAppContext();
  const product = products.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center text-[#1D2E28] dark:text-[#EAECE9]">
        <h2 className="text-2xl font-serif">Product Not Found</h2>
      </div>
    );
  }

  const [selectedSize, setSelectedSize] = useState(product.sizes[1].size);
  const activeSize = product.sizes.find(s => s.size === selectedSize);
  const discount = getDiscountPercentage(activeSize.price, activeSize.originalPrice);
  const isWishlisted = wishlist.includes(product.id);

  const recommendedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F8F7FF] dark:bg-[#0A0E0C]">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/products" className="inline-flex items-center text-[#758467] hover:text-[#1D2E28] dark:hover:text-[#EAECE9] mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </Link>

        {/* Product Detail Section */}
        <div className="bg-white dark:bg-[#111814] rounded-3xl shadow-sm border border-[#DFE6DA] dark:border-[#2A3630] overflow-hidden flex flex-col md:flex-row mb-20">
          <div className="md:w-1/2 relative bg-[#DFE6DA]/20 dark:bg-[#2A3630]/20">
            {discount > 0 && (
              <div className="absolute top-6 left-6 z-10 bg-[#e63946] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                -{discount}% OFF
              </div>
            )}
            {product.badge && (
              <div className="absolute top-6 right-6 z-10 bg-[#F8B324] text-[#1D2E28] text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                {product.badge}
              </div>
            )}
            <img 
              src={product.image} 
              alt={product.name.en} 
              className="w-full h-full object-cover min-h-[400px]"
            />
          </div>

          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-4xl font-serif font-bold text-[#1D2E28] dark:text-[#EAECE9] mb-2">{product.name.en}</h1>
            <h2 className="text-2xl font-serif text-[#F8B324] mb-6">{product.name.te}</h2>
            
            <p className="text-[#52675C] dark:text-[#A4B396] text-lg mb-8 leading-relaxed">
              {product.description.en}
            </p>

            <div className="mb-8">
              <h3 className="text-[#1D2E28] dark:text-[#EAECE9] font-bold uppercase tracking-widest text-sm mb-4">Select Quantity</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(sizeObj => (
                  <button
                    key={sizeObj.size}
                    onClick={() => setSelectedSize(sizeObj.size)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-colors ${
                      selectedSize === sizeObj.size 
                        ? 'bg-[#1D2E28] dark:bg-[#EAECE9] text-white dark:text-[#1D2E28] border-[#1D2E28] dark:border-[#EAECE9]' 
                        : 'bg-transparent text-[#758467] dark:text-[#A4B396] border-[#DFE6DA] dark:border-[#2A3630] hover:border-[#1D2E28] dark:hover:border-[#EAECE9]'
                    }`}
                  >
                    {sizeObj.size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end space-x-4 mb-10">
              <span className="text-4xl font-bold text-[#1D2E28] dark:text-white">₹{activeSize.price}</span>
              {activeSize.originalPrice > activeSize.price && (
                <span className="text-[#A4B396] line-through text-xl pb-1">₹{activeSize.originalPrice}</span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => addToCart(product, selectedSize)}
                className="flex-1 bg-[#1D2E28] dark:bg-[#EAECE9] text-white dark:text-[#1D2E28] px-8 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-[#52675C] dark:hover:bg-white transition-colors"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
              
              <button 
                onClick={() => {
                  navigate('/checkout', { state: { directBuyItem: { ...product, size: selectedSize, quantity: 1 } } });
                }}
                className="flex-1 bg-[#F8B324] text-[#1D2E28] px-8 py-4 rounded-xl font-bold hover:bg-[#e0a220] transition-colors"
              >
                Buy Now
              </button>
              
              <button 
                onClick={() => {
                  if (!user) {
                    navigate('/login');
                  } else {
                    toggleWishlist(product.id);
                  }
                }}
                className="w-14 h-14 bg-transparent border border-[#DFE6DA] dark:border-[#2A3630] text-[#1D2E28] dark:text-[#EAECE9] rounded-xl flex items-center justify-center hover:border-[#1D2E28] dark:hover:border-[#EAECE9] transition-colors shrink-0"
                title="Add to Wishlist"
              >
                <Heart size={24} className={isWishlisted ? "text-[#e63946] fill-current" : ""} />
              </button>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div>
          <h3 className="text-3xl font-serif text-[#1D2E28] dark:text-[#EAECE9] mb-10 text-center">Recommended For You</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedProducts.map((recProduct, i) => {
              const recSize = recProduct.sizes[1];
              const recDiscount = getDiscountPercentage(recSize.price, recSize.originalPrice);

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={recProduct.id} 
                  className="group block relative overflow-hidden bg-white dark:bg-[#111814] rounded-2xl shadow-sm border border-[#DFE6DA] dark:border-[#2A3630]"
                >
                  <Link to={`/product/${recProduct.id}`} className="block">
                    {recDiscount > 0 && (
                      <div className="absolute top-4 left-4 z-10 bg-[#e63946] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        -{recDiscount}% OFF
                      </div>
                    )}
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={recProduct.image} 
                        alt={recProduct.name.en} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-serif font-bold text-[#1D2E28] dark:text-[#EAECE9] mb-1 group-hover:text-[#9CAF88] transition-colors">
                        {recProduct.name.en}
                      </h4>
                      <h5 className="text-md font-serif text-[#F8B324] mb-2 font-medium">
                        {recProduct.name.te}
                      </h5>
                      <div className="flex items-center space-x-3 mt-4">
                        <span className="text-xl font-bold text-[#1D2E28] dark:text-white">₹{recSize.price}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
