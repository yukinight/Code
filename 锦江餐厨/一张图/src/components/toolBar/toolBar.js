import React from 'react';
import {connect} from 'dva'
import { Button } from 'antd';
import {imgLocation} from '../../utils/global'
import style from './toolBar.less'

const ButtonGroup = Button.Group;
const ToolBar = ({dispatch, layerButton, linkButton,showLayer,showLink})=>{
	
	return (
		<div className={style.tool_bar}>
			<div className={style.barct}>
				<div className={style.float+' '+style.tool_bt} onClick={()=>{
					dispatch({type:'toolBar/switchLyBar'});
				}}>
					<img className={style.tbimg} src={showLayer? imgLocation.layer_blue:imgLocation.layer_white} />
				</div>
				<ButtonGroup className={style.float}  style={{display:showLayer?'block':'none'}}>
				{			
					layerButton.map((item, index)=>{
						return  <Button key={index} type={item.active?"primary":'default'}
						onClick={()=>{
							dispatch({type:'toolBar/switchLyBtState',payload:{index}});
						}}>{item.name}</Button>
					})
				}	    
			    </ButtonGroup> 
			    
		    </div>
		    <div className={style.barct}>
		    	<div className={style.float+' '+style.tool_bt} onClick={()=>{
		    		dispatch({type:'toolBar/switchLkBar'});
		    	}}>
		    		<img className={style.tbimg} src={showLink ? imgLocation.edit_blue:imgLocation.edit_white} />
		    	</div>
				<ButtonGroup className={style.float} style={{display:showLink?'block':'none'}}>
				{			
					linkButton.map((item, i)=>{
						return <Button key={i} >{item.name}</Button>
					})
				}	    
			    </ButtonGroup>  
			    
		    </div>

		</div>
	)
}

ToolBar.propTypes={}

export default connect(({toolBar})=>toolBar)(ToolBar);