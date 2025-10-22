'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartCode, setCartCode] = useState(null);

  const getOrCreateCartCode = async () => {
    try {
      if (typeof window === 'undefined') return null;
      
      let code = localStorage.getItem('cart_code');
      
      if (!code) {
        code = Math.random().toString(36).substring(2, 13);
        localStorage.setItem('cart_code', code);
        
        // Since there's no create_cart endpoint in your Django URLs, 
        // we'll just store the code and let Django create it when first item is added
        console.log('✅ Cart code created:', code);
      }
      
      setCartCode(code);
      return code;
    } catch (error) {
      console.error('❌ Error managing cart code:', error);
      return null;
    }
  };


 const fetchCartCount = async () => {
  try {
    const code = typeof window !== 'undefined' && localStorage.getItem('cart_code');
    if (!code) {
      console.warn('🛑 No cart_code found in localStorage.');
      return;
    }

    const res = await fetch(`https://inova-shop.onrender.comget_cart_stat?cart_code=${code}`);
    const data = await res.json();

    console.log('🧮 Fetched cart count:', data);

    if (res.ok && data?.num_of_items !== undefined) {
      setCartCount(data.num_of_items);
    }
  } catch (error) {
    console.error('Failed to fetch cart count:', error);
  }
};


  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ 
      cartCount, 
      setCartCount, 
      cartCode, 
      getOrCreateCartCode,
      refreshCart: fetchCartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};