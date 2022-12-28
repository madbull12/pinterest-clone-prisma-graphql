import { Category } from '@prisma/client'
import React from 'react'
import { CategoryWithPins, ICategory } from '../interface'
import CategoryBox from './CategoryBox'

const CategoryList = ({ categories }:{ categories:CategoryWithPins[]}) => {
  return (
    <div className='grid grid-cols-1 xs:grid-cols-2 min-[500px]:grid-cols-3 md:grid-cols-4 gap-4 '>
        {categories?.filter((category:CategoryWithPins)=>category.pins.length !== 0).map((category:CategoryWithPins)=>(
            <CategoryBox category={category} />
        ))}
    </div>
  )
}

export default CategoryList