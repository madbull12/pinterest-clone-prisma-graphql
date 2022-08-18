import { useUser } from '@auth0/nextjs-auth0'
import Image from 'next/image'
import React from 'react'
import { HiPlusCircle } from 'react-icons/hi'
import UserProfile from '../../components/UserProfile'

const UserPage = () => {
 
  return (
    <main className='flex justify-center items-center flex-col text-center'>
        <UserProfile />
    </main>
  )
}

export default UserPage