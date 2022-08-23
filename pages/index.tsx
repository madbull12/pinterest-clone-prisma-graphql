import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Masonry from 'react-masonry-css'
import { IPin } from '../interface'
import { useQuery } from '@apollo/client'
import { FeedQuery } from '../lib/query'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import Loading from '../components/Loading'
import { useRecoilState } from 'recoil'
import { searchResultState } from '../atom/searchAtom'
import { useEffect } from 'react'
import { useRouter } from 'next/router'


const Home: NextPage = () => {
  const { data, loading, error } = useQuery(FeedQuery);

  const [searchResults,setSearchResults] = useRecoilState<any>(searchResultState)





  console.log(searchResults)
  const { user } = useUser();
  if(loading) return (
    <div className='justify-center flex py-4'>
      <Loading />
    </div>
  )
  if(error) return <p>{error.message}</p>
  console.log(user)
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
    <div className='p-4 max-w-7xl mx-auto'>
      <Head>
        <title>Pinterest</title>
      </Head>
      <p className='text-center font-semibold  py-4 text-lg '>For you</p>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        


            {data?.pins?.map((item:IPin)=>(
              <div key={item.userId} className="relative my-3">
                    <Link href={`/pin/${item?.id}`}>
                      <span className='cursor-pointer'>
                        <Image src={item.imageUrl}  alt="pin" width={widthGenerator()} height={heightGenerator()} objectFit="cover" className='cursor-pointer rounded-2xl '  />

                        <h1 className=' font-semibold'>{item.title}</h1>
                      </span>
              
                    </Link>
                    {/* <div className='absolute bottom-0 text-white'>
                      <h1>fsfs</h1>
                    </div> */}
                  
              </div>
            ))}
        
          
    
           
        
        {/* array of JSX items */}
    
           
      

      </Masonry>
    </div>
  )
}

export default Home
