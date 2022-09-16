import type { NextPage } from 'next'
import Head from 'next/head'
import { IPin } from '../interface'
import { useQuery } from '@apollo/client'
import { FeedQuery } from '../lib/query'
import { useUser } from '@auth0/nextjs-auth0'
import Loading from '../components/Loading'
import { useRecoilState } from 'recoil'
import { searchResultState } from '../atom/searchAtom'
import { v4 as uuidv4 } from 'uuid'
import Pin from '../components/Pin'
import MasonryWrapper from '../components/MasonryWrapper'


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


  return (
    <div className='p-4 max-w-7xl mx-auto'>
      <Head>
        <title>Pinterest</title>
      </Head>
      <p className='text-center font-semibold  py-4 text-lg '>For you</p>
      <MasonryWrapper>

            {data?.pins?.map((item:IPin)=>(
              <Pin key={uuidv4()} item={item} />
            ))}

      </MasonryWrapper>
    </div>
  )
}

export default Home
