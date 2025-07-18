// app/categories/[slug]/page.jsx
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CLOUDINARY_BASE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_API_BASE_URL;

const getImageUrl = (imagePath) => {
  if (!imagePath) return '/fallback.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  return `${CLOUDINARY_BASE_URL}/${imagePath}`;
};

async function getCategory(slug) {
  const res = await fetch(`${BASE_URL}/categories/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Error:', res.status);
    return null;
  }

  return res.json();
}

export default async function CategoryPage({ params }) {
  const { slug } = await params; // ✅ await the params Promise
  const data = await getCategory(slug);

  if (!data) {
    return <div className="p-6 text-center text-red-600">404 - Category Not Found</div>;
  }

  const { name, image, products } = data;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">{name} Products</h1>

      {image && (
        <div className="w-40 h-40 rounded overflow-hidden shadow mb-6">
          <img
            src={getImageUrl(image)}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const imageUrl = getImageUrl(product.image);

            return (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="h-40 w-full object-cover rounded"
                  />
                  <h3 className="font-semibold mt-2">{product.name}</h3>
                  <p className="font-bold text-blue-600">Ksh {product.price}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">No products found in this category.</p>
      )}
    </main>
  );
}
