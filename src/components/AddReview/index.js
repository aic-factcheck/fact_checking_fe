import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input, message, Select, Row, Col, Typography, Divider, List,
} from 'antd';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { BiLike, BiDislike } from 'react-icons/bi';
import useFetchWrapper from '../../_helpers/fetch_wrapper';
import authAtom from '../../_state/auth';

const { Option } = Select;
const { Paragraph } = Typography;
const { Title } = Typography;

export default function AddReview({
  claim,
}) {
  const auth = useRecoilValue(authAtom);
  const fetchWrapper = useFetchWrapper();
  const navigate = useNavigate();
  const [claimForm] = Form.useForm();

  const [reviewsList, setReviewsList] = useState([]);
  const [vote, setVote] = useState('positive');

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
    const id = auth?.data.id;
    const articleid = claim.articleId;
    const claimid = claim._id;
    if (id) {
      fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/articles/${articleid}/claims/${claimid}/reviews`).then((res) => {
        const reviews = res.filter((el) => claimid === el?.claimId);
        setReviewsList(reviews);
        console.log('oukej');
      }).catch(console.log('api error'));
    }
  }, [auth, navigate]);

  const handleChange = (value) => {
    setVote(value);
  };

  const onFinish = (values) => {
    const mergedValues = values;
    const articleid = claim.articleId;
    const claimid = claim._id;
    const id = auth?.data.id;
    mergedValues.vote = vote;

    if (id) {
      fetchWrapper.post(`${process.env.REACT_APP_API_BASE}/articles/${articleid}/claims/${claimid}/reviews`, values)
        .then((res) => {
          const mergedReviews = [...reviewsList];
          mergedReviews.push(res);
          message.success('Successfully added new claim');
          claimForm.resetFields(['text']);
          setReviewsList(mergedReviews);
        })
        .catch((e) => message.error(e));
    }
  };

  return (
    <div>
      <Row style={{
        background: '#00887A', borderRadius: '10px', textAlign: 'center', padding: '1%', paddingTop: '2%',
      }}
      >
        <Col span={24}>
          <Paragraph style={{ color: 'white' }}>
            {claim.text}
          </Paragraph>
        </Col>
      </Row>
      <Divider style={{ backgroundColor: 'white', width: '5%' }} />
      <Title level={5} className="defaultForm" style={{ color: '#00887A', whiteSpace: 'pre-line', textDecoration: 'none' }}>My review :</Title>
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
          label="Review text"
          style={{ color: '#000000' }}
          rules={[{
            required: true,
          },
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
          label="Review overall trust"
        >
          <Select defaultValue="positive" onChange={handleChange}>
            <Option value="positive">Positive</Option>
            <Option value="negative">Negative</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 22 }}>
          <Button type="primary" htmlType="submit">
            Add review
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ backgroundColor: 'white', width: '1%' }} />
      <Title level={5} className="defaultForm" style={{ color: '#77A6F7', whiteSpace: 'pre-line', textDecoration: 'none' }}>Reviews :</Title>
      <List
        style={{
          padding: '0%',
        }}
      >
        {
          // _id, priority, addedBy, articleId, text
          reviewsList.map((obj) => (
            <div key={obj._id} style={{ padding: '1%', background: '#77A6F7', borderRadius: '10px' }}>
              <Row style={{
                background: '#77A6F7', borderRadius: '10px', textAlign: 'center', padding: '0%', paddingTop: '1%',
              }}
              >
                <Col span={20}>
                  <Paragraph style={{ color: 'white' }}>
                    {obj.text}
                  </Paragraph>
                </Col>
                <Col span={3}>
                  <Paragraph style={{ color: 'white' }}>
                    {obj.vote === 'positive'
                      ? <BiLike /> : <BiDislike />}
                  </Paragraph>
                </Col>
              </Row>
            </div>
          ))
        }
      </List>
    </div>
  );
}

AddReview.propTypes = {
  claim: PropTypes.shape({
    _id: PropTypes.string,
    articleId: PropTypes.string,
    sourceUrl: PropTypes.string,
    text: PropTypes.string,
    sourceType: PropTypes.string,
    language: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};

AddReview.defaultProps = {
};
