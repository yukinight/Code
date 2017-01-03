import React from 'react';
import { Switch} from 'antd';
import BottomLeftPanel from '../bottomLeftPanel'
import style from './left.less'

const Left = ({left_title})=>{
	return (
		<BottomLeftPanel left_title={left_title}>
			<div className={style.info_sec}>
				<div className={style.half_panel}>
					<div className={style.circle_div}>5.5T</div>
					<div className={style.lb_div}>今日收运总量</div>
					<div className={style.lb_div}>平均: 60.8T</div>
				</div>
				<div className={style.half_panel+ ' '+ style.border_split_left}>
					<div className={style.circle_div}>5.5T</div>
					<div className={style.lb_div}>今日进场总量</div>
					<div className={style.lb_div}>平均: 60.8T</div>
				</div>
			</div>
			<div className={style.bottom_switch_sec}>
				<div className={style.half_panel}>
					热力图:&nbsp;&nbsp;
					<Switch defaultChecked={false} onChange={()=>{}} />
				</div>
				<div className={style.half_panel}>
					区域图:&nbsp;&nbsp;
					<Switch defaultChecked={false} onChange={()=>{}} />
				</div>
			</div>
		</BottomLeftPanel>
	)
}

Left.propTypes = {}

export default Left;