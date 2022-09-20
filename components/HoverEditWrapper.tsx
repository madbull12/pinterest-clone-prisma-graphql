import React from 'react'
import { MdEdit } from 'react-icons/md'

const HoverEditWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=''>
     
        <MdEdit className='absolute bottom-2  left-2' />
        {children}
    </div>
  )
}

export default HoverEditWrapper