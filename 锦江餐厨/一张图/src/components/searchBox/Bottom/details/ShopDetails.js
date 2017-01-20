import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import styles from './DetailsBox.less';
import Title from './Title.js';
import Return from './Return.js';


const ShopDetails = ({shopDetail,handleOnclick}) => {
  return (
     <div>
        <Return handleonClick={()=>{handleOnclick({},'shopDetail')}}></Return>
        <Title TitleText={shopDetail.name}></Title>
        <div className={styles['intro']}>
            <div className={styles['state']}>
                <div className={styles['icon']}></div>
                <div className={styles['text']}>清理状态：
                     <span className={ shopDetail.isClean?styles['normal']:styles['error']}>{shopDetail.collectedStatusName}</span>
                </div>
            </div>
            <div className={styles['capacity']}>                              
                <div className={styles['icon']}></div>今日清理量(T)：{shopDetail.output}
            </div>                            
            <div className={styles['capacity']}>                              
                <div className={styles['icon']}></div>平均清理量(T)：{shopDetail.dailyOutput}
            </div>
            <div className={styles['capacity']}>                              
                <div className={styles['icon']}></div>清理次数：{shopDetail.collectedTimes}
            </div>
            <div className={styles['capacity']}>                              
                <div className={styles['icon']}></div>关联垃圾桶：{shopDetail.rfidCodes}
            </div>
        </div>
        <div className={styles['progress']}>
            <div className={styles['capacity']}>                              
                <div className={styles['icon']}></div>商户地址：{shopDetail.address}
            </div>
            <div className={styles['capacity']}>                              
                <div className={styles['icon']}></div>商户定位：{shopDetail.classesName}
            </div>
            <div className={styles['capacity']}>                              
                <div className={styles['icon']}></div>联系电话：{shopDetail.contactMobile}
            </div>                           
        </div>
    </div>
  );
};

ShopDetails.propTypes = {
};

export default ShopDetails;

