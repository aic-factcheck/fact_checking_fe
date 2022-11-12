import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input, Select, message,
} from 'antd';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import useFetchWrapper from '../../../_helpers/fetch_wrapper';
import authAtom from '../../../_state/auth';

const { Option } = Select;

export default function EditArticle({
  article, setMyArticles, indexEdit, articlesList,
}) {
  const auth = useRecoilValue(authAtom);
  const fetchWrapper = useFetchWrapper();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('cz');

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
  }, [auth, navigate]);

  const onFinish = (values) => {
    const mergedValues = values;
    mergedValues.language = language;
    mergedValues.sourceType = 'article';
    const id = article._id;

    fetchWrapper.patch(`${process.env.REACT_APP_API_BASE}/articles/${id}`, mergedValues)
      .then(() => {
        message.success('Successfully edited article');

        const mergedArticles = [...articlesList];

        if (mergedArticles[indexEdit]?.title) {
          mergedArticles[indexEdit].title = values.title;
        }

        if (mergedArticles[indexEdit]?.sourceUrl) {
          mergedArticles[indexEdit].sourceUrl = values.sourceUrl;
        }

        if (mergedArticles[indexEdit]?.text) {
          mergedArticles[indexEdit].text = values.text;
        }

        if (mergedArticles[indexEdit]?.language) {
          mergedArticles[indexEdit].language = values.language;
        }

        setMyArticles(mergedArticles);

        // fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/articles`).then((res)
        // => setMyArticles(res)).catch(console.log('api error'));
      })
      .catch((e) => message.error(e));
  };

  const handleChange = (value) => {
    setLanguage(value);
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      name="nest-messages"
      onFinish={onFinish}
      // validateMessages={validateMessages}
      style={{
        padding: '10px 10px',
      }}
      initialValues={{
        title: article.title,
        sourceUrl: article.sourceUrl,
        text: article.text,
      }}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="sourceUrl"
        label="Source"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Language"
      >
        <Select defaultValue={article.language !== null ? article.language : 'cz'} style={{ width: 120 }} onChange={handleChange}>
          <Option value="cz">Czech</Option>
          <Option value="en">English</Option>
          <Option value="sk">Slovak</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="text"
        label="Article"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea rows={8} />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 22, offset: 4 }}>
        <Button type="primary" htmlType="submit" disabled={false}>
          Submit article
        </Button>
      </Form.Item>
    </Form>
  );
}

EditArticle.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    sourceUrl: PropTypes.string,
    text: PropTypes.string,
    sourceType: PropTypes.string,
    language: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  setMyArticles: PropTypes.func,
  indexEdit: PropTypes.number,
  articlesList: PropTypes.arrayOf(PropTypes.objectOf),
};

EditArticle.defaultProps = {
  setMyArticles: () => {},
  indexEdit: 0,
  articlesList: [],
};
