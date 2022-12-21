import React from 'react';
import {
  Typography,
} from 'antd';
import PropTypes from 'prop-types';

const { Title } = Typography;

export default function MyTitle({
  headline, fontcolor,
}) {
  return (
    <div>
      <Title level={3} className="defaultForm" style={{ color: fontcolor, whiteSpace: 'pre-line', textDecoration: 'none' }}>{headline}</Title>
    </div>
  );
}

MyTitle.propTypes = {
  headline: PropTypes.string.isRequired,
  fontcolor: PropTypes.string,
};

MyTitle.defaultProps = {
  fontcolor: 'black',
};
