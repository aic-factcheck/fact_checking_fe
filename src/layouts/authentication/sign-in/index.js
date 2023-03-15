import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout, Button, Checkbox, Form, Input, message, Row, Col, Divider,
} from 'antd';

import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import authAtom from '../../../_state/auth';
import useUserActions from '../../../_actions/user.actions';

const { Content } = Layout;

export default function SignIn() {
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
            justifyContent: 'center', disply: 'flex', alignItems: 'center',
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
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
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
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
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
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 0,
                span: 16,
              }}
              style={{ margin: '2%' }}
            >
              <Checkbox>
                <div>
                  {t('remember_me')}
                </div>
              </Checkbox>
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
            paddingTop: '1%', marginBottom: '5%', padding: '1%', textAlign: 'center', margin: '2%',
          }}
          >
            <p>
              {t('not_registered_question')}
            </p>
            <Button block type="primary" htmlType="submit" style={{ marginRight: '2%', padding: '1%' }}>
              <a type="button" href="/sign-up">
                {t('register')}
              </a>
            </Button>
          </div>
        </Col>
      </Row>
    </Content>
  );
}
