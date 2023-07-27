import { useQuery } from "@apollo/client";

import React, { useEffect } from "react";
import UserProfile from "../../components/UserProfile";
import { IPin } from "../../interface";
import { CreatedPins } from "../../lib/query";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../components/Loading";
import MasonryWrapper from "../../components/MasonryWrapper";
import Pin from "../../components/Pin";
import HoverEdit from "../../components/HoverEdit";

import { isEditOpen } from "../../atom/editAtom";
import { useRecoilValue } from "recoil";
import { useSession } from "next-auth/react";
import Container from "../../components/Container";
const CreatedPinsPage = () => {
  const { data: session } = useSession();
  const { data, loading, error } = useQuery(CreatedPins, {
    variables: {
      userId: session?.user?.email,
    },
  });
  // const [isClicked, setIsClicked] = useState(false);
  const isEditOpenValue = useRecoilValue(isEditOpen);
  useEffect(() => {
    document.body.style.overflow = isEditOpenValue ? "hidden" : "scroll";
  }, [isEditOpenValue]);

  console.log(data);
  if (data?.user.pins.length === 0)
    return (
      <h1 className="p-4 text-2xl font-bold  text-center">No pins created </h1>
    );

  return (
    <Container>
      <div className="relative">
        <UserProfile />
        {loading && (
          <div className="flex justify-center pt-4">
            <Loading />
          </div>
        )}
        <MasonryWrapper>
          {data?.user.pins.map((item: IPin) => (
            <div key={uuidv4()} className="relative cursor-pointer ">
              <HoverEdit item={item} />

              <Pin item={item} isEdit={true} />
            </div>
          ))}
        </MasonryWrapper>
      </div>
    </Container>
  );
};

export default CreatedPinsPage;
