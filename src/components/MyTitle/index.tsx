import React from 'react';
import {
  Typography,
} from 'antd';

interface Props {
  headline: string;
  fontcolor: string;
}

const { Title } = Typography;

const MyTitle: React.FC<Props> = ({ headline, fontcolor }) => (
  <div>
    <Title level={3} className="defaultForm" style={{ color: fontcolor, whiteSpace: 'pre-line', textDecoration: 'none' }}>{headline}</Title>
  </div>
);

export default MyTitle;
