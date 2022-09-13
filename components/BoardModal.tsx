import React, { useState } from 'react'
import Backdrop from './Backdrop';

const BoardModal = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [name,setName] = useState("")

    const handleOnChange = () => {
      setIsChecked(!isChecked);
    };



  return (
        <div className='p-8 rounded-3xl shadow-md max-w-xl mx-auto bg-white mt-36' onClick={(e)=>e.stopPropagation()}>
                <p className='text-xl mb-4 text-center font-semibold'>Create Board</p>
                <form className='space-y-3 flex flex-col'>
                    <div className='flex flex-col gap-y-2'>
                        <label className='text-xs'>Name</label>
                        <input onChange={(e)=>setName(e.target.value)} type="text" placeholder='Like  "Places to Go" or "Recipes to Make" ' className='rounded-xl border-2 px-4 py-3 outline-none ring-blue-300 focus:ring-4 border-gray-300' />
                    </div>
                    <div className='flex gap-x-3'>
                        <input  type="checkbox" checked={isChecked} onChange={handleOnChange} />

                        <div>
                            <p className='text-lg font-semibold'>Keep this board secret</p>
                            <p className='text-gray-500'>So only you and collaborators can see it.</p>
                        </div>
                    </div>
                    <button className='px-4 py-2 bg-[#E60023] text-white font-semibold rounded-full self-end'>Create</button>
                
                </form>
        </div>
 
    
  )
}

export default BoardModal