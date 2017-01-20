import React from 'react';
import { Progress } from 'antd';
import BottomLeftPanel from '../bottomLeftPanel'
import style from './left.less'

const Left = ({left_title,carQty})=>{
	const runPercent = carQty.totalCarNum==0? 0 : parseInt(100*carQty.runCarNum/carQty.totalCarNum);
	const normalPercent = carQty.workCarNum==0? 0 : parseInt(100*carQty.normalCarNum/carQty.workCarNum);
	
	return (
		<BottomLeftPanel left_title={left_title}>
			<div className={style.r_panel}>
				<div className={style.p_title}>
					运行车辆
					<span className={style.normal_span}>/车辆总数&nbsp;(</span>
					{carQty.runCarNum}
					<span className={style.normal_span}>/{carQty.totalCarNum})</span>
				</div>
				<Progress percent={runPercent} 
				showInfo={false} strokeWidth={15} status="active"/>
			</div>
			<div className={style.r_panel}>
				<div className={style.p_title}>
					正常车辆
					<span className={style.normal_span}>/工作车辆&nbsp;(</span>
					{carQty.normalCarNum}
					<span className={style.normal_span}>/{carQty.workCarNum})</span>
				</div>
				<Progress percent={normalPercent} 
				showInfo={false} strokeWidth={15} status="active"/>
			</div>
		</BottomLeftPanel>
	)
}

Left.propTypes = {}

export default Left;