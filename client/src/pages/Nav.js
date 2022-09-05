import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../index.css";
import "./CreateAccount.js"
import { useNavigate } from "react-router-dom";
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
const navigate = useNavigate()
return(
      <Header>
      <div className="logo">last-imdb</div>
      <Button onClick={() => {
        navigate("/")
      }}>Home</Button>

  
      <Menu mode="horizontal" theme="dark" defaultSelectedKeys={['UserOutlined']} style= {{float: 'right'}}>

  <Menu.Item key="UserOutlined" onClick={() => {
    navigate("/login")
  }} icon={<UserOutlined />}>
  </Menu.Item>
</Menu>
  
    </Header>
)}
export default NavLayout