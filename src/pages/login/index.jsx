import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, Button, message, Typography, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { login } from "./../../app/app.slice";
import { useLoginUserMutation } from "./login.service";

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { isLoading, isSuccess, error }] = useLoginUserMutation();

  const onFinish = async (values) => {
    try {
      const user = await loginUser(values).unwrap();

      dispatch(login(user));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash");
      message.success("Login successful");
    }

    if (error) message.error(`Login failed: ${error?.data?.error?.message}`);
  }, [isSuccess, error]);

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        backgroundImage: 'url("back.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Col xs={20} sm={16} md={12} lg={8}>
        <div
          style={{
            padding: "40px",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Title
            level={2}
            style={{
              color: "#ffffff",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            Login
          </Title>
          <Form name="login" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isLoading}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
