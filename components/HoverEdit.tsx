import React,{ useState } from 'react'
import { MdEdit } from 'react-icons/md'

const HoverEdit = () => {

  const[isHover,setIsHover] = useState(false);
  return (
    <div className=' absolute z-50  h-full w-full rounded-lg ' onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)} >
      <div className='w-full h-full bg-black opacity-50 rounded-lg'>
        <div className='bg-white opacity-1 absolute right-0 mx-auto bottom-4 left-0 w-8 h-8 rounded-full text-black grid place-items-center'>
            <MdEdit />
        </div>
      </div>
    
    </div>
  )
}

export default HoverEdit