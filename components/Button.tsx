import React from "react";

interface IProps {
  text: string;
  handleClick?: () => void;
  color?:string;
  backgroundColor?:string;
  type?:string
}
const Button = ({ text, handleClick,backgroundColor,color,type }: IProps) => {
  return (

    <>
      {type === "submit" ? (
          <button
              type="submit"
          className={`rounded-full py-1 px-2  md:px-4 md:py-2 ${backgroundColor ?? "bg-[#E60023]"} ${color ?? "text-white"}  font-semibold`}
        >
          {text}
        </button>
      ):(
        <button
          type={"button"}
      
          onClick={handleClick}
          className={`rounded-full py-1 px-2  md:px-4 md:py-2 ${backgroundColor ?? "bg-[#E60023]"} ${color ?? "text-white"}  font-semibold`}
        >
        {text}
      </button>
      )}
    </>

 
  );
};

export default Button;
