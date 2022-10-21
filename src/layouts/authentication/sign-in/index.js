import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout, Button, Checkbox, Form, Input, message,
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
      navigate('/');
    }
  }, [auth, navigate]);

  const onFinish = (values) => {
    userActions.login(values.email, values.password)
      .catch((error) => {
        message.error(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  return (
    <Content
      className="site-layout"
      style={{
        padding: '3%', marginTop: '1%', marginRight: '10%', marginLeft: '10%',
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 10,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          paddingTop: '1%', padding: '5%', marginTop: 64, background: '#00887A', borderRadius: '10px',
        }}
      >
        <Form.Item
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          label="Your email"
          name="email"
          className="whites"
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
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          label="Your password"
          name="password"
          className="whites"
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
          <Checkbox>
            <div style={{ color: '#000000' }}>
              Remember me
            </div>
          </Checkbox>
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
