import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import styles from '../ItemList.less';


const ItemList = ({videoDotItemList,handleOnclick}) => {
    return (
        <div className={videoDotItemList==null?styles['list']:styles['listNone']}>
            <ul>
                {videoDotItemList.map(
                    (item,key) =>{
                        return(
                            <li onClick={()=>{handleOnclick(item,'videoDotList')}} key={key}>
                                <div className={styles['shopTitle']}>{item.code}</div>
                                <div className={styles['shopAddress']}>{item.code}</div>           
                                <div className={styles['shopAddress']}>{item.name}</div>           
                                <div className={styles['shopAddress']}>{item.modelName}</div>
                                <div className="_clear"></div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

ItemList.propTypes = {
};

export default ItemList;

