import React from 'react';
import { Tag, Button } from 'antd';
import BottomLeftPanel from '../bottomLeftPanel'
import style from './left.less'

const Left = ({left_title, statusColor, cameraNum})=>{
	// let totalCamera = 0;
	// for(let k in cameraNum){
	// 	totalCamera += cameraNum[k];
	// }

	return (
		<BottomLeftPanel left_title={left_title}>
			<div className={style.r_panel}>
				<div className={style.p_title}>
					摄像头总数：
					<span className={style.normarl_span}>
						{cameraNum.totalNum}
					</span>
				</div>
				<table className={style.dsp_table}>
					<tbody>
						<tr>
							<td>车载</td>
							<td>商户</td>
							<td>厂区</td>
						</tr>
						<tr>
							<td>
								<Tag color={statusColor.car}>{cameraNum.vehicleNum}</Tag>
							</td>
							<td>
								<Tag color={statusColor.merchant}>{cameraNum.restaurantNum}</Tag>
							</td>
							<td>
								<Tag color={statusColor.factory}>{cameraNum.factoryNum}</Tag>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={style.r_panel}>
				<Button type="primary" className={style.margin_top}>厂区视频点</Button>
			</div>
		</BottomLeftPanel>
	)
}

Left.propTypes = {}

export default Left;