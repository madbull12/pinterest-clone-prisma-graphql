import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { AiFillLock } from 'react-icons/ai';
import Button from './Button';

import { useSavedMutation } from '../hooks/useSaved';
import { BoardWithPayload } from '../interface';


const BoardSaveItem = ({ board }: { board: BoardWithPayload }) => {
    const [showSaveBtn, setShowSaveBtn] = useState<boolean>(false);
    const router = useRouter();
    const { data: session } = useSession();

    const { pinId } = router.query;

    const payload = {
      boardId:board.id,
      userId:session?.user?.id as string,
      pinId:pinId as string,
    }
    const { handleDeleteSavedPin,handleSavePin } = useSavedMutation(payload);
    const savedInBoard = board.saved.find((v)=>v.pin.id===pinId);
    console.log(savedInBoard,board.saved)    

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
            text={savedInBoard ? "Unsave" : "Save"}
            handleClick={() => {
              savedInBoard ? handleDeleteSavedPin(savedInBoard.id) : handleSavePin()

            }}
          />
        )}
      </div>
    );
  };

export default BoardSaveItem