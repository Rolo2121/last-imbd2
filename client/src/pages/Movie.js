import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import "antd/dist/antd.css";
import "../index.css";
import "./CreateAccount.js";
import Nav from "./Nav";
import Comments from "./Comments";
import { PageHeader, Breadcrumb, Layout, Menu, Col, Row, TimePicker, Form, Input, Button, Space, Card, Image, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { GET_MOVIE } from "../utils/queries";

const { Header, Content, Footer } = Layout;

const Movie = ({}) => {
  const [getmovie, { data }] = useLazyQuery(GET_MOVIE);
  const { id } = useParams();
  useEffect(() => {
    getmovie({ variables: { id } });
  }, []);
  const movie = data ? data.movie || {} : {};

  return (
    <>
      <Nav />
      <Card>
        <Row>
          <Col xs={24} sm={12}>
            <Image width={200} src={movie.poster} />
          </Col>

          <Col xs={24} sm={12}>
            <h2>{(movie.releaseDate || "").split("-")[0]}</h2>
            <h1>{movie.title}</h1>

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
              <p>{movie.overview}</p>
            </div>
          </Col>
        </Row>
      </Card>
      <Comments />
    </>
  );
};

export default Movie;
