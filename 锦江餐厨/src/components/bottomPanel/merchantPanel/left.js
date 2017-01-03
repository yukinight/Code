import React from 'react';
import { Tag, Progress } from 'antd';
import BottomLeftPanel from '../bottomLeftPanel'
import style from './left.less'

const Left = ({left_title,color_dict})=>{


	return (
		<BottomLeftPanel left_title={left_title}>
			<div className={style.r_panel}>
				<div className={style.p_title}>商户收运情况：</div>
				<table className={style.dsp_table}>
					<tbody>
						<tr>
							<td>已收运</td>
							<td>未完全收运</td>
							<td>未收运</td>
						</tr>
						<tr>
							<td>
								<Tag color={color_dict['已收运']}>{56}</Tag>
							</td>
							<td>
								<Tag color={color_dict['未完全收运']}>{20}</Tag>
							</td>
							<td>
								<Tag color={color_dict['未收运']}>{70}</Tag>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={style.r_panel}>
				<div className={style.p_title}>
					垃圾收运情况：
					<span style={{color:'#000'}}>(</span>
						{50}
					<span style={{color:'#000'}}>/{300})</span>
				</div>
				<Progress percent={30} showInfo={false} strokeWidth={15} status="active"/>
			</div>
		</BottomLeftPanel>
	)
}

Left.propTypes = {}

export default Left;