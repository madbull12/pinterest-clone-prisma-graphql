import React, { ReactNode } from 'react'
import { useRecoilState } from 'recoil'
import { boardModalState } from '../atom/boardAtom'

const Backdrop = ({ children }:{ children:ReactNode }) => {
    const [openModal,setOpenModal] = useRecoilState(boardModalState)
  return (
    <div className='bg-[#00000077] absolute min-h-screen z-50 top-0 right-0 bottom-0 left-0 p-4  ' onClick={()=>setOpenModal(false)}>
        {children}
    </div>
  )
}

export default Backdrop