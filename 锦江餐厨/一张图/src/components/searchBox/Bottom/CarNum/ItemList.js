import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import styles from '../ItemList.less';
import { Row, Col } from 'antd';


const ItemList = ({carItemList,handleOnclick}) => {

    console.log('carItemList'+carItemList);
    return (
          <div className={carItemList==null?styles['list']:styles['listNone']}>
            <ul>
                {carItemList.map(
                    (item,key) =>{
                        return(
                            <li className={styles['listItem']} onClick={()=>{handleOnclick(item,'carList')}}
                             key={key}>
{/*                                <div className={styles['leftbox']}>{item.carCode}</div>
                                <div className={styles['rightbox']}>
                                <div className={styles['state']}>状态:</div> 
                                <div className={ item.isNormal?styles['normal']:styles['error']} > {item.driveStatus} </div>
                                </div>
                                <div className="_clear"></div>*/}

                                <Row>
                                    <Col span={12}><div className={styles['leftbox']}>{item.carCode}</div></Col>
                                    <Col span={4}><div className={styles['state']}>状态:</div> </Col>
                                    <Col span={8}><div className={ item.isNormal?styles['normal']:styles['error']} >{item.driveStatus}</div></Col>
                                </Row>
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

