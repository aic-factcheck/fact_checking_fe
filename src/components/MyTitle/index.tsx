import React from 'react';
import {
  Typography,
} from 'antd';
import PropTypes from 'prop-types';

interface Props {
  headline: string;
  fontcolor: string;
}

const { Title } = Typography;

const MyTitle: React.FC<Props> = ({ headline, fontcolor }) =>  {
  return (
    <div>
      <Title level={3} className="defaultForm" style={{ color: fontcolor, whiteSpace: 'pre-line', textDecoration: 'none' }}>{headline}</Title>
    </div>
  );
}

export default MyTitle;