import React from 'react'
import { Select, Input, Table, Tooltip} from 'antd';
import BottomMidPanel from '../bottomMidPanel'

import style from './mid.less'

const Search = Input.Search;
const Option = Select.Option;

const Mid = ({mid_title,color_dict})=>{
	const popUp = (text)=>{
		return <Tooltip title={text}><span>{text}</span></Tooltip>
	}
	
	const addColor = (text)=>{
		let text_color = color_dict[text]
		if(text_color){
			return <span style={{color:text_color}}>{text}</span>
		}
		else{
			return <span>{text}</span>
		}
	}

	const columns = [{
	  title: '区域',
	  dataIndex: 'area',
	  width: '15%',
	}, {
	  title: '商户名',
	  dataIndex: 'name',
	  width: '25%',
	  className: style.td_overflow,
	  render: popUp
	}, {
	  title: '类型',
	  dataIndex: 'type',
	  width: '15%',
	  className: style.td_overflow,
	  render: popUp
	},{
		title: '收运状态',
		dataIndex: 'status',
		width: '15%',
		render: addColor
	}, {
	  title: '今日收运总量',
	  dataIndex: 'qty',
	  width: '15%',
	  
	},{
	  title: '今日收运次数',
	  dataIndex: 'times',
	  width: '15%',
	}];

	const data = [{
	    key: 'dw',
	    area: '姑苏区',
	    name: '文辉食堂',
	    status: '已收运',
	    type: 'aaa',
	  	qty: '50kg',
	    times: '0/2'
	},{
	    key: 'dedw',
	    area: '吴中区',
	    name: 'coco（文星广场店）',
	    status: '未完全收运',
	    type: 'bbb',
	  	qty: '50kg',
	    times: '0/2'
	},{
	    key: 'kuy',
	    area: '姑苏区',
	    name: '商户x5555555555555555555555555555555555555555555555555',
	    status: '未收运',
	    type: 'aaa',
	  	qty: '50kg',
	    times: '0/2'
	}];
	for (let i = 0; i < 50; i++) {
	  data.push({
	    key: 'oo'+i,
	    area: '姑苏区',
	    name: '文辉食堂',
	    status: '已收运',
	    type: 'kkk',
	  	qty: '50kg',
	    times: '0/2'
	  });
	}

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
				    style={{ width: 80 }}
				    placeholder="区域"
				    optionFilterProp="children"
				    allowClear={true}
				    onChange={()=>{}}
				  >
				    <Option value="姑苏区">姑苏区</Option>
				    <Option value="相城区">相城区</Option>
				    <Option value="吴中区">吴中区</Option>
				  </Select>

				  <Select
				    showSearch
				    style={{ width: 80 }}
				    placeholder="类型"
				    optionFilterProp="children"
				    allowClear={true}
				    onChange={value => console.log(value)}
				  >
				    <Option value="姑苏区">姑苏区</Option>
				    <Option value="相城区">相城区</Option>
				    <Option value="吴中区">吴中区</Option>
				  </Select>

				  <Select
				    showSearch
				    style={{ width: 80 }}
				    placeholder="收运状态"
				    optionFilterProp="children"
				    allowClear={true}
				    onChange={value => console.log(value)}
				  >
				    <Option value="姑苏区">姑苏区</Option>
				    <Option value="相城区">相城区</Option>
				    <Option value="吴中区">吴中区</Option>
				  </Select>

				  <Search placeholder="input search text" 
				  onSearch={value => console.log(value)} />
			</div>
			<div>
				<Table columns={columns} dataSource={data} 
				 pagination={tablePagination} bordered={true}
				size="small" className={style.data_tb} 
				onRowClick={(record, index)=>{console.log(record,index)}}/>
			</div>
		</BottomMidPanel>
	)
}

Mid.propTypes = {}

export default Mid;