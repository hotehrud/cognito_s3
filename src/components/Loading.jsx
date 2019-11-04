import React from 'react';
import threeDots from 'assets/images//three-dots.svg';
import oval from 'assets/images/oval.svg';

const Loading = ({ children, type = 'oval', cName }) => {
  let loadingType = oval;
  if (type === 'dots') {
    loadingType = threeDots;
  }

  return (
    <div className={cName}>
      <img src={loadingType} className="loading_icon" alt="loading" />
      {children}
    </div>
  );
};

export default Loading;
