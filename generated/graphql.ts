import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Categories = {
  __typename?: 'Categories';
  category_name: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  usage_count?: Maybe<Scalars['Int']['output']>;
};

/** 카테고리 정렬 기준 */
export type CategoriesOrderBy =
  | 'CATEGORY_NAME'
  | 'CREATED_AT'
  | 'ID'
  | 'POPULAR';

export type GetPostsByCategoryInput = {
  /** 카테고리 이름 */
  categoryName: Scalars['String']['input'];
  /** 가져올 포스트 수 */
  limit?: Scalars['Int']['input'];
  /** 건너뛸 포스트 수 */
  offset?: Scalars['Int']['input'];
  /** 정렬 순서 */
  order?: SortOrder;
  /** 정렬 기준 */
  orderBy?: PostsOrderBy;
};

export type GetPostsByTagInput = {
  /** 가져올 포스트 수 */
  limit?: Scalars['Int']['input'];
  /** 건너뛸 포스트 수 */
  offset?: Scalars['Int']['input'];
  /** 정렬 순서 */
  order?: SortOrder;
  /** 정렬 기준 */
  orderBy?: PostsOrderBy;
  /** 태그 이름 */
  tagName: Scalars['String']['input'];
};

export type GetPostsInput = {
  /** 가져올 포스트 수 */
  limit?: Scalars['Int']['input'];
  /** 건너뛸 포스트 수 */
  offset?: Scalars['Int']['input'];
  /** 정렬 순서 */
  order?: SortOrder;
  /** 정렬 기준 */
  orderBy?: PostsOrderBy;
  /** 검색 키워드 */
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  increasePostLikes: PostStats;
  increasePostViews: PostStats;
};


export type MutationIncreasePostLikesArgs = {
  slug: Scalars['String']['input'];
};


export type MutationIncreasePostViewsArgs = {
  slug: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  /** 첫 번째 태그를 카테고리로 사용 */
  category?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  hash_code: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  published?: Maybe<Scalars['DateTime']['output']>;
  slug: Scalars['String']['output'];
  stats?: Maybe<PostStats>;
  tags?: Maybe<Array<Tags>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type PostStats = {
  __typename?: 'PostStats';
  id?: Maybe<Scalars['Int']['output']>;
  likes: Scalars['Int']['output'];
  post_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  views: Scalars['Int']['output'];
};

/** 포스트 정렬 기준 */
export type PostsOrderBy =
  /** ID순 - id 필드로 정렬 */
  | 'ID'
  /** 최신순 (발행일 기준) - published 필드로 정렬 */
  | 'LATEST'
  /** 인기순 (좋아요 기준) - post_stats.likes로 정렬, stats가 없으면 0으로 처리 */
  | 'POPULAR_LIKES'
  /** 인기순 (조회수 기준) - post_stats.views로 정렬, stats가 없으면 0으로 처리 */
  | 'POPULAR_VIEWS'
  /** 제목순 - title 필드로 정렬 */
  | 'TITLE'
  /** 업데이트순 (수정일 기준) - updated_at 필드로 정렬 */
  | 'UPDATED';

export type PostsResponse = {
  __typename?: 'PostsResponse';
  hasMore: Scalars['Boolean']['output'];
  posts: Array<Post>;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  categoryUsageStats: Array<Categories>;
  getAllCategories: Array<Categories>;
  getAllPosts: PostsResponse;
  getAllTags: Array<Tags>;
  getPostBySlug?: Maybe<Post>;
  getPostsByCategory: PostsResponse;
  getPostsByTag: PostsResponse;
  popularCategories: Array<Categories>;
  popularTags: Array<Tags>;
  tagUsageStats: Array<Tags>;
};


export type QueryGetAllCategoriesArgs = {
  orderBy?: CategoriesOrderBy;
};


export type QueryGetAllPostsArgs = {
  input: GetPostsInput;
};


export type QueryGetAllTagsArgs = {
  orderBy?: TagsOrderBy;
};


export type QueryGetPostBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryGetPostsByCategoryArgs = {
  input: GetPostsByCategoryInput;
};


export type QueryGetPostsByTagArgs = {
  input: GetPostsByTagInput;
};


export type QueryPopularCategoriesArgs = {
  limit?: Scalars['Int']['input'];
};


export type QueryPopularTagsArgs = {
  limit?: Scalars['Int']['input'];
};

/** 정렬 순서 */
export type SortOrder =
  /** 오름차순 */
  | 'ASC'
  /** 내림차순 */
  | 'DESC';

export type Tags = {
  __typename?: 'Tags';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  tag_name: Scalars['String']['output'];
  usage_count?: Maybe<Scalars['Int']['output']>;
};

/** 정렬 기준 */
export type TagsOrderBy =
  | 'CREATED_AT'
  | 'ID'
  | 'POPULAR'
  | 'TAG_NAME';

export type PostStatsBaseFieldsFragment = { __typename?: 'PostStats', id?: number | null };

export type PostStatsAllFieldsFragment = { __typename?: 'PostStats', post_id?: number | null, views: number, likes: number, updated_at?: any | null, id?: number | null };

export type PostBaseFieldsFragment = { __typename?: 'Post', id: number };

export type PostMetadataFieldsFragment = { __typename?: 'Post', slug: string, hash_code: string, title: string, description: string, thumbnail?: string | null, category?: string | null, published?: any | null, updated_at?: any | null, tags?: Array<{ __typename?: 'Tags', tag_name: string, created_at: any, id: number }> | null };

export type PostAllFieldsFragment = { __typename?: 'Post', id: number, slug: string, hash_code: string, title: string, description: string, thumbnail?: string | null, category?: string | null, published?: any | null, updated_at?: any | null, stats?: { __typename?: 'PostStats', post_id?: number | null, views: number, likes: number, updated_at?: any | null, id?: number | null } | null, tags?: Array<{ __typename?: 'Tags', tag_name: string, created_at: any, id: number }> | null };

export type IncreasePostViewsMutationVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type IncreasePostViewsMutation = { __typename?: 'Mutation', increasePostViews: { __typename?: 'PostStats', post_id?: number | null, views: number, likes: number, updated_at?: any | null, id?: number | null } };

export type IncreasePostLikesMutationVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type IncreasePostLikesMutation = { __typename?: 'Mutation', increasePostLikes: { __typename?: 'PostStats', post_id?: number | null, views: number, likes: number, updated_at?: any | null, id?: number | null } };

export type GetAllPostsQueryVariables = Exact<{
  inputs: GetPostsInput;
}>;


export type GetAllPostsQuery = { __typename?: 'Query', getAllPosts: { __typename?: 'PostsResponse', totalCount: number, posts: Array<{ __typename?: 'Post', id: number, slug: string, hash_code: string, title: string, description: string, thumbnail?: string | null, category?: string | null, published?: any | null, updated_at?: any | null, stats?: { __typename?: 'PostStats', post_id?: number | null, views: number, likes: number, updated_at?: any | null, id?: number | null } | null, tags?: Array<{ __typename?: 'Tags', tag_name: string, created_at: any, id: number }> | null }> } };

export type GetPostsByTagQueryVariables = Exact<{
  input: GetPostsByTagInput;
}>;


export type GetPostsByTagQuery = { __typename?: 'Query', getPostsByTag: { __typename?: 'PostsResponse', totalCount: number, posts: Array<{ __typename?: 'Post', id: number, slug: string, hash_code: string, title: string, description: string, thumbnail?: string | null, category?: string | null, published?: any | null, updated_at?: any | null, tags?: Array<{ __typename?: 'Tags', tag_name: string, created_at: any, id: number }> | null }> } };

export type GetPostsByCategoryQueryVariables = Exact<{
  input: GetPostsByCategoryInput;
}>;


export type GetPostsByCategoryQuery = { __typename?: 'Query', getPostsByCategory: { __typename?: 'PostsResponse', totalCount: number, posts: Array<{ __typename?: 'Post', id: number, slug: string, hash_code: string, title: string, description: string, thumbnail?: string | null, category?: string | null, published?: any | null, updated_at?: any | null, tags?: Array<{ __typename?: 'Tags', tag_name: string, created_at: any, id: number }> | null }> } };

export type CategoryBaseFieldsFragment = { __typename?: 'Categories', id: number };

export type CategoryAllFieldsFragment = { __typename?: 'Categories', category_name: string, created_at: any, usage_count?: number | null, id: number };

export type GetAllCategoriesQueryVariables = Exact<{
  orderBy?: InputMaybe<CategoriesOrderBy>;
}>;


export type GetAllCategoriesQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Categories', category_name: string, created_at: any, usage_count?: number | null, id: number }> };

export type CategoryUsageStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoryUsageStatsQuery = { __typename?: 'Query', categoryUsageStats: Array<{ __typename?: 'Categories', id: number, category_name: string, usage_count?: number | null, created_at: any }> };

export type TagBaseFieldsFragment = { __typename?: 'Tags', id: number };

export type TagAllFieldsFragment = { __typename?: 'Tags', tag_name: string, created_at: any, id: number };

export type GetAllTagsQueryVariables = Exact<{
  orderBy?: InputMaybe<TagsOrderBy>;
}>;


export type GetAllTagsQuery = { __typename?: 'Query', getAllTags: Array<{ __typename?: 'Tags', tag_name: string, created_at: any, id: number }> };

export const PostBaseFieldsFragmentDoc = gql`
    fragment PostBaseFields on Post {
  id
}
    `;
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
    ${TagBaseFieldsFragmentDoc}`;
export const PostMetadataFieldsFragmentDoc = gql`
    fragment PostMetadataFields on Post {
  slug
  hash_code
  title
  description
  thumbnail
  category
  published
  updated_at
  tags {
    ...TagAllFields
  }
}
    ${TagAllFieldsFragmentDoc}`;
export const PostStatsBaseFieldsFragmentDoc = gql`
    fragment PostStatsBaseFields on PostStats {
  id
}
    `;
export const PostStatsAllFieldsFragmentDoc = gql`
    fragment PostStatsAllFields on PostStats {
  ...PostStatsBaseFields
  post_id
  views
  likes
  updated_at
}
    ${PostStatsBaseFieldsFragmentDoc}`;
export const PostAllFieldsFragmentDoc = gql`
    fragment PostAllFields on Post {
  ...PostBaseFields
  ...PostMetadataFields
  stats {
    ...PostStatsAllFields
  }
}
    ${PostBaseFieldsFragmentDoc}
${PostMetadataFieldsFragmentDoc}
${PostStatsAllFieldsFragmentDoc}`;
export const CategoryBaseFieldsFragmentDoc = gql`
    fragment CategoryBaseFields on Categories {
  id
}
    `;
export const CategoryAllFieldsFragmentDoc = gql`
    fragment CategoryAllFields on Categories {
  ...CategoryBaseFields
  category_name
  created_at
  usage_count
}
    ${CategoryBaseFieldsFragmentDoc}`;
export const IncreasePostViewsDocument = gql`
    mutation IncreasePostViews($slug: String!) {
  increasePostViews(slug: $slug) {
    ...PostStatsAllFields
  }
}
    ${PostStatsAllFieldsFragmentDoc}`;
export type IncreasePostViewsMutationFn = Apollo.MutationFunction<IncreasePostViewsMutation, IncreasePostViewsMutationVariables>;

/**
 * __useIncreasePostViewsMutation__
 *
 * To run a mutation, you first call `useIncreasePostViewsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncreasePostViewsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [increasePostViewsMutation, { data, loading, error }] = useIncreasePostViewsMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useIncreasePostViewsMutation(baseOptions?: Apollo.MutationHookOptions<IncreasePostViewsMutation, IncreasePostViewsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncreasePostViewsMutation, IncreasePostViewsMutationVariables>(IncreasePostViewsDocument, options);
      }
export type IncreasePostViewsMutationHookResult = ReturnType<typeof useIncreasePostViewsMutation>;
export type IncreasePostViewsMutationResult = Apollo.MutationResult<IncreasePostViewsMutation>;
export type IncreasePostViewsMutationOptions = Apollo.BaseMutationOptions<IncreasePostViewsMutation, IncreasePostViewsMutationVariables>;
export const IncreasePostLikesDocument = gql`
    mutation IncreasePostLikes($slug: String!) {
  increasePostLikes(slug: $slug) {
    ...PostStatsAllFields
  }
}
    ${PostStatsAllFieldsFragmentDoc}`;
export type IncreasePostLikesMutationFn = Apollo.MutationFunction<IncreasePostLikesMutation, IncreasePostLikesMutationVariables>;

/**
 * __useIncreasePostLikesMutation__
 *
 * To run a mutation, you first call `useIncreasePostLikesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncreasePostLikesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [increasePostLikesMutation, { data, loading, error }] = useIncreasePostLikesMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useIncreasePostLikesMutation(baseOptions?: Apollo.MutationHookOptions<IncreasePostLikesMutation, IncreasePostLikesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncreasePostLikesMutation, IncreasePostLikesMutationVariables>(IncreasePostLikesDocument, options);
      }
export type IncreasePostLikesMutationHookResult = ReturnType<typeof useIncreasePostLikesMutation>;
export type IncreasePostLikesMutationResult = Apollo.MutationResult<IncreasePostLikesMutation>;
export type IncreasePostLikesMutationOptions = Apollo.BaseMutationOptions<IncreasePostLikesMutation, IncreasePostLikesMutationVariables>;
export const GetAllPostsDocument = gql`
    query GetAllPosts($inputs: GetPostsInput!) {
  getAllPosts(input: $inputs) {
    totalCount
    posts {
      ...PostAllFields
    }
  }
}
    ${PostAllFieldsFragmentDoc}`;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *      inputs: // value for 'inputs'
 *   },
 * });
 */
export function useGetAllPostsQuery(baseOptions: Apollo.QueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables> & ({ variables: GetAllPostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
      }
export function useGetAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
        }
export function useGetAllPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
        }
export type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export type GetAllPostsLazyQueryHookResult = ReturnType<typeof useGetAllPostsLazyQuery>;
export type GetAllPostsSuspenseQueryHookResult = ReturnType<typeof useGetAllPostsSuspenseQuery>;
export type GetAllPostsQueryResult = Apollo.QueryResult<GetAllPostsQuery, GetAllPostsQueryVariables>;
export const GetPostsByTagDocument = gql`
    query GetPostsByTag($input: GetPostsByTagInput!) {
  getPostsByTag(input: $input) {
    totalCount
    posts {
      ...PostBaseFields
      ...PostMetadataFields
    }
  }
}
    ${PostBaseFieldsFragmentDoc}
${PostMetadataFieldsFragmentDoc}`;

/**
 * __useGetPostsByTagQuery__
 *
 * To run a query within a React component, call `useGetPostsByTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsByTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsByTagQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPostsByTagQuery(baseOptions: Apollo.QueryHookOptions<GetPostsByTagQuery, GetPostsByTagQueryVariables> & ({ variables: GetPostsByTagQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsByTagQuery, GetPostsByTagQueryVariables>(GetPostsByTagDocument, options);
      }
export function useGetPostsByTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsByTagQuery, GetPostsByTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsByTagQuery, GetPostsByTagQueryVariables>(GetPostsByTagDocument, options);
        }
export function useGetPostsByTagSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostsByTagQuery, GetPostsByTagQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostsByTagQuery, GetPostsByTagQueryVariables>(GetPostsByTagDocument, options);
        }
export type GetPostsByTagQueryHookResult = ReturnType<typeof useGetPostsByTagQuery>;
export type GetPostsByTagLazyQueryHookResult = ReturnType<typeof useGetPostsByTagLazyQuery>;
export type GetPostsByTagSuspenseQueryHookResult = ReturnType<typeof useGetPostsByTagSuspenseQuery>;
export type GetPostsByTagQueryResult = Apollo.QueryResult<GetPostsByTagQuery, GetPostsByTagQueryVariables>;
export const GetPostsByCategoryDocument = gql`
    query GetPostsByCategory($input: GetPostsByCategoryInput!) {
  getPostsByCategory(input: $input) {
    totalCount
    posts {
      ...PostBaseFields
      ...PostMetadataFields
    }
  }
}
    ${PostBaseFieldsFragmentDoc}
${PostMetadataFieldsFragmentDoc}`;

/**
 * __useGetPostsByCategoryQuery__
 *
 * To run a query within a React component, call `useGetPostsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsByCategoryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPostsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetPostsByCategoryQuery, GetPostsByCategoryQueryVariables> & ({ variables: GetPostsByCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsByCategoryQuery, GetPostsByCategoryQueryVariables>(GetPostsByCategoryDocument, options);
      }
export function useGetPostsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsByCategoryQuery, GetPostsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsByCategoryQuery, GetPostsByCategoryQueryVariables>(GetPostsByCategoryDocument, options);
        }
export function useGetPostsByCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostsByCategoryQuery, GetPostsByCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostsByCategoryQuery, GetPostsByCategoryQueryVariables>(GetPostsByCategoryDocument, options);
        }
export type GetPostsByCategoryQueryHookResult = ReturnType<typeof useGetPostsByCategoryQuery>;
export type GetPostsByCategoryLazyQueryHookResult = ReturnType<typeof useGetPostsByCategoryLazyQuery>;
export type GetPostsByCategorySuspenseQueryHookResult = ReturnType<typeof useGetPostsByCategorySuspenseQuery>;
export type GetPostsByCategoryQueryResult = Apollo.QueryResult<GetPostsByCategoryQuery, GetPostsByCategoryQueryVariables>;
export const GetAllCategoriesDocument = gql`
    query GetAllCategories($orderBy: CategoriesOrderBy) {
  getAllCategories(orderBy: $orderBy) {
    ...CategoryAllFields
  }
}
    ${CategoryAllFieldsFragmentDoc}`;

/**
 * __useGetAllCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
      }
export function useGetAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export function useGetAllCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export type GetAllCategoriesQueryHookResult = ReturnType<typeof useGetAllCategoriesQuery>;
export type GetAllCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllCategoriesLazyQuery>;
export type GetAllCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetAllCategoriesSuspenseQuery>;
export type GetAllCategoriesQueryResult = Apollo.QueryResult<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export const CategoryUsageStatsDocument = gql`
    query CategoryUsageStats {
  categoryUsageStats {
    id
    category_name
    usage_count
    created_at
  }
}
    `;

/**
 * __useCategoryUsageStatsQuery__
 *
 * To run a query within a React component, call `useCategoryUsageStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryUsageStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryUsageStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoryUsageStatsQuery(baseOptions?: Apollo.QueryHookOptions<CategoryUsageStatsQuery, CategoryUsageStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryUsageStatsQuery, CategoryUsageStatsQueryVariables>(CategoryUsageStatsDocument, options);
      }
export function useCategoryUsageStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryUsageStatsQuery, CategoryUsageStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryUsageStatsQuery, CategoryUsageStatsQueryVariables>(CategoryUsageStatsDocument, options);
        }
export function useCategoryUsageStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CategoryUsageStatsQuery, CategoryUsageStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CategoryUsageStatsQuery, CategoryUsageStatsQueryVariables>(CategoryUsageStatsDocument, options);
        }
export type CategoryUsageStatsQueryHookResult = ReturnType<typeof useCategoryUsageStatsQuery>;
export type CategoryUsageStatsLazyQueryHookResult = ReturnType<typeof useCategoryUsageStatsLazyQuery>;
export type CategoryUsageStatsSuspenseQueryHookResult = ReturnType<typeof useCategoryUsageStatsSuspenseQuery>;
export type CategoryUsageStatsQueryResult = Apollo.QueryResult<CategoryUsageStatsQuery, CategoryUsageStatsQueryVariables>;
export const GetAllTagsDocument = gql`
    query GetAllTags($orderBy: TagsOrderBy = CREATED_AT) {
  getAllTags(orderBy: $orderBy) {
    ...TagAllFields
  }
}
    ${TagAllFieldsFragmentDoc}`;

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
export function useGetAllTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTagsQuery, GetAllTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(GetAllTagsDocument, options);
      }
export function useGetAllTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTagsQuery, GetAllTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(GetAllTagsDocument, options);
        }
export function useGetAllTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllTagsQuery, GetAllTagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(GetAllTagsDocument, options);
        }
export type GetAllTagsQueryHookResult = ReturnType<typeof useGetAllTagsQuery>;
export type GetAllTagsLazyQueryHookResult = ReturnType<typeof useGetAllTagsLazyQuery>;
export type GetAllTagsSuspenseQueryHookResult = ReturnType<typeof useGetAllTagsSuspenseQuery>;
export type GetAllTagsQueryResult = Apollo.QueryResult<GetAllTagsQuery, GetAllTagsQueryVariables>;