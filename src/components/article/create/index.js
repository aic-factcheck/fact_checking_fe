import React, { useState } from 'react';
import {
  Button, Form, Input, Select,
} from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

export default function CreateArticle({ articleSubmited, setArticleSubmited }) {
  const [language, setLanguage] = useState('cz');

  const onFinish = (values) => {
    const mergedValues = values;
    mergedValues.language = language;
    setArticleSubmited(true);
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
};
