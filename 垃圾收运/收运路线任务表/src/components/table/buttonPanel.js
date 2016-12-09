import React from 'react';
import style from './buttonPanel.less'

const ButtonPanel = ({selectedItems, carlist,dispatch})=>{
	const send = ()=>{
		dispatch({type:'carTable/sendOut'})
	}

	return (
		<div className={style.footpanel}>
			<div className={style.statelabelarea}>
				<span className={style.state}><div className="sent"></div><span>已发送</span></span>
				<span className={style.state}><div className="unsent"></div><span>未发送</span></span>
			</div>
			<div className={style.buttonarea}>
				<a className={style.button} href='#'>预览</a>
				<a className={style.button} href='#'>保存</a>
				<a className={style.button} href='#' onClick={e=>send()}>发送</a>
			</div>
		</div>
	)
}

ButtonPanel.propTypes = {
}

export default ButtonPanel;