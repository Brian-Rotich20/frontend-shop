// card for each product

import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded shadow hover:shadow-md transition p-4">
        <img
          src={`https://django-shop-drf-production.up.railway.app${product.image}`}
          alt={product.name}
          className="h-40 w-full object-cover rounded"
        />
        <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
        <p className="text-red-600 font-bold">Ksh {product.price}</p>
      </div>
    </Link>
  );
}
