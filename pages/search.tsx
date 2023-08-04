import React from "react";
import { PinWithPayload } from "../interface";
import { v4 } from "uuid";

import Pin from "../components/Pin";
import Container from "../components/Container";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { SearchPinQuery } from "../lib/query";

const SearchPage = () => {
  // const pins = useRecoilValue<any>(searchResults);
  const { q } = useRouter().query;
  const { data: pins } = useQuery(SearchPinQuery, {
    variables: {
      searchTerm: q as string,
    },
  });
  console.log(pins);
  return (
    <Container>
      {pins?.searchPins.length !== 0 ? (
        <>
          <h1 className="md:text-2xl text-xl py-4 text-center font-bold">
            Search results
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4">
            {pins?.searchPins.map((item: PinWithPayload) => (
              <Pin item={item} key={v4()} />
            ))}
          </div>
        </>
      ) : (
        <h1 className="md:text-2xl text-xl py-4 text-center font-bold">
          No Pins found
        </h1>
      )}

      {/* array of JSX items */}
    </Container>
  );
};

export default SearchPage;
