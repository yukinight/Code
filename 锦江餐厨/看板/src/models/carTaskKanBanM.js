import {getShouYunSum,getCarList} from '../services/remoteData';

// let carList = [];
// let spotList = [];
// for(let i=0;i<10;i++){
//     spotList.push({
//         areaName:'aa',
//         collectStatus: 0,// 0,已收,1部分收, 2 未收  int
//         collectTime:'4:30'
//     });
// }
// for(let i=0;i<5;i++){
//     spotList.push({
//         areaName:'苏州大学',
//         collectStatus: 2,// 0,已收,1部分收, 2 未收  int
//         collectTime:'8:30'
//     });
// }
// for(let i=0;i<24;i++){
//     carList.push({
//         carId: 'fdgeuidaidebv',
//         carCode: '苏E88888',
//         routeName: '工业园区线',
//         syStartTime: '8:30:00',
//         syEndTime: '16:30:00',
//         speed: 58.6,
//         oilCost: 6.8,
//         taskStatus: 1, //0正常, 1异常
//         transMiles : 152, 
//         curMiles : 86,
//         avgWeight : 21.2, 
//         curWeight : 20, 
//         avgDuration : 8.6, 
//         curDuration : 7.2, 
//         syPointNum : 36,  
//         ysPointNum : 17,
//         syPointDtoList:spotList
//     });
// }

export default {
    namespace: 'carTaskKanBan',

    state: {
        loading:false,
        today: 0,
        average: 0,
        car:0,
        carAll: 0,
        collector: 0,
        collectorAll: 0,
        carList: []
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/') {
                    dispatch({type:'refresh'});
                }
            });
            
        },
    },

    effects: {
        *fetchRemote({ payload }, { call, put }) {

        },
        *refresh({payload}, {call, put}){
            yield put({type:'updateSum'});
            yield put({type:'updateCarList'});
            yield put({type:'hideLoading'});
        },
        *updateSum({ payload }, { call, put }){
            const {result,data} = yield call(getShouYunSum);
            // 0表示成功，1表示失败
            if(result===0){
                yield put({type:'fetch', payload:{
                    today: data.weightInfo.total,
                    average: data.weightInfo.average,
                    car: data.syCarInfo.normal,
                    carAll: data.syCarInfo.total,
                    collector: data.syPointInfo.ysSyPointNum,
                    collectorAll: data.syPointInfo.totalPointNum
                }});
            }
        },
        *updateCarList({ payload }, { call, put }){
            const {result,data} = yield call(getCarList);
            if(result===0){
                yield put({type:'fetch', payload:{
                    carList: data
                }});
            }
        }
    },

    reducers: {
        fetch(state, action) {
            return { ...state, ...action.payload };
        },
        showLoading(state, action){
            return { ...state, loading:true };
        },
        hideLoading(state, action){
            return { ...state, loading:false };
        }
    },

}
