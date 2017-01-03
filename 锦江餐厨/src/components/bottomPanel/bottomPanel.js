import React, { Component, PropTypes } from 'react'
import { Tabs } from 'antd';

import DataPanel from './dataPanel/dataPanel'
import CollectorPanel from './collectorPanel/collectorPanel'
import MerchantPanel from './merchantPanel/merchantPanel'

import style from './bottomPanel.less'

const TabPane = Tabs.TabPane;
const BottomPanel = ()=>{
	const props = {
		left_title:'总览',
		right_title:'详情',
		mid_title:'条目',
	}
	return (
	<div className={style.bottomPanel}>
	    <Tabs type="card">
			<TabPane tab="数据" key="1"><DataPanel /></TabPane>
			<TabPane tab="收集点" key="2"><CollectorPanel /></TabPane>
			<TabPane tab="商户" key="3"><MerchantPanel /></TabPane>
			<TabPane tab="车辆" key="4">Content of Tab Pane 3</TabPane>
			<TabPane tab="路线" key="5">Content of Tab Pane 3</TabPane>
			<TabPane tab="视频点" key="6">Content of Tab Pane 3</TabPane>
			<TabPane tab="异常事件" key="7">Content of Tab Pane 3</TabPane>
	    </Tabs>
  </div>)
}

BottomPanel.propTypes={
}

export default BottomPanel;