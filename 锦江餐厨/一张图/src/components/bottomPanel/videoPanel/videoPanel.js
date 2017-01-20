import React from 'react'
import { connect } from 'dva';
import Left from './left'
import Mid from './mid'
import Right from './right'
import style from './videoPanel.less'

const VideoPanel = ({cameraNum, tableData, searchtext, typeOptions, typeFilter, dispatch})=>{
	const videoPanelConfig = {
		left_title:'总览',
		right_title:'详情',
		mid_title:'条目',
		statusColor : {
			car: '#0A9B37',
			merchant: '#FAC02D',
			factory: '#FF7143'
		},
	} 

	const leftProps = {
		left_title:videoPanelConfig.left_title,
		statusColor: videoPanelConfig.statusColor,
		cameraNum,
	}
	const midProps = {
		mid_title: videoPanelConfig.mid_title,
		tableData,
		searchtext, 
		typeOptions, 
		typeFilter,
		dispatch
	}
	const rightProps = {
		right_title: videoPanelConfig.right_title,
	}

	return (
		<div>
			<Left {...leftProps}/>
			<Mid {...midProps}/>		
			<Right {...rightProps}/>		
		</div>
	)
}

VideoPanel.propTypes={
}

export default connect(({videoPanel})=>(videoPanel))(VideoPanel);