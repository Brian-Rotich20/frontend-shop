// product detail

async function getProduct(id) {
    const res = await fetch(`https://django-shop-drf-production.up.railway.app/product/${id}/`, {
        cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
}

export default async function ProductsPage({ params }) {
    const product = await getProduct(params.productId); 

    if (!product) {
        return <div className="p-8 text-center">Product not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <img
                src={`https://django-shop-drf-production.up.railway.app${product.image}`}
                alt={product.name}
                className="w-full h-[400px] object-cover rounded mb-4"
            />
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-2xl font-semibold text-red-600 mb-6">Ksh {product.price}</p>
            <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
                Add to Cart
            </button>
        </div>
    );
}
