import React from 'react'
import { Select, Input, Table, Tooltip} from 'antd';
import BottomMidPanel from '../bottomMidPanel'

import style from './mid.less'

const Search = Input.Search;
const Option = Select.Option;

const Mid = ({dispatch, mid_title,tableData, searchText, areaOptions, areaFilter, 
	scheduleOptions, scheduleFilter})=>{
	const popUp = (text)=>{
		return <Tooltip title={text}><span>{text}</span></Tooltip>
	}

	const columns = [{
	  title: '编号',
	  dataIndex: 'code',
	  width: '15%',
	},{
	  title: '名称',
	  dataIndex: 'name',
	  width: '20%',
	  className: style.td_overflow,
	  render: popUp
	},{
	  title: '今日收集量',
	  dataIndex: 'output',
	  width: '10%',
	},{
	  title: '平均收集量',
	  dataIndex: 'dailyOutput',
	  width: '10%',
	},{
	  title: '是否排班',
	  dataIndex: 'isSchedulingCN',
	  width: '10%',
	}, {
	  title: '已收集点数/总点数',
	  dataIndex: 'spotNum',
	  width: '20%',
	  className: style.td_overflow,
	  render: popUp

	}, {
	  title: '今日收运次数',
	  dataIndex: 'syNum',
	  width: '15%',
	}];

	
	return (
		<BottomMidPanel mid_title={mid_title}>
			<div className={style.search_bar}>
				<Select
				    showSearch
				    style={{ width: 90 }}
				    placeholder="区域"
				    optionFilterProp="children"
				    allowClear={true}
				    onChange={ value => {
				    	dispatch({type:'routePanel/setFilter', payload:{filterVal:value,name:'area'}});
				    	dispatch({type:'routePanel/tableFilter'});
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
				    style={{ width: 80 }}
				    placeholder="是否排班"
				    optionFilterProp="children"
				    allowClear={true}
				    onChange={ value => {
				    	dispatch({type:'routePanel/setFilter', payload:{filterVal:value,name:'schedule'}});
				    	dispatch({type:'routePanel/tableFilter'});
				    }}
				  >
				    {
				  		scheduleOptions.map((item,index)=>{
				  			return <Option key={item}>{item}</Option>
				  		})
				  	}
				  </Select>

				  <Search placeholder="名称" 
				  onSearch={
				  	value => {
				  		dispatch({type:'routePanel/setSearchText', payload:{searchText:value}});
				    	dispatch({type:'routePanel/tableFilter'});
				  	}
				  } />
			</div>
			<div>
				<Table columns={columns} dataSource={tableData} 
				pagination={false} bordered={true} scroll={{ y: 180 }}
				size="small" className={style.data_tb} 
				onRowClick={(record, index)=>{
					dispatch({type:'routePanel/setRightPanel',payload:{rowData:record}});
				}}/>
			</div>
		</BottomMidPanel>
	)
}

Mid.propTypes = {}

export default Mid;