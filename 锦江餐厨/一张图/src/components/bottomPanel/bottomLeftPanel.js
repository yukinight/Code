import React from 'react'
import style from './bottomLeftPanel.less'
const BottomLeftPanel = ({left_title,children})=>{
	return (
		<div className={style.container}>
			<div className={style.title_sec}>{left_title}</div>
			<div>{children}</div>
		</div>
	);
	
}

BottomLeftPanel.propTypes={}

export default BottomLeftPanel;