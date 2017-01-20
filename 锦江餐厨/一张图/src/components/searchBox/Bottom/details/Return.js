   import React from 'react';
// import styles from '../routes/searchBox.less';
import styles from './Return.less';


const Return = ({handleonClick}) => {
  return (
      <div className={styles['return']} onClick={handleonClick}>&#60;返回查询列表 </div> 
  );
};

Return.propTypes = {
};

export default Return;

