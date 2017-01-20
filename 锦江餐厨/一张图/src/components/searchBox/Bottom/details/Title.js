import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import styles from './Title.less';


const Title = ({TitleText}) => {
  return (
      <div className={styles['title']}>{TitleText}</div>
  );
};

Title.propTypes = {
};

export default Title;