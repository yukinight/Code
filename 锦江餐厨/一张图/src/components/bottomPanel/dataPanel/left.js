import React from 'react';
import { Switch} from 'antd';
import BottomLeftPanel from '../bottomLeftPanel'
import style from './left.less'

const Left = ({left_title,collectQty,enterQty,thermodynamicCheck,areaCheck,
		dispatch})=>{
	return (
		<BottomLeftPanel left_title={left_title}>
			<div className={style.info_sec}>
				<div className={style.half_panel}>
					<div className={style.circle_div}>{collectQty.today}T</div>
					<div className={style.lb_div}>今日收运总量</div>
					<div className={style.lb_div}>平均: {collectQty.average}T</div>
				</div>
				<div className={style.half_panel+ ' '+ style.border_split_left}>
					<div className={style.circle_div}>{enterQty.today}T</div>
					<div className={style.lb_div}>今日进场总量</div>
					<div className={style.lb_div}>平均: {enterQty.average}T</div>
				</div>
			</div>
			<div className={style.bottom_switch_sec}>
				<div className={style.half_panel}>
					热力图:&nbsp;&nbsp;
					<Switch checked={thermodynamicCheck} onChange={(checked)=>{
						dispatch({type:'dataPanel/changeThermodynamicCheck',
							payload:{thermodynamicCheck:checked}});
					}} />
				</div>
				<div className={style.half_panel}>
					区域图:&nbsp;&nbsp;
					<Switch checked={areaCheck} onChange={(checked)=>{
						dispatch({type:'dataPanel/changeAreaCheck',
							payload:{areaCheck:checked}});
					}} />
				</div>
			</div>
		</BottomLeftPanel>
	)
}

Left.propTypes = {}

export default Left;