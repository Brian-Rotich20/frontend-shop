// pages/api/cart/add.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { productId, quantity, cart_code, email } = req.body;


    const djangoRes = await fetch('https://inova-shop.onrender.com/add_to_cart/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: productId,
        quantity,
        cart_code,
        email,
      }),
    });

    const data = await djangoRes.json();

    if (!djangoRes.ok) {
      return res.status(djangoRes.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      message: 'Failed to add product to cart',
      error: error.message,
    });
  }
}