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



const { Header, Content, Footer } = Layout;
const NavLayout = () => {

return(
      <Header>
      <div className="logo">last-imdb</div>
      <Menu mode="horizontal" theme="dark" defaultSelectedKeys={['UserOutlined']} style= {{float: 'right'}}>
  <Menu.Item key="UserOutlined" icon={<UserOutlined />}>
  </Menu.Item>
</Menu>
  
    </Header>
)}
export default NavLayout