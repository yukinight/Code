import React from 'react';
import styles from './BottomVideoDot.less';
import ItemList from './ItemList.js';
import DetailsBox from '../details/DetailsBox.js';

const BottomVideoDot = ({videoDotItemList,videoDotDetail,handleOnclick,islist,}) => {
  return (
        <li id='videoDot' className={styles['seachBottomItems']}>  
            {islist ? <ItemList videoDotItemList={videoDotItemList} handleOnclick={handleOnclick}></ItemList>
              : <DetailsBox DetailsType={'videoDot'} videoDotDetail={videoDotDetail} handleOnclick={handleOnclick}></DetailsBox>
            }
        </li>
  );
};

BottomVideoDot.propTypes = {
};

export default BottomVideoDot;