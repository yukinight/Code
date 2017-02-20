import React from 'react';
import { Link } from 'dva/router';
import {Progress} from 'antd';
import StateList from './stateList';
import {imgLocation} from '../../utils/config';
import style from './carTask.less';

const CarTask = ({carId,taskId,carCode,routeName,syStartTime,syEndTime,speed,oilCost,
		taskStatus,transMiles, curMiles, avgWeight, curWeight, avgDuration,curDuration, 
        syPointNum,ysPointNum,syPointDtoList})=>{
	const carStatusDic = {
		0:{text:'正常', bgColor:'#0CBF01'},
		1:{text:'异常', bgColor: '#DD5044'}
	}
	const percent = syPointNum ? Math.round(100*ysPointNum/syPointNum) : 0;
	return (
		<div className={style.wrapper}>
			<div className={style.left_sec}>
				<ul>
					<li className={style.carbg}>{carCode}</li>
					<li className={style.routebg}>{routeName}</li>
					<li className={style.timebg}>{syStartTime} ~ {syEndTime}</li>
					<li>时速：{speed}km/h&nbsp;&nbsp;&nbsp;油耗：{oilCost}km/L</li>
					<li>
						<div className={style.carState} style={{backgroundColor:carStatusDic[taskStatus].bgColor}}>
							{carStatusDic[taskStatus].text}
						</div>
					</li>
				</ul>
			</div>
			<div className={style.percent_sec}>
				<Progress  type="circle" strokeWidth={12} percent={percent} width={80} status="active" />
			</div>
			<div className={style.right_sec}>
				<table style={{width:'100%'}}>
					<tbody>
						<tr>
							<td>里程</td>
							<td>{transMiles}/{curMiles} km</td>
						</tr>
						<tr>
							<td>产量</td>
							<td>{avgWeight}/{curWeight} t</td>
						</tr>
						<tr>
							<td>耗时</td>
							<td>{avgDuration}/{curDuration} h</td>
						</tr>
						<tr>
							<td>点数</td>
							<td>{syPointNum}/{ysPointNum}</td>
						</tr>
					</tbody>
				</table>
				<div>
					<a href='javascript:void(0)' style={{marginRight:'20px'}}>查看地图</a>
					<Link to={`/${carId}/${taskId}`}>详情</Link>
					{
						// <a href='http://192.168.1.162:8080/cloud/cc/kanban/detail.jhtml'>详情</a>
					}
				</div>
			</div>
			<div className={style.task_sec}>
				<StateList syPointDtoList={syPointDtoList}/>
			</div>
			
		</div>
	)
}

CarTask.propTypes={}

export default CarTask;