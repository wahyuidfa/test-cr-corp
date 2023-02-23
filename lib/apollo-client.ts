import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://beta.pokeapi.co/graphql/console/",
    cache: new InMemoryCache(),
});

export { client };
