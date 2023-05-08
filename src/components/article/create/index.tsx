import React, { useState, useEffect } from 'react';
import {
  Button, Col, Form, Input, Row, Select, message, notification,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import type { FormInstance } from 'antd/es/form';
import myArticles from '../../../_state/usersArticles';
import MyTitle from '../../MyTitle/index';
import authAtom from '../../../_state/auth';
import { IArticle } from '../../../common/types';
import articlesService from '../../../api/articles.service';
import articlesLoaded from '../../../_state/articlesLoaded';

const { Option } = Select;

interface Props {
  setArticleSubmited: React.Dispatch<React.SetStateAction<boolean>>;
  articleSubmited: boolean;
  setArticle: React.Dispatch<React.SetStateAction<IArticle | undefined>>;
}

const CreateArticle: React.FC<Props> = ({ articleSubmited, setArticleSubmited, setArticle }) => {
  // eslint-disable-next-line no-unused-vars
  const formRef = React.useRef<FormInstance>(null);
  const { t } = useTranslation();
  const [lang, setLanguage] = useState('cz');
  const navigate = useNavigate();
  const [myArticlesList, setMyArticlesList] = useRecoilState(myArticles);
  const [loaded, setArticlesLoaded] = useRecoilState(articlesLoaded);
  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.user === undefined) {
      navigate('/sign-in');
    }

    if (myArticlesList.length < 1 && loaded === false) {
      const id = auth?.user?.id;
      if (id !== undefined) {
        articlesService.getMyArticles(id).then((res: any) => {
          /* const articles = res.filter((el) => id === el?.addedBy._id); */
          setMyArticlesList(res.data);
          setArticlesLoaded(true);
        }).catch();
      }
    }
  }, [auth, navigate, myArticlesList]);

  const scrapeFromURL = () => {
    const textData = document.getElementById('urlTextData') as HTMLInputElement;
    if (textData !== undefined && textData !== null && textData.value.length > 5) {
      articlesService.getTextFromURL(textData.value).then((res: any) => {
        formRef.current?.setFieldsValue({ text: res.data.raw_text });
        formRef.current?.setFieldsValue({ title: res.data.title });
      })
        .catch();
    }
  };

  const onFinish = (values: IArticle) => {
    const mergedValues = values;
    mergedValues.lang = lang;
    mergedValues.sourceType = 'article';

    const newArticle = {
      createdAt: new Date().toString(),
      title: values.title,
      sourceUrl: values.sourceUrl,
      // eslint-disable-next-line object-shorthand
      lang: lang,
      text: values.text,
      sourceType: 'article',
      addedBy: {
        _id: auth?.user.id,
        firstName: auth?.user.firstName,
        lastName: auth?.user.lastName,
      },
    } as IArticle;

    articlesService.createArticle(mergedValues).then((res: any) => {
      const mergedArticles = [...myArticlesList, newArticle];
      setMyArticlesList(mergedArticles);
      setArticle(res.data);
      setArticleSubmited(true);
      notification.info({
        message: t('successfully_added_article'),
        description: t('gained_8'),
        icon: <img alt="leaders" width="50%" src={`${process.env.PUBLIC_URL}/pictures/experience.png`} style={{ marginRight: '5%' }} />,
      });
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
      ref={formRef}
      name="nest-messages"
      onFinish={onFinish}
      // validateMessages={validateMessages}
      style={{
        padding: '30px 30px',
        color: '#000000',
      }}
      className="defaultForm"
    >
      <MyTitle headline={t('add_article')} fontcolor="#d86e3d" />
      <Form.Item
        style={{ marginTop: '2%', marginBottom: '1%' }}
        label={t('source_url')}
        extra={t('tip_webscrape')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Row gutter={2}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={16}
            xxl={16}
          >
            <Form.Item
              noStyle
              name="sourceUrl"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input id="urlTextData" />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={8}
            xxl={8}
          >
            <Button onClick={scrapeFromURL} id="scrapingButton">{t('load_text_from_url')}</Button>
          </Col>
        </Row>
      </Form.Item>
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
        name="text"
        label={t('article_text')}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea rows={8} id="rawTextData" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 6, offset: 6 }}>
        <Button type="primary" htmlType="submit" disabled={articleSubmited} id="addArticleSubmitButton">
          {t('submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateArticle;
