import React from 'react'
import { Button} from 'antd';

import BottomRightPanel from '../bottomRightPanel'

import style from './right.less'

const Right = ({right_title})=>{
	return (
		<BottomRightPanel right_title={right_title}>
			<Button className={style.viewHisBt} type="primary" onClick={()=>{}}>查看历史录像</Button>
		</BottomRightPanel>
	)
}

Right.propTypes={}

export default Right;