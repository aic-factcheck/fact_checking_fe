import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout, Button, Form, Input,
} from 'antd';

import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import authAtom from '../../_state/auth';
import usersService from '../../api/users.service';
import { NotificationContext } from '../NotificationContext/NotificationContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const { Content } = Layout;

const EditProfile: React.FC = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const notificationApi = useContext(NotificationContext);

  useEffect(() => {
    // redirect to home if not logged in
    if (auth?.user === undefined) {
      navigate('/sign-in');
    }
  }, [auth, navigate]);

  const onFinish = (values: FormData) => {
    const id = auth?.user.id;
    if (id !== undefined) {
      usersService.editProfile(
        id,
        values.firstName,
        values.lastName,
        values.password,
        setAuth,
        auth,
      ).catch((err: any) => {
        const errorMessage = err?.response?.data?.errors[0]?.messages[0].toString();
        notificationApi.error({
          message: errorMessage,
        });
        // closeModal();
      });
    }
  };

  const onFinishFailed = (err: any) => {
    // message.error(errorInfo);
    const errorMessage = err?.response?.data?.errors[0]?.messages[0].toString();
    notificationApi.error({
      message: errorMessage,
    });
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
          firstName: auth?.user.firstName !== undefined ? auth?.user.firstName : '',
          lastName: auth?.user.lastName !== undefined ? auth?.user.lastName : '',
          email: auth?.user.email !== undefined ? auth?.user.email : '',
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
          <Input />
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
          <Input />
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
          <Input />
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
};

export default EditProfile;
