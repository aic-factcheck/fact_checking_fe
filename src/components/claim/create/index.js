import React, { useEffect } from 'react';
import {
  Button, Form, Input, message,
} from 'antd';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useFetchWrapper from '../../../_helpers/fetch_wrapper';
import myClaims from '../../../_state/usersClaims';
import authAtom from '../../../_state/auth';

export default function CreateClaim({
  articleSubmited, article, claims, setClaims,
}) {
  const fetchWrapper = useFetchWrapper();
  const [claimForm] = Form.useForm();
  const navigate = useNavigate();
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
        fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/users/${id}/claims`).then((res) => {
          const claimsList = res.filter((el) => id === el?.addedBy._id);
          setMyClaimsList(claimsList);
        }).catch(console.log(''));
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

    fetchWrapper.post(`${process.env.REACT_APP_API_BASE}/articles/${article._id}/claims`, values)
      .then((res) => {
        const mergedClaims = [...claims];
        res.key = res._id;
        mergedClaims.push(res);
        message.success('Successfully added new claim');
        claimForm.resetFields(['text']);
        setClaims(mergedClaims);
        const mergedMyClaims = [...myClaimsList, newClaim];
        setMyClaimsList(mergedMyClaims);
      })
      .catch((e) => message.error(e));
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
        label="Claim - A sentence from the article to be fact-checked."
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
          Add claim
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
