import React from 'react'
import { Table} from 'antd';
import BottomMidPanel from '../bottomMidPanel'

import style from './mid.less'

const Mid = ({mid_title})=>{
	const columns = [{
	  title: '区域',
	  dataIndex: 'area',
	  width: '16.6%',
	}, {
	  title: '今日清运量',
	  dataIndex: 'today',
	  width: '16.6%',
	}, {
	  title: '平均清理量',
	  dataIndex: 'average',
	  width: '16.6%',
	},{
	  title: '收集点情况',
	  dataIndex: 'spot_status',
	  width: '16.6%',
	},{
	  title: '垃圾桶情况',
	  dataIndex: 'trash_status',
	  width: '16.6%',
	},{
	  title: '商户情况',
	  dataIndex: 'merchant_status',
	  width: '16.6%',
	}];

	const data = [];
	for (let i = 0; i < 100; i++) {
	  data.push({
	    key: i,
	    area: `姑苏区 ${i}`,
	    today: 50,
	    average: 110,
	    spot_status: '20/50',
	    trash_status: '36/66',
	    merchant_status: '36/66'
	  });
	}

	return (
		<BottomMidPanel mid_title={mid_title}>
			<div>
				<Table columns={columns} dataSource={data} 
				 scroll={{ y: 185 }} pagination={false} bordered={true}
				size="small"/>
			</div>
		</BottomMidPanel>
	)
}

Mid.propTypes = {}

export default Mid;