/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import {
  Col, Row, Typography, Divider, Modal, Button, Tooltip,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { BsFlagFill } from 'react-icons/bs';
// eslint-disable-next-line no-unused-vars
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
// import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-absolute-path
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { Link } from 'react-router-dom';
// import authAtom from '../../_state/auth';
import MyTitle from '../MyTitle/index';
import EditArticle from './edit';
import { IArticle } from '../../common/types';
import articlesService from '../../api/articles.service';

interface Props {
  article: IArticle;
  isEditable: boolean;
  indexArticle: number;
}

const { Paragraph } = Typography;

const Article: React.FC<Props> = ({ article, isEditable, indexArticle }) => {
  const [open, setOpen] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const { t } = useTranslation();
  // const articleUrl = `/article/${article?._id}`;
  // const [readMore, setReadMore] = useState(false);

  // const auth = useRecoilValue(authAtom);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [saved, setSaved] = useState(article?.isSavedByUser);

  const saveArticle = (starId : string) => {
    if (!saved) {
      setSaved((current: boolean) => !current);
      articlesService.saveArticle(starId)
        .catch(() => {
          setSaved((current: boolean) => !current);
        });
    } else {
      setSaved((current: boolean) => !current);
      articlesService.unsaveArticle(starId)
        .catch(() => {
          setSaved((current: boolean) => !current);
        });
    }
  };

  useEffect(() => {
    setSaved(article?.isSavedByUser);
  }, [article?.isSavedByUser]);

  const editButton = (isEditable)
    ? (
      <div>
        <Button type="primary" className="editArticleProfile" onClick={showModal} icon={<EditOutlined />}>
          {t('edit')}
        </Button>
        <Modal
          title={t('edit')}
          open={open}
          onOk={handleOk}
          // confirmLoading={confirmLoading}
          onCancel={handleCancel}
          width="80%"
          footer={[]}
        >
          <EditArticle
            article={article}
            indexEdit={indexArticle}
          />
        </Modal>
      </div>
    ) : (
      <button className="save-for-later" type="submit">
        <Tooltip placement="top" title={saved ? t('unsave') : t('save')} id={`text_save_${article?._id}`}>
          <span className="star" id={`save_${article?._id}`} onClick={() => saveArticle(`${article?._id}`)}>
            {saved ? <AiFillStar /> : <AiOutlineStar /> }
          </span>
        </Tooltip>
      </button>
    );

  return (
    <div
      className="articleComponent"
      style={{
        backgroundColor: 'white',
        padding: '2% 2% 2% 2%',
        borderRadius: '10px',
        color: 'black',
      }}
    >
      <Row>
        <Col offset={1} span={19}>
          <Link to={`/article/${article?._id}`} className="articles articlesTitleLink" style={{ color: 'black', textDecorationColor: 'black' }}>
            <MyTitle headline={article?.title} fontcolor="black" />
          </Link>
        </Col>
        <Col offset={1} span={2}>
          {editButton}
        </Col>
      </Row>
      <Row>
        <Col offset={1} span="auto">
          { (article?.author?.firstName !== undefined && article?.createdAt !== undefined) && article?.createdAt !== undefined
            ? (
              <Paragraph>

                <Link to={`/profileSearch/${article?.author?._id}`} className="authorArticle">
                  {`${article?.author?.firstName} ${article?.author.lastName}`}
                </Link>

                {', '}
                {new Date(article?.createdAt).toUTCString().slice(4).slice(0, -7)}
              </Paragraph>
            )
            : (<div />)}
        </Col>
      </Row>
      <Row>
        <Col offset={1} span="auto">
          <Tooltip placement="top" title={`${t('you_will_be_redirected')}  ${article?.sourceUrl}`}>
            <a href={`${article?.sourceUrl}`} className="articles" target="_blank" rel="noreferrer" style={{ textDecorationColor: 'black', whiteSpace: 'nowrap' }}>
              <Paragraph style={{ color: 'black', whiteSpace: 'nowrap' }}>
                {`${article?.sourceUrl.slice(0, 32)}     `}
                { article?.lang === 'sk' && <span className="fi fi-sk" style={{ whiteSpace: 'nowrap' }} /> }
                { article?.lang === 'cz' && <span className="fi fi-cz" style={{ whiteSpace: 'nowrap' }} /> }
                { article?.lang === 'en' && <span className="fi fi-gb" style={{ whiteSpace: 'nowrap' }} /> }
                { article?.lang === 'other' && <BsFlagFill /> }
              </Paragraph>
            </a>
          </Tooltip>
        </Col>
      </Row>
      <Divider style={{ marginTop: '0%', marginBottom: '2%' }} />
      { article?.text.length > 100 ? (
        <div>
          <Row>
            <Col offset={1} span={20}>
              <Paragraph style={{ color: 'black', fontSize: '1.1em' }}>{readMore ? article?.text : `${article?.text.slice(0, 100)} ...`}</Paragraph>
            </Col>
          </Row>
          <Row>
            <Col offset={1} span={20}>
              <Paragraph
                className="buttons"
                style={{
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
                onClick={() => setReadMore(!readMore)}
              >
                <div>
                  <Button shape="round">
                    {readMore ? 'Read less' : 'Read more'}
                  </Button>
                </div>
              </Paragraph>
            </Col>
          </Row>
        </div>
      ) : (
        <Row>
          <Col offset={1} span={20}>
            <Paragraph style={{ color: 'black', fontSize: '1.1em' }} id={`${article?._id}_text`}>{article?.text}</Paragraph>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Article;
