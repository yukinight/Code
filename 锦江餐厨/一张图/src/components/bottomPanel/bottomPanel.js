import React, { Component, PropTypes } from 'react'
import { Tabs } from 'antd';
import { connect } from 'dva'

import DataPanel from './dataPanel/dataPanel'
import CollectorPanel from './collectorPanel/collectorPanel'
import MerchantPanel from './merchantPanel/merchantPanel'
import CarPanel from './carPanel/carPanel'
import RoutePanel from './routePanel/routePanel'
import VideoPanel from './videoPanel/videoPanel'
import {imgLocation} from '../../utils/global'
import style from './bottomPanel.less'

const TabPane = Tabs.TabPane;

const BottomPanel = ({dispatch, show, areaOptions})=>{
	const collapseButton = <div onClick={()=>{
		dispatch({type:'bottomPanel/toggle'});
	}} style={{cursor:'pointer'}}><img src={imgLocation.arrow_down}></img></div>



	return (
	<div className={style.bottomPanel} >
		<Tabs type="card" key="tab" tabBarExtraContent={collapseButton}
		style={{display: show?'block':'none'}}>
			<TabPane tab="数据" key="1"><DataPanel /></TabPane>
			<TabPane tab="收集点" key="2"><CollectorPanel areaOptions={areaOptions}/></TabPane>
			<TabPane tab="商户" key="3"><MerchantPanel areaOptions={areaOptions}/></TabPane>
			<TabPane tab="车辆" key="4"><CarPanel areaOptions={areaOptions}/></TabPane>
			<TabPane tab="路线" key="5"><RoutePanel areaOptions={areaOptions}/></TabPane>
			<TabPane tab="视频点" key="6"><VideoPanel /></TabPane>
		</Tabs>
		
		{show ? null :
			<div key="icon" className={style.collapseIcon}
			onClick={()=>{
				dispatch({type:'bottomPanel/toggle'});
			}}><img src={imgLocation.arrow_up}></img></div>
		}

 	</div>
  	)
}

BottomPanel.propTypes={
}

export default connect(({bottomPanel})=>bottomPanel)(BottomPanel);