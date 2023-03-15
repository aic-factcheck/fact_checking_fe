import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout, Button, Checkbox, Form, Input, message, Row, Col,
} from 'antd';

import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import authAtom from '../../../_state/auth';
import useUserActions from '../../../_actions/user.actions';

const { Content } = Layout;

export default function SignUp() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // redirect to home if already logged in
    if (auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const onFinish = (values) => {
    userActions.signup(
      values.firstname,
      values.lastname,
      values.email,
      values.password,
    )
      .catch((error) => {
        message.error(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  return (
    <Content
      className="authentification"
      style={{ padding: '5%', paddingTop: '3%' }}
    >
      <Row
        style={{
          background: 'white', marginTop: '0%', borderRadius: '10px', padding: '2%',
        }}
      >
        <Col span={24}>
          <div style={{
            justifyContent: 'center', disply: 'flex', alignItems: 'center', marginBottom: '4%',
          }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/pictures/high-fact.png`}
              alt="user"
              width="50%"
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </div>

          <Form
            name="basic"
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name={t('first_name')}
              rules={[
                {
                  required: true,
                  message: 'Please input your first name!',
                },
              ]}
            >
              <Input placeholder="First name" />
            </Form.Item>

            <Form.Item
              name="lastname"
              rules={[
                {
                  required: true,
                  message: 'Please input your last name!',
                },
              ]}
            >
              <Input placeholder={t('last_name')} />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input placeholder={t('email')} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password placeholder={t('password')} />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              label=""
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Checkbox>{t('remember_me')}</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Button block type="primary" htmlType="submit">
                {t('register')}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );
}
