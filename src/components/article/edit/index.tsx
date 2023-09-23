import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Form, Input, Select,
} from 'antd';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import myArticles from '../../../_state/usersArticles';
import authAtom from '../../../_state/auth';
import { IArticle } from '../../../common/types';
import articlesService from '../../../api/articles.service';
import { NotificationContext } from '../../NotificationContext/NotificationContext';

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
  const notificationApi = useContext(NotificationContext);

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.token?.refreshToken === undefined) {
      navigate('/sign-in');
    }
  }, [auth, navigate]);

  const onFinish = (values: IArticle) => {
    const mergedValues = values;
    mergedValues.lang = lang;
    mergedValues.sourceType = 'article';
    const id = article._id;

    articlesService.editArticle(id, mergedValues).then(() => {
      notificationApi.info({
        message: t('article_edited'),
        icon: <CheckOutlined />,
      });

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
      .catch((err: any) => notificationApi.info({
        message: err?.response?.data?.message,
        icon: <CloseOutlined />,
      }));
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
            required: true, min: 6,
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
            required: true, min: 6,
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
            required: true, min: 6,
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
