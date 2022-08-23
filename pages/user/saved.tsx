import { useQuery } from '@apollo/client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import UserProfile from '../../components/UserProfile'
import { SavedPinsQuery, UserIdQuery, UserSavedPins } from '../../lib/query'
import { v4 as uuidv4 } from 'uuid'
import { IPin } from '../../interface'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0'
import { FiPlus } from 'react-icons/fi'
import BoardModal from '../../components/BoardModal'
import Backdrop from '../../components/Backdrop'
import { useRecoilState, useRecoilValue } from 'recoil'
import { boardModalState, isOpen } from '../../atom/boardAtom'
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

  const [createOpen,setCreateOpen] = useState(false);


  const [openModal,setOpenModal] = useRecoilState(boardModalState)
  const isBoardOpen = useRecoilValue(isOpen);

  useEffect(()=>{
    
    document.body.style.overflow = isBoardOpen ? 'hidden' : 'scroll'

  },[isBoardOpen])

  return (
    <div>

        <UserProfile />

        {isBoardOpen && (
          <Backdrop>
            <BoardModal />
          </Backdrop>
        )}
    
        {loading && (
          <div className='flex justify-center pt-4'> 
            <Loading />
          </div>
        )}
        <section className='mx-auto max-w-7xl mt-4 flex flex-col  '>
          <div className='relative self-end'>
            <div className='hover:bg-gray-200 z-50 w-10 h-10 grid  place-items-center rounded-full ' onClick={()=>setCreateOpen(!createOpen)}>
              <FiPlus className='text-2xl text-end cursor-pointer' />

            </div>
            {createOpen && (
              <div className="absolute -bottom-34 right-0 bg-white shadow-md rounded-lg px-2 py-3 w-40 ">
                <p className="text-sm px-2">Create</p>
                <ul className="font-semibold  mt-2">
                  <li className="cursor-pointer  hover:bg-gray-200  p-2 rounded-lg">
                    <Link href="/pin-builder">
                      Pin
                    </Link>
                  </li>
                  <li className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg " onClick={()=>{
                    setOpenModal(true)
                    window.scrollTo(0,0)
                  }}>Board</li>
                </ul>
              </div>
            )}
        
          </div>
      
          <div className=' grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4'>
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
          </div>

      
   
        </section>
   
    </div>
  )
}

export default SavedPins