import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import styles from './DetailsBox.less';
import Title from './Title.js';
import Return from './Return.js';


const CollectDetails = ({collectDetail,handleOnclick}) => {
  return (
      <div>
          <Return  handleonClick={()=>{handleOnclick({},'collectDetail')}}></Return>
          <Title TitleText={collectDetail.name}></Title>
          <div className={styles['intro']}>
              <div className={styles['state']}>
                  <div className={styles['icon']}></div>
                  <div className={styles['text']}>清理状态：
                        <span className={ collectDetail.isClean?styles['normal']:styles['error']}>{collectDetail.cleanState}</span>
                  </div>
              </div>
              <div className={styles['capacity']}>                              
                  <div className={styles['icon']}></div>今日清理量(T)：{collectDetail.output}
              </div>                            
              <div className={styles['capacity']}>                              
                  <div className={styles['icon']}></div>平均清理量(T)：{collectDetail.dailyOutput}
              </div>
              <div className={styles['capacity']}>                              
                  <div className={styles['icon']}></div>关联垃圾桶：{collectDetail.rfidNum}
              </div>
              <div className={styles['capacity']}>                              
                  <div className={styles['icon']}></div>关联商户数：{collectDetail.restaurantNum}
              </div>
          </div>
          <div className={styles['progress']}>
              <div className={styles['capacity']}>                              
                  <div className={styles['icon']}></div>收集时间：{collectDetail.collectTime}
              </div>
              <div className={styles['capacity']}>                              
                  <div className={styles['icon']}></div>收集周期：{collectDetail.collectCycle}
              </div>
              <div className={styles['capacity']}>
                  <div className={styles['icon']}></div>收集车辆：{collectDetail.carCode}
              </div>
          </div>
      </div>
  );
};

CollectDetails.propTypes = {
};

export default CollectDetails;

