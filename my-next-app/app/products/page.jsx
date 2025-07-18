// //products list
// import ProductList from '@components/ProductList';


// async function getProducts() {
//   const res = await fetch('https://django-shop-drf.onrender.com/product_list',  {
//     cache: 'no-store',
//   });
//   if (!res.ok) return [];
//   const data = await res.json();
//   // If your API returns { results: [...] }
//   return Array.isArray(data) ? data : data.results || [];
// }

// export default async function ProductsPage() {
//   const products = await getProducts();

//   return (
//     <main className="p-6">
//       <h1 className="text-2xl font-bold mb-4">All Products</h1>
//       <ProductList products={products} />
//     </main>
//   );
//}
