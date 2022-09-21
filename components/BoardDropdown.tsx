import { useQuery } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiFillLock } from 'react-icons/ai'
import { IBoard } from '../interface'
import { UserIdQuery,UserBoardsQuery } from '../lib/query'

const BoardItem = ({ board }: { board: IBoard }) => {
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
          <div className="bg-gray-300 w-12 h-12 rounded-lg"></div>
          <p className="font-semibold">{board.name}</p>
        </div>
        {!showSaveBtn && (
          <>
            {board.secret && <AiFillLock className="text-lg" />}
          
          </>
  
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
    <div>
        {userBoards?.userBoards.map((board:IBoard)=>(
            <BoardItem board={board} />
        ))}
    </div>
  )
}

export default BoardDropdown