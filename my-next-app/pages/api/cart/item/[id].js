export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const response = await fetch(
      `https://inova-shop.onrender.com/delete_cartitem/${id}/`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    return res.status(204).end();
  } catch (error) {
    console.error('Failed to delete cart item:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}