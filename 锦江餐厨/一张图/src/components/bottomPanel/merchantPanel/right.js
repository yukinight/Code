import React from 'react'
import { Table } from 'antd'
import BottomRightPanel from '../bottomRightPanel'

import style from './right.less'

const Right = ({right_title,merchantInfo,relatedTrash})=>{
	const columns = [{
		title: 'RFID',
		dataIndex: 'rfideCode',
	},{
		title: '规格',
		dataIndex: 'trashbinModel',
	},{
		title: '厂家名称',
		dataIndex: 'manufacturer',
		width:'50%',
	}]

	return (
		<BottomRightPanel right_title={right_title}>
			<div className={style.r_panel}>
				<div className={style.p_title}>商户信息</div>
				<table>
					<tbody>
						<tr>
							<td>商户地址：</td>
							<td>{merchantInfo.address}</td>
						</tr>
						<tr>
							<td>商户定位：</td>
							<td>{merchantInfo.classesName}</td>
						</tr>
						<tr>
							<td>联系电话：</td>
							<td>{merchantInfo.contactPhone}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={style.r_panel}>
				<div className={style.p_title}>关联垃圾桶</div>
				<Table columns={columns} dataSource={relatedTrash} 
				pagination={false} bordered={true}
				size="small" onRowClick={(record, index)=>{}}/>
			</div>
		</BottomRightPanel>
	)
}

Right.propTypes={}

export default Right;