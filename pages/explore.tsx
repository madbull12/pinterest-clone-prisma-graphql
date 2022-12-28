import { useQuery } from "@apollo/client";
import React from "react";
import CategoryList from "../components/CategoryList";
import Container from "../components/Container";
import Loading from "../components/Loading";
import { CategoriesQuery, CategoriesWithLargestPins } from "../lib/query";

const ExplorePage = () => {
  const { data, loading, error } = useQuery(CategoriesQuery);
  const { data:popular, loading:popularLoading } = useQuery(CategoriesWithLargestPins);
  console.log(popular)

  return (
    <Container>
      <div className="space-y-4">
        <h1 className="text-center font-bold text-2xl mb-4">Ideas for you </h1>
        {!loading ? <CategoryList categories={data?.categories} /> : <Loading />}
        <h1 className="text-center font-bold text-2xl mb-4">Popular Ideas for you </h1>
        {!popularLoading? <CategoryList categories={popular?.categoriesHighestPins} /> : <Loading />}

      </div>
    </Container>
  );
};

export default ExplorePage;
