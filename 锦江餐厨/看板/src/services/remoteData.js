import request from '../utils/request';
// ----------调试用的参数-----------------------
const preURL = 'http://192.168.1.162:8080';
// -----------------------------------------
// const preURL = '';

export async function getShouYunSum() {
  return request(preURL+'/cloud/cc/web/rest/transTask/totalData.smvc', {method:'post'});
}

export async function getCarList() {
  return request(preURL+'/cloud/cc/web/rest/transTask/taskList.smvc', {method:'post'});
}

export async function getDetailChart(param){
	return request(preURL+'/cloud/cc/web/rest/taskDetail/historyCollectData.smvc', {
		method:'post',
		body: param
	});
}

export async function getDetailBasic(param){
	return request(preURL+'/cloud/cc/web/rest/taskDetail/carBaseInfo.smvc', {
		method:'post',
		body: param
	});
}

export async function getDetailCar(param){
	return request(preURL+'/cloud/cc/web/rest/taskDetail/carStatusInfo.smvc', {
		method:'post',
		body: param
	});
}

export async function getDetailCollection(param){
	return request(preURL+'/cloud/cc/web/rest/taskDetail/collectStatusInfo.smvc', {
		method:'post',
		body: param
	});
}