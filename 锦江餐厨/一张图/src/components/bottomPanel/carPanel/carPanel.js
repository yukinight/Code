import React from 'react'
import { connect } from 'dva'
import Left from './left'
import Mid from './mid'
import Right from './right'
import style from './carPanel.less'

const CarPanel = ({dispatch, carQty,trackCar,carState,currentPayload,totalPayload,
	carStatus,searchText,areaOptions,areaFilter,stateOptions,stateFilter})=>{
	const carPanelConfig = {
		left_title:'总览',
		right_title:'详情',
		mid_title:'条目',
		statusColor : {
			'正常': '#0A9B37',
			'异常': '#FAC02D',
		},
	} 

	const leftProps = {
		left_title:carPanelConfig.left_title,
		carQty
	}
	const midProps = {
		mid_title: carPanelConfig.mid_title,
		statusColor: carPanelConfig.statusColor,
		carStatus,
		searchText,
		areaOptions,
		areaFilter,
		stateOptions,
		stateFilter,
		dispatch
	}
	const rightProps = {
		right_title: carPanelConfig.right_title,
		statusColor: carPanelConfig.statusColor,
		trackCar,
		carState,
		currentPayload,
		totalPayload,
		dispatch
	}

	return (
		<div>
			<Left {...leftProps}/>
			<Mid {...midProps}/>		
			<Right {...rightProps}/>		
		</div>
	)
}

CarPanel.propTypes={
}

export default connect(({carPanel})=>carPanel)(CarPanel);