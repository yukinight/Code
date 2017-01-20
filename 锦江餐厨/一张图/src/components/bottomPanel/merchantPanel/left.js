import React from 'react';
import { Tag, Progress } from 'antd';
import BottomLeftPanel from '../bottomLeftPanel'
import style from './left.less'

const Left = ({left_title,color_dict,merchantQty})=>{
	const merchantTotal = merchantQty.collectedNum+merchantQty.uncollectedNum;

	return (
		<BottomLeftPanel left_title={left_title}>
			<div className={style.r_panel}>
				<div className={style.p_title}>商户收运情况：</div>
				<table className={style.dsp_table}>
					<tbody>
						<tr>
							<td>已收运</td>
							<td>未收运</td>
						</tr>
						<tr>
							<td>
								<Tag color={color_dict['已收运']}>{merchantQty.collectedNum}</Tag>
							</td>
							<td>
								<Tag color={color_dict['未收运']}>{merchantQty.uncollectedNum}</Tag>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={style.r_panel}>
				<div className={style.p_title}>
					垃圾收运情况：
					<span style={{color:'#000'}}>(</span>
						{merchantQty.collectedNum}
					<span style={{color:'#000'}}>/{merchantTotal})</span>
				</div>
				<Progress percent={merchantTotal==0? merchantTotal: parseInt(100*merchantQty.collectedNum/merchantTotal)} 
				showInfo={false} strokeWidth={15} status="active"/>
			</div>
		</BottomLeftPanel>
	)
}

Left.propTypes = {}

export default Left;