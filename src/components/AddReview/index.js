import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input, message, Select, Row, Col, Typography, Divider, List,
} from 'antd';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { BiLike, BiDislike, BiQuestionMark } from 'react-icons/bi';
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
        // const reviews = res.filter((el) => claimid === el?.claimId);
        setReviewsList(res);
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
          name="links"
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
          label="Review links"
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
          label="Review overall trust"
          name="vote"
        >
          <Select defaultValue="positive" onChange={handleChange}>
            <Option value="positive">Positive</Option>
            <Option value="negative">Negative</Option>
            <Option value="no_info">Not enough info</Option>
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
                background: '#77A6F7', borderRadius: '0px', textAlign: 'left', paddingLeft: '2%', paddingTop: '1%', margin: '0%',
              }}
              >
                <Col span={20}>
                  <Paragraph style={{ color: 'white' }}>
                    {`${obj?.addedBy.firstName} ${obj?.addedBy.lastName}`}
                  </Paragraph>
                </Col>
              </Row>
              <Divider style={{ backgroundColor: 'white', width: '0%', margin: '1%' }} />
              <Row style={{
                background: '#77A6F7', borderRadius: '10px', textAlign: 'left', paddingLeft: '2%', paddingTop: '0%',
              }}
              >
                <Col span={3}>
                  <Paragraph style={{ color: 'white' }}>
                    {obj.vote === 'positive' && <BiLike /> }
                    {obj.vote === 'negative' && <BiDislike />}
                    {obj.vote === 'no_info' && <BiQuestionMark />}
                  </Paragraph>
                </Col>
                <Col span={20}>
                  <Paragraph style={{ color: 'white' }}>
                    {obj.text}
                  </Paragraph>
                </Col>
              </Row>
              <Divider style={{ backgroundColor: 'white', width: '0%', margin: '1%' }} />
              <Row style={{
                background: '#77A6F7', borderRadius: '10px', textAlign: 'left', paddingLeft: '2%', paddingTop: '0%',
              }}
              >
                <Col span={20}>
                  <Paragraph style={{ color: 'white' }}>
                    {
                      obj.links.map((objLink, index) => (
                        <div>
                          <p>
                            { `Link ${index + 1} : `}
                            <a href={`${objLink}`} style={{ color: 'white', textDecoration: 'underline', textDecorationColor: 'white' }}>
                              { `${objLink.slice(0, 32)}`}
                            </a>
                          </p>
                        </div>
                      ))
                    }
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
