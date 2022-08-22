import { useQuery } from '@apollo/client'
import Link from 'next/link'
import React from 'react'
import Loading from '../../components/Loading'
import UserProfile from '../../components/UserProfile'
import { SavedPinsQuery, UserIdQuery, UserSavedPins } from '../../lib/query'
import { v4 as uuidv4 } from 'uuid'
import { IPin } from '../../interface'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0'
const SavedPins = () => {
  const { user } = useUser();
  const { data:userId } = useQuery(UserIdQuery,{
    variables:{
      userId:user?.email
    }
  })
  
  const { data,loading,error } = useQuery(UserSavedPins,{
    variables:{
      userId:userId?.user.id
    }
  }) 
  console.log(data);


  return (
    <div>
        <UserProfile />
        {loading && (
          <div className='flex justify-center pt-4'> 
            <Loading />
          </div>
        )}
        <section className='mx-auto max-w-7xl grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 mt-4 '>
          {data?.userSaved.length !== 0  ? (
            <>
              {data?.userSaved.map((item:any)=>(
                <Link key={uuidv4()} href={`/pin/${item?.pin.id}`}>
                    <Image src={item.pin.imageUrl}  alt="pin" width={300} height={450} objectFit="cover" className='cursor-pointer rounded-2xl '  />
                
                </Link>
                ))}
            </>
        
          ):(
            <h1 className='text-xl  font-semibold'>No pins saved yet</h1>
          )}
   
        </section>
   
    </div>
  )
}

export default SavedPins