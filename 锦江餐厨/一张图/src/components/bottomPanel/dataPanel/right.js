import React from 'react'
import { Button } from 'antd';
import ReactEcharts from 'echarts-for-react'; 
import BottomRightPanel from '../bottomRightPanel'

import style from './right.less'

const Right = ({dispatch,right_title, chartCat, chartOption,chartLoading})=>{
	const buttonSwitch = (btType)=>{
		dispatch({type:'dataPanel/changeChartCat',payload:{chartCat:btType}});
	}
	
	return (	
		<BottomRightPanel right_title={right_title}>
			<div className={style.chart_sec}>
				{
					chartOption?
					<ReactEcharts 
				    option={chartOption} 
				    notMerge={true}
				    showLoading={chartLoading}
				    style={{height: '100%', width: '100%'}} />
				   	:null
				}
			</div>
			<div className={style.switch_button_sec}>
				<Button type={chartCat==='week'? "primary": "ghost"} onClick={()=>{
					buttonSwitch('week');
				}}>周</Button>
				<Button type={chartCat==='month'? "primary": "ghost"} onClick={()=>{
					buttonSwitch('month');
				}}>月</Button>
				<Button type={chartCat==='season'? "primary": "ghost"} onClick={()=>{
					buttonSwitch('season');
				}}>季</Button>
				<Button type={chartCat==='year'? "primary": "ghost"} onClick={()=>{
					buttonSwitch('year');
				}}>年</Button>			
			</div>
		</BottomRightPanel>
	)
}

Right.propTypes={}

export default Right;