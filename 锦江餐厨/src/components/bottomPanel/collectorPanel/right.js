import React from 'react'

import BottomRightPanel from '../bottomRightPanel'

import style from './right.less'

const Right = ({right_title})=>{
	return (
		<BottomRightPanel right_title={right_title}>
			<div className={style.r_panel}>
				<div className={style.p_title}>收集规则</div>
				<table>
					<tbody>
						<tr>
							<td>时间段：</td>
							<td>5AM ~ 5PM</td>
						</tr>
						<tr>
							<td>周期：</td>
							<td>2天</td>
						</tr>
						<tr>
							<td>关联车辆：</td>
							<td>苏A11111</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={style.r_panel}>
				<div className={style.p_title}>关联商户</div>
				{['A商户','B商户','C商户']}
			</div>
		</BottomRightPanel>
	)
}

Right.propTypes={}

export default Right;