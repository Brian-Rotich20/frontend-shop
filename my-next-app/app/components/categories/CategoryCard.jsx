
import Link from 'next/link';

export default function CategoryCard({ category }) {
  return (
    <Link 
      href={`/categories/${category.slug}`} 
      className="group block rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white border border-gray-100 hover:border-gray-200"
    >
      <div className="relative">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-28 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors duration-200 line-clamp-1">
          {category.name}
        </h3>
      </div>
    </Link>
      );
}
