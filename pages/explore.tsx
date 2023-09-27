import { useQuery } from "@apollo/client";
import React from "react";
import CategoryList from "../components/CategoryList";
import Container from "../components/Container";
import Loading from "../components/Loading";
import { CategoriesQuery, CategoriesWithLargestPins } from "../lib/query";
import { trpc } from "../utils/trpc";
import { CategoryWithPins } from "../interface";

const ExplorePage = () => {
  const { data, isLoading, error } =trpc.category.getCategories.useQuery();
  const { data:popular,isLoading:popularLoading } = trpc.category.getHighestPinsCategories.useQuery();
  console.log(popular)

  return (
    <Container>
      <div className="space-y-4">
        <h1 className="text-center font-bold text-2xl mb-4">Ideas for you </h1>
        {!isLoading ? <CategoryList categories={data as CategoryWithPins[]} /> : <Loading />}
        <h1 className="text-center font-bold text-2xl mb-4">Popular Ideas for you </h1>
        {!popularLoading? <CategoryList categories={popular as CategoryWithPins[]} /> : <Loading />}

      </div>
    </Container>
  );
};

export default ExplorePage;
