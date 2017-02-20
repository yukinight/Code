import React from 'react';
import style from './carouselImg.less';

const CarouselImg = ({syPointDtoList,firstImgIndex,currentImg,dispatch})=>{
	const spotNum = syPointDtoList.length;
	const SingleWidth = 108;
	return (
	<div className={style.imgct}>
		<img src={syPointDtoList[currentImg].picUrl} className={style.bigImg} />
		<div className={style.thumb_img_bar}>
			<ul className={style.slide_ul} style={{marginLeft: 0 - SingleWidth*firstImgIndex +'px'}}>
				{
					syPointDtoList.map((item, index)=>{
						return index===currentImg ?
						<li key={index} className={`${style.thumb_img_li} ${style.selectedImg}`}>
							<a href="javascript:void(0)" className={`${style.thumb_img_wrapper} ${style.selected_a}`}>
								<img src={item.picUrl}/>
							</a>
						</li>
						:
						<li key={index} className={style.thumb_img_li}>
							<a href="javascript:void(0)" className={style.thumb_img_wrapper} onClick={()=>{
								dispatch({type:'slideStateList/changeCurrent', payload:{index}});
							}}>
								<img src={item.picUrl}/>
							</a>
						</li>
					})
				}
			</ul>
		</div>
		<div className={style.arrowBtnDiv}>
			{
				firstImgIndex===0 ? 
				<a className={style.arrowBtn}></a>
				:
				<a className={`${style.arrowBtn} ${style.showBtn}`} onClick={()=>{
					dispatch({type:'slideStateList/imgSlide',payload:{
						direction:'left',
						spotNum
					}});
				}}></a>
			}
			{
				firstImgIndex>= spotNum - 4?
				<a className={`${style.arrowBtn} ${style.rightArrowBtn}`}></a>
				:
				<a className={`${style.arrowBtn} ${style.rightArrowBtn} ${style.showBtn}`} onClick={()=>{
					dispatch({type:'slideStateList/imgSlide',payload:{
						direction:'right',
						spotNum
					}});
				}}></a>
			}	
		</div>
	</div>)
}
CarouselImg.propTypes={}
export default CarouselImg;