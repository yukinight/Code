import React from 'react'
import Left from './left'
import Mid from './mid'
import Right from './right'
import style from './dataPanel.less'

const DataPanel = ({})=>{
	const DataPanelConfig = {
		left_title:'总览',
		right_title:'历史收运量',
		mid_title:'条目',
	} 

	const leftProps = {
		left_title:DataPanelConfig.left_title,
	}
	const midProps = {
		mid_title: DataPanelConfig.mid_title,
	}
	const rightProps = {
		right_title: DataPanelConfig.right_title,
	}

	return (
		<div>
			<Left {...leftProps}/>
			<Mid {...midProps}/>		
			<Right {...rightProps}/>		
		</div>
	)
}

DataPanel.propTypes={
}

export default DataPanel;