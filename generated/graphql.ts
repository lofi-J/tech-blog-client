import * as Apollo from "@apollo/client";
import { gql } from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type Query = {
  __typename?: "Query";
  getAllTags: Array<Tags>;
  popularTags: Array<Tags>;
  tagUsageStats: Array<Tags>;
};

export type QueryGetAllTagsArgs = {
  orderBy?: TagsOrderBy;
};

export type QueryPopularTagsArgs = {
  limit?: Scalars["Int"]["input"];
};

export type Tags = {
  __typename?: "Tags";
  created_at: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  tag_name: Scalars["String"]["output"];
  usage_count?: Maybe<Scalars["Int"]["output"]>;
};

/** 정렬 기준 */
export type TagsOrderBy = "CREATED_AT" | "ID" | "POPULAR" | "TAG_NAME";

export type TagBaseFieldsFragment = { __typename?: "Tags"; id: number };

export type TagAllFieldsFragment = {
  __typename?: "Tags";
  tag_name: string;
  created_at: any;
  id: number;
};

export type GetAllTagsQueryVariables = Exact<{
  orderBy?: InputMaybe<TagsOrderBy>;
}>;

export type GetAllTagsQuery = {
  __typename?: "Query";
  getAllTags: Array<{
    __typename?: "Tags";
    tag_name: string;
    created_at: any;
    id: number;
  }>;
};

export const TagBaseFieldsFragmentDoc = gql`
  fragment TagBaseFields on Tags {
    id
  }
`;
export const TagAllFieldsFragmentDoc = gql`
  fragment TagAllFields on Tags {
    ...TagBaseFields
    tag_name
    created_at
  }
  ${TagBaseFieldsFragmentDoc}
`;
export const GetAllTagsDocument = gql`
  query GetAllTags($orderBy: TagsOrderBy = CREATED_AT) {
    getAllTags(orderBy: $orderBy) {
      ...TagAllFields
    }
  }
  ${TagAllFieldsFragmentDoc}
`;

/**
 * __useGetAllTagsQuery__
 *
 * To run a query within a React component, call `useGetAllTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTagsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetAllTagsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllTagsQuery,
    GetAllTagsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(
    GetAllTagsDocument,
    options
  );
}
export function useGetAllTagsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllTagsQuery,
    GetAllTagsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(
    GetAllTagsDocument,
    options
  );
}
export function useGetAllTagsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAllTagsQuery, GetAllTagsQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(
    GetAllTagsDocument,
    options
  );
}
export type GetAllTagsQueryHookResult = ReturnType<typeof useGetAllTagsQuery>;
export type GetAllTagsLazyQueryHookResult = ReturnType<
  typeof useGetAllTagsLazyQuery
>;
export type GetAllTagsSuspenseQueryHookResult = ReturnType<
  typeof useGetAllTagsSuspenseQuery
>;
export type GetAllTagsQueryResult = Apollo.QueryResult<
  GetAllTagsQuery,
  GetAllTagsQueryVariables
>;
