import React from 'react';
import style from './carTable.less'
import CarRow from './carRow'

const CarTable = ({head, selectedItems, carlist,dispatch}) => {
	
	return (
	<div className={style.tablepanel}>
		<div className={style.tbheadpanel}>
			<table>
				<thead>
					<tr>
					{
						head.map((item, index)=>{
							switch(index){
								case 0: return <th><div className={style.thdiv1}>{item}</div></th>;break;
								case 1: return <th><div className={style.thdiv2}>{item}</div></th>;break;
								case 2: return <th><div className={style.thdiv3}>{item}</div></th>;break;
								case 3: return <th><div className={style.thdiv4}>{item}</div></th>;break; 
							}
						})
					}
					</tr>
				</thead>
			</table>
		</div>
		<div className={style.tbbodypanel}>
			<table>
				<tbody>
				{
					carlist.map((item,rowIndex)=>{
						const carRowProps = {
							...item, 
							dispatch,
							rowIndex
						}
						return <CarRow {...carRowProps}/>
					})
				}	
				</tbody>
			</table>
		</div>
	</div>
	);
};

CarTable.propTypes = {
};

export default CarTable;