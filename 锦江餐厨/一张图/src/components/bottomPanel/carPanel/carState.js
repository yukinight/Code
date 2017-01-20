import React from 'react';
import { Slider } from 'antd';
import style from './carState.less'

const CarState = ({dispatch,index,statusColor,driveStatus,syPointNum,collectedSyPointNum,
	carCode})=>{
	const percent = !syPointNum? 0: parseInt(100*collectedSyPointNum/syPointNum);
	const marks = {
		// 0: '0°C',
		// 26: '26°C',
		37: '6:30',
		// 100: {
		// style: {
		// 	color: '#f50',
		// },
		// label: <strong>100°C</strong>,
		// },
	};
	return (
		<li className={style.container_li} onClick={()=>{
			dispatch({type:'carPanel/setRightPanel',payload:{index}});
		}}>
			<div className={style.car_num_sec}>
				{carCode}
			</div>
			<div className={style.car_status_sec}>	
				<div style={{backgroundColor:statusColor[driveStatus] || '#333'}} 
				className={style.status_circle}>
					{driveStatus.split('')[0]}
				</div>			
			</div>
			<div className={style.car_time_list_sec}>
				<Slider  value={percent} disabled={false}
				tipFormatter={val=>`${val}%`}/>
			</div>
		</li>
	);	
}

CarState.propTypes = {}

export default CarState;