import React from 'react'
import { Select, Input, Table, Tooltip} from 'antd';
import BottomMidPanel from '../bottomMidPanel'

import style from './mid.less'

const Search = Input.Search;
const Option = Select.Option;

const Mid = ({dispatch,mid_title,color_dict,tableData,searchText,
	areaOptions,areaFilter,stateOptions,stateFilter})=>{
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

	const columns = [{
	  title: '名称',
	  dataIndex: 'name',
	  width: '15%',
	  className: style.td_overflow,
	  render: popUp
	},{
	  title: '区域',
	  dataIndex: 'areaName',
	  width: '10%',
	}, {
	  title: '位置',
	  dataIndex: 'address',
	  width: '25%',
	  className: style.td_overflow,
	  render: popUp

	}, {
	  title: '收运状态',
	  dataIndex: 'cleanStatus',
	  width: '10%',
	  render: addColor
	},{
	  title: '今日收运量',
	  dataIndex: 'output',
	  width: '10%',
	},{
	  title: '平均收运量',
	  dataIndex: 'dailyOutput',
	  width: '10%',
	},{
	  title: '关联垃圾桶',
	  dataIndex: 'rfidNum',
	  width: '10%',
	},{
	  title: '关联商户数',
	  dataIndex: 'restaurantNum',
	  width: '10%',
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
				    onChange={(value)=>{
				    	dispatch({type:'collectorPanel/setFilter', payload:{filterVal:value,name:'area'}});
				    	dispatch({type:'collectorPanel/tableFilter'});
				    }}
				  >
				    {
				  		areaOptions.map((item,index)=>{
				  			return <Option key={item}>{item}</Option>
				  		})
				  	}
				  </Select>

				  <Select
				    showSearch
				    style={{ width: 100 }}
				    placeholder="状态"
				    optionFilterProp="children"
				    allowClear={true}
				    onChange={(value)=>{
				    	dispatch({type:'collectorPanel/setFilter', payload:{filterVal:value,name:'state'}});
				    	dispatch({type:'collectorPanel/tableFilter'});
				    }}
				  >
				    {
				  		stateOptions.map((item,index)=>{
				  			return <Option key={item}>{item}</Option>
				  		})
				  	}
				  </Select>

				  <Search placeholder="名称" 
				  onSearch={value => {
				  		dispatch({type:'collectorPanel/setSearchText', payload:{searchText:value}});
				    	dispatch({type:'collectorPanel/tableFilter'});
				  }} />
			</div>
			<div>
				<Table columns={columns} dataSource={tableData} 
				pagination={tablePagination} bordered={true}
				size="small" className={style.data_tb} 
				onRowClick={(record, index)=>{
					dispatch({type:'collectorPanel/setRightPanel',payload:{rowData:record}});
				}}/>
			</div>
		</BottomMidPanel>
	)
}

Mid.propTypes = {}

export default Mid;