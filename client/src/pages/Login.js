import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import Nav from "./Nav";
import "../index.css";
import {useLazyQuery, useMutation} from "@apollo/client";
import { Form, Input, Button, Radio, Select, Cascader, DatePicker, InputNumber, TreeSelect, Switch, Checkbox, Upload } from "antd";
import { LOGIN_MUTATION } from "../utils/mutations";
import { useValue } from "../utils/GlobalState";
import { GlobalContext } from "../utils/GlobalState";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const Login = ({ onLogin }) => {
  const[loginMutation,{data}] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {currentUser, dispatch} = useValue()
  console.log(currentUser)
  console.log(useValue())
  console.log(dispatch)
  console.log(GlobalContext)
  useEffect(() => {
    if (data) {
      console.log(data)
      const { token, user} = data.login
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      onLogin();
      navigate("/");
    }
  },[data])
  const onFinish = async (values) => {
    try {
      //const response = await axios.post("/api/user/login", values);
      loginMutation({variables: values});
    
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
