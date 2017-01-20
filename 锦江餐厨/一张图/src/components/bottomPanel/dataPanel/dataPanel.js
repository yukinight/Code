import React from 'react'
import { connect } from 'dva'
import Left from './left'
import Mid from './mid'
import Right from './right'
import style from './dataPanel.less'

const DataPanel = ({dispatch,tableData,collectQty,enterQty,thermodynamicCheck,
	areaCheck,chartCat,chartOption,chartLoading})=>{
	const DataPanelConfig = {
		left_title:'总览',
		right_title:'历史收运量',
		mid_title:'条目',
	} 

	const leftProps = {
		left_title:DataPanelConfig.left_title,
		collectQty,
		enterQty,
		thermodynamicCheck,
		areaCheck,
		dispatch
	}
	const midProps = {
		mid_title: DataPanelConfig.mid_title,
		tableData
	}
	const rightProps = {
		right_title: DataPanelConfig.right_title,
		chartCat,
		chartOption,
		chartLoading,
		dispatch,
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

export default connect(({dataPanel})=>dataPanel)(DataPanel);