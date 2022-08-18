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
const CreatedPins = () => {
  const { user } = useUser();
  const { data, loading, error } = useQuery(PinByUserEmail,{
    variables:{
        userId:user?.email
    }
  });


  return (
    <div>
        <UserProfile />
  
        <div>
        {data?.user.pins.map((item:IPin)=>(
            <Link key={uuidv4()} href={`/pin/${item?.id}`}>
                <Image src={item.imageUrl}  alt="pin" width={200} height={400} objectFit="cover" className='cursor-pointer rounded-2xl '  />
            
            </Link>
        ))}
               
        </div>
    
  

    </div>
  )
}

export default CreatedPins