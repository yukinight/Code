import React from 'react';
import { Modal } from 'antd';
import {connect} from 'dva';
import {imgLocation} from '../../utils/config';
import CarouselImg from './carouselImg';
import style from './slideStateList.less';

class SlideStateList extends React.Component {
  	constructor(props) {
		super(props);
  	}
  	componentDidMount() {
    	this.props.dispatch({type:'slideStateList/updateArrowState',payload:{
    		spotNum: this.props.syPointDtoList ? this.props.syPointDtoList.length : 0,
    		ctWidth: $(this.WP).width()
    	}});
  	}
  	render() {
  		
	  	const {syPointDtoList,marginLeft,leftArrow,rightArrow,showImgModal,
	  		firstImgIndex,currentImg,dispatch} = this.props;
		const spotNum = syPointDtoList ? syPointDtoList.length :0;
		const CarouselImgProps = {
			syPointDtoList,
			firstImgIndex,
			currentImg,
			dispatch
		}
		const lineClsName = (index)=>{
			if(index===spotNum-1)
				return `${style.lidiv}`;
			else
				return `${style.lidiv} ${style.line_ok}`;
		}
		const spotClsName = (state)=>{
			if(state===0)
				return `${style.spot_div} ${style.spot_ok}`;
			else
				return `${style.spot_div} ${style.spot_not}`;
		}

		return (
			<div className={style.hlct}>
				<Modal title="收集点" visible={showImgModal} footer='' onCancel={(e)=>{
					dispatch({type:'slideStateList/imgModalToggle', payload:{show:false}});
				}}>
					<CarouselImg {...CarouselImgProps}/>
		        </Modal>
				<div className={style.lb_div}>
					<div>收运地点：</div>
					<div className={style.time_lb}>收运时间：</div>
					<div>收集量：</div>
				</div>
				<div className={style.left_arrow} >
					{
						leftArrow ? 
						<img src={imgLocation.left_arrow} onClick={()=>{
							let width = $(this.WP).width();
							dispatch({type:'slideStateList/setMargin',payload:{
							    direction:'left', width
							}});
							dispatch({type:'slideStateList/updateArrowState',payload:{
							    spotNum, ctWidth: width
							}});
						}}/>
						:
						<img src={imgLocation.left_disable_arrow} />
					}
				</div>
				<div className={style.wrapper}  id="state_list" ref={(dom)=> {this.WP = dom}}>
					<ul className={style.ctul}  style={{marginLeft:marginLeft+'px'}}>
						{syPointDtoList.map((item, index)=>{
							return <li className={lineClsName(index)} key={'spt'+index}>
								<div className={spotClsName(item.collectStatus)}>
									<div className={style.text_div}>
										<div className={style.area_text}>{item.areaName}</div>
										<div className={style.time_div} onClick={()=>{
											dispatch({type:'slideStateList/imgModalToggle', payload:{
												show:true,
												index
											}});
										}}>{item.collectTime}</div>
										<div>200kg {index}</div>
									</div>
								</div>
							</li>
						})}
					</ul>
				</div>
				<div className={style.right_arrow}>
					{
						rightArrow ?
						<img src={imgLocation.right_arrow} onClick={(e)=>{
							let width = $(this.WP).width();
							dispatch({type:'slideStateList/setMargin',payload:{
							    direction:'right', width
							}});
							dispatch({type:'slideStateList/updateArrowState',payload:{
							    spotNum, ctWidth: width
							}});
						}}/>
						:
						<img src={imgLocation.right_disable_arrow} />
					}
				</div>
			</div>
		)
  	}
}

SlideStateList.propTypes = {}

export default connect(({slideStateList}) => slideStateList)(SlideStateList);