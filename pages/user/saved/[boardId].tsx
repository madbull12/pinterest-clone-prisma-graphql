import { useQuery } from '@apollo/client'
import { Board } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react'
import { MdLock } from 'react-icons/md';
import { BoardPins } from '../../../lib/query';

const BoardDetails = () => {
  const router = useRouter();
  const { data:boardPins, loading} = useQuery(BoardPins,{
    variables:{ 
      boardId:router?.query.boardId
    }
  });

  console.log(boardPins)

  return (
    <div >
      <h1 className='text-center text-3xl font-semibold'>{boardPins?.boardPins.name}</h1>
      {boardPins?.boardPins.secret && (
        <div className='flex justify-center items-center gap-x-2 text-gray-400' >
          <MdLock  className='text-center'/> 
          <p>Secret board</p>

        </div>

      )}
      <div>
        <p>{boardPins?.boardPins.saved.length} pins</p>
        {boardPins?.boardPins.saved.map((item:Save)=>(
          
        ))}
      </div>
    </div>
  )
}

export default BoardDetails