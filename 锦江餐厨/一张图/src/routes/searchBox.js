import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';



import SearchTop from '../components/searchBox/Top/SearchTop';
import SearchBottom from '../components/searchBox/Bottom/SearchBottom';

import styles from './searchBox.less';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

function searchBox({ location, dispatch,searchBoxModel}) {
  const {   carItemList,shopItemList,collectItemList,videoDotItemList,            //列表
            carDetail,collectDetail,shopDetail,videoDotDetail,                  //细节
            currentShow,isCanShow,                      // 当前展示的
            selectList,currentSelectIndex,              //TOP的select
            currentInput,currentSelectList,             //input
        }=searchBoxModel;


    /*========= 控制底部跳转 =======*/
    const handleOnclick = (data, currentDisplay) => {
 
        switch (currentDisplay) {
            case 'carList':
                dispatch({ type: `searchBoxModel/entryCarDetail`, payload: data,});
                break;
            case 'collectList':
                dispatch({ type: `searchBoxModel/entryCollectDetail`, payload: data,});
                break;
            case 'shopList':
                dispatch({ type: `searchBoxModel/entryShopDetail`, payload: data,});
                break;
            case 'videoDotList':
                dispatch({ type: `searchBoxModel/entryVideoDetail`, payload: data, });
                break;
            case 'carDetail':
                dispatch({ type: `searchBoxModel/entryCarList`, payload: data, });
                break;
            case 'collectDetail':
                dispatch({ type: `searchBoxModel/entryCollectList`, payload: data,});
                break;
            case 'shopDetail':
                dispatch({ type: `searchBoxModel/entryShopList`, payload: data,});
                break;
            case 'videoDotDetail':
                dispatch({ type: `searchBoxModel/entryVideoDotList`, payload: data,});
                break;
            case 'none':
                dispatch({ type: `searchBoxModel/entryNone`, payload: data,});
                break;
            default:
                break;
        }
    }

    /*========= 下拉框select的选择 =======*/
    const handleClickSelect = (data, currentSelect) => {
        
        dispatch({ type: `searchBoxModel/showBottom`, payload: false, });

        // console.log(currentSelect);
        var index;
        selectList.map( (item,key)=>{
                        if(item == currentSelect){
                            index=key;
                        }
                    });
        // console.log(index);
        switch (index) {
            case 0:
                selectOnchange({
                        currentSelectList:'车牌号',
                        currentSelectIndex:0,
                    });
                dispatch({ type: `searchBoxModel/entryCarList`, payload: data, });
                break;
             case 1:
                selectOnchange({
                        currentSelectList:'商家点',
                        currentSelectIndex:1,
                    });
                dispatch({ type: `searchBoxModel/entryShopList`, payload: data, });
                break;           
            case 2:
                selectOnchange({
                        currentSelectList:'收集点',
                        currentSelectIndex:2,
                    });
                dispatch({ type: `searchBoxModel/entryCollectList`, payload: data, });
                break;
            case 3:
                 selectOnchange({
                        currentSelectList:'视频点',
                        currentSelectIndex:3,
                    });
                dispatch({ type: `searchBoxModel/entryVideoDotList`, payload: data, });
                break;
            default:
                break;
        }
        
    };



    /*=========放大镜按钮操作 =======*/
    const searchBtn =()=>{
        // console.log('向后台请求的分支currentSelectIndex'+currentSelectIndex);
        // console.log('请求的参数currentInput'+currentInput);
        
        //currentInput 是搜索框输入的字段
        switch(currentSelectIndex){
            case 0:
                dispatch({ type: 'searchBoxModel/requireCar', payload: currentInput,});
                break;
            case 1:
                dispatch({ type: 'searchBoxModel/requireShop', payload: currentInput,});
                break;
            case 2:
                dispatch({ type: 'searchBoxModel/requireCollect', payload: currentInput,});
                break;
            case 3:
                dispatch({ type: 'searchBoxModel/requireVideo', payload: currentInput,});
                break;
        }
        // console.log('currentShow: '+currentShow.type);
        handleClickSelect({},currentSelectList);

        //控制是否展示底部
        dispatch({ type: `searchBoxModel/showBottom`, payload: true,});
    };
    /*============ select值变更 ===========*/
    const selectOnchange = (data)=>{
        // 变更select
        dispatch({ type: `searchBoxModel/changeSelect`, payload:data,});
    };
    /*============差号关闭 ===========*/
    const closeBtn = (data) =>{
        dispatch({ type: `searchBoxModel/showBottom`, payload: false,});
        dispatch({ type: `searchBoxModel/changeValue`, payload:'',});
    };


    /*============ searchInput值更新 ===========*/
    const searchInputOnchange = (data)=>{
        // console.log('searchInputOnchangecurrentInputsadawdadwadsad= '+currentInput+'  data'+data);
        dispatch({ type: `searchBoxModel/changeValue`, payload:data,});
    };


    /*============= 上部的Props===========*/
    const searchTopProps = {
        selectList,handleClickSelect,handleOnclick,searchBtn,currentInput,
        searchInputOnchange,currentSelectList,closeBtn,currentSelectIndex
    };


    /*============= 下部的Props===========*/
    const searchBottomProps = {
        carItemList, shopItemList, collectItemList, videoDotItemList,
        carDetail, collectDetail, shopDetail, videoDotDetail,
        handleOnclick, currentShow,isCanShow,
    };


    return ( 
        <div className={styles['searchBox']}>
            <SearchTop className={styles['searchTop']} {...searchTopProps}></SearchTop> 
            <SearchBottom className={styles['seachBottom']} {...searchBottomProps}></SearchBottom>
            <div className="_clear"></div>
        </div>
    );
}

searchBox.propTypes = {
};

function mapStateToProps({ searchBoxModel }) {
  return {searchBoxModel};
}
export default connect( mapStateToProps )(searchBox);
