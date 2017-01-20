import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import styles from './DetailsBox.less';
import Title from './Title.js';
import Return from './Return.js';


import { Slider } from 'antd';


const CarNumDetails = ({carDetail,handleOnclick}) => {

    return (
        <div>
            <Return handleonClick={() => { handleOnclick({}, 'carDetail') } }></Return>
            <Title TitleText={carDetail.carCode}></Title>
            <div className={styles['intro']}>
                <div className={styles['state']}>
                    <div className={styles['icon']}></div>
                    <div className={styles['text']}>状态：
                      <span className={carDetail.isNormal ? styles['normal'] : styles['error']}>{carDetail.driveStatus}</span>
                    </div>
                </div>
                <div className={styles['capacity']}>
                    <div className={styles['icon']}></div>当前运载量(T)：{carDetail.carWeight}/{carDetail.carLoad}</div>
                <div className={styles['speed']}>
                    <div className={styles['icon']}></div>速度：{carDetail.speed}km/h
              </div>
            </div>
            <div className={styles['progress']}>
                <div className={styles['progressTitle']}><div className={styles['icon']}></div>工作进度</div>
                <div className={styles['bar']}>            
                    <Slider value={carDetail.collectPercent} disabled={false} tipFormatter={val=>`${val}%`}/>
                </div>
            </div>
        </div>
    );
};  

CarNumDetails.propTypes = {
};

export default CarNumDetails;

