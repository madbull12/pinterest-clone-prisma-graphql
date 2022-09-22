import React from "react";

interface IProps {
  text: string;
  handleClick: () => void;
  color?:string;
  backgroundColor?:string;
}
const Button = ({ text, handleClick,backgroundColor,color }: IProps) => {
  return (
    <button
      onClick={handleClick}
      className={`rounded-full px-4 py-2 ${backgroundColor ?? "bg-[#E60023]"} ${color ?? "text-white"}  font-semibold`}
    >
      {text}
    </button>
  );
};

export default Button;
