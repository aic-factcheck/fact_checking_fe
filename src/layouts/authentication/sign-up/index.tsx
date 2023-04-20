import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Layout, Button, Form, Input, message, Row, Col, Divider,
} from 'antd';

import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import authAtom from '../../../_state/auth';
import usersService from '../../../api/users.service';
// import http_common from '../../../http_common';

const { Content } = Layout;

const SignUp: React.FC = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.user?.email !== undefined) {
      navigate('/');
    }
  }, [auth, navigate]);

  const onFinish = (values: any) => {
    try {
      usersService.signup(
        values.firstname,
        values.lastname,
        values.email,
        values.password,
      ).then((res) => {
        setAuth(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        localStorage.setItem('accessToken', res.data.token.accessToken);
        localStorage.setItem('refreshToken', res.data.token.refreshToken);
        localStorage.setItem('email', res.data.user.email);
        localStorage.setItem('expiresIn', res.data.token.expiresIn);
        // eslint-disable-next-line max-len
        // http_common.defaults.headers.common['Authorization'] = `Bearer ${res.data.token.accessToken}`;
      });
    } catch (error: any) {
      message.error(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
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
            justifyContent: 'center', display: 'flex', alignItems: 'center', marginBottom: '4%',
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
          <Divider style={{ margin: '1%' }} />
          <div style={{
            paddingTop: '1%', marginBottom: '5%', textAlign: 'center',
          }}
          >
            <p>
              {t('already_registered_question')}
            </p>
            <Link to="/sign-in" style={{ textDecoration: 'none' }}>
              <Button block type="primary" htmlType="submit">
                {t('sign_in')}
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Content>
  );
};

export default SignUp;
