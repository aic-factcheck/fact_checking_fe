import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Col, Row, Typography, Divider, Modal,
} from 'antd';
import { FiEdit } from 'react-icons/fi';
import Button from 'react-bootstrap/Button';
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
      padding: '3% 3% 3% 3%',
      borderRadius: '10px',
      color: 'white',
    }}
    >
      <Row>
        <Col offset={2} span={19}>
          <a href={`/article/${article?._id}`} style={{ textDecoration: 'none' }}>
            <MyTitle headline={article?.title} />
          </a>
        </Col>
        <Col offset={0} span={1}>
          {editButton}
        </Col>
      </Row>
      <Row>
        <Col offset={2} span={16}>
          <a href={`/article/${article?._id}`} style={{ textDecoration: 'none' }}>
            <Paragraph style={{ color: 'white' }}>{`Link: ${article?.sourceUrl}`}</Paragraph>
          </a>
        </Col>
      </Row>
      <Divider style={{ backgroundColor: 'white', width: '5%' }} />
      { article?.text.length > 100 ? (
        <div>
          <Row>
            <Col offset={2} span={20}>
              <Paragraph style={{ color: 'white' }}>{readMore ? article?.text : `${article?.text.slice(0, 100)} ...`}</Paragraph>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={20}>
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
          <Col offset={2} span={20}>
            <Paragraph style={{ color: 'white' }} id={`${article?._id}_text`}>{article?.text}</Paragraph>
          </Col>
        </Row>
      )}
      <Divider />
      <Row>
        <Col offset={2} span={6}>
          {`Created at: ${article?.createdAt.split('T')[0]}` }
        </Col>
        <Col offset={2} span={4}>
          <Paragraph style={{ color: 'white' }}>{`Type: ${article?.sourceType}`}</Paragraph>
        </Col>
        <Col offset={2} span={5}>
          <Paragraph style={{ color: 'white' }}>{`Language: ${article?.language}`}</Paragraph>
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
