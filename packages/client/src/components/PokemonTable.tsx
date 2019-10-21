import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { useQuery } from "react-apollo";
import { GET_POKEMONS } from "../queries";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Types",
    dataIndex: "types",
    key: "types",
    render: (types: any) => (
      <span>
        {types.map((type: string) => {
          let color = "geekblue";
          if (type === "Fire") {
            color = "volcano";
          }
          if (type === "Water") {
            color = "cyan";
          }
          if (type === "Grass") {
            color = "green";
          }
          if (type === "Poison") {
            color = "purple";
          }
          if (type === "Ground") {
            color = "brown";
          }
          return (
            <Tag color={color} key={type}>
              {type.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: "Classification",
    dataIndex: "classification",
    key: "classification"
  }
];

interface SelectedProps {
  SelectedValue: String;
  SelectedTypes: [String];
}

const PokemonTable: React.FC<SelectedProps> = props => {
  const [selected, setSelected] = useState<String>();
  const [selectedTypes, setSelectedTypes] = useState<String[]>();

  useEffect(() => {
    if (selected !== props.SelectedValue) {
      setSelected(props.SelectedValue);
      setSelectedTypes(undefined);
    }
    if (selectedTypes !== props.SelectedTypes) {
      setSelectedTypes(props.SelectedTypes);
      setSelected(undefined);
    }
  }, [props.SelectedValue, props.SelectedTypes]);

  const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: { q: selected, types: selectedTypes }
  });
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

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data.pokemons.edges.map((x: any) => x.node)}
        rowKey={record => record.id}
      />
    </div>
  );
};

export default PokemonTable;
