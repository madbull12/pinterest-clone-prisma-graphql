import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
const Loading = () => {
  
  return (
    <div className='flex justify-center'>
        <AiOutlineLoading3Quarters className='animate-spin text-center text-2xl' />
    </div>
  )
}

export default Loading