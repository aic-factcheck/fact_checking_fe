/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Col, Divider, Form, Input, Row, Select, Typography,
} from 'antd';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import myReviews from '../../_state/usersReviews';
import authAtom from '../../_state/auth';
import { IReview } from '../../common/types';
import reviewsService from '../../api/reviews.service';
import { NotificationContext } from '../NotificationContext/NotificationContext';

const { Paragraph } = Typography;
const { Title } = Typography;
const { Option } = Select;

interface Props {
  review: IReview;
  indexEdit: number;
}

const EditReview: React.FC<Props> = ({ review, indexEdit }) => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [, setVote] = useState(review.vote);
  const [linksList, setLinksList] = useState<string[]>(review.links);
  const [myReviewsList, setMyReviewsList] = useRecoilState(myReviews);
  const notificationApi = useContext(NotificationContext);

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.token === undefined) {
      navigate('/sign-in');
    }
  }, [auth, navigate]);

  const onFinish = (values: any) => {
    console.log(values);
    const mergedValues = values;
    mergedValues.text = values.text;
    mergedValues.vote = values.vote;
    mergedValues.links = linksList;

    console.log(mergedValues.text);
    console.log(mergedValues.vote);
    reviewsService.editreview(review.article, review.claim._id, review._id, mergedValues)
      .then(() => {
        notificationApi.info({
          message: t('review_edited'),
          icon: <CheckOutlined />,
        });

        // eslint-disable-next-line prefer-const
        let reviewToEdit = { ...myReviewsList[indexEdit] } as IReview;
        reviewToEdit.text = values.text;
        reviewToEdit.links = values.links;
        reviewToEdit.vote = values.vote;

        // eslint-disable-next-line max-len
        const mergedReviews = [...myReviewsList.slice(0, indexEdit), reviewToEdit, ...myReviewsList.slice(indexEdit + 1)];

        setMyReviewsList(mergedReviews);
      })
      .catch((e) => {
        console.log(e);
        notificationApi.info({
          message: e.response.data.message,
          icon: <CloseOutlined />,
        });
      });
  };

  const handleChange = (value: string) => {
    setVote(value);
    console.log(value);
  };

  const handleChangeList = (value: string[]) => {
    setLinksList(value);
    console.log(value);
  };

  return (
    <div>
      <Row style={{
        background: '#d86e3d', borderRadius: '10px', textAlign: 'center', padding: '1%', paddingTop: '2%',
      }}
      >
        <Col span={24}>
          <Paragraph style={{ color: 'white' }}>
            {review?.claim?.text}
          </Paragraph>
        </Col>
      </Row>
      <Divider style={{ backgroundColor: 'white', width: '5%' }} />
      <Title level={5} className="defaultForm" style={{ color: 'white', whiteSpace: 'pre-line', textDecoration: 'none' }}>My review :</Title>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          text: review.text,
          links: review.links,
          vote: review.vote,
        }}
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
          <Select defaultValue={review.vote} onChange={handleChange}>
            <Option value="TRUE">{t('true')}</Option>
            <Option value="PARTIALLY_TRUE">{t('partialy_true')}</Option>
            <Option value="INCONCLUSIVE">{t('inconclusive')}</Option>
            <Option value="NON_VERIFIABLE">{t('non_verifiable')}</Option>
            <Option value="FALSE">{t('false')}</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 22 }}>
          <Button type="primary" htmlType="submit" id="reviewSubmitForm">
            {t('edit')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditReview;
