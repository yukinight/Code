import React from 'react';
import styles from './BottomCarNum.less';

import ItemList from './ItemList.js';
import DetailsBox from '../details/DetailsBox.js';

const BottomCarNum = ({carItemList,carDetail,handleOnclick,islist}) => {


  return (
    <li id='carNum' className={styles['carNum']}>
        {islist ? <ItemList carItemList={carItemList} handleOnclick={handleOnclick}></ItemList>
                : <DetailsBox DetailsType={'carNum'} carDetail={carDetail} handleOnclick={handleOnclick}></DetailsBox>
        }
        <div className="_clear"></div>
    </li>   
  );
};

BottomCarNum.propTypes = {
};

export default BottomCarNum;
