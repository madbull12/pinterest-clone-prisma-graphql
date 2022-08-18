import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { gql, useMutation, useQuery } from '@apollo/client'
import toast,{ Toaster } from 'react-hot-toast'
import prisma from '../lib/prisma'
import {  createPinMutation } from '../lib/mutation'
import { UserIdQuery } from '../lib/query'
import { useUser } from '@auth0/nextjs-auth0'
import { HiDotsHorizontal, HiUpload } from 'react-icons/hi'
import { MdFileUpload, MdUpload } from 'react-icons/md'
import Image from 'next/image'

interface IFormInput {
    title:string;
    description:string;
    imageUrl:string;
    category:string

}

const PinBuilder = () => {
    const { user } = useUser();
    const[textAreaFocus,setTextAreaFocus] = useState(false);
    const [textAreaCount,setTextAreaCount] = useState(500);
    const [categories,setCategories]= useState<any>([])
    const  { register, handleSubmit,formState:{ errors },reset,getValues } = useForm<IFormInput>();
    const { data } = useQuery(UserIdQuery,{
        variables:{
            userId:user?.email
        }
    });
    const userId = data?.user.id
    const [createPin,{ loading,error }] = useMutation(createPinMutation,{
        onCompleted:()=>reset()
    });

    
    const addCategory = () => {
        const category = getValues("category");
      
        if(categories.includes(category) || category === "") {
            toast.error("Category can't be the same or empty!",{
                duration: 2000
            })
        } else {
            setCategories((prev:any)=>([...prev,category]));
        }
   
        
        reset({
            category:""
        })

    }

    useEffect(()=>{
        console.log(categories)
    },[categories])

    const onSubmit=async(data:IFormInput)=>{

        const { title,description } = data;

        const imageUrl = `https://via.placeholder.com/300`;
        
        const variables = { title,  category:categories, description, imageUrl,userId }
        try {
            toast.promise(createPin({ variables }), {
              loading: 'Creating new pin..',
              success: 'Link successfully created!🎉',
              error: `Something went wrong 😥 Please try again -  ${error}`,
            })
      
          } catch (error) {
            console.error(error)
          }
    }
    console.log(textAreaFocus)
  return (
    <div className='min-h-screen bg-gray-200 py-8'>
        <Toaster />
        <form className='shadow-md p-8 rounded-2xl max-w-3xl bg-white mx-auto' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex items-center justify-between'>
                <HiDotsHorizontal className='text-2xl text-gray-400' />
                <button className='rounded-full bg-[#E60023] px-4 py-2 text-white font-semibold' type='submit'>Publish</button>
            </div>
            <div className='flex gap-x-4 mt-2' >
                <div className='bg-gray-200 p-4 rounded-lg w-1/2'>
                    <div className="rounded-lg  cursor-center flex-col space-y-2 flex justify-center text-gray-500 items-center border-dashed border-2 p-4 border-gray-300 w-full h-full">
                        <HiUpload className="text-3xl" />
                        <p>Click to upload image</p>
                        
                    </div>
                </div>
                <div className='flex flex-col w-1/2 space-y-3  '>
                    <input
                        className='p-2 text-4xl text-gray-800 focus:border-blue-500 focus:border-b-2 placeholder:text-gray-500 outline-none border-gray-300 border-b font-bold'
                        type="text"
                        placeholder="Add your title"
                        {...register('title', { required: true })}
                    />
                    <div className='gap-x-3 items-center flex'>
                        <Image src={user?.picture || ""} width={50} height={50} className="rounded-full" alt="profile" />
                        <p className='font-semibold'>{user?.name}</p>
                    </div>
                    <div className='flex flex-col'>
                        <textarea 
                            {...register("description")}
                            className={`outline-none border-b p-2 ${textAreaCount>0 ? "focus:border-blue-500":"focus:border-red-500"} focus:border-b-2`}
                            placeholder="Tell everyone what your pin is about"
                            onFocus={()=>setTextAreaFocus(true)}
                            onBlur={()=>setTextAreaFocus(false)}
                            onChange={e => setTextAreaCount(500 - e.target.value.length)}
                        />
                        {textAreaFocus && (
                            <>
                            {textAreaCount > 0 ? (
                                <div className='flex justify-between items-center text-xs text-gray-400'>
                                    <p>We recommend at least 100 characters</p>
                                    <p>{textAreaCount}</p>
                                </div>
                            ):(
                                <div className='flex justify-between items-center text-xs text-red-600'>
                                    <p>Ooops! This description is getting long. Try trimming it down.</p>
                                    <p>{textAreaCount}</p>
                                </div>
                            )}
                           
                            </>
                         

                        )}
                    </div>
                    <div className='flex items-center justify-between'>
                        <input 
                            
                            className='px-4 py-2 outline-none focus:border-blue-500 focus:border-b-2'
                            placeholder='Add categories'
                            type="text"
                            {...register("category",{ required:true}) }
                         />
                        <button 
                            
                            onClick={(e)=>{
                                e.preventDefault()
                       
                               addCategory()
                            }}
                            className='px-4 py-1 bg-[#E60023] text-white font-semibold rounded-full'>
                                Add
                         </button>
                    </div>
         
                </div>
                
            </div>

        </form>
    </div>
  )
}

export default PinBuilder