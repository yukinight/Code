import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { link } from 'dva/router';

import ShoppingCart from '../components/shoppingCart/shoppingCartC'

const shoppingCartPanel = ({location, dispatch, shoppingCartD}) => {
	const shoppingCartPropTypes = {...shoppingCartD,dispatch};
	return (
		<div>
			<ShoppingCart {...shoppingCartPropTypes}/>
		</div>
	);
}


shoppingCartPanel.propTypes = {
};

export default connect(({shoppingCartD})=>({shoppingCartD}))(shoppingCartPanel);


