// utils/cartUtils.js
export const cartUtils = {
  
  // Get cart code from localStorage
  getCartCode: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cart_code');
    }
    return null;
  },

  // Generate and store new cart code
  generateCartCode: () => {
    const code = Math.random().toString(36).substring(2, 13);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart_code', code);
    }
    return code;
  },

  // Add product to cart
  addToCart: async (productId, quantity = 1, userEmail = null) => {
    try {
      const cartCode = cartUtils.getCartCode() || cartUtils.generateCartCode();
      
      const response = await fetch('https://django-shop-drf.onrender.com/add_to_cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity,
          cart_code: cartCode,
          email: userEmail
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.error || 'Failed to add to cart' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get cart items
  getCartItems: async () => {
    try {
      const cartCode = cartUtils.getCartCode();
      if (!cartCode) return { success: false, error: 'No cart found' };

      const response = await fetch(`https://django-shop-drf.onrender.com/get_cart/${cartCode}`);
      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.error || 'Failed to fetch cart' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Update cart item quantity
  updateCartItemQuantity: async (itemId, quantity) => {
    try {
      const cartCode = cartUtils.getCartCode();
      if (!cartCode) return { success: false, error: 'No cart found' };

      const response = await fetch('https://django-shop-drf.onrender.com/update_cartitem_quantity/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id: itemId,
          quantity: quantity,
          cart_code: cartCode
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.error || 'Failed to update quantity' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Remove cart item
  removeCartItem: async (itemId) => {
    try {
      const cartCode = cartUtils.getCartCode();
      if (!cartCode) return { success: false, error: 'No cart found' };

      const response = await fetch(`https://django-shop-drf.onrender.com/delete_cartitem/${itemId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart_code: cartCode
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.error || 'Failed to remove item' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get cart statistics
  getCartStats: async () => {
    try {
      const cartCode = cartUtils.getCartCode();
      if (!cartCode) return { success: false, error: 'No cart found' };

      const response = await fetch(`https://django-shop-drf.onrender.com/get_cart_stat?cart_code=${cartCode}`);
      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.error || 'Failed to fetch cart stats' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Check if product is in cart
  isProductInCart: async (productId) => {
    try {
      const cartCode = cartUtils.getCartCode();
      if (!cartCode) return { success: false, error: 'No cart found' };

      const response = await fetch(`https://django-shop-drf.onrender.com/product_in_cart?product_id=${productId}&cart_code=${cartCode}`);
      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.error || 'Failed to check product in cart' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};