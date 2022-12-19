import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Col, Row, Typography, Divider, Modal,
} from 'antd';
import { FiEdit } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import Button from 'react-bootstrap/Button';
import authAtom from '../../_state/auth';
import MyTitle from '../MyTitle/index';
import EditArticle from './edit';

const { Paragraph } = Typography;

export default function Article({
  article,
  isEditable,
  setMyArticles,
  indexArticle,
  articles,
}) {
  const [open, setOpen] = useState(false);
  const [readMore, setReadMore] = useState(false);
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

  const editButton = (isEditable)
    ? (
      <div>
        <Button variant="primary" onClick={showModal} style={{ backgroundColor: '#77a6f7' }}>
          <FiEdit size={20} style={{ color: 'white' }} />
        </Button>
        <Modal
          title="Edit article"
          open={open}
          onOk={handleOk}
          // confirmLoading={confirmLoading}
          onCancel={handleCancel}
          width="80%"
          footer={[]}
        >
          <EditArticle
            article={article}
            setMyArticles={setMyArticles}
            articlesList={articles}
            indexEdit={indexArticle}
          />
        </Modal>
      </div>
    ) : (
      <div />
    );

  return (
    <div style={{
      backgroundColor: '#00887A',
      padding: '2% 2% 2% 2%',
      borderRadius: '10px',
      color: 'white',
    }}
    >
      <Row>
        <Col offset={1} span={19}>
          <a href={`/article/${article?._id}`} className="articles" style={{ color: 'white', textDecorationColor: 'white' }}>
            <MyTitle headline={article?.title} />
          </a>
        </Col>
        <Col offset={0} span={1}>
          {editButton}
        </Col>
      </Row>
      <Row>
        <Col offset={1} span={6}>
          Author :
          {article?.addedBy.firstName !== undefined ? ` ${article.addedBy.firstName} ${article.addedBy.lastName}` : ` ${auth?.data.firstName} ${auth?.data.lastName}`}
        </Col>
        <Col offset={1} span={12}>
          <a href={`${article?.sourceUrl}`} className="articles" style={{ textDecorationColor: 'white' }}>
            <Paragraph style={{ color: 'white' }}>{`Link: ${article?.sourceUrl.slice(0, 32)}`}</Paragraph>
          </a>
        </Col>
      </Row>
      <Divider style={{ backgroundColor: 'white', width: '5%' }} />
      { article?.text.length > 100 ? (
        <div>
          <Row>
            <Col offset={1} span={20}>
              <Paragraph style={{ color: 'white', fontSize: '1.1em' }}>{readMore ? article?.text : `${article?.text.slice(0, 100)} ...`}</Paragraph>
            </Col>
          </Row>
          <Row>
            <Col offset={1} span={20}>
              <Paragraph
                className="buttons"
                style={{
                  color: '#00887A',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
                onClick={() => setReadMore(!readMore)}
              >
                <div>
                  {readMore ? 'Read less' : 'Read more'}
                </div>
              </Paragraph>
            </Col>
          </Row>
        </div>
      ) : (
        <Row>
          <Col offset={1} span={20}>
            <Paragraph style={{ color: 'white', fontSize: '1.1em' }} id={`${article?._id}_text`}>{article?.text}</Paragraph>
          </Col>
        </Row>
      )}
      <Divider />
      <Row>
        <Col offset={1} span={6}>
          {`Created at : ${article?.createdAt.split('T')[0]}` }
        </Col>
        <Col offset={1} span={4}>
          <Paragraph style={{ color: 'white' }}>{`Type : ${article?.sourceType}`}</Paragraph>
        </Col>
        <Col offset={1} span={5}>
          <Paragraph style={{ color: 'white' }}>{`Language : ${article?.language}`}</Paragraph>
        </Col>
      </Row>
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
    language: PropTypes.string,
    createdAt: PropTypes.string,
    addedBy: PropTypes.shape({
      _id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
  isEditable: PropTypes.bool.isRequired,
  setMyArticles: PropTypes.func,
  indexArticle: PropTypes.number,
  articles: PropTypes.arrayOf(PropTypes.objectOf),
};

Article.defaultProps = {
  setMyArticles: () => {},
  indexArticle: 0,
  articles: [],
};
