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
}) {
  const [open, setOpen] = useState(false);
  const articleUrl = `/article/${article?._id}`;

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
          <FiEdit size={28} style={{ color: 'white' }} />
        </Button>
        <Modal
          title="Edit article"
          open={open}
          onOk={handleOk}
          // confirmLoading={confirmLoading}
          onCancel={handleCancel}
          width="80%"
        >
          <EditArticle article={article} setMyArticles={setMyArticles} />
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
        <Col offset={2} span={20}>
          <a href={articleUrl} style={{ textDecoration: 'none' }}>
            <MyTitle headline={article?.sourceUrl} />
          </a>
        </Col>
        <Col offset={0} span={2}>
          {editButton}
        </Col>
      </Row>
      <Row>
        <Col offset={2} span={4}>
          <Paragraph style={{ color: 'white' }}>{`Type: ${article?.sourceType}`}</Paragraph>
        </Col>
        <Col span={4}>
          <Paragraph style={{ color: 'white' }}>{`Language: ${article?.language}`}</Paragraph>
        </Col>
      </Row>
      <Divider style={{ backgroundColor: 'white', width: '5%' }} />
      <Row>
        <Col offset={2} span={20}>
          <Paragraph style={{ color: 'white' }}>{article?.text}</Paragraph>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col offset={2} span={20}>
          {`Created at: ${article?.createdAt.split('T')[0]}` }
        </Col>
      </Row>
    </div>
  );
}

Article.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.string,
    sourceUrl: PropTypes.string,
    text: PropTypes.string,
    sourceType: PropTypes.string,
    language: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  isEditable: PropTypes.bool.isRequired,
  setMyArticles: PropTypes.func,
};

Article.defaultProps = {
  setMyArticles: () => {},
};
