import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { AiFillLock } from 'react-icons/ai';
import savePin from '../helper/savePin';
import { IBoard } from '../interface';
import Button from './Button';

const BoardSaveItem = ({ board }: { board: IBoard }) => {
    const [showSaveBtn, setShowSaveBtn] = useState<boolean>(false);
    const router = useRouter();
    const { data: session }: any = useSession();
  
    const { pinId } = router.query;
    console.log(board);
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
          <>{board.secret && <AiFillLock className="text-lg" />}</>
        )}
        {showSaveBtn && (
          <Button
            text={"Save"}
            handleClick={() => {
              savePin(session?.user?.id as string, board.id, pinId);
            }}
          />
        )}
      </div>
    );
  };

export default BoardSaveItem