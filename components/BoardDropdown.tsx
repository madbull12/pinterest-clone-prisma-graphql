import { useQuery } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiFillLock } from 'react-icons/ai'
import savePin from '../helper/savePin'
import { IBoard } from '../interface'
import { UserIdQuery,UserBoardsQuery } from '../lib/query'
import Button from './Button'

interface IBoardItem {
    board:IBoard;
    edit?:boolean;
}
const BoardItem = ({ board,edit }: IBoardItem) => {
    const [showSaveBtn, setShowSaveBtn] = useState<boolean>(false);
    const router = useRouter();
    const { user } = useUser()
    const { data: userId } = useQuery(UserIdQuery, {
      variables: {
        userId: user?.email,
      },
    });
    const { pinId } = router.query;
    console.log(board)
    return (
      <div
        className="flex items-center justify-between hover:bg-gray-100 rounded-lg p-1"
        onMouseEnter={() => setShowSaveBtn(true)}
        onMouseLeave={() => setShowSaveBtn(false)}
      >
        <div className="flex items-center gap-x-2">
            {!edit && (
                <div className="bg-gray-300 w-12 h-12 rounded-lg"></div>

            )}
          <p className="font-semibold">{board.name}</p>
        </div>
    
            {!edit ? (
                <>
                    {!showSaveBtn && (
                        <>
                            {board.secret && (
                                <AiFillLock />
                            )}
                        </>
                      
                    )}
                </>
            ):(
                <>
                    {board.secret && (
                        <AiFillLock />
                    )}
                </>
               
            )}
      

        {!edit && (
            <Button text='Save' handleClick={()=>{
                savePin(userId?.user.id,board.id,pinId)
            }} />
        )}

      </div>
    );
  };

const BoardDropdown = () => {
    const { user } = useUser();
    const { data:userId } = useQuery(UserIdQuery,{
        variables:{
            userId:user?.email
        }
    });

    const { data: userBoards } = useQuery(UserBoardsQuery,{
        variables:{
            userId:userId?.user.id
        }
    });

    console.log(userBoards?.userBoards)
  return (
    <div className='p-2 rounded-lg border-gray-200 border '>
        {userBoards?.userBoards.map((board:IBoard)=>(
            <BoardItem board={board} edit={true} />
        ))}
    </div>
  )
}

export default BoardDropdown