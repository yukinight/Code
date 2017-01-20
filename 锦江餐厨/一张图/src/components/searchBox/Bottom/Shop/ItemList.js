import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import styles from '../ItemList.less';


const ItemList = ({shopItemList,handleOnclick}) => {
    return (
        <div className={shopItemList==null?styles['list']:styles['listNone']}>
            <ul>
                {shopItemList.map(
                    (item,key) =>{
                        return(
                        <li onClick={()=>{handleOnclick(item,'shopList')}} key={key}>
                            <div className={styles['shopTitle']}>{item.name}</div>
                            <div className={styles['shopAddress']}>{item.address}</div>           
                            <div className={styles['tel']}>
                                <div className={styles['telTitle']}>电话：</div>
                                <div className={styles['telIntro']}><p>{item.contactPhone}</p><p>{item.contactMobile}</p></div>                              
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

