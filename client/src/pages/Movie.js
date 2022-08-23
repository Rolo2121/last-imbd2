import React, { useEffect, useState } from "react";

import "antd/dist/antd.css";
import "../index.css";
import "./CreateAccount.js"
import Nav from './Nav'
import Comments from "./Comments";
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
  Image,
  Tag
} from "antd";
import {
    UserOutlined
} from "@ant-design/icons"
import { useParams } from "react-router-dom";

const { Header, Content, Footer } = Layout

const Movie = () => {
    let {id}= useParams()
    const tags = [1, 2, 3]
    return(<><Nav/><Card>
         <Row>
    <Col  xs={24} sm={12}>
    <Image
    width={200}
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  />
    </Col>

    <Col xs={24} sm={12}>
        <h2>2022</h2>
      <h1>{id}</h1>
      {tags.map(tag => (<Tag>{tag}</Tag>))}
      <div style={{display: "flex"}}>
        <Button type="primary">rating</Button>
        <Button>Watchlist</Button>
        <Button>Trailer</Button>

      </div>
      <div>
      <p><span style={{fontWeight: "bold"}}>Runtime:</span> 2 h 29 min </p>
      <p><span style={{fontWeight: "bold"}}>Original Title:</span> Avengers </p>
      <p><span style={{fontWeight: "bold"}}>Actors:</span> Chris 
      Evans </p>
      <p><span style={{fontWeight: "bold"}}>Director:</span> Anthony Russo, Joe Russo </p>
      <p><span style={{fontWeight: "bold"}}>Production: </span> Marvel Studios </p>
      <h2>Overview</h2>
      <p>As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.</p>

      <p><span style={{fontWeight: "bold"}}>Budget: </span> 300,000,000 </p>
      <p><span style={{fontWeight: "bold"}}>2,046,239,637  </span> Marvel Studios </p>

      </div>

    </Col>
  </Row>

    </Card>
    <Comments />
    
    </>)



}

export default Movie;