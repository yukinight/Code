import React from 'react'
import style from './bottomRightPanel.less'
const BottomRightPanel = ({right_title,children})=>{
	return (
		<div className={style.container}>
			<div className={style.title_sec}>{right_title}</div>
			<div>{children}</div>
		</div>
	);
	
}

BottomRightPanel.propTypes={}

export default BottomRightPanel;