import React, { useState } from 'react';
import {
  Button, Form, Input, Select, message, Switch,
} from 'antd';
import PropTypes from 'prop-types';
import useFetchWrapper from '../../../_helpers/fetch_wrapper';
import MyTitle from '../../MyTitle/index';

const { Option } = Select;

export default function CreateArticle({ articleSubmited, setArticleSubmited, setArticle }) {
  const fetchWrapper = useFetchWrapper();
  // eslint-disable-next-line no-unused-vars
  const [loadFromURL, setLoadFromURL] = useState(false);

  const [language, setLanguage] = useState('cz');

  const getText = () => {
    const textData = document.getElementById('urlTextData');
    if (textData !== undefined && textData.value.length > 5) {
      const finalURL = `${process.env.REACT_APP_API_GET_TEXT}?url=${textData.value}`;
      console.log(finalURL);
      fetchWrapper.get(`${finalURL}`)
        .then((res) => {
          // eslint-disable-next-line prefer-const
          let rawTextData = document.getElementById('rawTextData');
          if (rawTextData !== undefined) {
            rawTextData.value = res.raw_text;
          }
        })
        .catch(console.log(''));
    }
  };

  const onChange = (checked) => {
    if (checked) {
      getText();
    }
    setLoadFromURL(checked);
  };

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
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      name="nest-messages"
      onFinish={onFinish}
      // validateMessages={validateMessages}
      style={{
        padding: '50px 50px',
        color: '#000000',
      }}
      className="defaultForm"
    >
      <MyTitle headline="Add article" />
      <Form.Item
        name="title"
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        label={<label>Title</label>}
        style={{ color: '#000000' }}
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
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        label={<label>Source URL</label>}
        style={{ color: '#000000' }}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input id="urlTextData" />
      </Form.Item>
      <Form.Item
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
        label={<label>Language</label>}
      >
        <Select defaultValue="cz" style={{ width: 120, color: '#000000' }} onChange={handleChange}>
          <Option value="cz">Czech</Option>
          <Option value="en">English</Option>
          <Option value="sk">Slovak</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="fromUrl"
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        label={<label>Load text from URL</label>}
      >
        <Switch checked={loadFromURL} onChange={onChange} />
      </Form.Item>
      <Form.Item
        name="text"
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        label={<label>Article text</label>}
      >
        <Input.TextArea rows={8} id="rawTextData" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 6, offset: 6 }}>
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
