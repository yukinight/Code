import React from 'react'
import Left from './left'
import Mid from './mid'
import Right from './right'
import style from './merchantPanel.less'

const MerchantPanel = ({})=>{
	const merchantPanelConfig = {
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
		left_title:merchantPanelConfig.left_title,
		color_dict: merchantPanelConfig.color_dict,
	}
	const midProps = {
		mid_title: merchantPanelConfig.mid_title,
		color_dict: merchantPanelConfig.color_dict,
	}
	const rightProps = {
		right_title: merchantPanelConfig.right_title,
	}

	return (
		<div>
			<Left {...leftProps}/>
			<Mid {...midProps}/>		
			<Right {...rightProps}/>		
		</div>
	)
}

MerchantPanel.propTypes={
}

export default MerchantPanel;