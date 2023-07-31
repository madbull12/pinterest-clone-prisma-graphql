import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router';
import React from 'react'
import { MdLock } from 'react-icons/md';
import { ISaved } from '../../../../interface';
import { BoardPins } from '../../../../lib/query';
import { v4 as uuidv4 } from 'uuid'
import Pin from '../../../../components/Pin';
import MasonryWrapper from '../../../../components/MasonryWrapper';

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
        <p className='text-xl font-semibold px-4'>{boardPins?.boardPins.saved.length} pins</p>
        <MasonryWrapper>
          {boardPins?.boardPins.saved.map((item:ISaved)=>(
            <Pin key={uuidv4()} item={item.pin} />
          ))}
        </MasonryWrapper>
   
      </div>
    </div>
  )
}

export default BoardDetails