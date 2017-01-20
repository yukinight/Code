import React from 'react';
// import styles from '../routes/searchBox.less';
import styles from './searchTop.less';


import { Input, Col, Select, InputNumber, DatePicker,Button } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
const ButtonGroup = Button.Group;


const searchTop = ({selectList,handleClickSelect,searchBtn,currentInput,searchInputOnchange,closeBtn,currentSelectIndex}) => {
    

  return (
    <div className={styles['searchTop']} >
      <InputGroup size="large">
        <div className={styles['col1']}> 
          <Select size="large" className={styles['select']} defaultValue={selectList[currentSelectIndex]} onChange={(value)=>{handleClickSelect({},value)}}>
          
            {selectList.map((item,key)=>{
                  return (<Option key={key} value={item} onClick={()=>{handleClickSelect({},key)}}>
                            {item}
                      </Option>)
            })}
          </Select>
        </div>
        <div className={styles['col2']}>
        <Input size='large' className={styles['input']} value={ currentInput} style={{ width: '100%' }} placeholder="模糊搜索" onChange={(event)=>{
                  //将更改后的值传过去
                  var evt = event||window.event;
                  var evtSrc = evt.target || evt.srcElement;
                  searchInputOnchange(evtSrc.value);
                }}/>
        </div>
        <div className={styles['col3']}> 
        <ButtonGroup size="large" >
          <Button size="large" className={styles['button']}  icon="close" onClick={closeBtn}/>
          <Button size="large" className={styles['button']} type="primary" icon="search" onClick={searchBtn}/>
        </ButtonGroup>
        </div>
      </InputGroup>
    </div>
  );
};

searchTop.propTypes = {
};

export default searchTop;



