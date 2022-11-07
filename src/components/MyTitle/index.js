import React from 'react';
import {
  Typography,
} from 'antd';
import PropTypes from 'prop-types';

const { Title } = Typography;

export default function MyTitle({
  headline,
}) {
  return (
    <div>
      <Title level={3} className="defaultForm" style={{ color: 'white', whiteSpace: 'pre-line' }}>{headline}</Title>
    </div>
  );
}

MyTitle.propTypes = {
  headline: PropTypes.string.isRequired,
};
