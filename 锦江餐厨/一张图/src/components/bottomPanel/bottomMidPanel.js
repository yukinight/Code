import React from 'react'
import style from './bottomMidPanel.less'
const BottomMidPanel = ({mid_title,children})=>{
	return (
		<div className={style.container}>
			<div className={style.title_sec}>{mid_title}</div>
			<div>{children}</div>
		</div>
	);
	
}

BottomMidPanel.propTypes={}

export default BottomMidPanel;