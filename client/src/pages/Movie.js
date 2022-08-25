import React, { useEffect, useState } from "react";

import "antd/dist/antd.css";
import "../index.css";
import "./CreateAccount.js";
import Nav from "./Nav";
import Comments from "./Comments";
import { PageHeader, Breadcrumb, Layout, Menu, Col, Row, TimePicker, Form, Input, Button, Space, Card, Image, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const Movie = ({}) => {
  const tags = [1, 2, 3];
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch("/api/movie/movie/" + id);
      console.log(response);
      const data = await response.json();
      setMovie(data);
    };
    getMovies();
  }, []);
  return (
    <>
      <Nav />
      <Card>
        <Row>
          <Col xs={24} sm={12}>
            <Image width={200} src={movie.poster} />
          </Col>

          <Col xs={24} sm={12}>
            <h2>{movie.createdAt}</h2>
            <h1>{movie.title}</h1>
            {tags?.map((tag) => (
              <Tag>{tag}</Tag>
            ))}
            <div style={{ display: "flex" }}>
              <Button type="primary">rating</Button>
              <Button>Watchlist</Button>
              <Button>Trailer</Button>
            </div>
            <div>
              <p>
                <span style={{ fontWeight: "bold" }}>Rating:</span> {movie.rating}{" "}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Original Title:</span> {movie.title}{" "}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Release Date:</span> {movie.createdAt}{" "}
              </p>

              <h2>Overview</h2>
              <p>{movie?.overview}</p>
            </div>
          </Col>
        </Row>
      </Card>
      <Comments />
    </>
  );
};

export default Movie;
