import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input, Select,
} from 'antd';
import PropTypes from 'prop-types';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import useUserActions from '../../../_actions/user.actions';
import myArticles from '../../../_state/usersArticles';
import authAtom from '../../../_state/auth';

const { Option } = Select;

export default function EditArticle({
  article, indexEdit,
}) {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [lang, setLanguage] = useState('cz');
  const [myArticlesList, setMyArticlesList] = useRecoilState(myArticles);

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
  }, [auth, navigate]);

  const onFinish = (values) => {
    const mergedValues = values;
    mergedValues.lang = lang;
    mergedValues.sourceType = 'article';
    const id = article._id;

    userActions.editArticle(id, mergedValues, myArticlesList, indexEdit, values, setMyArticlesList);
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
        label={t('title')}
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
        label={t('source_url')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t('language')}
      >
        <Select defaultValue={article.lang !== null ? article.lang : 'cz'} style={{ width: 120 }} onChange={handleChange}>
          <Option value="cz">{t('czech')}</Option>
          <Option value="en">{t('english')}</Option>
          <Option value="sk">{t('slovak')}</Option>
          <Option value="other">{t('other')}</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="text"
        label={t('article_text')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea rows={8} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 20,
        }}
      >
        <Button type="primary" htmlType="submit" disabled={false}>
          {t('save')}
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
    lang: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  indexEdit: PropTypes.number,
};

EditArticle.defaultProps = {
  indexEdit: 0,
};
