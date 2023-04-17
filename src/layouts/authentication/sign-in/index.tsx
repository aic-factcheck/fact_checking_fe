import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Layout, Button, Form, Input, message, Row, Col, Divider,
} from 'antd';
import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import authAtom from '../../../_state/auth';
import usersService from '../../../api/users.service';
import http_common from '../../../http_common';

const { Content } = Layout;

interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.user?.id != undefined) {
      navigate('/');
    }
  }, [auth, navigate]);

  const onFinish = (values: FormData) => {
    try {
      usersService.login(values.email, values.password).then((res: any) => {
        setAuth(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        localStorage.setItem('token', res.data.token.accessToken);
        http_common.defaults.headers.common.Authorization = `Bearer ${res.data.token.accessToken}`;
        console.log(res.data.token.accessToken);
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
            justifyContent: 'center', display: 'flex', alignItems: 'center',
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
            layout="vertical"
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{
              paddingTop: '1%', paddingBottom: '1%', padding: '1%', marginTop: 10, background: 'white', borderRadius: '10px',
            }}
          >
            <Form.Item
              label=""
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your mail address!',
                },
              ]}
              style={{ margin: '2%' }}
            >
              <Input placeholder={t('email')} />
            </Form.Item>

            <Form.Item
              label=""
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              style={{ margin: '2%' }}
            >
              <Input.Password placeholder={t('password')} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
              style={{ margin: '2%' }}
            >
              <Button block type="primary" htmlType="submit">
                {t('sign_in')}
              </Button>
            </Form.Item>
          </Form>
          <Divider style={{ margin: '1%' }} />
          <div style={{
            paddingTop: '1%', marginBottom: '5%', textAlign: 'center', margin: '2%', padding: '1%',
          }}
          >
            <p>
              {t('not_registered_question')}
            </p>
            <Link to="/sign-up" style={{ textDecoration: 'none' }}>
              <Button block type="primary" htmlType="submit">
                {t('register')}
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Content>
  );
}

export default SignIn;