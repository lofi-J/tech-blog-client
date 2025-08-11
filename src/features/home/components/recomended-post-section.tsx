"use client";

import { useGetAllUsersQuery } from "@/generated/graphql";

export const RecomendedPostSection = () => {
  const { data, loading, error } = useGetAllUsersQuery();
  console.log(data);

  return <div>RecomendedPostSection</div>;
};
