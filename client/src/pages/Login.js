import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import Nav from "./Nav";
import "../index.css";
import {useLazyQuery} from "@apollo/client";
import { Form, Input, Button, Radio, Select, Cascader, DatePicker, InputNumber, TreeSelect, Switch, Checkbox, Upload } from "antd";
import { GET_LOGIN } from "../utils/queries";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const Login = ({ onLogin }) => {
  const[GetLogin,{data}] = useLazyQuery(GET_LOGIN);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      //const response = await axios.post("/api/user/login", values);
      GetLogin(values);
      onLogin();
      navigate("/watchlist");
    } catch (error) {
      console.error(error.response);
    }
  };
  const onFormLayoutChange = ({ disabled }) => {
    /* setComponentDisabled(disabled);
  };*/
  };

  return (
    <>
      <Nav></Nav>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        <Form.Item label="Login">
          <Button htmlType="submit">Login</Button>
        </Form.Item>
      </Form>
      <Button
        type="link"
        onClick={() => {
          navigate("/createaccount");
        }}
      >
        Don't have an account register here
      </Button>
    </>
  );
};

export default Login;
