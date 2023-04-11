import React, { useEffect } from 'react';
import {
  Button, Form, Input,
} from 'antd';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import useUserActions from '../../../_actions/user.actions';
import myClaims from '../../../_state/usersClaims';
import authAtom from '../../../_state/auth';

export default function CreateClaim({
  articleSubmited, article, claims, setClaims,
}) {
  const [claimForm] = Form.useForm();
  const navigate = useNavigate();
  const userActions = useUserActions();
  const { t } = useTranslation();
  const auth = useRecoilValue(authAtom);
  const [myClaimsList, setMyClaimsList] = useRecoilState(myClaims);

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }

    if (!myClaimsList) {
      const id = auth?.data.id;
      if (id) {
        userActions.getMyClaims(id, setMyClaimsList);
      }
    }
  }, [auth, navigate, myClaimsList]);

  const onFinish = (values) => {
    const newClaim = {
      addedBy: {
        _id: auth?.data.id,
        firstName: auth?.data.firstName,
        lastName: auth?.data.lastName,
      },
      article: {
        _id: article._id,
      },
      articleId: article._id,
      articles: [article._id],
      createdAt: new Date().toString(),
      nBeenVoted: 0,
      priority: 0,
      text: values.text,
      _id: new Date().toString(),
    };

    // eslint-disable-next-line max-len
    userActions.createClaim(article._id, values, claims, claimForm, setClaims, myClaimsList, newClaim, setMyClaimsList);
  };

  return (
    <Form
      form={claimForm}
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      // initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="text"
        label={t('claim_add_explain')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 22 }}>
        <Button type="primary" htmlType="submit" disabled={!articleSubmited}>
          {t('add')}
        </Button>
      </Form.Item>
    </Form>
  );
}

CreateClaim.propTypes = {
  articleSubmited: PropTypes.bool.isRequired,
  claims: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  setClaims: PropTypes.func.isRequired,
  article: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};
