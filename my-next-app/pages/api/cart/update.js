// pages/api/cart/update.js - Update cart item quantity
export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { item_id, quantity } = req.body;

  if (!item_id || !quantity) {
    return res.status(400).json({ error: 'item_id and quantity are required' });
  }

  try {
    const response = await fetch(
      'https://inova-shop.onrender.com/update_cartitem_quantity/',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item_id,
          quantity
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Failed to update cart item:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
