import React from 'react';
import { Tag, Progress } from 'antd';
import BottomLeftPanel from '../bottomLeftPanel'
import style from './left.less'

const Left = ({left_title,color_dict,collectorQty})=>{
	const collectorTotal = collectorQty.collectedNum+collectorQty.partCollectedNum+collectorQty.uncollectedNum;

	return (
		<BottomLeftPanel left_title={left_title}>
			<div className={style.r_panel}>
				<div className={style.p_title}>收集点情况：</div>
				<table className={style.dsp_table}>
					<tbody>
						<tr>
							<td>已收运</td>
							<td>未完全收运</td>
							<td>未收运</td>
						</tr>
						<tr>
							<td>
								<Tag color={color_dict['已收运']}>{collectorQty.collectedNum}</Tag>
							</td>
							<td>
								<Tag color={color_dict['未完全收运']}>{collectorQty.partCollectedNum}</Tag>
							</td>
							<td>
								<Tag color={color_dict['未收运']}>{collectorQty.uncollectedNum}</Tag>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			
			<div className={style.r_panel}>
				<div className={style.p_title}>
					垃圾收运情况：
					<span style={{color:'#000'}}>(</span>
						{collectorQty.collectedNum}
					<span style={{color:'#000'}}>/{collectorTotal})</span>
				</div>
				<Progress percent={collectorTotal==0? collectorTotal: parseInt(100*collectorQty.collectedNum/collectorTotal)} 
				showInfo={false} strokeWidth={15} status="active"/>
			</div>
			
		</BottomLeftPanel>
	)
}

Left.propTypes = {}

export default Left;