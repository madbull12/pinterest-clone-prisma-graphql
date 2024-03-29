import type { NextPage } from 'next'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { FeedQuery } from '../lib/query'
import Loading from '../components/Loading'
import { useRecoilState } from 'recoil'
import { searchResultState } from '../atom/searchAtom'
import { v4 as uuidv4 } from 'uuid'
import Pin from '../components/Pin'
import { useSession } from 'next-auth/react'
import MasonryWrapper from '../components/MasonryWrapper'
import Container from '../components/Container'
import { PinWithPayload } from '../interface'
import { trpc } from '../utils/trpc'


const Home: NextPage = () => {
  // const { data, loading, error } = useQuery(FeedQuery);

  const { data,error,isLoading } = trpc.pin.getAllPins.useQuery<PinWithPayload[]>()
console.log(data)
  const [searchResults,_] = useRecoilState<any>(searchResultState)
  console.log(searchResults)
  const { data:session } = useSession();
  console.log(session)
  if(isLoading) return (
    <div className='justify-center flex py-4'>
      <Loading />
    </div>
  )
  if(error) return <p>{error.message}</p>


  return (
    <Container>
      <Head>
        <title>Pinterest</title>
      </Head>
      <p className='text-center font-semibold  py-4 text-lg '>For you</p>
      <MasonryWrapper>

            {data?.map((item)=>(
              <Pin key={uuidv4()} item={item} />
            ))}

      </MasonryWrapper>
    </Container>
  )
}

export default Home
