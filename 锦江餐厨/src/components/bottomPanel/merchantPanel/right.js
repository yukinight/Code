import React from 'react'
import { Table } from 'antd'
import BottomRightPanel from '../bottomRightPanel'

import style from './right.less'

const Right = ({right_title})=>{
	const columns = [{
		title: 'RFID',
		dataIndex: 'id',
	},{
		title: '规格',
		dataIndex: 'spec',
	},{
		title: '厂家名称',
		dataIndex: 'name',
		width:'50%',
	}]

	const data = [{
		id: 231,
		spec: 'daegs',
		name:'XXXXXXXXXXXXXXXXXXXXXX'
	},{
		id: 2315,
		spec: 'daegsgd',
		name:'XXXXXXXXXXXXXXXXX'
	}]
	return (
		<BottomRightPanel right_title={right_title}>
			<div className={style.r_panel}>
				<div className={style.p_title}>收集规则</div>
				<table>
					<tbody>
						<tr>
							<td>商户地址：</td>
							<td>XXXXXXXXXXXXXXXXX</td>
						</tr>
						<tr>
							<td>商户定位：</td>
							<td>XXXXXXXXX</td>
						</tr>
						<tr>
							<td>联系电话：</td>
							<td>XXXXXXXXXXXXXXXXXXXX</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={style.r_panel}>
				<div className={style.p_title}>关联垃圾桶</div>
				<Table columns={columns} dataSource={data} 
				pagination={false} bordered={true}
				size="small" onRowClick={(record, index)=>{}}/>
			</div>
		</BottomRightPanel>
	)
}

Right.propTypes={}

export default Right;