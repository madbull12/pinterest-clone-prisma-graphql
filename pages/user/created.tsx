import { useQuery } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Masonry from 'react-masonry-css';
import UserProfile from '../../components/UserProfile'
import { IPin } from '../../interface';
import { PinByUserEmail } from '../../lib/query';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../../components/Loading';
const CreatedPins = () => {
  const { user } = useUser();
  const { data, loading, error } = useQuery(PinByUserEmail,{
    variables:{
        userId:user?.email
    }
  });

  console.log(data)

  return (
    <div>
        <UserProfile />
        {loading && (
          <div className='flex justify-center pt-4'> 
            <Loading />
          </div>
        )}
        <div className='mx-auto max-w-7xl grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 mt-4 '>
          {data?.user.pins.length !== 0 ? (
            <>
              {data?.user.pins.map((item:IPin)=>(
                            <Link key={uuidv4()} href={`/pin/${item?.id}`}>
                                <Image src={item.imageUrl}  alt="pin" width={200} height={400} objectFit="cover" className='cursor-pointer rounded-2xl '  />
                            
                            </Link>
              ))}
            </>
          ):(
            <h1>No pins created yet!</h1>
          )}
   
               
        </div>
    
  

    </div>
  )
}

export default CreatedPins