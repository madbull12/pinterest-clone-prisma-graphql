import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { SinglePinQuery, UserIdQuery } from '../../lib/query';
import { HiArrowLeft, HiDotsHorizontal, HiDownload, HiLink } from 'react-icons/hi'
import { IComment, IPin } from '../../interface';
import Image from 'next/image';
import { MdExpandMore } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'
import Loading from '../../components/Loading';
import { useUser } from '@auth0/nextjs-auth0';
import { savePinMutation } from '../../lib/mutation';
import toast from 'react-hot-toast';

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
    const { pinId } = router.query;
    const { user } = useUser();

    const [saveMutation,{}] = useMutation(savePinMutation);

    const { data:userId } = useQuery(UserIdQuery,{
      variables:{
          userId:user?.email
      }
    });


    const { data,loading,error } = useQuery(SinglePinQuery,{
        variables:{
            pinId
        }
    });

    

    console.log(data)

  

    const { pin }: { pin:IPin } = data || {};

    const savePin = () => {
      const variables = { 
        userId:userId?.user.id,
        pinId
      }

      try {
        toast.promise(saveMutation({ variables }), {
          loading: 'Saving pin..',
          success: 'Pin successfully saved!🎉',
          error: `Something went wrong 😥 Please try again -  ${error}`,
        })
  
      } catch (error) {
        console.error(error)
      }
    }

    if(loading) return (
      <div className='flex justify-center py-4'>
        <Loading />
      </div>  
    )
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
                <button onClick={savePin} className='bg-[#E60023] rounded-full px-4 py-2 text-lg font-semibold text-white'>Save</button>
              </div>
            </nav>
            <div className='mt-4 space-y-3'>
              <h1 className='text-2xl md:text-4xl font-bold'>{pin.title}</h1>
              <p className='text-sm md:text-base'>{pin.description}</p>
              <div className='flex gap-x-3'>
                <Image alt="user-avatar" className='rounded-full' src={data?.pin.user.image || "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"} width={40} height={40}   />
                <p>{data?.pin.user.email}</p>
              </div>
              <div>
                <div className='flex items-center gap-x-2 font-semibold text-xl'>
                  <span >
                    {pin.comments.length === 0 ? "" :pin.comments.length } Comments

                  </span>
                  <MdExpandMore className="text-4xl animate-bounce cursor-pointer" onClick={()=>setExpandComment((prev)=>!prev)} />
              </div>
              {expandComment && (
                <div className='space-y-2 my-2'>
                  {pin.comments.map((comment:IComment)=>(
                    <Comment key={uuidv4()} comment={comment} />
                  ))}
                </div>
              )}

              <form className='flex flex-col'>
                <div className='flex gap-x-4 w-full items-center '>
                  <Image src={user?.picture || ""} width={40} height={40} className="rounded-full mr-4" alt={"avatar"} />
                  <input
                    type="text"
                    className='w-full p-3 outline-none border-gray-200 rounded-full border'
                    placeholder="Add a comment"
                  />
                  
                </div>
            
                <div className=' self-end gap-x-2 flex items-center  mt-2'>
                    <button>Cancel</button>
                    <button className='font-semibold bg-[#E60023] text-white rounded-full px-4 py-2'>Done</button>
                </div>
              </form>
        
               

              </div>
            </div>
          </div>
          
        </section>
      </div>
    </main>
  )
}

export default PinDetail