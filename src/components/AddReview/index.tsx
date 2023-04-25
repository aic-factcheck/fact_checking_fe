import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input, Select, Row, Col, Typography, Divider, message, notification,
} from 'antd';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import authAtom from '../../_state/auth';
import { IClaim, IReview } from '../../common/types';
import reviewsService from '../../api/reviews.service';

const { Option } = Select;
const { Paragraph } = Typography;
const { Title } = Typography;

interface AddReviewProps {
  claim: IClaim;
  closeModal: () => void;
}

const AddReview: React.FC<AddReviewProps> = ({ claim, closeModal }) => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [claimForm] = Form.useForm();
  const [reviewsList, setReviewsList] = useState<IReview[]>([]);
  const [vote, setVote] = useState('positive');
  const [linksList, setLinksList] = useState<string[]>([]);

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.token === undefined) {
      navigate('/sign-in');
    }
    const id = auth?.user.id;
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
    const id = auth?.user.id;
    mergedValues.vote = vote;
    mergedValues.links = linksList;

    if (id !== undefined) {
      reviewsService.addreview(articleid, claimid, values).then((res: any) => {
        const mergedReviews = [...reviewsList];
        res.key = res.data._id;
        res.data.addedBy.firstName = auth?.user.firstName;
        res.data.addedBy.lastName = auth?.user.lastName;
        mergedReviews.push(res.data);
        claimForm.resetFields(['text']);
        setReviewsList(mergedReviews);
        notification.info({
          message: t('successfully_added_review'),
          description: t('gained_30'),
          icon: <img alt="leaders" width="50%" src={`${process.env.PUBLIC_URL}/pictures/experience.png`} style={{ marginRight: '5%' }} />,
        });
        closeModal();
      }).catch((err: any) => {
        message.error(err);
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
            required: true,
          },
          ]}
        >
          <Input.TextArea rows={3} />
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
          <Select defaultValue="positive" onChange={handleChange}>
            <Option value="positive">{t('positive')}</Option>
            <Option value="negative">{t('negative')}</Option>
            <Option value="no_info">{t('not_enough_info')}</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 22 }}>
          <Button type="primary" htmlType="submit">
            {t('add')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddReview;
