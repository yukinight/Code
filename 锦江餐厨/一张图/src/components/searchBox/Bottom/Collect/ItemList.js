import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import styles from '../ItemList.less';


const ItemList = ({collectItemList,handleOnclick}) => {



    return (
        <div className={collectItemList==null?styles['list']:styles['listNone']}>
            <ul>
                {collectItemList.map(
                    (item,key) =>{
                        return(
                            <li onClick={()=>{handleOnclick(item,'collectList')}} key={key}>
                                <div className={styles['shopTitle']}>{item.name}</div>
                                <div className={styles['shopAddress']}>地址：{item.address}</div>           
                                <div className={styles['relatedShop']}>
                                    关联商户({item.restaurantNum})：{item.restaurantName}                      
                                </div>
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

