import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ShoppingCart, Heart, Moon, Sun, Menu, X, User, LogOut, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout, theme, toggleTheme, cart, wishlist } = useAppContext();
  const [logoLang, setLogoLang] = useState('en');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hidden logic (hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      // Background logic
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Click logo logic
  let clickTimeout = null;
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (clickTimeout !== null) {
      clearTimeout(clickTimeout);
      clickTimeout = null;
      // Double click
      setLogoLang(prev => prev === 'en' ? 'te' : 'en');
    } else {
      clickTimeout = setTimeout(() => {
        // Single click
        navigate('/');
        clickTimeout = null;
      }, 250);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ];

  const totalCartItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isHidden ? '-100%' : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 dark:bg-[#0A0E0C]/80 backdrop-blur-md border-b border-[#DFE6DA] dark:border-[#2A3630] py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Logo Section */}
          <div 
            onClick={handleLogoClick}
            className="cursor-pointer font-serif font-bold text-2xl tracking-widest text-[#1D2E28] dark:text-[#EAECE9] select-none"
            title="Double click to switch language"
          >
            {logoLang === 'en' ? (
              <>SIRI<span className="text-[#9CAF88]">DHANYALU</span></>
            ) : (
              <span className="text-[#F8B324] text-xl">సిరిధాన్యాలు</span>
            )}
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center space-x-10 text-sm uppercase tracking-widest font-medium text-[#758467] dark:text-[#A4B396]">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={`hover:text-[#1D2E28] dark:hover:text-white transition ${location.pathname === link.path ? 'text-[#1D2E28] dark:text-white border-b-2 border-[#F8B324] pb-1' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6 text-[#1D2E28] dark:text-[#EAECE9]">
            <button onClick={toggleTheme} className="hover:text-[#9CAF88] transition">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-[#9CAF88]">
                  <User size={20} />
                  <span className="text-xs uppercase font-bold">{user.username}</span>
                </div>
                <button 
                  onClick={() => setShowLogoutModal(true)} 
                  className="text-[#758467] hover:text-[#e63946] transition"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hover:text-[#9CAF88] transition">
                <User size={20} />
              </Link>
            )}

            <Link 
              to={user ? "/wishlist" : "/login"} 
              className="relative hover:text-[#9CAF88] transition"
              title="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                 <span className="absolute -top-2 -right-2 bg-[#F8B324] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                 {wishlist.length}
               </span>
              )}
            </Link>

            <Link 
              to={user ? "/orders" : "/login"} 
              className="relative hover:text-[#9CAF88] transition"
              title="Orders"
            >
              <Package size={20} />
            </Link>

            <Link to="/checkout" className="relative hover:text-[#9CAF88] transition">
              <ShoppingCart size={20} />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#1D2E28] dark:bg-[#9CAF88] text-white dark:text-[#1D2E28] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4 text-[#1D2E28] dark:text-white">
            <Link to="/checkout" className="relative">
              <ShoppingCart size={24} />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#1D2E28] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalCartItems}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-white dark:bg-[#0A0E0C] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="font-serif font-bold text-2xl text-[#1D2E28] dark:text-[#EAECE9]">
                MENU
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-[#1D2E28] dark:text-white">
                <X size={32} />
              </button>
            </div>

            <ul className="flex flex-col space-y-6 text-2xl uppercase font-bold text-[#1D2E28] dark:text-white flex-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-[#9CAF88] transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to={user ? "/wishlist" : "/login"} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="hover:text-[#9CAF88] transition"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link 
                  to={user ? "/orders" : "/login"} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="hover:text-[#9CAF88] transition"
                >
                  My Orders
                </Link>
              </li>
              <li>
                {user ? (
                  <button onClick={() => { 
                    setMobileMenuOpen(false); 
                    setShowLogoutModal(true);
                  }} className="hover:text-[#e63946] transition text-left flex items-center space-x-3">
                    <LogOut size={24} />
                    <span>Logout ({user.username})</span>
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#9CAF88] transition">
                    Login / Register
                  </Link>
                )}
              </li>
            </ul>

            <div className="flex justify-start space-x-8 mt-auto border-t border-[#DFE6DA] dark:border-[#2A3630] pt-6 text-[#1D2E28] dark:text-white">
              <button onClick={toggleTheme} className="flex items-center space-x-2">
                {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutModal(false)}
              className="absolute inset-0 bg-[#0A0E0C]/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white dark:bg-[#111814] border border-[#DFE6DA] dark:border-[#2A3630] rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-[#e63946]/10 text-[#e63946] rounded-full flex items-center justify-center mx-auto mb-6">
                <LogOut size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#1D2E28] dark:text-[#EAECE9] mb-2">Sign Out</h3>
              <p className="text-[#758467] dark:text-[#A4B396] mb-8">Are you sure you want to log out of your account?</p>
              
              <div className="flex space-x-4">
                <button 
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-3 rounded-xl font-bold bg-[#F8F7FF] dark:bg-[#0A0E0C] text-[#1D2E28] dark:text-[#EAECE9] border border-[#DFE6DA] dark:border-[#2A3630] hover:bg-[#DFE6DA] dark:hover:bg-[#2A3630] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    logout();
                    setShowLogoutModal(false);
                  }}
                  className="flex-1 py-3 rounded-xl font-bold bg-[#e63946] text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
