import React from 'react'
import { connect } from 'dva'
import Left from './left'
import Mid from './mid'
import Right from './right'
import style from './routePanel.less'

const RoutePanel = ({dispatch, route, spots, formulatePerson, formulateTime,
tableData, searchText, areaOptions, areaFilter, scheduleOptions, scheduleFilter})=>{
	const routePanelConfig = {
		left_title:'总览',
		right_title:'详情',
		mid_title:'条目',
	} 

	const leftProps = {
		left_title:routePanelConfig.left_title,
		route
	}
	const midProps = {
		mid_title: routePanelConfig.mid_title,
		tableData, 
		searchText, 
		areaOptions, 
		areaFilter, 
		scheduleOptions, 
		scheduleFilter,
		dispatch
	}
	const rightProps = {
		right_title: routePanelConfig.right_title,
		spots, 
		formulatePerson, 
		formulateTime,
	}

	return (
		<div>
			<Left {...leftProps}/>
			<Mid {...midProps}/>		
			<Right {...rightProps}/>		
		</div>
	)
}

RoutePanel.propTypes={
}

export default connect(({routePanel})=>routePanel)(RoutePanel);