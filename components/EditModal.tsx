import React from 'react'

const EditModal = () => {
  return (
    <div className='max-w-4xl mx-auto bg-white rounded-2xl p-4'>
        <h1 className="text-center font-semibold text-2xl">Edit this Pin</h1>
        <form className='flex gap-x-4'>
            <div>
                <div className='flex items-center justify-between'>
                    <label>Board</label>
                    
                </div>
            </div>
        </form>
    </div>
  )
}

export default EditModal