import React, { useState } from 'react';
import {
  Button, Form, Input, Select, message,
} from 'antd';
import PropTypes from 'prop-types';
import useFetchWrapper from '../../../_helpers/fetch_wrapper';

const { Option } = Select;

export default function CreateArticle({ articleSubmited, setArticleSubmited, setArticle }) {
  const fetchWrapper = useFetchWrapper();

  const [language, setLanguage] = useState('cz');

  const onFinish = (values) => {
    const mergedValues = values;
    mergedValues.language = language;
    mergedValues.sourceType = 'article';

    fetchWrapper.post(`${process.env.REACT_APP_API_BASE}/articles`, mergedValues)
      .then((res) => {
        message.success('Successfully added new article');
        setArticle(res);
        setArticleSubmited(true);
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
        padding: '20px 50px',
      }}
    >
      <Form.Item
        name="sourceUrl"
        label="Source URL"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Language">
        <Select defaultValue="cz" style={{ width: 120 }} onChange={handleChange}>
          <Option value="cz">Czech</Option>
          <Option value="en">English</Option>
          <Option value="sk">Slovak</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
      <Form.Item name="text" label="Article text">
        <Input.TextArea rows={8} />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 22, offset: 4 }}>
        <Button type="primary" htmlType="submit" disabled={articleSubmited}>
          Submit article
        </Button>
      </Form.Item>
    </Form>
  );
}

CreateArticle.propTypes = {
  setArticleSubmited: PropTypes.func.isRequired,
  articleSubmited: PropTypes.bool.isRequired,
  setArticle: PropTypes.func.isRequired,
};
