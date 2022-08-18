import React from "react";
import "antd/dist/antd.css";
import "./index.css";
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

const { Header, Content, Footer } = Layout;
const temp = [1, 2, 3, 4];
const App = () => {
  const [form] = Form.useForm();
  const onFormLayoutChange = (fdata) => {};
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">last-imdb</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(3).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
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
          >
            <Form.Item label="Enter Movie Name:">
              <Input placeholder="Find a Movie" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Submit</Button>
            </Form.Item>
          </Form>

          <Row gutter={[16, 16]}>
            {temp.map((t, i) => (
              <Col xs={24} sm={12} md={8} lg={6} xlg={4}>
                <Card
                  hoverable
                  style={{
                    width: '100%',
                  }}
                  cover={
                    <img
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    />
                  }
                >
                  <Card.Meta
                    title="Europe Street beat"

                  />
                </Card>
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
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
