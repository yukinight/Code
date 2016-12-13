import React from 'react';
import style from './draggableList.less'

const DraggableList = ({rowIndex, dispatch, collectionSpots})=>{
	const deleteSpot = ({rowIndex,spotIndex})=>{
		dispatch({type:'carTable/deleteSpot',payload:{rowIndex, spotIndex}});
	}
	const updateSpot = ({rowIndex, spotsList})=>{
		dispatch({type:'carTable/updateSpot',payload:{rowIndex, spotsList}});
	}
	const dragStart = ({e,spotIndex,rowIndex})=>{
		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text",rowIndex+ '|' +spotIndex);
	}
	const dragOver = ({e,spotIndex,rowIndex})=>{
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
		dispatch({type:'carTable/moveIn',payload:{spotIndex,rowIndex }});
	}
	const dropOnli = ({e,spotIndex,rowIndex})=>{
		e.preventDefault();
		dispatch({type:'carTable/moveOut',payload:{spotIndex,rowIndex}});

		let current_rec = e.target.getBoundingClientRect();
		let [oldRowIndex, oldSpotIndex] = e.dataTransfer.getData("text").split('|').map((x)=>parseInt(x));
		let newRowIndex = rowIndex;
		// 判断插入当前位置前或后
		let newSpotIndex = e.clientX < current_rec.left+(current_rec.right-current_rec.left)/2 ? spotIndex : spotIndex+1;
		// console.log('move from '+oldSpotIndex+' to '+ newSpotIndex);
		dispatch({type:'carTable/moveSpot',payload:{oldSpotIndex,oldRowIndex,newSpotIndex,newRowIndex }});
		return false;
	}
	const dropOnul = ({e,rowIndex})=>{
		e.preventDefault();
		let newRowIndex = rowIndex;
		let newSpotIndex = 0;
		let [oldRowIndex, oldSpotIndex] = e.dataTransfer.getData("text").split('|').map((x)=>parseInt(x));
		dispatch({type:'carTable/moveSpot',payload:{oldSpotIndex,oldRowIndex,newSpotIndex,newRowIndex }});
	}
	const dragEnter = ({e,spotIndex,rowIndex})=>{
		// console.log('in', e.target)
		dispatch({type:'carTable/moveIn',payload:{spotIndex,rowIndex}});
	}
	const dragLeave = ({e,spotIndex,rowIndex})=>{
		// console.log('out',e.target)
		dispatch({type:'carTable/moveOut',payload:{spotIndex,rowIndex}});
	}

	const liGroup = collectionSpots.map((spot,spotIndex)=>{
		return (
			<li className={style.spot_li + " "+ (spot.moveIn ? style.move_in : "")} draggable="true" onDragStart={e=>{dragStart({e,spotIndex,rowIndex})}} 
			onDragOver={e=>dragOver({e,spotIndex,rowIndex})} onDrop={e=>dropOnli({e,spotIndex,rowIndex})} onDragLeave={e=>dragLeave({e,spotIndex,rowIndex})}
			onDragEnter={e=>dragEnter({e,spotIndex,rowIndex})}>
				 {spotIndex+1}. {spot.val} 
				<i className={"iconfont "+style.delSpot}  onClick={()=>{deleteSpot({rowIndex,spotIndex})}}>&#xe67d;</i>
			</li>
		)
	})
	// {collectionSpots.length===0 ? onDrop={e=>dropOnul({e,rowIndex})} : ''}
	// console.log(collectionSpots.length)

	if(collectionSpots.length===0){
		return (
			<ul className={style.spotContainer} onDrop={e=>dropOnul({e,rowIndex})} 
			onDragOver={e=>{e.preventDefault();e.dataTransfer.dropEffect = 'move';}}>
			{liGroup}
			</ul>
		)
	}
	else{
		return (
			<ul className={style.spotContainer} >
			{liGroup}
			</ul>
		)
	}
	
}

DraggableList.propTypes = {
}

export default DraggableList;