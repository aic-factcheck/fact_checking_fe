import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input, Select, message,
} from 'antd';
import PropTypes from 'prop-types';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import useFetchWrapper from '../../../_helpers/fetch_wrapper';
import myArticles from '../../../_state/usersArticles';
import authAtom from '../../../_state/auth';

const { Option } = Select;

export default function EditArticle({
  article, indexEdit,
}) {
  const auth = useRecoilValue(authAtom);
  const fetchWrapper = useFetchWrapper();
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

    fetchWrapper.patch(`${process.env.REACT_APP_API_BASE}/articles/${id}`, mergedValues)
      .then(() => {
        message.success('Successfully edited article');

        // eslint-disable-next-line prefer-const
        let articleToEdit = { ...myArticlesList[indexEdit] };

        if (articleToEdit?.title) {
          articleToEdit.title = values.title;
        }

        if (articleToEdit?.sourceUrl) {
          articleToEdit.sourceUrl = values.sourceUrl;
        }

        if (articleToEdit?.text) {
          articleToEdit.text = values.text;
        }

        if (articleToEdit?.lang) {
          articleToEdit.lang = values.lang;
        }

        // eslint-disable-next-line max-len
        const mergedArticles = [...myArticlesList.slice(0, indexEdit), articleToEdit, ...myArticlesList.slice(indexEdit + 1)];

        setMyArticlesList(mergedArticles);

        // fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/articles`).then((res)
        // => setMyArticles(res)).catch(console.log(''));
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
      <Form.Item wrapperCol={{ span: 22, offset: 4 }}>
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
