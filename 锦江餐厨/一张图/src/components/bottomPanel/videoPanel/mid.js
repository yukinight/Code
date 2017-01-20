import React from 'react'
import { Select, Input, Table, Tooltip} from 'antd';
import BottomMidPanel from '../bottomMidPanel'

import style from './mid.less'

const Search = Input.Search;
const Option = Select.Option;

const Mid = ({mid_title, tableData, searchtext, typeOptions, typeFilter, dispatch})=>{
	const popUp = (text)=>{
		return <Tooltip title={text}><span>{text}</span></Tooltip>
	}
	

	const columns = [{
	  title: '编号',
	  dataIndex: 'code',
	  width: '20%',
	},{
	  title: '名称',
	  dataIndex: 'name',
	  width: '25%',
	  className: style.td_overflow,
	  render: popUp
	}, {
	  title: '位置',
	  dataIndex: 'address',
	  width: '35%',
	  className: style.td_overflow,
	  render: popUp

	}, {
	  title: '类型',
	  dataIndex: 'modelName',
	  width: '20%',
	}];

	
	return (
		<BottomMidPanel mid_title={mid_title}>
			<div className={style.search_bar}>
				  <Select
				    showSearch
				    style={{ width: 90 }}
				    placeholder="类型"
				    optionFilterProp="children"
				    allowClear={true}
				    value={typeFilter}
				    onChange={(value)=>{
				    	// console.log(value)
				    	dispatch({type:'videoPanel/setTypeFilter',payload:{typeFilter:value}});
				    	dispatch({type:'videoPanel/tableFilter'});
				    }}
				  >
					  {
					  	typeOptions.map(item=>
					  		<Option key={item}>{item}</Option>)
					  }
				  </Select>

				  <Search placeholder="名称" 
				  onSearch={value => {
				  	// console.log(value);
				  	dispatch({type:'videoPanel/setSearchText',payload:{searchText:value}});
				  	dispatch({type:'videoPanel/tableFilter'});
				  }} />
			</div>
			<div>
				<Table columns={columns} dataSource={tableData} 
				pagination={false} bordered={true} scroll={{y:180}}
				size="small" className={style.data_tb} 
				onRowClick={(record, index)=>{console.log(record, index)}}/>
			</div>
		</BottomMidPanel>
	)
}

Mid.propTypes = {}

export default Mid;