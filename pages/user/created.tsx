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
import MasonryWrapper from '../../components/MasonryWrapper';
import Pin from '../../components/Pin';
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
        <MasonryWrapper>
          <>
            {data?.user.pins.length !== 0 ? (
              <>
                {data?.user.pins.map((item:IPin)=>(
              
                    <Pin key={uuidv4()} item={item} />
                ))}
              </>
            ):(
              <h1>No pins created yet!</h1>
            )}
          </>
          
   
               
        </MasonryWrapper>
    
  

    </div>
  )
}

export default CreatedPins