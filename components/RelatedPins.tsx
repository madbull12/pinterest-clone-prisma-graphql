import React from "react";
import { IPin } from "../interface";
import MasonryWrapper from "./MasonryWrapper";
import Pin from "./Pin";

const RelatedPinsComponent = ({ pins }: { pins: IPin[] }) => {
  return (
    <div className="mt-4 pb-4">
      <h1 className="text-2xl font-bold text-center ">More like this </h1>
      <MasonryWrapper>
        {pins?.map((pin) => (
          <Pin item={pin} key={pin.id} />
        ))}
      </MasonryWrapper>
    </div>
  );
};

export default RelatedPinsComponent;
