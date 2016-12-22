import React from 'react';
import WeUI from 'react-weui';
import 'weui';
import MerchCard from './merchCard';
import style from './shoppingCartC.less'

const {CellsTitle, Form, CellBody, Toast, Mask, Button, Cells, Cell, CellFooter, Dialog} = WeUI;


const ShoppingCart = ({total,loading,orders,dispatch}) => {
  return (
    <div>
    	<CellsTitle>购物车</CellsTitle>
    	<Form checkbox>
	        {
	        	orders.map((item,index)=>{
	        		let merchCardPropTypes = {
	        			...item,
	        			orderIndex:index,
	        			dispatch
	        		}
	        		return <MerchCard key={index} {...merchCardPropTypes}/>
	        	})
	        }
    	</Form>
    	<div className={style.bottomPanel}>
    		<Cells>
    		<Cell>
	    		<CellBody>
		            <span className={style.totalLabel}>合计：¥{total}</span>
		        </CellBody>
		        <CellFooter>
		            <Button type="warn">提交订单</Button>
		        </CellFooter>
		    </Cell>
		    </Cells>
    	</div>
    	<div>
    		{loading ? <Mask/> : ''}
    	    <Toast icon="loading" show={loading}>Loading...</Toast>
    	</div>
    	
    </div>
  );
};

ShoppingCart.propTypes = {
};

export default ShoppingCart;
