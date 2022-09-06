import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION, UPDATE_ACCOUNT } from "../utils/mutations";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Form, Input, Button, Radio, Select, Cascader, DatePicker, InputNumber, TreeSelect, Switch, Checkbox, Upload } from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const App = ({ onLogin }) => {
  const [mutateFunction, { data }] = useMutation(SIGNUP_MUTATION);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [componentDisabled, setComponentDisabled] = useState(false);
  useEffect(() => {
    if (data) {
      console.log(data);
      const { token, user } = data.signup;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      onLogin();
      navigate("/");
    }
  }, [data]);
  const onFinish = async (values) => {
    try {
      //const response = await axios.post("/api/user/signup", values);
      mutateFunction({ variables: values });
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
        disabled={componentDisabled}
      >
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        <Form.Item label="Profile Pic" valuePropName="fileList">
          <Upload
            fileList={fileList}
            onChange={({ fileList: fl }) => {
              setFileList(fl);
            }}
            beforeUpload={() => {
              return false;
            }}
            action="/upload.do"
            listType="picture-card"
          >
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Submit">
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default App;
