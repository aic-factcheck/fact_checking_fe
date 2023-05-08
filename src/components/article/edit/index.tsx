import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input, Select, message,
} from 'antd';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import myArticles from '../../../_state/usersArticles';
import authAtom from '../../../_state/auth';
import { IArticle } from '../../../common/types';
import articlesService from '../../../api/articles.service';

const { Option } = Select;

interface Props {
  article: IArticle;
  indexEdit: number;
}

const EditArticle: React.FC<Props> = ({ article, indexEdit }) => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [lang, setLanguage] = useState('cz');
  const [myArticlesList, setMyArticlesList] = useRecoilState(myArticles);

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.token === undefined) {
      navigate('/sign-in');
    }
  }, [auth, navigate]);

  const onFinish = (values: IArticle) => {
    const mergedValues = values;
    mergedValues.lang = lang;
    mergedValues.sourceType = 'article';
    const id = article._id;

    articlesService.editArticle(id, mergedValues).then(() => {
      message.success('Successfully edited article');

      // eslint-disable-next-line prefer-const
      let articleToEdit = { ...myArticlesList[indexEdit] } as IArticle;
      articleToEdit.title = values.title;
      articleToEdit.sourceUrl = values.sourceUrl;
      articleToEdit.text = values.text;
      articleToEdit.lang = values.lang;

      // eslint-disable-next-line max-len
      const mergedArticles = [...myArticlesList.slice(0, indexEdit), articleToEdit, ...myArticlesList.slice(indexEdit + 1)];

      setMyArticlesList(mergedArticles);
    })
      .catch((e) => message.error(e));
  };

  const handleChange = (value: string) => {
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
        <Input id="editTitleArticle" />
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
        <Input id="editSourceUrlArticle" />
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
        <Button id="submitChangedArticle" type="primary" htmlType="submit" disabled={false}>
          {t('save')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditArticle;
