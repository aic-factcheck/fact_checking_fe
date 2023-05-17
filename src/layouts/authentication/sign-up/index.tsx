import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Layout, Button, Form, Input, Row, Col, Divider,
} from 'antd';

import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { CloseOutlined } from '@ant-design/icons';
import authAtom from '../../../_state/auth';
import usersService from '../../../api/users.service';
import { NotificationContext } from '../../../components/NotificationContext/NotificationContext';
// import http_common from '../../../http_common';

const { Content } = Layout;

const SignUp: React.FC = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const notificationApi = useContext(NotificationContext);

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.user?.email !== undefined) {
      navigate('/');
    }
  }, [auth, navigate]);

  const onFinish = (values: any) => {
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
    }).catch((err: any) => {
      notificationApi.info({
        message: err.response.data.message,
        icon: <CloseOutlined />,
      });
    });
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
            autoComplete="off"
          >
            <Form.Item
              name="firstname"
              rules={[
                {
                  required: true,
                  message: t('please_first'),
                  min: 5,
                },
              ]}
            >
              <Input placeholder="First name" id="firstNameRegister" />
            </Form.Item>

            <Form.Item
              name="lastname"
              rules={[
                {
                  required: true,
                  message: t('please_last'),
                  min: 5,
                },
              ]}
            >
              <Input placeholder={t('last_name')} id="lastNameRegister" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: t('please_mail'),
                  min: 6,
                },
              ]}
            >
              <Input placeholder={t('email')} id="emailRegister" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t('please_pass'),
                  min: 8,
                },
              ]}
            >
              <Input.Password placeholder={t('password')} id="passwordRegister" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 24,
              }}
            >
              <Button block type="primary" htmlType="submit" id="submitRegister">
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
