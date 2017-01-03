import React from 'react'
import Left from './left'
import Mid from './mid'
import Right from './right'
import style from './collectorPanel.less'

const CollectorPanel = ({})=>{
	const collectorPanelConfig = {
		left_title:'总览',
		right_title:'详情',
		mid_title:'条目',
		color_dict : {
			'已收运': '#0A9B37',
			'未完全收运': '#FAC02D',
			'未收运': '#FF7143'
		},
	} 

	const leftProps = {
		left_title:collectorPanelConfig.left_title,
		color_dict: collectorPanelConfig.color_dict,
	}
	const midProps = {
		mid_title: collectorPanelConfig.mid_title,
		color_dict: collectorPanelConfig.color_dict,
	}
	const rightProps = {
		right_title: collectorPanelConfig.right_title,
	}

	return (
		<div>
			<Left {...leftProps}/>
			<Mid {...midProps}/>		
			<Right {...rightProps}/>		
		</div>
	)
}

CollectorPanel.propTypes={
}

export default CollectorPanel;