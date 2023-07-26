/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input, Select, Row, Col, Typography, Divider,
} from 'antd';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import { CloseOutlined } from '@ant-design/icons';
import authAtom from '../../_state/auth';
import { IClaim, IReview } from '../../common/types';
import reviewsService from '../../api/reviews.service';
import { NotificationContext } from '../NotificationContext/NotificationContext';

const { Option } = Select;
const { Paragraph } = Typography;
const { Title } = Typography;

interface AddReviewProps {
  claim: IClaim;
  closeModal: () => void;
  reviewsNum: () => void;
}

const AddReview: React.FC<AddReviewProps> = ({ claim, closeModal, reviewsNum }) => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const notificationApi = useContext(NotificationContext);

  const [claimForm] = Form.useForm();
  const [reviewsList, setReviewsList] = useState<IReview[]>([]);
  const [vote, setVote] = useState('TRUE');
  const [linksList, setLinksList] = useState<string[]>([]);

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.token === undefined) {
      navigate('/sign-in');
    }
    const id = auth?.user._id;
    const articleid = claim?.article._id;
    const claimid = claim?._id;
    if (id !== undefined) {
      reviewsService.getReviews(articleid, claimid).then((res: any) => {
        // const reviews = res.filter((el) => claimid === el?.claimId);
        setReviewsList(res.data);
      }).catch();
    }
  }, [auth, navigate]);

  const handleChange = (value: string) => {
    setVote(value);
  };

  const handleChangeList = (value: string[]) => {
    setLinksList(value);
  };

  const onFinish = (values: any) => {
    const mergedValues = values;
    const articleid = claim.article._id;
    const claimid = claim._id;
    const userId = auth?.user._id;
    mergedValues.vote = vote;
    mergedValues.lang = 'cz';
    mergedValues.links = linksList;

    if (userId !== undefined) {
      reviewsService.addreview(articleid, claimid, mergedValues).then((res: any) => {
        const mergedReviews = [...reviewsList];
        res.key = res.data._id;
        res.data.author.firstName = auth?.user.firstName;
        res.data.author.lastName = auth?.user.lastName;
        mergedReviews.push(res.data);
        claimForm.resetFields(['text']);
        setReviewsList(mergedReviews);
        notificationApi.info({
          message: t('successfully_added_review'),
          description: t('gained_30'),
          icon: <img alt="leaders" width="50%" src={`${process.env.PUBLIC_URL}/pictures/experience.png`} style={{ marginRight: '5%' }} />,
        });
        reviewsNum();
        closeModal();
      }).catch((err: any) => {
        console.log(err);
        const errorMessage = 'An error occurred while creating review.';
        notificationApi.info({
          message: errorMessage,
          description: 'Review text and links must be at least 6 characters long',
          icon: <CloseOutlined />,
        });
        // closeModal();
      });
    }
  };

  return (
    <div>
      <Row style={{
        background: '#d86e3d', borderRadius: '10px', textAlign: 'center', padding: '1%', paddingTop: '2%',
      }}
      >
        <Col span={24}>
          <Paragraph style={{ color: 'white' }}>
            {claim.text}
          </Paragraph>
        </Col>
      </Row>
      <Divider style={{ backgroundColor: 'white', width: '5%' }} />
      <Title level={5} className="defaultForm" style={{ color: 'white', whiteSpace: 'pre-line', textDecoration: 'none' }}>My review :</Title>
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
          label={t('review_text')}
          style={{ color: '#000000' }}
          rules={[{
            required: true, min: 2,
          },
          ]}
        >
          <Input.TextArea rows={3} id="reviewTextForm" />
        </Form.Item>
        <Form.Item
          name="links"
          label={t('review_links')}
          style={{ color: '#000000' }}
          rules={[{
            required: true,
          },
          ]}
        >
          <Select
            id="reviewLinksForm"
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Tags Mode"
            onChange={handleChangeList}
          />
        </Form.Item>

        <Form.Item
          label={t('review_overall_trust')}
          name="vote"
        >
          <Select defaultValue="TRUE" onChange={handleChange}>
            <Option value="TRUE">{t('true')}</Option>
            <Option value="PARTIALLY_TRUE">{t('partialy_true')}</Option>
            <Option value="INCONCLUSIVE">{t('inconclusive')}</Option>
            <Option value="NON_VERIFIABLE">{t('non_verifiable')}</Option>
            <Option value="FALSE">{t('false')}</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 22 }}>
          <Button type="primary" htmlType="submit" id="reviewSubmitForm">
            {t('add')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddReview;
