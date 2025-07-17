import { useSession } from 'next-auth/react';
import { toggleWishlist } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Heart, HeartFilled } from 'lucide-react';

export default function WishlistButton({ productId }) {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const [inWishlist, setInWishlist] = useState(false);


  useEffect(() => {
    if (email) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product_in_wishlist?product_id=${productId}&email=${email}`)
        .then(res => res.json())
        .then(data => setInWishlist(data.in_wishlist));
    } else {
      const guestWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setInWishlist(guestWishlist.includes(productId));
    }
  }, [productId, email]);

  async function handleToggle() {
    await toggleWishlist(productId, email);
    setInWishlist(prev => !prev);
  }

return (
    <button onClick={handleToggle} className="text-red-500">
      <Heart
        className={`w-6 h-6 transition ${
          inWishlist ? 'fill-red-500 stroke-red-500' : 'stroke-current'
        }`}
      />
    </button>
  );
}
