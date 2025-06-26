// Receives props: name, image, maybe slug
// - Displays a styled card/grid element

'use client'

import Link from 'next/link';

export default function CategoryCard({ category }) {
    return(
        <Link href={'/categories/${category.slug}'} className='block rounded overflow-hidden shadow-sm hover:shadow-md transition bg-white'>
            <img
            src={category.image}
            alt={category.name}
            className='w-full h-40 object-cover'
            />
            <div className='p-4'>
            <h3 className='text-lg font-semibold text-gray-800'>{category.name}</h3>
            </div>
        </Link>
    )
}