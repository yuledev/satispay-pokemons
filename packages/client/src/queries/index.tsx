import gql from "graphql-tag";

const GET_POKEMONS = gql`
  query pokemons($q: String, $types: [String], $after: ID, $limit: Int) {
    pokemons(q: $q, types: $types, after: $after, limit: $limit) {
      edges {
        node {
          id
          name
          types
          classification
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const GET_POKEMONS_BY_TYPES = gql`
  query pokemons($types: [String], $after: ID, $limit: Int) {
    pokemons(types: $types, after: $after, limit: $limit) {
      edges {
        node {
          id
          name
          types
          classification
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export { GET_POKEMONS, GET_POKEMONS_BY_TYPES };
