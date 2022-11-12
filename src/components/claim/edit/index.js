import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input, message,
} from 'antd';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import useFetchWrapper from '../../../_helpers/fetch_wrapper';
import authAtom from '../../../_state/auth';

export default function EditClaim({
  claim, setMyClaimsList, claimsList, indexClaim,
}) {
  const auth = useRecoilValue(authAtom);
  const fetchWrapper = useFetchWrapper();
  const navigate = useNavigate();
  const [claimForm] = Form.useForm();

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
  }, [auth, navigate]);

  const onFinish = (values) => {
    /* const mergedValues = values;
    mergedValues.sourceType = 'claim'; */
    const articleid = claim.articleId;
    const claimid = claim._id;
    const id = auth?.data.id;

    if (id) {
      fetchWrapper.patch(`${process.env.REACT_APP_API_BASE}/articles/${articleid}/claims/${claimid}`, values)
        .then(() => {
          message.success('Successfully edited claim');
          const mergedClaims = [...claimsList];

          if (mergedClaims[indexClaim]?.text) {
            mergedClaims[indexClaim].text = values.text;
          }

          setMyClaimsList(mergedClaims);
          // mergedClaims.sourceType = 'claim';
          // fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/users/${id}/claims`).then((res)
          // => setMyClaimsList(res)).catch(console.log('api error'));
        })
        .catch((e) => message.error(e));
    }
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
      initialValues={{
        text: claim.text,
      }}
    >
      <Form.Item
        name="text"
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        label="Claim - A sentence from the claim to be fact-checked"
        style={{ color: '#000000' }}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 22 }}>
        <Button type="primary" htmlType="submit">
          Edit claim
        </Button>
      </Form.Item>
    </Form>
  );
}

EditClaim.propTypes = {
  claim: PropTypes.shape({
    _id: PropTypes.string,
    articleId: PropTypes.string,
    sourceUrl: PropTypes.string,
    text: PropTypes.string,
    sourceType: PropTypes.string,
    language: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  setMyClaimsList: PropTypes.func,
  claimsList: PropTypes.arrayOf(PropTypes.objectOf),
  indexClaim: PropTypes.number,
};

EditClaim.defaultProps = {
  setMyClaimsList: () => {},
  claimsList: [],
  indexClaim: 0,
};
