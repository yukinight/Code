import React from 'react';
import style from './carRow.less'
import DraggableList from './draggableList'

const CarRow = ({selected, editable, mode, send, taskNum,
taskInfo, carInfo, collectionSpots, dispatch, rowIndex}) =>{
	const selectRow = (rowIndex)=>{
		dispatch({type:'carTable/taskSelect',payload:{rowIndex}});
	}
	const carSpotsDisplay = ()=>{
		return collectionSpots.map((spot, spotIndex)=>{
			if(spotIndex===collectionSpots.length-1){
				return <span>{spotIndex+1}. {spot.val}</span>;
			}
			else{
				return <span>{spotIndex+1}. {spot.val} - </span>;
			}
		})
	}
	const carSpotsEdit = ()=>{
		let draggableListProps = {collectionSpots, dispatch, rowIndex};
		return (
			<DraggableList {...draggableListProps}/>
		)
	}
	return (
		<tr>
			<td><div className={style.tddiv1}>
				{taskNum}
				<br/>
				<div className={send?"sent":"unsent"}></div>
				<br/>
				<i className={"iconfont"+" "+(selected?style.tick_checked:style.tick_unchecked)} onClick={()=> {selectRow(rowIndex)}}>&#xe664;</i>
			</div></td>
			<td><div className={style.tddiv2}>
				<ul>
					<li><i className={"iconfont icon-rightmargin"}>&#xe637;</i>{carInfo.carType}</li>
					<li><i className={"iconfont icon-rightmargin"}>&#x3443;</i>{carInfo.driver}</li>
					<li><i className={"iconfont icon-rightmargin"}>&#xe603;</i>{carInfo.phone}</li>
					<li><i className={"iconfont icon-rightmargin"}>&#xe6ff;</i>{carInfo.carNum}</li>
				</ul>
			</div></td>
			<td><div className={style.tddiv3}>
			{mode==='edit'? carSpotsEdit({collectionSpots,dispatch,rowIndex}):carSpotsDisplay({collectionSpots})}
			</div></td>
			<td><div className={style.tddiv4}>
				<ul>
					<li>
						里程 <span>{taskInfo.miles} km</span>
					</li>
					<li>
						产量 <span>{taskInfo.production} t</span>
					</li>
					<li>
						耗时 <span>{taskInfo.time} h</span>
					</li>
					<li>
						点数 <span>{taskInfo.amount} 个</span>
					</li>
				</ul>
			</div></td>
		</tr>
	)
}

CarRow.propTypes = {
}

export default CarRow