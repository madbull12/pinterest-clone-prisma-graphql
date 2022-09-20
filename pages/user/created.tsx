import { useQuery } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import Masonry from 'react-masonry-css';
import UserProfile from '../../components/UserProfile'
import { IPin } from '../../interface';
import { PinByUserEmail } from '../../lib/query';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../../components/Loading';
import MasonryWrapper from '../../components/MasonryWrapper';
import Pin from '../../components/Pin';
import HoverEditWrapper from '../../components/HoverEditWrapper';
import { MdEdit } from 'react-icons/md';
const CreatedPins = () => {
  const { user } = useUser();
  const { data, loading, error } = useQuery(PinByUserEmail,{
    variables:{
        userId:user?.email
    }
  });
  const[isHover,setIsHover] = useState(false)

  console.log(data)
  if(data?.user.pins.length === 0) return <h1>No pins created </h1>

  return (
    <div className='relative'>
        <UserProfile />
        {loading && (
          <div className='flex justify-center pt-4'> 
            <Loading />
          </div>
        )}
        <MasonryWrapper >
                 {data?.user.pins.map((item:IPin)=>(
              
                  <div onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} key={uuidv4()} className="relative cursor-pointer ">
                
                      <div className='absolute  bg-black opacity-60 h-full w-full z-50 rounded-lg '>
                      <div className="w-8 h-8 bottom-2 mx-auto  left-0 right-0 z-[999] absolute rounded-full bg-white place-items-center grid">
                        <MdEdit/>

                      </div>
                    </div>
                    
                 
                    <Pin item={item} />


                  </div>
                
                    
                ))}
               
        </MasonryWrapper>
    
  

    </div>
  )
}

export default CreatedPins