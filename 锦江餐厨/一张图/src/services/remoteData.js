import request from '../utils/request';
// ----------调试用的参数-----------------------
// const fore_dynamic_suffix = ".jhtml";
// const preURL = 'http://10.10.10.39:8074';
// -----------------------------------------
const preURL = '';
//底部面板所有下拉框选项
export async function getAreaOpts() {
	return request(preURL+'/cloud/cc/baseCommon/getDivisionList'
		+fore_dynamic_suffix , {method:'post'});
}

export async function getCollectorStateOpts() {
	return request(preURL+'/cloud/cc/onePage/syPoint/getCollectedStatus', {method:'post'});
}

export async function getMerchantStateOpts() {
	return request(preURL+'/cloud/cc/onePage/restaurant/getCollectedStatus', {method:'post'});
}
export async function getMerchantTypeOpts() {
	return request(preURL+'/cloud/cc/onePage/restaurant/getRestaurantClass', {method:'post'});
}

export async function getCarStateOpts() {
	return request(preURL+'/cloud/cc/onePage/car/getCarStatus', {method:'post'});
}

export async function getVideoTypeOpts() {
	return request(preURL+'/cloud/cc/onePage/videoPoint/getVideoPointType', {method:'post'});
}

// 数据面板
// {output,input,dailyOutput,dailyInput,panelData}
export async function getDataPnData() {
	return request(preURL+'/cloud/cc/onePage/data/getDataPanel', {method:'post'});
}

// {xAxisData,seriesData:[{name,data}]}
export async function getDataChart(params){
	return request(preURL+'/cloud/cc/onePage/data/getPolylineData', 
		{method:'post', body:params})
}

// 收集点面板
export async function getCollectorLeftPn(){
	return request(preURL+'/cloud/cc/onePage/syPoint/getSyPointPanelTotal', 
		{method:'post'});
}

export async function getCollectorTable(){
	return request(preURL+'/cloud/cc/onePage/syPoint/getSyPointPanelInfoList', 
		{method:'post'});
}

// 商户面板
export async function getMerchantLeftPn(){
	return request(preURL+'/cloud/cc/onePage/restaurant/getRestaurantPanelTotal', 
		{method:'post'});
}

export async function getMerchantTable(){
	return request(preURL+'/cloud/cc/onePage/restaurant/getRestaurantPanelInfoList', 
		{method:'post'});
}

// 车辆面板
export async function getCarLeftPn(){
	return request(preURL+'/cloud/cc/onePage/car/getCarPanelTotal', 
		{method:'post'});
}

export async function getCarList(){
	return request(preURL+'/cloud/cc/onePage/car/getCarPanelInfoList', 
		{method:'post'});
}

// 路线面板
export async function getRouteLeftPn(){
	return request(preURL+'/cloud/cc/onePage/route/getRoutePanelTotal', 
		{method:'post'});
}

export async function getRouteTable(){
	return request(preURL+'/cloud/cc/onePage/route/getRoutePanelInfoList', 
		{method:'post'});
}
// 视频点面板
export async function getVideoLeftPn(){
	return request(preURL+'/cloud/cc/onePage/videoPoint/getVideoPointPanelTotal', 
		{method:'post'});
}

export async function getVideoTable(){
	return request(preURL+'/cloud/cc/onePage/videoPoint/getVideoPointPanelInfoList', 
		{method:'post'});
}
