import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IPin } from '../interface'

interface IProps {
    item:IPin;
    isEdit?:boolean;
}
const Pin = ({ item,isEdit }:IProps) => {
    const widthGenerator = () => {
        return Math.floor(Math.random() * (450 - 300 + 1) + 300)
      }
      const heightGenerator = () => {
        return Math.floor(Math.random() * (450 - 300 + 1) + 300)
      }
  return (
    <div key={item.userId} className="relative my-3">
        <Link href={`/pin/${item?.id}`}>
            <span className='cursor-pointer'>
                  <Image src={item.imageUrl}  alt="pin" width={widthGenerator()} height={heightGenerator()} objectFit="cover" className='cursor-pointer rounded-2xl '  />
                  {!isEdit && (
                   <h1 className=' font-semibold'>{item.title}</h1>

                  )}

              </span>
          

    
        </Link>
              
                  
    </div>
  )
}

export default Pin