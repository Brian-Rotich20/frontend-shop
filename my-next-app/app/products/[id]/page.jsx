// app/products/[id]/page.jsx

async function getProduct(id) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/products/id/${id}/`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}

function formatImageUrl(path) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const fixedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${fixedPath}`;
}

export default async function ProductDetailPage({ params }) {
 const { id } =  params;
const product = await getProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600">Sorry, we couldn't find the product you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-6">
              <div className="aspect-square max-w-md mx-auto">
                <img
                  src={formatImageUrl(product.image)}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="h-full flex flex-col justify-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-blue-600">
                    Ksh {product.price?.toLocaleString()}
                  </span>
                </div>

                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex-1">
                    Add to Cart
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex-1">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
