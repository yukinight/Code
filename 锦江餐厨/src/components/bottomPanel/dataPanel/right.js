import React from 'react'
import { Button } from 'antd';
import BottomRightPanel from '../bottomRightPanel'

import style from './right.less'

const Right = ({right_title})=>{
	return (
		<BottomRightPanel right_title={right_title}>
			<div className={style.chart_sec}></div>
			<div className={style.switch_button_sec}>
				<Button type="ghost">天</Button>
				<Button type="primary">周</Button>
				<Button type="ghost">月</Button>
				<Button type="ghost">季</Button>
				<Button type="ghost">年</Button>				
			</div>
		</BottomRightPanel>
	)
}

Right.propTypes={}

export default Right;