import React from 'react'
import WeUI from 'react-weui';
import 'weui';
import style from './merchCard.less'

const {FormCell, CellHeader, Checkbox, CellBody, CellFooter, Button, Dialog} = WeUI;

const MerchCard = ({orderIndex, name, picSrc, subName, price, qty, selected, dispatch, showConfirm})=>{
	const qtyAdd = (e)=>{
		e.preventDefault();
		e.stopPropagation();
		dispatch({type:'shoppingCartD/addQty',payload:{orderIndex}});
		if(selected){
			dispatch({type:'shoppingCartD/sumTotal'});
		}
	}
	const qtyMinus = (e)=>{
		e.preventDefault();
		e.stopPropagation();
		dispatch({type:'shoppingCartD/minusQty',payload:{orderIndex}});
		if(selected){
			dispatch({type:'shoppingCartD/sumTotal'});
		}
	}
	const changeQty = (e)=>{
		dispatch({type:'shoppingCartD/changeQTY',payload:{orderIndex,changedQty:e.target.value}});
	}
	const qtyValid = (e)=>{
		dispatch({type:'shoppingCartD/qtyValid', payload:{orderIndex, changedQty:e.target.value}});
		if(selected){
			dispatch({type:'shoppingCartD/sumTotal'});
		}
	}
	const selectProd = (e)=>{
		dispatch({type:'shoppingCartD/selectProd',payload:{orderIndex}});
		dispatch({type:'shoppingCartD/sumTotal'});
	}
	const showConfirmBox = ()=>{
		dispatch({type:'shoppingCartD/showConfirm',payload:{orderIndex}});
	}
	const removeProd = ()=>{
		dispatch({type:'shoppingCartD/removeProd',payload:{orderIndex}});
		if(selected){
			dispatch({type:'shoppingCartD/sumTotal'});
		}

		// dispatch({type:'shoppingCartD/sendRemoveProd',payload:{orderIndex}});
	}
	return (
		<div>
			<FormCell checkbox>
	    	        <CellHeader>
	    	        	<Checkbox checked={selected} onChange={selectProd}/>        		
	    	        </CellHeader>
	    	        <CellBody>
	    	        	<div className={style.picSec}>
	        	        	<img src={picSrc} alt=""/>
	        	        </div>
	        	        <div className={style.infoSec}>
	        	        	<div className={style.bodyPanel}>
	        	        		{name}
	        	        		<div className={style.subTitle}>{subName}</div>
	        	        	</div>
	        	        	<div className={style.bottomPanel}>
	        	        		<div className={style.price}>¥{price}</div>
	        	        		<div className={style.qty}>
	        	        			<span onClick={qtyMinus}>-</span>
	        	        			<input type="text" value={qty}  className={style.qtyInput} onChange={changeQty} onBlur={qtyValid}/>
	        	        			<span onClick={qtyAdd}>+</span>
	        	        		</div>
	        	        		<div className={style.remove}>
	        	        			 <Button type="warn" size="small" style={{fontSize:'12px',padding:'0 0.5em'}} onClick={showConfirmBox}>删除</Button>
	        	        		</div>
	        	        	</div>
	        	        </div>        	        
	    	        </CellBody>
	    	</FormCell>
	    	<Dialog.Confirm 
	    	    buttons={[
	    	        {
	    	            type: 'default',
	    	            label: '取消',
	    	            onClick: ()=>{
	    	            	dispatch({type:'shoppingCartD/hideConfirm',payload:{orderIndex}});
	    	            }
	    	        },
	    	        {
	    	            type: 'primary',
	    	            label: '确认',
	    	            onClick: ()=>{
	    	            	removeProd();
	    	            	dispatch({type:'shoppingCartD/hideConfirm',payload:{orderIndex}});
	    	            }
	    	        }
	    	    ]}
	    	    show={showConfirm}
	    	>
	    	    确认删除这件商品？
	    	</Dialog.Confirm>
    	</div>
	);
}

MerchCard.propTypes={
}

export default MerchCard;