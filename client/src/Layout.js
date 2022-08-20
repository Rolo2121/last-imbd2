import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import "./Login.js"
import {
  PageHeader,
  Breadcrumb,
  Layout,
  Menu,
  Col,
  Row,
  TimePicker,
  Form,
  Input,
  Button,
  Space,
  Card
} from "antd";
import {
    UserOutlined
} from "@ant-design/icons"

import MovieCard from "./MovieCard";

const { Header, Content, Footer } = Layout;
const AppLayout = () => {
  const [form] = Form.useForm();
  const onFormLayoutChange = (fdata) => {};
  const [movies, setMovies] = useState([]);
  useEffect(() => {

    const getMovies = async () => {
      const response = await fetch("/api/movie");
      console.log(response);
      const data = await response.json();
      setMovies(data);
    };
    getMovies();
  }, []);
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">last-imdb</div>
        <Menu mode="horizontal" theme="dark" defaultSelectedKeys={['UserOutlined']} style= {{float: 'right'}}>
    <Menu.Item key="UserOutlined" icon={<UserOutlined />}>
    </Menu.Item>
  </Menu>
    
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
            {movies
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
