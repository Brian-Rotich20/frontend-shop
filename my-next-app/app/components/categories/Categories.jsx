// - Fetch categories from your Django API
// - Map over the data
// - Render CategoryCard for each category
// - steps
//1️⃣ Cliient Component → uses useEffect() + useState() to fetch
//2️⃣ Display loading, error, or the categories
//3️⃣ Calls a placeholder API for now → you’ll replace with your real Django API URL

// import Categories from "@/components/categories/Categories" - This would be used in fetching categories in the main page
import CategoryCard from './CategoryCard';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_API_BASE_URL

async function getCategories() {
  const res = await fetch(`${BASE_URL}/category_list`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch categories');
  
  const data = await res.json();

  return data.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    image: cat.image?.startsWith('http')
      ? cat.image
      : `${CLOUDINARY_URL}/${cat.image}`,
  }));
}

export default async function Categories() {
  let categories = [];

  try {
    categories = await getCategories();
  } catch (error) {
    return (
      <p className="text-center py-6 text-red-500">
        {error.message || 'Something went wrong'}
      </p>
    );
  }

return (
  <section className="py-10 bg-gray-50">
    <div className="w-full px-4">
      <div className="flex gap-3 w-full">
        {categories.map((category) => (
          <div key={category.id} className="flex-1 min-w-0">
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  </section>
);
}