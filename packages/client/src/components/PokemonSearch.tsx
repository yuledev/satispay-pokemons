import React, { useState } from "react";
import { AutoComplete } from "antd";
import { ApolloConsumer } from "react-apollo";
import { GET_POKEMONS } from "../queries";

interface SelectedProps {
  SelectedHandler: (value: any) => void;
}

const PokemonSearch: React.FC<SelectedProps> = props => {
  const [listOfPokemons, setlistOfPokemons] = useState<[]>();

  const handleSearchByName = async (value: string, client: any) => {
    if (value.length > 1) {
      const { data } = await client.query({
        query: GET_POKEMONS,
        variables: { q: value }
      });
      setlistOfPokemons(data.pokemons.edges.map((x: any) => x.node));
    }
  };

  return (
    <div>
      <ApolloConsumer>
        {client => (
          <div>
            <AutoComplete
              allowClear
              size="large"
              style={{ width: "100%" }}
              onSelect={value => props.SelectedHandler(value)}
              onSearch={value => {
                handleSearchByName(value, client);
              }}
              placeholder="Start typing pokemon name..."
            >
              {(listOfPokemons || []).map((pokemon: any, index) => {
                return (
                  <AutoComplete.Option key={pokemon.name}>
                    {pokemon.name}
                  </AutoComplete.Option>
                );
              })}
            </AutoComplete>
          </div>
        )}
      </ApolloConsumer>
    </div>
  );
};

export default PokemonSearch;
