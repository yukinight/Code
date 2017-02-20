import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Button, Spin } from 'antd';
import ReactEcharts from 'echarts-for-react'; 
import SlideStateList from '../components/kanBan/slideStateList';
import {imgLocation} from '../utils/config';
import style from './taskDetail.less';

const CusPanel = ({children,title,className=''})=>{
	return (
		<div className={`${style.cp} ${className}`} >
			<div className={style.ptt}>{title}</div>	
			<div>
				{
					children
				}
			</div>
		</div>
	)
}

function TaskDetail({dispatch,loading,basicInfo,carState,chartLoading,chartOption,
	gcState}) {
	const refresh = ()=>{
		dispatch({type:'taskDetail/refresh'});
	}

	const slideStateListProps = {
		syPointDtoList: gcState.syPointDtoList,
		dispatch
	}
	return (
		<div className={style.wrapper}>
			<div className={style.ttct}>
				<div className={style.title}>{basicInfo.carCode}&nbsp;&nbsp; 任务执行情况</div>
				<Button onClick={refresh}><img src={imgLocation.refresh} /></Button>
			</div>
			<Spin spinning={loading} tip="Loading..." size="large">
				<div className={style.toppt}>
					<div className={style.half_left}>
						<CusPanel title="基础信息" >
							<div className={style.basicContent}>
								<div className={style.inlb}>驾驶员：{basicInfo.driver}</div>
								<div className={style.inlb}>车型：{basicInfo.carType}</div>
								<div className={style.inlb}>最高载重：{basicInfo.maxWeight}</div>
								<br/>
								<div className={style.inlb}>驾驶员手机号：{basicInfo.driverPhone}</div>
								<div className={style.inlb}>车载设备号码：{basicInfo.deviceCode}</div>
							</div>
						</CusPanel>
						<CusPanel title="车辆状态" className={style.mg_top}>
							<div className={style.carContent}>
								<div className={style.inlb}>今日里程：{carState.todayMiles}km</div>
								<div className={style.inlb}>今日行驶时间：{carState.driveDuration}h</div>
								<div className={style.inlb}>当前速度：{carState.curSpeed}km/h</div>
								<br/>
								<div className={style.inlb}>设备状态：{carState.equipmentStatus}</div>
								<div className={style.inlb}>油耗情况：{carState.oilInfo}km/L</div>
							</div>
						</CusPanel>
					</div>
					<div className={style.half_right}>
						<CusPanel title="历史收运情况" >
							<div className={style.historyContent}>
								<div className={style.chart_sec}>
									{
										chartOption?
										<ReactEcharts 
									    option={chartOption} 
									    notMerge={true}
									    showLoading={chartLoading}
									    style={{height: '190px', width: '100%'}} />
									   	:null
									}
								</div>
							</div>
						</CusPanel>
					</div>
				</div>
				<CusPanel title="收运状态" className={style.mg_top}>
					<div className={style.collectContent}>
						<div className={style.collectBar}>
							<div className={`${style.barlb} ${style.routeBg}`}>收运路线：{gcState.routeName}</div>
							<div className={`${style.barlb} ${style.timeBg}`}>预设收运时间：{gcState.syStartTime} ~ {gcState.syEndTime}</div>
							<div className={style.barlb}>今日收运量：{gcState.curWeight}T</div>
							<div className={style.barlb}>已收运收集点数：{gcState.ysPointNum}/{gcState.syPointNum}</div>
							<div className={style.barlb}>今日异常数：<a className={style.abnmlk} href="">0</a></div>
						</div>
						<div id="slct">
							<SlideStateList {...slideStateListProps}/>
						</div>
					</div>
				</CusPanel>
			</Spin>
		</div>
	);
}

TaskDetail.propTypes = {
	
};

export default connect(({taskDetail})=>taskDetail)(TaskDetail);