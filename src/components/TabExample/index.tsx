import React, { ReactNode } from 'react';

interface Props {
  element: ReactNode,
}

const TabExample: React.FC<Props> = ({ element }) => (
  <div className="osx-window tutorial">
    <div className="osx-title-bar">
      <div className="osx-buttons">
        <div className="osx-button osx-close" />
        <div className="osx-button osx-minimize" />
        <div className="osx-button osx-maximize" />
      </div>
    </div>
    <div className="osx-content">
      {element}
    </div>
  </div>
);

export default TabExample;
