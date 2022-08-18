import React from 'react'
import { useForm } from 'react-hook-form'
import { gql, useMutation, useQuery } from '@apollo/client'
import toast,{ Toaster } from 'react-hot-toast'
import prisma from '../lib/prisma'
import {  createPinMutation } from '../lib/mutation'
import { UserIdQuery } from '../lib/query'
import { useUser } from '@auth0/nextjs-auth0'
import { HiDotsHorizontal, HiUpload } from 'react-icons/hi'
import { MdFileUpload, MdUpload } from 'react-icons/md'

interface IFormInput {
    title:string;
    description:string;
    imageUrl:string;
    category:string[]

}

const PinBuilder = () => {
    const { user } = useUser();
    const  { register, handleSubmit,formState:{ errors },reset } = useForm<IFormInput>();
    const { data } = useQuery(UserIdQuery,{
        variables:{
            userId:user?.email
        }
    });
    const userId = data?.user.id
    const [createPin,{ loading,error }] = useMutation(createPinMutation,{
        onCompleted:()=>reset()
    });
    const onSubmit=async(data:IFormInput)=>{

        const { title,description,category } = data;
        const imageUrl = `https://via.placeholder.com/300`;
        
        const variables = { title,  category, description, imageUrl,userId }
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
  return (
    <div className='min-h-screen bg-gray-200 py-8'>
        <Toaster />
        <div className='shadow-md p-8 rounded-2xl max-w-3xl bg-white mx-auto'>
            <div className='flex items-center justify-between'>
                <HiDotsHorizontal className='text-2xl text-gray-400' />
                <button className='rounded-full bg-[#E60023] px-4 py-2 text-white font-semibold'>Publish</button>
            </div>
            <div className='flex gap-x-4 mt-2'>
                <div className='bg-gray-200 p-4 rounded-lg flex-[0.5]'>
                    <div className="rounded-lg  cursor-center flex-col space-y-2 flex justify-center text-gray-500 items-center border-dashed border-2 p-4 border-gray-300 w-full h-full">
                        <HiUpload className="text-3xl" />
                        <p>Click to upload image</p>
                        
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default PinBuilder