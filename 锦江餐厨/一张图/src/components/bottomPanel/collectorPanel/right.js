import React from 'react'

import BottomRightPanel from '../bottomRightPanel'

import style from './right.less'

const Right = ({right_title,rules,relatedMerchs})=>{
	return (
		<BottomRightPanel right_title={right_title}>
			<div className={style.r_panel}>
				<div className={style.p_title}>收集规则</div>
				<table>
					<tbody>
						<tr>
							<td>时间段：</td>
							<td>{rules.timeSlot}</td>
						</tr>
						<tr>
							<td>周期：</td>
							<td>{rules.period}</td>
						</tr>
						<tr>
							<td>关联车辆：</td>
							<td>{rules.relatedCar}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={style.r_panel}>
				<div className={style.p_title}>关联商户</div>
				{relatedMerchs.join('、')}
			</div>
		</BottomRightPanel>
	)
}

Right.propTypes={}

export default Right;