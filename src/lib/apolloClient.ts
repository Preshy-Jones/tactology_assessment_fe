import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BASE_API_URL, // Your GraphQL API URL
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${
      typeof window !== "undefined" ? localStorage.getItem("token") : ""
    }`,
  },
});

export default client;
