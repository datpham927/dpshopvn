import React from 'react'
import { Category } from '../../interfaces/interfaces'

const CategoryItem:React.FC<{props:Category}> = ({props}) => {
   const  {category,category_code,category_image,category_slug}=props
    return (
        <a
            href={`/${category_slug}?category=${category_code}`}
            className="flex flex-col gap-2 w-full h-full px-1  items-center cursor-pointer hover:translate-y-[-4px] duration-500"
        >
            <div className="w-2/3">
                <img className="w-full h-full  px-3 rounded-lg object-fill" src={category_image} />
            </div>
            <p className="text-xs px-2 text-center">{category}</p>
        </a>
    );
}

export default CategoryItem