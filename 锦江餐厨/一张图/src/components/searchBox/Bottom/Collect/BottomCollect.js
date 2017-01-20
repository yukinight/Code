import React from 'react';
import styles from './Bottomcollect.less';
import ItemList from './ItemList.js';
import DetailsBox from '../details/DetailsBox.js';

const Bottomcollect = ({collectItemList,collectDetail,handleOnclick,islist}) => {

  return (
        <li id='collect' className={styles['seachBottomItems']}> 
            {islist ? <ItemList collectItemList={collectItemList} handleOnclick={handleOnclick}></ItemList>
                    : <DetailsBox DetailsType={'collect'} collectDetail={collectDetail} handleOnclick={handleOnclick}></DetailsBox>
            }
        </li>
  );
};

Bottomcollect.propTypes = {
};

export default Bottomcollect;
            