import request from '../utils/request';

export async function queryCar(carCode) {
  // 参数carCode是输入框输的车牌号
//   console.log('carCode是要的参数= '+carCode);
  let url = '/cloud/cc/onePage/car/getCarInfoList';
  var body={
      carCode:carCode,
  }
  return request(
            url, 
            {method:'post', body:body}
        )
}
export async function queryShop(name) {

  // 参数name是商城名字
  let url = '/cloud/cc/onePage/restaurant/getRestaurantInfoList';
  var body={
      name:name,
  }
  return request(
            url, 
            {method:'post', body:body}
        )
}
export async function queryCollect(name) {
  // 参数name是搜集点名字
  let url = '/cloud/cc/onePage/syPoint/getSyPointInfoList';
  var body={
      name:name,
  }
  return request(
            url, 
            {method:'post', body:body}
        )
}


export async function queryVideoDot(name) {
  //参数name是视频点名称
  let url = '/cloud/cc/onePage/videoPoint/getVideoPointPanelInfoList';
  //此接口公用面板接口
//   typeId	string	类型(传一个空的)，【此出没写，请改成默认】
// name	String	视频点名
  var body={
      name:name,
  }
  return request(
            url, 
            {method:'post', body:body}
        )
}