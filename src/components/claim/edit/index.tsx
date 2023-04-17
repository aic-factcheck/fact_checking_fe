import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input,
} from 'antd';
import PropTypes from 'prop-types';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import myClaims from '../../../_state/usersClaims';
import authAtom from '../../../_state/auth';
import { IClaim } from '../../../common/types';
import claimsService from '../../../api/claims.service';
import { message, notification } from 'antd';

interface Props {
  claim: IClaim;
  indexClaim: number;
}

const EditClaim: React.FC<Props> = ({ claim, indexClaim }) => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [claimForm] = Form.useForm();
  const [myClaimsList, setMyClaimsList] = useRecoilState(myClaims);

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.token == undefined) {
      navigate('/sign-in');
    }
  }, [auth, navigate]);

  const onFinish = (values: any) => {
    const articleid = claim.article._id;
    const claimid = claim._id;
    const id = auth?.user.id;

    if (id != undefined) {
      claimsService.editClaim(articleid,claimid,values).then(() => {
        message.success('Successfully edited claim');
        // eslint-disable-next-line prefer-const
        let claimToEdit = { ...myClaimsList[indexClaim] } as IClaim;

        if ( claimToEdit !== undefined ) {
          if ((claimToEdit?.text) !== "" && (claimToEdit?.text) !== undefined) {
            claimToEdit.text = values.text;
          }
        }

        // eslint-disable-next-line max-len
        const mergedClaims = [...myClaimsList.slice(0, indexClaim), claimToEdit, ...myClaimsList.slice(indexClaim + 1)];

        setMyClaimsList(mergedClaims);
      })
      .catch((e) => message.error(e));
      //userActions.editClaim(articleid, claimid, values, myClaimsList, indexClaim, setMyClaimsList);
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

export default EditClaim;
