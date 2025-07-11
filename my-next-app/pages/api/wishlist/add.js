// pages/api/wishlist/toggle.js (or you can keep it as add.js)
export default function handler(req, res) {
  console.log('Wishlist Toggle API called:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  try {
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    // TODO: Check if product is already in wishlist from your database
    // For now, we'll simulate the toggle logic
    const isCurrentlyInWishlist = Math.random() > 0.5; // Mock check
    
    const action = isCurrentlyInWishlist ? 'removed from' : 'added to';
    const newWishlistState = !isCurrentlyInWishlist;
    
    console.log(`Product ${productId} ${action} wishlist`);
    
    return res.status(200).json({ 
      success: true, 
      message: `Product ${action} wishlist successfully`,
      productId,
      isInWishlist: newWishlistState
    });
    
  } catch (error) {
    console.error('Wishlist Toggle Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to update wishlist',
      error: error.message
    });
  }
}