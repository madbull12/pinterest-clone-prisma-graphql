import { useQuery } from "@apollo/client";

import React, { useEffect } from "react";
import UserProfile from "../../../components/UserProfile";
import { CreatedPins } from "../../../lib/query";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../../components/Loading";
import MasonryWrapper from "../../../components/MasonryWrapper";
import Pin from "../../../components/Pin";
import HoverEdit from "../../../components/HoverEdit";

import { isEditOpen } from "../../../atom/editAtom";
import { useRecoilValue } from "recoil";
import { useSession } from "next-auth/react";
import Container from "../../../components/Container";
import { useRouter } from "next/router";
import { PinWithPayload } from "../../../interface";
const CreatedPinsPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { userId } = router.query;
  const { data, loading } = useQuery(CreatedPins, {
    variables: {
      userId,
    },
  });
  // const [isClicked, setIsClicked] = useState(false);
  const isEditOpenValue = useRecoilValue(isEditOpen);
  useEffect(() => {
    document.body.style.overflowY = isEditOpenValue ? "hidden" : "scroll";
  }, [isEditOpenValue]);

  console.log(data);

  return (
    <Container>
      <div className="relative">
        <UserProfile />
        {loading && (
          <div className="flex justify-center pt-4">
            <Loading />
          </div>
        )}
        {data?.user.pins.length === 0 && (
          <h1 className="p-4 text-2xl font-bold  text-center">
            No pins created{" "}
          </h1>
        )}
        <MasonryWrapper>
          {data?.user.pins.map((item: PinWithPayload) => (
            <div key={uuidv4()} className="relative cursor-pointer ">
              {session?.user?.id === data?.user.id ? (
                <HoverEdit item={item} />
              ) : null}

              <Pin item={item} isEdit={true} />
            </div>
          ))}
        </MasonryWrapper>
      </div>
    </Container>
  );
};

export default CreatedPinsPage;
