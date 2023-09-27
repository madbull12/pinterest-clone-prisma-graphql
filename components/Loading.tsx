import { Spinner } from '@nextui-org/react'
import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
const Loading = () => {
  
  return (
    <div className='flex justify-center'>
        {/* <AiOutlineLoading3Quarters className='animate-spin text-center text-[#E60023] text-2xl' /> */}
        <Spinner color="danger" />
    </div>
  )
}

export default Loading