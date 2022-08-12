import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { pins } from '../data/pins'
import Masonry from 'react-masonry-css'
import { IPin } from '../interface'

const Home: NextPage = () => {
  const widthGenerator = () => {
    return Math.floor(Math.random() * (450 - 300 + 1) + 300)
  }
  const heightGenerator = () => {
    return Math.floor(Math.random() * (450 - 300 + 1) + 300)
  }
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  return (
    <div className='m-4'>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {/* array of JSX items */}
        {pins?.map((item:IPin)=>(
            <div key={item.userId} className="relative">
                
                  <Image src={item.imageUrl} alt="pin" width={widthGenerator()} height={heightGenerator()} objectFit="cover" className='rounded-2xl '  />
                  <div className='absolute bottom-0 text-white'>
                    <h1>fsfs</h1>
                  </div>
                
            </div>
        ))}
      </Masonry>
    </div>
  )
}

export default Home
