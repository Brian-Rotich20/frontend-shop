'use client'
// import AddToCartButton from './AddToCartButtoon';
import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);
  const { refreshCart, getOrCreateCartCode } = useCart();
  const [imageError, setImageError] = useState(false);

const getImageUrl = (imagePath) => {
  const cloudinaryBaseUrl = process.env.NEXT_PUBLIC_CLOUDINARY_API_BASE_URL;
  if (!imagePath) return '/fallback.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  return `${cloudinaryBaseUrl}/${imagePath}`;
};

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      
      
      const cartCode = await getOrCreateCartCode();
      if (!cartCode) {
        alert('Failed to create cart. Please try again.');
        return;
      }

      
      const userEmail = localStorage.getItem('user_email') || null;

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
        alert('Product added to cart successfully!');
        refreshCart(); 
      } else {
        alert(`Failed to add to cart: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleImageError = () => {
      setImageError(true);
    };
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      {product.image && !imageError ? (
        <img 
          src={getImageUrl(product.image)} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
          onError={handleImageError}
          onLoad={() => console.log('Image loaded successfully:', getImageUrl(product.image))}
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-xl font-bold text-green-600 mb-4">${product.price}</p>
   <button 
      onClick={(e) => {
          e.stopPropagation();        
          addToCart(product.id);      
        }}
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
          loading 
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {loading ? 'Adding...' : 'Add to Cart'}
    </button>

    </div>
  );
}