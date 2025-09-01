// graphqlClient.ts (서버사이드용)
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export const createServerApolloClient = (sessionCookie?: string) => {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      // 세션 쿠키를 GraphQL 요청에 포함
      cookie: sessionCookie || "",
    },
  }));

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode: true,
  });
};
