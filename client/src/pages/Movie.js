import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../index.css";
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

const { Header, Content, Footer } = Layout

const Movie = () => {
    return<Card>
         <Row>
    <Col span={12}>
      image goes here
    </Col>
    <Col span={12}>
      content goes here
    </Col>
  </Row>

    </Card>



}

export default Movie;