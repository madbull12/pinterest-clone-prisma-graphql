import React from 'react'


interface IProps {
    text:string;
    handleClick:()=>void
}
const Button = ({ text,handleClick }:IProps ) => {
  return (
    <button onClick={handleClick} className='rounded-full px-4 py-2 bg-[#E60023] text-white font-semibold'>{text}</button>
  )
}

export default Button