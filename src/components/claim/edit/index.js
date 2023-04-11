import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input,
} from 'antd';
import PropTypes from 'prop-types';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import useUserActions from '../../../_actions/user.actions';
import myClaims from '../../../_state/usersClaims';
import authAtom from '../../../_state/auth';

export default function EditClaim({
  claim, indexClaim,
}) {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const userActions = useUserActions();
  const { t } = useTranslation();
  const [claimForm] = Form.useForm();
  const [myClaimsList, setMyClaimsList] = useRecoilState(myClaims);

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
  }, [auth, navigate]);

  const onFinish = (values) => {
    const articleid = claim.article._id;
    const claimid = claim._id;
    const id = auth?.data.id;

    if (id) {
      userActions.editClaim(articleid, claimid, values, myClaimsList, indexClaim, setMyClaimsList);
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
        <Button type="primary" htmlType="submit">
          {t('save')}
        </Button>
      </Form.Item>
    </Form>
  );
}

EditClaim.propTypes = {
  claim: PropTypes.shape({
    _id: PropTypes.string,
    article: PropTypes.shape({
      _id: PropTypes.string,
    }),
    sourceUrl: PropTypes.string,
    text: PropTypes.string,
    sourceType: PropTypes.string,
    lang: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  indexClaim: PropTypes.number,
};

EditClaim.defaultProps = {
  indexClaim: 0,
};
