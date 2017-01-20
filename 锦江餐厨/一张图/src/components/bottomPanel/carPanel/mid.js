import React from 'react';
import { Select, Input, Table, Tooltip } from 'antd';
import BottomMidPanel from '../bottomMidPanel';

import CarState from './carState';
import style from './mid.less';

const Search = Input.Search;
const Option = Select.Option;

const Mid = ({dispatch,mid_title,statusColor,carStatus,searchText,
	areaOptions,areaFilter,stateOptions,stateFilter,})=>{
	
	return (
		<BottomMidPanel mid_title={mid_title}>
			<div className={style.search_bar}>
				<Select  showSearch style={{ width: 90 }} placeholder="区域"   
					optionFilterProp="children" allowClear={true}
				    onChange={value=>{
				    	dispatch({type:'carPanel/setFilter', payload:{filterVal:value,name:'area'}});
				    	dispatch({type:'carPanel/tableFilter'});
				    }}
				  >
					{
						areaOptions.map((item,index)=>{
							return <Option key={item}>{item}</Option>
						})
					}
				  </Select>

				  <Select showSearch style={{ width: 100 }} placeholder="状态"
				    optionFilterProp="children"  allowClear={true}
				    onChange={value => {
				    	dispatch({type:'carPanel/setFilter', payload:{filterVal:value,name:'state'}});
				    	dispatch({type:'carPanel/tableFilter'});
				    }}
				  >
				  	{
				  		stateOptions.map((item,index)=>{
				  			return <Option key={item}>{item}</Option>
				  		})
				  	}
				  </Select>

				  <Search placeholder="车牌号" 
				  onSearch={value => {
				  		dispatch({type:'carPanel/setSearchText', payload:{searchText:value}});
				  	  	dispatch({type:'carPanel/tableFilter'});
				  }} />
			</div>
			<div>
				<ul className={style.ul_style}>
					{
						carStatus.map((item, index)=>{
							let props = {
								...item,
								statusColor,
								index: index,
								dispatch,
							}
							return <CarState key={`carlist-${index}`} {...props}/>
						})
					}	
				</ul>
			</div>
		</BottomMidPanel>
	)
}

Mid.propTypes = {}

export default Mid;