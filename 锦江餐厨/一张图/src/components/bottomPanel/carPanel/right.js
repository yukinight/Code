import React from 'react'
import { Progress,  Switch, Button} from 'antd'
import BottomRightPanel from '../bottomRightPanel'

import style from './right.less'

const Right = ({dispatch, right_title, statusColor, trackCar,carState,	
	currentPayload,	totalPayload })=>{
	const percent = !totalPayload? 0:parseInt(100*currentPayload/totalPayload);
	return (
		<BottomRightPanel right_title={right_title}>
			<div className={style.part}>
				<div className={`${style.div1_2} ${style.p1_dp}`}>
					跟踪车辆 &nbsp;
					<Switch checked={trackCar} onChange={(checked)=>{
						dispatch({type:'carPanel/setTrackCar', payload:{trackCar:checked}});
						
					}} />
				</div>
				<div className={`${style.div1_2} ${style.p1_dp}`}>
					<Button type="primary">排班任务</Button>
				</div>
			</div>
			<div className={style.part}>
				当前运载量/总运载量 （{currentPayload}/{totalPayload}T）
				<Progress className={style.part} 
				percent={percent} 
				showInfo={false} strokeWidth={18} status="active"/>
			</div>
			<div className={style.part}>
			状态: <span style={{color:statusColor[carState]||'#000'}}>{carState}</span>
			</div>
			<div className={style.part}>
				<div className={style.div1_2}>
					<Button type="primary">历史轨迹</Button>
				</div>
				<div className={style.div1_2}>
					<Button type="primary">查看视频</Button>
				</div>				
			</div>
		</BottomRightPanel>
	)
}

Right.propTypes={}

export default Right;