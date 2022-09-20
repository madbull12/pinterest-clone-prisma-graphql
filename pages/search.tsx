import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useMemo } from 'react'
import Masonry from 'react-masonry-css';
import { useRecoilValue } from 'recoil';
import { searchResults } from '../atom/searchAtom';
import { IPin } from '../interface';
import { v4 as uuidv4 } from 'uuid'
import { FiPlus } from 'react-icons/fi';

const SearchPage = () => {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
      };
      const widthGenerator = useCallback(()=>{
        return Math.floor(Math.random() * (450 - 300 + 1) + 300)

      },[])
      const heightGenerator =  useCallback(()=>{
        return Math.floor(Math.random() * (450 - 300 + 1) + 300)

      },[])
    const pins = useRecoilValue<any>(searchResults);
    console.log(pins)
  return (
    <div>
         <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
        {pins?.length !== 0 ? (
            <>
                 {pins?.map((item:IPin)=>(
                        <div key={uuidv4()} className="relative my-3">
                            <Link href={`/pin/${item?.id}`}>
                            <span className='cursor-pointer'>
                                <Image src={item.imageUrl}  alt="pin" width={widthGenerator()} height={heightGenerator()} objectFit="cover" className='cursor-pointer rounded-2xl '  />

                                <h1 className=' font-semibold'>{item.title}</h1>
                            </span>
                    
                            </Link>
                            
                                
                        </div>
                ))}

            </>
        ):(
            <h1>No Pins found</h1>
        )}
        
       
           
    
           
        
        {/* array of JSX items */}
    
           
      

      </Masonry>
    </div>
  )
}

export default SearchPage