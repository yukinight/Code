 /*  2017.1.6
                   _ooOoo_ 
                  o8888888o 
                  88" . "88 
                  (| -_- |) 
                  O\  =  /O 
               ____/`---'\____ 
             .'  \\|     |//  `. 
            /  \\|||  :   |||//  \ 
           /  _||||| -:-  |||||-  \ 
          |   | \\\   -   /// |   | 
          | \_|  ''\ --- /''  |   | 
           \  .-\__  `-`  ___/-. / 
         ___`. .'  /--.--\  `. . __ 
      ."" '<  `.___\_<|>_/___.'  >'"". 
     | | :  `- \`.;`\ _ /`;.`/ - ` : | | 
     \  \ `-.   \_ __\ /__ _/   .-` /  / 
======`-.____`-.___\_____/___.-`____.-'====== 
                   `=---=' 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
           佛祖保佑       永无BUG


靠点谱啊哥。。event没传都有bug。
*/ 


// ./src/models/users.js
import { hashHistory } from 'dva/router';
import { queryCar,queryCollect,queryShop,queryVideoDot } from '../services/searchBox';

export default {

  namespace: 'searchBoxModel',
  state: {
      //列表
      carItemList :[
      ],
      collectItemList: [
      ], 
      shopItemList :[],
      videoDotItemList: [],

      //细节
      carDetail: {

      },
      shopDetail: {
          

      },
      collectDetail: {
          
      },
      videoDotDetail: {
          
      },

      //当前展示的小框框
      currentShow: {
          type: 'car',//collect,shop,videoDot,car，none啥都不展示
          islist: true, //是列表还是细节？
      },
      //底部是否可以展示
      isCanShow:false,

      //下拉列表
      selectList:[
          '车牌号',
          '商家点',
          '收集点',
          '视频点',
      ],
      //下拉内容是否展示
      //select当前展示的内容
      currentSelectList:'车牌号',
      currentSelectIndex:0,
      //当前inputtext的值
      currentInput:"",
  },

  subscriptions: {
  },

  effects: {
/****************后台返回的require********************/
    *requireCar({ payload }, {select, call, put }){
        console.log('car将搜索字段发送给后台data= '+payload);
        
        // yield put({ type: 'showLoading' }); //展示loading  
        const { data } = yield call(() => queryCar(payload));
        // alert('本次data:=' + data.data);
        // console.log('请求的数据data:');
        // console.log(data);
        // console.log('data'+data);
        if (data) {
            yield put({
                type: 'querySuccess',
                payload: {
                    carItemList:data,
                }
            });
        }
        else{
            alert('error');
        }
    },
    *requireCollect({ payload }, {select, call, put }){
        console.log('collect将搜索字段发送给后台 data= '+payload);

        // yield put({ type: 'showLoading' }); //展示loading  
        const { data } = yield call(() => { return queryCollect(payload) });
        // alert('本次data:=' + data.data);
        // console.log('请求的数据data:');
        // console.log(data);
        // console.log('data='+data);
        if (data) {
            yield put({
                type: 'querySuccess',
                payload: {
                    collectItemList:data,
                }
            });
        }
    },
    *requireShop({ payload }, {select, call, put }){
        console.log('shop将搜索字段发送给后台 data= '+payload);

        // yield put({ type: 'showLoading' }); //展示loading
        const { data } = yield call(() => { return queryShop(payload) });
        // alert('本次data:=' + data.data);
        // console.log('请求的数据data:');
        // console.log(data);
        // console.log(data);
        if (data) {
            yield put({
                type: 'querySuccess',
                payload: {
                    shopItemList:data,
                }
            });
        }
    },
    *requireVideo({ payload }, {select, call, put }){
        console.log('video将搜索字段发送给后台 data= '+payload);

        // yield put({ type: 'showLoading' }); //展示loading
        const { data } = yield call(() => { return queryVideoDot(payload) });
        // alert('本次data:=' + data);
        // console.log('请求的数据data:');
        // console.log(data);
        // console.log(data);
        if (data) {
            yield put({
                type: 'querySuccess',
                payload: {
                    videoDotItemList:data.data,
                }
            });
        }
    },
/*****************后台返回的require***************/
    
  },

  reducers: {
/*==================== 进入各种各样列表=================*/
    entryCarDetail(state, action){
        // console.log(state.carDetail)
        return { ...state, carDetail:action.payload, currentShow: {type:'car',islist:false,},};
    },
    entryCollectDetail(state, action){
        // console.log('entryCollectDetail')
        return { ...state, collectDetail:action.payload,currentShow:{type:'collect',islist:false,},};
    },
    entryShopDetail(state, action){
        // console.log(action.payload)
        return { ...state, shopDetail:action.payload,currentShow:{type:'shop',islist:false,},};
    },
    entryVideoDetail(state, action){
        // console.log('entryVideoDetail')
        return { ...state, videoDotDetail:action.payload,currentShow:{type:'videoDot',islist:false,},};
    },
    entryCarList(state, action){
        // console.log('entryCarList')
        return { ...state,currentShow:{type:'car',islist:true,},};
    },
    entryCollectList(state, action){
        // console.log('entryCollectList')
        return { ...state,currentShow:{type:'collect',islist:true,},};
    },
    entryShopList(state, action){
        // console.log('entryShopList')
        return { ...state,currentShow:{type:'shop',islist:true,},};
    },
    entryVideoDotList(state, action){
        // console.log('entryVideoDotList')
        return { ...state,currentShow:{type:'videoDot',islist:true,},};
    },

    // 目前没有数据显示
    entryNone(state, action){
        // console.log('entryNone')
        return { ...state,currentShow:{type:'none',islist:true,},};
    },
/*================= 进入各种各样列表=================*/

    // 是否显示整个底部框
    showBottom(state,action){
        
        return { ...state,isCanShow:action.payload,};
    },

    // inputSeach更改值
    changeValue(state, action){
        // console.log('changeValue')
        // console.log(action.payload);
        return { ...state,currentInput:action.payload,};
    },

    //更改select的显示item
    changeSelect(state,action){
        // console.log(action.payload);
        return { ...state,...action.payload,};
    },

    // 数据返回成功后操作
    querySuccess(state, action){
      return {...state, ...action.payload, /*loading: false 此处表示loading*/};
    },
  },

}
