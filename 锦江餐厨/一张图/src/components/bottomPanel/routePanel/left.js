import React from 'react';
import { Progress } from 'antd';
import BottomLeftPanel from '../bottomLeftPanel'
import style from './left.less'

const Left = ({left_title, route})=>{
	const runPercent = !route.totalNum? 0:parseInt(100*route.haveCarNum/route.totalNum);
	const normalPercent = !route.totalNum? 0:parseInt(100*route.normalNum/route.totalNum)

	return (
		<BottomLeftPanel left_title={left_title}>
			<div className={style.r_panel}>
				<div className={style.p_title}>
					路线总数
					<span className={style.normal_span+' '+style.padding_left}>{route.totalNum}</span>
				</div>
		
				<div className={style.p_title}>
					有车路线
					<span className={style.normal_span}>/无车路线（</span>
					{route.haveCarNum}
					<span className={style.normal_span}>/{route.noCarNum}）</span>
				</div>
				<Progress percent={runPercent} showInfo={false} strokeWidth={15} 
				status="active" className={style.progress}/>

				<div className={style.p_title}>
					正常路线
					<span className={style.normal_span}>/异常路线（</span>
					{route.normalNum}
					<span className={style.normal_span}>/{route.abnormalNum}）</span>
				</div>
				<Progress percent={normalPercent} showInfo={false} strokeWidth={15} 
				status="active" className={style.progress}/>
			</div>
		</BottomLeftPanel>
	)
}

Left.propTypes = {}

export default Left;