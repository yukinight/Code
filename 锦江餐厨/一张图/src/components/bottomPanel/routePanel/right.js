import React from 'react'
import { Button } from 'antd'
import BottomRightPanel from '../bottomRightPanel'

import style from './right.less'

const Right = ({right_title,spots, formulatePerson, formulateTime})=>{
	
	return (
		<BottomRightPanel right_title={right_title}>
			<div className={style.p_title}>
				<div className={style.div1_2}>制定人：
					<span className={style.normal_span}>{formulatePerson}</span>
				</div>
				<div className={style.div1_2}>制定时间：
					<span className={style.normal_span}>{formulateTime}</span>
				</div>
			</div>
			<Button type="primary">排班任务</Button>
			<div className={style.p_title}>关联收集点</div>
			<div className={style.spot_cont}>
				{
					spots.map((item,index)=>{
						return	<div key={index} className={style.spot_sec}>{item}</div>						
					})
				}
			</div>
		
		</BottomRightPanel>
	)
}

Right.propTypes={}

export default Right;