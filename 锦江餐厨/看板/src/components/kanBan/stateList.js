import React from 'react';

import style from './stateList.less';

const StateList = ({syPointDtoList})=>{
	const spot_num = syPointDtoList.length;
	const lineClsName = (index)=>{
		if(index===spot_num-1)
			return `${style.lidiv}`;
		else
			return `${style.lidiv} ${style.line_ok}`;
	}
	const spotClsName = (state)=>{
		if(state===0)
			return `${style.spot_div} ${style.spot_ok}`;
		else
			return `${style.spot_div} ${style.spot_not}`;		
	}
	return (
		<div className={style.wrapper}>
			<ul className={style.ctul}>
				{syPointDtoList.map((item, index)=>{
					return <li className={lineClsName(index)} key={'spt'+index}>
						<div className={spotClsName(item.collectStatus)}>
							<div className={style.time_div} title={item.areaName}>{item.collectTime}</div>
						</div>
					</li>
				})}
			</ul>
		</div>
	);

}

StateList.propTypes = {}

export default StateList;