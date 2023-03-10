import React, { useState, useEffect } from 'react';
import {
  Button, Form, Input, Select, message, Switch,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import myArticles from '../../../_state/usersArticles';
import useFetchWrapper from '../../../_helpers/fetch_wrapper';
import MyTitle from '../../MyTitle/index';
import authAtom from '../../../_state/auth';

const { Option } = Select;

export default function CreateArticle({ articleSubmited, setArticleSubmited, setArticle }) {
  const fetchWrapper = useFetchWrapper();
  // eslint-disable-next-line no-unused-vars
  const [loadFromURL, setLoadFromURL] = useState(false);
  const { t } = useTranslation();
  const [language, setLanguage] = useState('cz');
  const navigate = useNavigate();
  const [myArticlesList, setMyArticlesList] = useRecoilState(myArticles);
  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }

    if (!myArticlesList) {
      const id = auth?.data.id;
      if (id) {
        fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/users/${id}/articles`).then((res) => {
          const articles = res.filter((el) => id === el?.addedBy._id);
          setMyArticlesList(articles);
        }).catch(console.log(''));
      }
    }
  }, [auth, navigate, myArticlesList]);

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

    const newArticle = {
      createdAt: new Date().toString(),
      title: values.title,
      sourceUrl: values.sourceUrl,
      // eslint-disable-next-line object-shorthand
      language: language,
      text: values.text,
      sourceType: 'article',
      addedBy: {
        _id: auth?.data.id,
        firstName: auth?.data.firstName,
        lastName: auth?.data.lastName,
      },
    };

    fetchWrapper.post(`${process.env.REACT_APP_API_BASE}/articles`, mergedValues)
      .then((res) => {
        message.success('Successfully added new article');
        console.log(myArticlesList);
        const mergedArticles = [...myArticlesList, newArticle];
        setMyArticlesList(mergedArticles);
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
      <MyTitle headline={t('add_article')} fontcolor="#d86e3d" />
      <Form.Item
        name="title"
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
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
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        label={t('source_url')}
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
        label={t('language')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select defaultValue="cz" style={{ width: 120, color: '#000000' }} onChange={handleChange}>
          <Option value="cz">{t('czech')}</Option>
          <Option value="en">{t('english')}</Option>
          <Option value="sk">{t('slovak')}</Option>
          <Option value="other">{t('other')}</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="fromUrl"
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        label={t('load_text_from_url')}
      >
        <Switch checked={loadFromURL} onChange={onChange} />
      </Form.Item>
      <Form.Item
        name="text"
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        label={t('article_text')}
      >
        <Input.TextArea rows={8} id="rawTextData" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 6, offset: 6 }}>
        <Button type="primary" htmlType="submit" disabled={articleSubmited}>
          {t('submit')}
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
