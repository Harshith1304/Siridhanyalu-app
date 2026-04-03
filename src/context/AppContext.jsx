import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialUser = (() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  })();

  const [user, setUser] = useState(initialUser); // auth state
  
  // Orders tracking per user
  const [orders, setOrders] = useState(() => {
    if (initialUser) {
      const saved = localStorage.getItem(`orders_${initialUser.email || initialUser.username}`);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  
  const [language, setLanguage] = useState('en'); // 'en' or 'te'
  
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved : 'light';
  });
  
  const [cart, setCart] = useState(() => {
    if (initialUser) {
      const saved = localStorage.getItem(`cart_${initialUser.username}`);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  
  const [wishlist, setWishlist] = useState(() => {
    if (initialUser) {
      const saved = localStorage.getItem(`wishlist_${initialUser.username}`);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (user === null) {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.username}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`wishlist_${user.email || user.username}`, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`orders_${user.email || user.username}`, JSON.stringify(orders));
    }
  }, [orders, user]);

  // Setup theme class strictly for Tailwind
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'te' : 'en');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const login = (email, password) => {
    // Check against registered users in localStorage
    const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = savedUsers.find(u => u.email === email && u.password === password);
    
    // Also support fallback test users
    if (foundUser || (email === 'admin' && password === 'admin') || (email === 'user1' && password === 'user1')) {
      const activeUser = foundUser || { username: email, email };
      setUser(activeUser);
      
      const userIdentifier = activeUser.email || activeUser.username;
      
      const userCart = localStorage.getItem(`cart_${userIdentifier}`);
      setCart(userCart ? JSON.parse(userCart) : []);

      const userWishlist = localStorage.getItem(`wishlist_${userIdentifier}`);
      setWishlist(userWishlist ? JSON.parse(userWishlist) : []);

      const userOrders = localStorage.getItem(`orders_${userIdentifier}`);
      setOrders(userOrders ? JSON.parse(userOrders) : []);

      return true;
    }
    return false;
  };

  const register = (fullName, email, password) => {
    const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (savedUsers.find(u => u.email === email)) {
      return { success: false, message: 'Email already exists' };
    }
    const newUser = { fullName, email, password };
    localStorage.setItem('registeredUsers', JSON.stringify([...savedUsers, newUser]));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
    setOrders([]);
  };

  const addOrder = (orderData) => {
    setOrders(prev => [orderData, ...prev]);
  };

  const addToCart = (product, size) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{
      user, login, logout, register,
      language, toggleLanguage,
      theme, toggleTheme,
      cart, addToCart, clearCart,
      wishlist, toggleWishlist,
      orders, addOrder
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
