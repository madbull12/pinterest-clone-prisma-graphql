import { useQuery } from '@apollo/client'
import Link from 'next/link'
import React from 'react'
import Loading from '../../components/Loading'
import UserProfile from '../../components/UserProfile'
import { SavedPinsQuery } from '../../lib/query'
import { v4 as uuidv4 } from 'uuid'
import { IPin } from '../../interface'
import Image from 'next/image'
const SavedPins = () => {
  const { data,loading,error } = useQuery(SavedPinsQuery) 
  console.log(data);


  return (
    <div>
        <UserProfile />
        {loading && (
          <div className='flex justify-center pt-4'> 
            <Loading />
          </div>
        )}
        <section className='mx-auto max-w-7xl grid grid-cols-4  gap-4 mt-4 '>
          {data?.saved.length !== 0  ? (
            <>
              {data?.saved.map((item:any)=>(
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