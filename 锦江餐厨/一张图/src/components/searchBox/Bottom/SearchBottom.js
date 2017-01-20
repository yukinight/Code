import React from 'react';
import styles from './SearchBottom.less';
import CarNum from './CarNum/BottomCarNum';
import Shop from './Shop/BottomShop';
import Collect from './Collect/BottomCollect';
import VideoDot from './VideoDot/BottomVideoDot';

const SearchBottom = ({carItemList,shopItemList,collectItemList,videoDotItemList,carDetail,shopDetail,collectDetail,videoDotDetail,handleOnclick,currentShow,isCanShow,}) => {
  
  const showComponents=() => {
    switch (currentShow.type) {
      case 'car':
        return (<CarNum id='carNum'  islist={currentShow.islist} carItemList={carItemList} carDetail={carDetail} handleOnclick={handleOnclick}></CarNum>)
        break;
      case 'shop':
        return (<Shop id='shop' islist={currentShow.islist}  shopItemList={shopItemList} shopDetail={shopDetail} handleOnclick={handleOnclick}></Shop>)
        break;
      case 'collect':
        return (<Collect id='collect'  islist={currentShow.islist} collectItemList={collectItemList} collectDetail={collectDetail} handleOnclick={handleOnclick}></Collect>)
        break;
      case 'videoDot':
        return (<VideoDot id='videoDot' islist={currentShow.islist} videoDotItemList={videoDotItemList} videoDotDetail={videoDotDetail} handleOnclick={handleOnclick}></VideoDot>)
        break;
      case 'none':
        return (<div></div>)
        break;
      default:
        break;
    }
  };
  // console.log(isCanShow);
  return (
     <div className={styles['seachBottom']}>
        <ul>
            {isCanShow && showComponents()}
        </ul>
    </div>
  );
};

SearchBottom.propTypes = {
};

export default SearchBottom;


