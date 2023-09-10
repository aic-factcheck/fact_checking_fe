import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import {
  Col, Form, Input, Row, Select,
  Button, Tour,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import type { FormInstance } from 'antd/es/form';
import { CloseOutlined } from '@ant-design/icons';
import type { TourProps } from 'antd';
import myArticles from '../../../_state/usersArticles';
import MyTitle from '../../MyTitle/index';
import authAtom from '../../../_state/auth';
import { IArticle } from '../../../common/types';
import articlesService from '../../../api/articles.service';
import articlesLoaded from '../../../_state/articlesLoaded';
import { NotificationContext } from '../../NotificationContext/NotificationContext';

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
  const notificationApi = useContext(NotificationContext);

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps['steps'] = [
    {
      title: t('add_article_url'),
      description: t('add_article_url_desc'),
      placement: 'bottom',
      target: () => null,
      nextButtonProps: {
        children: t('next'), // Change the text here
      },
      arrow: false,
    },
    {
      title: t('add_article_submit'),
      description: t('add_article_submit_desc'),
      placement: 'bottom',
      target: () => null,
      nextButtonProps: {
        children: t('finish'), // Change the text here
      },
      prevButtonProps: {
        children: t('previous'), // Change the text here
      },
      arrow: false,
    },
  ];

  useEffect(() => {
    // redirect to home if already logged in
    if (auth?.user === undefined) {
      navigate('/sign-in');
    }

    if (myArticlesList.length < 1 && loaded === false) {
      const id = auth?.user?._id;
      if (id !== undefined) {
        articlesService.getMyArticles(id).then((res: any) => {
          /* const articles = res.filter((el) => id === el?.author._id); */
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
      author: {
        _id: auth?.user._id,
        firstName: auth?.user.firstName,
        lastName: auth?.user.lastName,
      },
    } as IArticle;

    articlesService.createArticle(mergedValues).then((res: any) => {
      const mergedArticles = [...myArticlesList, newArticle];
      setMyArticlesList(mergedArticles);
      setArticle(res.data);
      setArticleSubmited(true);
      notificationApi.info({
        message: t('successfully_added_article'),
        description: t('gained_8'),
        icon: <img alt="leaders" width="50%" src={`${process.env.PUBLIC_URL}/pictures/experience.png`} style={{ marginRight: '5%' }} />,
      });
    })
      .catch((err : any) => {
        const errorMessage = err?.response?.data?.errors[0]?.messages[0].toString();
        notificationApi.info({
          message: errorMessage,
          icon: <CloseOutlined />,
        });
      });
  };

  const handleChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <div>
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
        <Row>
          <Col span={12}>
            <MyTitle headline={t('add_article')} fontcolor="#d86e3d" />
          </Col>
          <Col span={12} offset={0}>
            <Button
              type="primary"
              onClick={() => setOpen(true)}
              style={{
                float: 'right',
              }}
            >
              {t('show_tour')}
            </Button>
          </Col>
        </Row>
        <Form.Item
          style={{ marginTop: '2%', marginBottom: '1%' }}
          label={t('source_url')}
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
                    required: true, min: 6,
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
              <Button ref={ref1} onClick={scrapeFromURL} id="scrapingButton">{t('load_text_from_url')}</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name="title"
          label={t('title')}
          rules={[
            {
              required: true, min: 6,
            },
          ]}
        >
          <Input id="titleArticle" />
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
              required: true, min: 6,
            },
          ]}
        >
          <Input.TextArea rows={8} id="rawTextData" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 6, offset: 6 }}>
          <Button ref={ref2} type="primary" htmlType="submit" disabled={articleSubmited} id="addArticleSubmitButton">
            {t('submit')}
          </Button>
        </Form.Item>
      </Form>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
      />
    </div>
  );
};

export default CreateArticle;
