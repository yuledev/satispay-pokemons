import React, { useState } from "react";

import { Layout, Row, Col, Typography } from "antd";
import { Icon } from "antd";
import PokemonTable from "./PokemonTable";
import PokemonSearch from "./PokemonSearch";
import PokemonSearchByType from "./PokemonSearchByType";

const { Footer, Content } = Layout;
const { Title } = Typography;

const PokeballSvg = () => (
  <svg
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="2135"
    width="50"
    height="50"
  >
    <path
      d="M512 17.066667C238.933333 17.066667 17.066667 238.933333 17.066667 512S238.933333 1006.933333 512 1006.933333 1006.933333 785.066667 1006.933333 512 785.066667 17.066667 512 17.066667z m0 341.333333c85.333333 0 153.6 68.266667 153.6 153.6s-68.266667 153.6-153.6 153.6-153.6-68.266667-153.6-153.6 68.266667-153.6 153.6-153.6z m0 614.4c-249.173333 0-450.56-197.973333-460.8-443.733333h273.066667c10.24 95.573333 88.746667 170.666667 187.733333 170.666666s177.493333-75.093333 187.733333-170.666666h273.066667c-10.24 245.76-211.626667 443.733333-460.8 443.733333z"
      p-id="2136"
      data-spm-anchor-id="a313x.7781069.0.i0"
      className=""
    ></path>
    <path
      d="M512 624.64c61.44 0 112.64-51.2 112.64-112.64s-51.2-112.64-112.64-112.64-112.64 51.2-112.64 112.64 51.2 112.64 112.64 112.64z m0-187.733333c40.96 0 78.506667 34.133333 78.506667 78.506666s-34.133333 78.506667-78.506667 78.506667-78.506667-34.133333-78.506667-78.506667 37.546667-78.506667 78.506667-78.506666z"
      p-id="2137"
    ></path>
  </svg>
);

const PokeballIcon = () => <Icon component={PokeballSvg} />;

const App: React.FC = () => {
  const [selected, setSelected] = useState<String>();
  const [selectedTypes, setSelectedTypes] = useState<[String]>([""]);

  const handleSelect = (selected: string) => {
    setSelected(selected);
  };

  const handleSelectTypes = (selected: [String]) => {
    setSelectedTypes(selected);
  };

  return (
    <div className="App">
      <Layout className="layout" style={{ background: "#fff" }}>
        <Content style={{ padding: "50px 50px" }}>
          <Row style={{ border: "5px solid #1890ff", padding: 20 }} gutter={16}>
            <Col>
              <PokeballIcon />
              <Title>POKEDEX SEARCH</Title>
            </Col>
          </Row>

          <Row style={{ padding: "30px 0" }} gutter={16}>
            <Col className="gutter-row" span={12}>
              <div className="gutter-box">
                <PokemonSearch SelectedHandler={value => handleSelect(value)} />
              </div>
            </Col>

            <Col className="gutter-row" span={12}>
              <div className="gutter-box">
                <PokemonSearchByType
                  SelectedHandler={value => handleSelectTypes(value)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <PokemonTable
                SelectedValue={selected || ""}
                SelectedTypes={selectedTypes || ""}
              />
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
