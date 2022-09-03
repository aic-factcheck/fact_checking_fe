import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout, Button, Checkbox, Form, Input,
} from 'antd';

import { useRecoilValue } from 'recoil';

import authAtom from '../../../_state/auth';
import useUserActions from '../../../_actions/user.actions';

const { Content } = Layout;

export default function SignIn() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect to home if already logged in
    if (auth) {
      // history.push('/');
      // window.location.reload(false);
      navigate('/');
    }
  }, []);

  const onFinish = (values) => {
    userActions.login(values.email, values.password)
      .catch((error) => {
        console.error(error);
        // setErrorMessage(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
}
