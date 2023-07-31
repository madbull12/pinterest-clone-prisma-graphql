import React from 'react'
import { IBoard, IComment } from '../interface';

import Image from 'next/image';
import Link from 'next/link';
interface IProps {
    comment: IComment;
  }
const Comment = ({comment}:IProps) => {
  return (
    <Link href={`/user/${comment.userId}/created`}>
    <div  className={`flex gap-x-2 items-center cursor-pointer`}>
      <div className="h-6 w-6 md:h-8 md:w-8 relative">
        <Image
          className="rounded-full"
          layout="fill"
          alt="user-picture"
          src={
            comment?.user?.image ||
            "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
          }
        />
      </div>
   
      <div>
        <p className=" text-sm md:text-base text-gray-500">{comment.user.email}</p>
        <p className="text-sm md:text-base lg:text-lg">{comment.content}</p>
      </div>
    </div>
    </Link>
    
  )
}

export default Comment