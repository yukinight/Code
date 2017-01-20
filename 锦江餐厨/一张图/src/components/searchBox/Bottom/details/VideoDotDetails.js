import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import styles from './DetailsBox.less';
import Title from './Title.js';
import Return from './Return.js';

const VideoDotDetails = ({videoDotDetail,handleOnclick}) => {
  return (
      <div>
          <Return  handleonClick={()=>{handleOnclick({},'videoDotDetail')}}></Return>
          <Title TitleText={videoDotDetail.name}></Title>
          <div className={styles['intro']}>
            <div className={styles['capacity']}>                              
                <div className={styles['icon']}></div>{videoDotDetail.modelName}
            </div>
            <div className={styles['capacity']}>                              
                <div className={styles['icon']}></div>{videoDotDetail.address}
            </div>
            <div className={styles['capacity']}>                              
                <div className={styles['icon']}></div>{videoDotDetail.videoDotCamera}
            </div>
        </div>
        <div className={styles['progress']}>
                播放按钮                         
        </div>
      </div>
  );
};

VideoDotDetails.propTypes = {
};

export default VideoDotDetails;

