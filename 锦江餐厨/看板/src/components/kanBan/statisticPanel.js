import React from 'react';
import {Progress} from 'antd';
import style from './statisticPanel.less';

const StatisticPanel = ({today,average,car,carAll,collector,collectorAll})=>{
	let averagePercent,todayPercent;
	if(today===0||average===0){
		averagePercent = average===0?0:100;
		todayPercent = today===0?0:100;
	}
	else if(average>=today){
		averagePercent = 100;
		todayPercent = 100*today/average;
	}
	else{
		averagePercent = 100*average/today;
		todayPercent = 100;
	}
	const carPercent = carAll===0 ? 0:100*car/carAll;
	const collectorPercent = collectorAll===0 ? 0 :100*collector/collectorAll;
	return (
		<div className={style.container}>
			<div className={style.child_area3_1}>
				<div className={style.tbdp}>
					<div className={style.barlb}>今日垃圾收运量</div>
					<div><Progress percent={todayPercent} status="active" format={()=>{return today+'t'}}/></div>
				</div>
				<div className={style.tbdp}>
					<div className={style.barlb}>平均垃圾收运量</div>
					<div><Progress percent={averagePercent} status="active" format={()=>{return average+'t'}}/></div>
				</div>
			</div>
			<div className={style.child_area3_1}>
			车辆汇总情况：（{car}/{carAll}）
				<Progress percent={carPercent} strokeWidth={15} showInfo={false} status="active" />
			</div>
			<div className={style.child_area3_1}>
			收集点汇总情况：（{collector}/{collectorAll}）
				<Progress percent={collectorPercent} strokeWidth={15} showInfo={false} status="active" />
			</div>
		</div>
	)
}

StatisticPanel.propTypes={
	today:React.PropTypes.number.isRequired,
	average:React.PropTypes.number.isRequired,
	car:React.PropTypes.number.isRequired,
	carAll:React.PropTypes.number.isRequired,
	collector:React.PropTypes.number.isRequired,
	collectorAll:React.PropTypes.number.isRequired,
}

export default StatisticPanel;