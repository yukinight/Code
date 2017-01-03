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
	  title: '名称',
	  dataIndex: 'name',
	  width: '15%',
	  className: style.td_overflow,
	  render: popUp
	},{
	  title: '区域',
	  dataIndex: 'area',
	  width: '10%',
	}, {
	  title: '位置',
	  dataIndex: 'location',
	  width: '25%',
	  className: style.td_overflow,
	  render: popUp

	}, {
	  title: '收运状态',
	  dataIndex: 'status',
	  width: '10%',
	  render: addColor
	},{
	  title: '今日收运量',
	  dataIndex: 'today',
	  width: '10%',
	},{
	  title: '平均收运量',
	  dataIndex: 'average',
	  width: '10%',
	},{
	  title: '关联垃圾桶',
	  dataIndex: 'related_trash',
	  width: '10%',
	},{
	  title: '关联商户数',
	  dataIndex: 'related_merchant',
	  width: '10%',
	}];

	const data = [{
	    key: 'dw',
	    name: '5566',
	    area: `姑苏区`,
	    status: '已收运',
	    location: '苏州市吴中区干将西路420号', 
	    today: 50,
	    average: 110,
	  	related_trash: '',
	    related_merchant: ''
	},{
	    key: 'dedw',
	    name: '7788',
	    area: `姑苏区 `,
	    status: '未完全收运',
	    location: '苏州市吴中区干将西路420号5555555555555555555555555555555555', 
	    today: 50,
	    average: 110,
	  	related_trash: '',
	    related_merchant: ''
	},{
	    key: 'kuy',
	    name: 'aabbcc',
	    area: `姑苏区 `,
	    status: '未收运',
	    location: '苏州市吴中区干将西路420号', 
	    today: 50,
	    average: 110,
	  	related_trash: '',
	    related_merchant: ''
	}];
	for (let i = 0; i < 50; i++) {
	  data.push({
	    key: i,
	    name: 'test',
	    area: `姑苏区 ${i}`,
	    status: '已收运',
	    location: '苏州市吴中区干将西路420号', 
	    today: 50,
	    average: 110,
	  	related_trash: '',
	    related_merchant: ''
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
				    onChange={(value)=>{console.log(value)}}
				  >
				    <Option value="姑苏区">姑苏区</Option>
				    <Option value="相城区">相城区</Option>
				    <Option value="吴中区">吴中区</Option>
				  </Select>

				  <Select
				    showSearch
				    style={{ width: 80 }}
				    placeholder="状态"
				    optionFilterProp="children"
				    allowClear={true}
				    onChange={(value)=>{console.log(value)}}
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
				onRowClick={(record, index)=>{console.log(record, index)}}/>
			</div>
		</BottomMidPanel>
	)
}

Mid.propTypes = {}

export default Mid;