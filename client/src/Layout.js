import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { PageHeader, Breadcrumb, Layout, Menu, Col, Row, TimePicker, Form, Input, Button, Space, Card } from "antd";
import MovieCard from "./MovieCard";

const { Header, Content, Footer } = Layout;
const AppLayout = () => {
  const [form] = Form.useForm();
  const onFormLayoutChange = (fdata) => {};
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const updateMovies = async () => {
      const response = await fetch("/api/movie");
      const data = await response.json();
      setMovies(data);
    };
    updateMovies();
  }, []);
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">last-imdb</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(3).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div className="site-layout-content">
          <Form layout="vertical" form={form} onValuesChange={onFormLayoutChange} className="margin-top-2">
            <Form.Item label="Enter Movie Name:">
              <Input placeholder="Find a Movie" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Submit</Button>
            </Form.Item>
          </Form>

          <Row gutter={[16, 16]}>
            {Array(5)
              .fill(movies[0])
              .map((movie) => (
                <Col xs={24} sm={12} md={8} lg={6} xlg={4}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
          </Row>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default AppLayout;
