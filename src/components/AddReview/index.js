import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input, message, Select, Row, Col, Typography, Divider,
} from 'antd';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import useFetchWrapper from '../../_helpers/fetch_wrapper';
import authAtom from '../../_state/auth';
// eslint-disable-next-line
// import type { SelectProps } from 'antd';

const { Option } = Select;
const { Paragraph } = Typography;
const { Title } = Typography;
// const options: SelectProps['options'] = [];

export default function AddReview({
  claim,
}) {
  const auth = useRecoilValue(authAtom);
  const fetchWrapper = useFetchWrapper();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [claimForm] = Form.useForm();
  const [reviewsList, setReviewsList] = useState([]);
  const [vote, setVote] = useState('positive');
  const [linksList, setLinksList] = useState([]);

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
    const id = auth?.data.id;
    const articleid = claim?.article._id;
    const claimid = claim?._id;
    if (id) {
      fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/articles/${articleid}/claims/${claimid}/reviews`).then((res) => {
        const reviews = res.filter((el) => claimid === el?.claimId);
        setReviewsList(reviews);
        console.log('');
      }).catch(console.log(''));
    }
  }, [auth, navigate]);

  const handleChange = (value) => {
    setVote(value);
  };

  const handleChangeList = (value) => {
    setLinksList(value);
  };

  const onFinish = (values) => {
    const mergedValues = values;
    const articleid = claim.article._id;
    const claimid = claim._id;
    const id = auth?.data.id;
    mergedValues.vote = vote;
    mergedValues.links = linksList;

    if (id) {
      fetchWrapper.post(`${process.env.REACT_APP_API_BASE}/articles/${articleid}/claims/${claimid}/reviews`, values)
        .then((res) => {
          const mergedReviews = [...reviewsList];
          res.key = res._id;
          res.addedBy.firstName = auth?.data.firstName;
          res.addedBy.lastName = auth?.data.lastName;
          mergedReviews.push(res);
          message.success('Successfully added new review');
          claimForm.resetFields(['text']);
          setReviewsList(mergedReviews);
        })
        .catch((e) => message.error(e));
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
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
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
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
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
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
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
}

AddReview.propTypes = {
  claim: PropTypes.shape({
    _id: PropTypes.string,
    article: PropTypes.shape({ _id: PropTypes.string }),
    sourceUrl: PropTypes.string,
    text: PropTypes.string,
    sourceType: PropTypes.string,
    language: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

AddReview.defaultProps = {
};
