import React from 'react';
import styles from './BottomShop.less';
import ItemList from './ItemList.js';
import DetailsBox from '../details/DetailsBox.js';

const BottomShop = ({shopItemList,shopDetail,handleOnclick,islist,}) => {
  return (
      <li id='shop' className={styles['seachBottomItems']}>
        {islist ? <ItemList shopItemList={shopItemList} handleOnclick={handleOnclick}></ItemList>
                : <DetailsBox DetailsType={'shop'} shopDetail={shopDetail} handleOnclick={handleOnclick}></DetailsBox>
        }
    </li>
  );
};

BottomShop.propTypes = {
};

export default BottomShop;
            