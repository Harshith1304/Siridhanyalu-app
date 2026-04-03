import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { products, getDiscountPercentage } from '../data/products';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Activity, Droplet, ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const copy = {
    sub: "THE AWAKENING OF HEALTH",
    title1: "Empty Calories Are History.",
    title2: "Welcome to the Age of Ancient Supergrains.",
    desc: "Stop fueling your body with sterile, stripped carbs. Rediscover the intricate science and profound nourishment of native Indian millets. It's not just a diet—it's a rebellion against processed food.",
    btn2: "Explore the Science",
  };

  const benefits = [
    {
      icon: <Leaf size={32} />,
      title: 'Low Glycemic Index',
      desc: 'Releases glucose slowly into the bloodstream, making it a perfect superfood for sustained energy and blood sugar regulation.',
      color: 'text-[#F8B324]',
      bg: 'bg-[#F8B324]/20'
    },
    {
      icon: <Activity size={32} />,
      title: 'Disease Reversal Core',
      desc: 'Rich in dietary fiber and essential minerals, traditionally believed to cleanse organs and assist in reversing lifestyle diseases.',
      color: 'text-[#9CAF88]',
      bg: 'bg-[#9CAF88]/20'
    },
    {
      icon: <Droplet size={32} />,
      title: 'Planet Positive',
      desc: 'Requires 70% less water than rice cultivation. Choosing millets is a direct vote for environmental conservation.',
      color: 'text-[#1D2E28] dark:text-[#EAECE9]',
      bg: 'bg-[#1D2E28]/10 dark:bg-[#EAECE9]/10'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === benefits.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? benefits.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToBenefits = () => {
    document.getElementById('benefits').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1508013861974-9f6347163835?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20 dark:opacity-10 scale-105" 
            alt="Natural Grains" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8F7FF]/60 via-[#F8F7FF]/40 to-[#F8F7FF] dark:from-[#0A0E0C]/90 dark:via-[#0A0E0C]/80 dark:to-[#0A0E0C]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 max-w-5xl text-center px-6 mt-16"
        >
          <span className="inline-block text-[#9CAF88] uppercase tracking-[0.4em] text-xs font-bold mb-6">
            {copy.sub}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#1D2E28] dark:text-[#EAECE9] leading-tight mb-6">
            {copy.title1}<br />
            <span className="italic font-light text-[#758467] dark:text-[#A4B396]">{copy.title2}</span>
          </h1>

          <p className="text-lg md:text-xl text-[#52675C] dark:text-[#A4B396] leading-relaxed max-w-3xl mb-12 mx-auto font-light">
            {copy.desc.split('native Indian millets').map((part, i, arr) => (
              i === arr.length - 1 ? part : (
                <span key={i}>
                  {part}
                  <span className="text-[#1D2E28] dark:text-[#EAECE9] font-bold border-b-2 border-[#F8B324]">native Indian millets</span>
                </span>
              )
            ))}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={scrollToBenefits} className="bg-[#1D2E28] dark:bg-[#EAECE9] text-white dark:text-[#1D2E28] px-12 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-2">
              <span>{copy.btn2}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Flash Sale Section */}
      <section className="py-20 bg-white dark:bg-[#111814] border-y border-[#DFE6DA] dark:border-[#2A3630]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif text-[#1D2E28] dark:text-[#EAECE9] mb-2 flex items-center space-x-3">
                <span className="text-[#F8B324]">⚡</span>
                <span>Flash Sale</span>
              </h2>
              <p className="text-[#758467] dark:text-[#A4B396] uppercase tracking-widest text-sm font-bold">
                Limited Time Offer
              </p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center space-x-2 text-[#52675C] dark:text-[#A4B396] hover:text-[#1D2E28] dark:hover:text-white transition">
              <span>View All</span>
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product, i) => {
              const defaultSize = product.sizes[1]; // 1kg
              const discount = getDiscountPercentage(defaultSize.price, defaultSize.originalPrice);
              
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={product.id} 
                  className="group block relative overflow-hidden bg-[#F8F7FF] dark:bg-[#0A0E0C] rounded-2xl"
                >
                  <Link to={`/product/${product.id}`} className="block">
                    {/* Discount Badge */}
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

                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name.en} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold text-[#1D2E28] dark:text-[#EAECE9] mb-1 group-hover:text-[#9CAF88] transition-colors">
                        {product.name.en}
                      </h3>
                      <h4 className="text-md font-serif text-[#F8B324] mb-2 font-medium">
                        {product.name.te}
                      </h4>
                      
                      <div className="flex items-center space-x-3 mt-4">
                        <span className="text-2xl font-bold text-[#1D2E28] dark:text-white">₹{defaultSize.price}</span>
                        {defaultSize.originalPrice > defaultSize.price && (
                          <span className="text-[#A4B396] line-through text-lg">₹{defaultSize.originalPrice}</span>
                        )}
                        <span className="text-xs text-[#758467] font-medium px-2 py-1 bg-[#DFE6DA]/50 dark:bg-[#2A3630] rounded-md">
                          {defaultSize.size}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-32 bg-[#F8F7FF] dark:bg-[#0A0E0C]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1D2E28] dark:text-[#EAECE9] mb-16">
            The Science of Siridhanyalu
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Carousel Navigation */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white dark:bg-[#111814] border border-[#DFE6DA] dark:border-[#2A3630] rounded-full flex items-center justify-center text-[#1D2E28] dark:text-[#EAECE9] hover:bg-[#F8F7FF] dark:hover:bg-[#0A0E0C] transition-colors shadow-md"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white dark:bg-[#111814] border border-[#DFE6DA] dark:border-[#2A3630] rounded-full flex items-center justify-center text-[#1D2E28] dark:text-[#EAECE9] hover:bg-[#F8F7FF] dark:hover:bg-[#0A0E0C] transition-colors shadow-md"
            >
              <ChevronRight size={24} />
            </button>

            {/* Carousel Content */}
            <div className="overflow-hidden pb-8 px-4 sm:px-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-[#111814] p-12 rounded-3xl shadow-lg border border-[#DFE6DA] dark:border-[#2A3630] min-h-[300px] flex flex-col items-center justify-center relative"
                >
                  <div className={`w-20 h-20 ${benefits[currentSlide].bg} rounded-full flex items-center justify-center mb-8 ${benefits[currentSlide].color}`}>
                    {benefits[currentSlide].icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#1D2E28] dark:text-[#EAECE9] mb-4">
                    {benefits[currentSlide].title}
                  </h3>
                  <p className="text-[#52675C] dark:text-[#A4B396] text-lg leading-relaxed max-w-xl mx-auto">
                    {benefits[currentSlide].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex justify-center space-x-2 mt-4">
              {benefits.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'w-8 bg-[#F8B324]' : 'w-2 bg-[#DFE6DA] dark:bg-[#2A3630]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
