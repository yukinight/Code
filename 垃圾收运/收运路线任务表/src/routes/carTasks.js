import React, {Component, PropTypes} from 'react'
import dva, { connect } from 'dva';

import CarTable from '../components/table/carTable';
import ButtonPanel from '../components/table/buttonPanel';

import style from './carTasks.less'

function CarTasks({location, dispatch, carTable}){
	const {head,selectedItems,carlist} = carTable
	const carTableProps = {
    	...carTable,
    	dispatch
  	}

	return (
		<div className={style.leftpanel}>
			<CarTable {...carTableProps}/>
			<ButtonPanel {...carTableProps}/>
		</div>
	);
}

export default connect(({carTable})=> ({carTable}))(CarTasks)