import React, { useState } from "react";
import { Select } from "antd";
import { GET_POKEMONS } from "../queries";
import { useQuery } from "react-apollo";

interface SelectedProps {
  SelectedHandler: (value: any) => void;
}

const PokemonSearchByType: React.FC<SelectedProps> = props => {
  const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (data.pokemons.pageInfo.hasNextPage) {
    fetchMore({
      variables: {
        after: data.pokemons.pageInfo.endCursor
      },
      updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
        let combinedData = {
          pokemons: {
            pageInfo: { ...fetchMoreResult.pokemons.pageInfo },
            edges: [
              ...previousResult.pokemons.edges,
              ...fetchMoreResult.pokemons.edges
            ],
            __typename: fetchMoreResult.pokemons.__typename
          }
        };
        return combinedData;
      }
    });
  }

  let cleanData = data.pokemons.edges
    .map((x: any) => x.node.types.map((y: any) => y))
    .flat();
  cleanData = Array.from(new Set(cleanData));

  return (
    <div>
      <Select
        allowClear
        size="large"
        mode="multiple"
        placeholder="Search by Type"
        style={{ width: "100%" }}
        onChange={value => props.SelectedHandler(value)}
      >
        {cleanData.map((item: any) => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default PokemonSearchByType;
