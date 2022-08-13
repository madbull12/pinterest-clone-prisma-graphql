import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { SinglePinQuery } from '../../lib/query';
import { HiArrowLeft, HiDotsHorizontal, HiDownload, HiLink } from 'react-icons/hi'
import { IComment, IPin } from '../../interface';
import Image from 'next/image';
import { MdExpandMore } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

interface IProps {
  comment:IComment
}
const Comment = ({ comment }: IProps) => {
  return (
    <div key={uuidv4()} className={`flex gap-x-2 items-center`}>
      <Image className='rounded-full' width={40} height={40} alt="user-picture" src={comment?.user?.image || "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"} />
      <div>
        <p className='text-gray-500'>{comment.user.email}</p>
        <p className='text-lg'>{comment.content}</p>
      </div>
    </div>
  )
}

const PinDetail = () => {
    const [expandComment,setExpandComment] = useState(false)
    const router = useRouter();
    const { pinId } = router.query

    const { data,loading,error } = useQuery(SinglePinQuery,{
        variables:{
            pinId
        }
    });

    const { pin }: { pin:IPin } = data || {};
    console.log(pin)
    if(loading) return <p>Loading...</p>
    if(error) return <p>{error.message}</p>
  return (
    <main className='max-w-7xl mx-auto my-8 p-4'>
      <div className='flex gap-x-8'>
        <HiArrowLeft className="text-3xl cursor-pointer hidden md:block " onClick={()=>router.back()} />
        <section className='shadow-lg rounded-3xl w-full flex flex-col md:flex-row'>
          <div className=' relative  '>
            <Image src={pin.imageUrl} alt="image" width={700} height={650} objectFit="cover" className="rounded-3xl"   />

          </div>
          <div className="p-8 w-full">
            <nav className='flex justify-between  items-center  '>
              <div className='space-x-6 flex text-2xl'>
                <HiDotsHorizontal />
                <HiDownload />
                <HiLink />
              </div>
              <div className='ml-auto'>
                <button className='bg-[#E60023] rounded-full px-4 py-2 text-lg font-semibold text-white'>Save</button>
              </div>
            </nav>
            <div className='mt-4'>
              <h1 className='text-2xl md:text-4xl font-bold'>{pin.title}</h1>
              <p className='text-sm md:text-base'>{pin.description}</p>
              <div>
                <div className='flex items-center gap-x-2 font-semibold text-xl'>
                  <span >
                    {pin.comments.length === 0 ? "" :pin.comments.length } Comments

                  </span>
                  <MdExpandMore className="text-4xl animate-bounce cursor-pointer" onClick={()=>setExpandComment((prev)=>!prev)} />
              </div>
              {expandComment && (
                <>
                  {pin.comments.map((comment:IComment)=>(
                    <Comment key={uuidv4()} comment={comment} />
                  ))}
                </>
              )}
        
               

              </div>
            </div>
          </div>
          
        </section>
      </div>
    </main>
  )
}

export default PinDetail