import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout, Button, Form, Input, message,
} from 'antd';

import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import authAtom from '../../_state/auth';
import useUserActions from '../../_actions/user.actions';

const { Content } = Layout;

export default function EditProfile() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // redirect to home if not logged in
    if (!auth) {
      navigate('/sign-in');
    }
  }, [auth, navigate]);

  const onFinish = (values) => {
    const id = auth?.data.id;
    if (id) {
      userActions.editProfile(
        id,
        values.firstName,
        values.lastName,
        values.email,
        values.password,
      )
        .catch((error) => {
          message.error(error);
        });
      navigate('/');
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  return (
    <Content className="site-layout" style={{ paddingLeft: '0%', padding: '1%' }}>
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          firstName: auth?.data.firstName ? auth?.data.firstName : '',
          lastName: auth?.data.lastName ? auth?.data.lastName : '',
          email: auth?.data.email ? auth?.data.email : '',
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          id="1st"
          label={t('first_name')}
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
          ]}
        >
          <Input defaultValue={auth?.data.firstName ? auth?.data.firstName : ''} />
        </Form.Item>

        <Form.Item
          id="2nd"
          label={t('last_name')}
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
          ]}
        >
          <Input defaultValue={auth?.data.lastName ? auth?.data.lastName : ''} />
        </Form.Item>

        <Form.Item
          id="3rd"
          label={t('email')}
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input defaultValue={auth?.data.email ? auth?.data.email : ''} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            {t('submit')}
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
}
