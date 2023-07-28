import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Layout,
} from 'antd';

import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import { CloseOutlined } from '@ant-design/icons';
import usersService from '../../api/users.service';
import authAtom from '../../_state/auth';
import { NotificationContext } from '../NotificationContext/NotificationContext';

const { Content } = Layout;

const Invitation: React.FC = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const notificationApi = useContext(NotificationContext);

  useEffect(() => {
    const id = auth?.user?._id;
    // redirect to home if already logged in
    if (id === undefined) {
      navigate('/sign-in');
    }
  }, [auth]);

  const onFinish = (values: any) => {
    usersService.invite(
      values.invitedEmail,
    ).then(() => {
      notificationApi.info({
        message: t('successfully_invited'),
        description: t('gained_30'),
        icon: <img alt="leaders" width="50%" src={`${process.env.PUBLIC_URL}/pictures/experience.png`} style={{ marginRight: '5%' }} />,
      });
    }).catch((err: any) => {
      notificationApi.info({
        message: err.response.data.message,
        icon: <CloseOutlined />,
      });
    });
  };

  return (
    <Content className="site-layout" style={{ paddingLeft: '0%', padding: '1%', paddingTop: '5%' }}>
      <p>{t('invite_about')}</p>
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
          name="invitedEmail"
          rules={[
            {
              required: true,
              message: t('please_first'),
              min: 4,
            },
          ]}
        >
          <Input placeholder={t('email')} id="emailInvite" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 24,
          }}
        >
          <Button block type="default" htmlType="submit" id="submitRegister">
            {t('invite')}
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default Invitation;
