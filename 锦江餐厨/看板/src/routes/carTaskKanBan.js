import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Button, Spin } from 'antd';
import StatisticPanel from '../components/kanBan/statisticPanel';
import CarTask from '../components/kanBan/carTask';
import {imgLocation} from '../utils/config';
import style from './carTaskKanBan.less';


function CarTaskKanBan({dispatch, loading, today,average,car,carAll,collector,collectorAll,carList}) {
	const statisticPanelProps = {
		today,average,car,carAll,collector,collectorAll
	}
	const refresh = ()=>{
		dispatch({type:'carTaskKanBan/showLoading'});
		dispatch({type:'carTaskKanBan/refresh'});
	}
	return (
		<div className={style.wrapper}>
			<div className={style.ttct}>
				<div className={style.title}>车辆收运任务执行看板</div>
				<Button onClick={refresh}><img src={imgLocation.refresh} /></Button>
			</div>
			<Spin spinning={loading} tip="Loading..." size="large">
				<StatisticPanel {...statisticPanelProps}/>
				<div>
					{carList.map((item, index)=> <CarTask key={`cl${index}`}  {...item} />)}
				</div>
			</Spin>
		    
		</div>
	);
}

CarTaskKanBan.propTypes = {
	carList:React.PropTypes.array.isRequired,
};

export default connect(({carTaskKanBan})=>carTaskKanBan)(CarTaskKanBan);