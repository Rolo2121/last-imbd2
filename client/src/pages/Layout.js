import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../index.css";
import "./CreateAccount.js";
import Nav from "./Nav";
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
  Card,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

import MovieCard from "../MovieCard";
import { GET_MOVIES } from "../utils/queries";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

const { Header, Content, Footer } = Layout;

const AppLayout = ({ setMovie, movies, onAdd }) => {
  const {data, refetch} = useQuery(GET_MOVIES);
  //const [movies, setMovies] = useState([])
  const navigate = useNavigate();
  const onFinish = async (values) => {
    //const movie = await getMovieByName(values.movieName);
    console.log(values)
    const movies = await refetch( values );
    console.log({movies})
    //setMovies(movies);
    //navigate(`/movie`);
  };
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };
  const [form] = Form.useForm();
  const onFormLayoutChange = (fdata) => {};

  return (
    <Layout className="layout">
      <Nav />
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div className="site-layout-content">
          <Form
            layout="vertical"
            form={form}
            onValuesChange={onFormLayoutChange}
            className="margin-top-2"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Enter Movie Name:" name="title">
              <Input placeholder="Find a Movie" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

          <Row gutter={[16, 16]}>
            {data?.movies?.map((movie) => (
              <Col xs={24} sm={12} md={8} lg={6} xlg={4}>
                <MovieCard movie={movie} onAdd={onAdd} />
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
        last-imdb 2022
      </Footer>
    </Layout>
  );
};

export default AppLayout;
