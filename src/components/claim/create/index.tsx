import React, { useEffect } from 'react';
import {
  Button, Form, Input, notification,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import myClaims from '../../../_state/usersClaims';
import authAtom from '../../../_state/auth';
import { IClaim, IArticle } from '../../../common/types';
import claimsService from '../../../api/claims.service';
import claimsLoaded from '../../../_state/claimsLoaded';

interface Props {
  articleSubmited: boolean,
  article: IArticle;
  claims: IClaim[];
  setClaims: React.Dispatch<React.SetStateAction<IClaim[]>>;
  closeModal: () => void;
}

const CreateClaim : React.FC<Props> = ({
  articleSubmited, article, claims, setClaims, closeModal,
}) => {
  const [claimForm] = Form.useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useRecoilValue(authAtom);
  const [myClaimsList, setMyClaimsList] = useRecoilState(myClaims);
  const [loaded, setClaimsLoaded] = useRecoilState(claimsLoaded);

  useEffect(() => {
    const id = auth?.user?.id;
    // redirect to home if already logged in
    if (id === undefined) {
      navigate('/sign-in');
    }

    if (myClaimsList.length < 1 && loaded === false) {
      claimsService.getMyClaims(id).then((res: any) => {
        // const claimsList = res.filter((el) => id === el?.addedBy._id);
        setMyClaimsList(res.data);
        setClaimsLoaded(true);
      }).catch();
    }
  }, [auth, navigate, myClaimsList]);

  const onFinish = (values: any) => {
    const newClaim = {
      addedBy: {
        _id: auth?.user?.id,
        firstName: auth?.user.firstName,
        lastName: auth?.user.lastName,
      },
      article: {
        _id: article._id,
      },
      createdAt: new Date().toString(),
      text: values.text,
      nNegativeVotes: 0,
      nPositiveVotes: 0,
      _id: new Date().toString(),
    } as IClaim;

    claimsService.createClaim(article._id, values).then((res: any) => {
      const mergedClaims = [...claims];
      res.key = res.data._id;
      mergedClaims.push(res.data);
      claimForm.resetFields(['text']);
      setClaims(mergedClaims);
      const mergedMyClaims = [...myClaimsList, newClaim];
      setMyClaimsList(mergedMyClaims);
      closeModal();
      notification.info({
        message: t('successfully_added_claim'),
        description: t('gained_20'),
        icon: <img alt="leaders" width="50%" src={`${process.env.PUBLIC_URL}/pictures/experience.png`} style={{ marginRight: '5%' }} />,
      });
    }).catch((err: any) => {
      const errorMessage = err?.response?.data?.errors[0]?.messages[0].toString();
      notification.error({
        message: errorMessage,
      });
    });
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
        <Input.TextArea rows={4} id="createClaimText" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 22 }}>
        <Button type="primary" htmlType="submit" disabled={!articleSubmited} id="createClaimSubmitButton">
          {t('add')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateClaim;
