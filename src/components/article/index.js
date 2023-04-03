/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Col, Row, Typography, Divider, Modal, Button, Tooltip,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { BsFlagFill } from 'react-icons/bs';
// eslint-disable-next-line no-unused-vars
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import { } from 'flag-icons';
import authAtom from '../../_state/auth';
import MyTitle from '../MyTitle/index';
import EditArticle from './edit';
import useUserActions from '../../_actions/user.actions';

const { Paragraph } = Typography;

export default function Article({
  article,
  isEditable,
  indexArticle,
}) {
  const userActions = useUserActions();
  const [open, setOpen] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const { t } = useTranslation();
  // const articleUrl = `/article/${article?._id}`;
  // const [readMore, setReadMore] = useState(false);

  const auth = useRecoilValue(authAtom);

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

  const saveArticle = (starId) => {
    userActions.saveUnsaveArticle(saved, starId, setSaved).catch();
  };

  const editButton = (isEditable)
    ? (
      <div>
        <Button variant="primary" onClick={showModal} icon={<EditOutlined />}>
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
    <div style={{
      backgroundColor: 'white',
      padding: '2% 2% 2% 2%',
      borderRadius: '10px',
      color: 'black',
    }}
    >
      <Row>
        <Col offset={1} span={19}>
          <a href={`/article/${article?._id}`} className="articles" style={{ color: 'black', textDecorationColor: 'black' }}>
            <MyTitle headline={article?.title} />
          </a>
        </Col>
        <Col offset={1} span={2}>
          {editButton}
        </Col>
      </Row>
      <Row>
        <Col offset={1} span="auto">
          {
              article?.addedBy?.firstName !== undefined && article?.createdAt !== undefined
                ? `${article?.addedBy?.firstName} ${article?.addedBy.lastName}, ${new Date(article?.createdAt).toGMTString().slice(4).slice(0, -7)}    `
                : `${auth?.data?.firstName} ${auth?.data.lastName}, ${new Date(article?.createdAt).toGMTString().slice(4).slice(0, -7)}    `
          }
        </Col>
      </Row>
      <Row>
        <Col offset={1} span="auto">
          <a href={`${article?.sourceUrl}`} className="articles" target="_blank" rel="noreferrer" style={{ textDecorationColor: 'black', whiteSpace: 'no-wrap' }}>
            <Paragraph style={{ color: 'black', whiteSpace: 'no-wrap' }}>
              {`${article?.sourceUrl.slice(0, 32)}    ( `}
              { article?.lang === 'sk' && <span className="fi fi-sk" style={{ whiteSpace: 'no-wrap' }} /> }
              { article?.lang === 'cz' && <span className="fi fi-cz" style={{ whiteSpace: 'no-wrap' }} /> }
              { article?.lang === 'en' && <span className="fi fi-gb" style={{ whiteSpace: 'no-wrap' }} /> }
              { article?.lang === 'other' && <BsFlagFill /> }
              { ' )' }
            </Paragraph>
          </a>
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
}

Article.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    sourceUrl: PropTypes.string,
    text: PropTypes.string,
    sourceType: PropTypes.string,
    lang: PropTypes.string,
    createdAt: PropTypes.string,
    addedBy: PropTypes.shape({
      _id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }),
    isSavedByUser: PropTypes.bool,
  }).isRequired,
  isEditable: PropTypes.bool.isRequired,
  indexArticle: PropTypes.number,
};

Article.defaultProps = {
  indexArticle: 0,
};
