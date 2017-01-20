import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import styles from './DetailsBox.less';
import Return from './Return.js';

import CarNumDetails from './CarNumDetails.js';
import ShopDetails from './ShopDetails.js';
import CollectDetails from './CollectDetails.js';
import VideoDotDetails from './VideoDotDetails.js';

const DetailsBox = ({DetailsType,carDetail,shopDetail,collectDetail,videoDotDetail,handleOnclick}) => {
   

    let renderBody=() => {
            switch (DetailsType) {
                case 'carNum':          
                    return  <CarNumDetails  carDetail={carDetail} handleOnclick={handleOnclick}></CarNumDetails>
                    break;
                case 'shop':
                    return <ShopDetails shopDetail={shopDetail} handleOnclick={handleOnclick}></ShopDetails>
                    break;
                case 'collect':
                    return <CollectDetails  collectDetail={collectDetail} handleOnclick={handleOnclick}></CollectDetails>
                    break;
                case 'videoDot':
                    return <VideoDotDetails  videoDotDetail={videoDotDetail} handleOnclick={handleOnclick}></VideoDotDetails>
                    break;
                default:
                    break;
            }

        return '';
    }
    
    return (
        <div className={styles['detailsBox']}>
            {renderBody()}
            <div className="_clear"></div>
        </div>


       
                
           
    );
};

DetailsBox.propTypes = {
};

export default DetailsBox;

