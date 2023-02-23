import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
    query GetPokemon($id: ID!) {
        pokemon(id: $id) {
            id
            name
            height
            weight
            imageUrl
            types
        }
    }
`;
