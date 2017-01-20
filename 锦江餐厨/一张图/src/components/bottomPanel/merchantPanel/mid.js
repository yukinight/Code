import React from 'react'
import { Select, Input, Table, Tooltip} from 'antd';
import BottomMidPanel from '../bottomMidPanel'

import style from './mid.less'

const Search = Input.Search;
const Option = Select.Option;

const Mid = ({dispatch,mid_title,color_dict,tableData,searchText,
		areaOptions,areaFilter,stateOptions,stateFilter,typeOptions,
		typeFilter})=>{
	const popUp = (text)=>{
		return <Tooltip title={text}><span>{text}</span></Tooltip>
	}
	
	const addColor = (text)=>{
		let text_color = color_dict[text] || '#000';
		if(text_color){
			return <span style={{color:text_color}}>{text}</span>
		}
		else{
			return <span>{text}</span>
		}
	}

	const setFilter = (name,val)=>{
		dispatch({type:'merchantPanel/setFilter', payload:{filterVal:val,name:name}});
		dispatch({type:'merchantPanel/tableFilter'});
	}

	const columns = [{
		title: '区域',
		dataIndex: 'areaName',
		width: '15%',
	}, {
		title: '商户名',
		dataIndex: 'name',
		width: '25%',
		className: style.td_overflow,
		render: popUp
	}, {
		title: '类型',
		dataIndex: 'classesName',
		width: '15%',
		className: style.td_overflow,
		render: popUp
	},{
		title: '收运状态',
		dataIndex: 'collectedStatusName',
		width: '15%',
		render: addColor
	}, {
		title: '今日收运总量',
		dataIndex: 'output',
		width: '15%',
	  
	},{
		title: '今日收运次数',
		dataIndex: 'times',
		width: '15%',
	}];


	const tablePagination = {
		onChange: (page)=>{},
		showQuickJumper: true,
		defaultPageSize: 5
	}
	return (
		<BottomMidPanel mid_title={mid_title}>
			<div className={style.search_bar}>
				<Select
				    showSearch
				    style={{ width: 90 }}
				    placeholder="区域"
				    optionFilterProp="children"
				    allowClear={true}
				    onChange={value=>{
				    	setFilter('area',value);
				    }}
				  >
				    {	
				    	areaOptions.length!==0?
				  		areaOptions.map((item,index)=>{
				  			return <Option key={item}>{item}</Option>
				  		})
				  		:null
				  	}
				  </Select>

				  <Select
				    showSearch
				    style={{ width: 100 }}
				    placeholder="类型"
				    optionFilterProp="children"
				    allowClear={true}
				    onChange={value => {
				    	setFilter('type',value);
				    }}
				  >
				    {
				    	typeOptions.length!==0?
				  		typeOptions.map((item,index)=>{
				  			return <Option key={item}>{item}</Option>
				  		})
				  		:null
				  	}
				  </Select>

				  <Select
				    showSearch
				    style={{ width: 100 }}
				    placeholder="收运状态"
				    optionFilterProp="children"
				    allowClear={true}
				    onChange={value => {
				    	setFilter('state',value);
				    }}
				  >
				    {
				    	stateOptions.length!==0?
				  		stateOptions.map((item,index)=>{
				  			return <Option key={item}>{item}</Option>
				  		})
				  		:null
				  	}
				  </Select>

				<Search placeholder="商户名" onSearch={value => {
					dispatch({type:'merchantPanel/setSearchText', payload:{searchText:value}});
			    	dispatch({type:'merchantPanel/tableFilter'});
				}} />
			</div>
			<div>
				<Table columns={columns} dataSource={tableData} 
				 pagination={tablePagination} bordered={true}
				size="small" className={style.data_tb} 
				onRowClick={(record, index)=>{
					dispatch({type:'merchantPanel/setRightPanel',payload:{rowData:record}});
				}}/>
			</div>
		</BottomMidPanel>
	)
}

Mid.propTypes = {}

export default Mid;