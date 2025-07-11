// pages/api/cart/index.js - Get cart items
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const cart_code = req.query.cart_code;

  if (!cart_code) {
    return res.status(400).json({ error: 'cart_code parameter is required' });
  }

  try {
    // Updated URL to match Django backend
    const response = await fetch(`https://django-shop-drf.onrender.com/get_cart/${cart_code}`);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch cart items:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}