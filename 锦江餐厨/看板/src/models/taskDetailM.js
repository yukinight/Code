import pathToRegexp from 'path-to-regexp';
import {getDetailChart,getDetailBasic,getDetailCar,getDetailCollection} from '../services/remoteData';

// const option = {
//     tooltip: {
//         trigger: 'axis',
//         // formatter: '{a}<br/>{b}:{c}t'
//     },
//     grid: {
//         left: '5%',
//         right: '8%',
//         bottom: '3%',
//         top: '18%',
//         containLabel: true
//     },
//     toolbox: {
//         show: true,
//         right:15,
//         feature: {
//             dataView: {readOnly: true},
//             magicType: {type: ['line', 'bar']},
//             saveAsImage: {}
//         }
//     },
//     xAxis:  {
//         type: 'category',
//         boundaryGap: false,
//         data: ["2017-02-15", "2017-02-14", "2017-02-13", "2017-02-12", "2017-02-11", "2017-02-10", "2017-02-09"]
//     },
//     yAxis: {
//         type: 'value',
//         min:0,
//         axisLabel: {
//             formatter: '{value}t'
//         }
//     },
//     series: [
//         {
//             name:'收运量',
//             type:'line',
//             smooth: true,
//             // animation: false,
//             data:[1, 11, 15, 22, 12, 13, 16],
//             markPoint: {
//                 symbolSize: 40,
//                 data: [
//                     {type: 'max', name: '最大值'},
//                     {type: 'min', name: '最小值'}
//                 ]
//             },
//             markLine: {
//                 data: [
//                     {type: 'average', name: '平均值'}
//                 ]
//             }
//         },
//     ]
// };

// let spotList = [];
// for(let i=0;i<12;i++){
//     spotList.push({
//         areaName:'苏州大学',
//         collectStatus: 0,// 0,已收,1部分收, 2 未收  int
//         collectTime:'4:30'
//     });
// }
// for(let i=0;i<9;i++){
//     spotList.push({
//         areaName:'苏州大学',
//         collectStatus: 2,// 0,已收,1部分收, 2 未收  int
//         collectTime:'8:30'
//     });
// }

const genChartOpt = ({xAxisData, seriesData})=>{
    return {
        tooltip: {
            trigger: 'axis',
            // formatter: '{a}<br/>{b}:{c}t'
        },
        grid: {
            left: '5%',
            right: '8%',
            bottom: '3%',
            top: '18%',
            containLabel: true
        },
        toolbox: {
            show: true,
            right:15,
            feature: {
                dataView: {readOnly: true},
                magicType: {type: ['line', 'bar']},
                saveAsImage: {}
            }
        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: xAxisData
        },
        yAxis: {
            type: 'value',
            min:0,
            axisLabel: {
                formatter: '{value}t'
            }
        },
        series: [
            {
                name:'收运量',
                type:'line',
                smooth: true,
                // animation: false,
                data: seriesData,
                markPoint: {
                    symbolSize: 40,
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            },
        ]
    };
}

export default {
    namespace: 'taskDetail',

    state: {
        loading:false,
        carId:'',
        taskId: '',
        basicInfo:{
            carId : "",
            carCode : "",
            driver : "",
            carType : "",
            maxWeight : "",
            driverPhone : "",
            deviceCode: ""
        },
        carState:{
            todayMiles : 0,  
            driveDuration : 0,  
            curSpeed : 0,  
            oilInfo : 0, 
            equipmentStatus : ""
        },
        chartLoading:false,
        chartOption:null,
        gcState:{
            routeName:"",
            syStartTime:"",
            syEndTime:"",
            curWeight: 0,
            syPointNum : 0,  
            ysPointNum : 0,
            syPointDtoList: []
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({pathname}) => {
                const match = pathToRegexp('/:carId/:taskId').exec(pathname);
                if (match) {
                    const carId = match[1];
                    const taskId = match[2];
                    dispatch({type:'fetch',payload:{carId,taskId}});
                    dispatch({type:'refresh',payload:{carId,taskId}});
                    // dispatch({type:'updateBasic', payload:{carId}});
                    // dispatch({type:'updateCar', payload:{carId}});
                    // dispatch({type:'updateChart', payload:{taskId}});
                    // dispatch({type:'updateCollection', payload:{taskId}});
                }
            });
        },
    },

    effects: {
        *fetchRemote({ payload }, { call, put }) {

        },
        *refresh({ payload }, { call, put, select }){
            const {carId,taskId} = yield payload || select( ({taskDetail}) => {
                    return {
                        carId: taskDetail.carId,
                        taskId: taskDetail.taskId
                    }
                });
            yield put({type:'updateBasic', payload:{carId}});
            yield put({type:'updateCar', payload:{taskId}});
            yield put({type:'updateChart', payload:{taskId}}); 
            yield put({type:'updateCollection', payload:{taskId}});
        },
        *updateBasic({ payload }, { call, put }){
            const {carId} = payload;
            const {data} = yield call(getDetailBasic,{
                parameters: JSON.stringify({carId}) 
            });
            if(data){
                yield put({type:'fetch',payload:{
                    basicInfo: data
                }});
            }
        },
        *updateChart({ payload }, { call, put }){
            const {taskId} = payload;
            yield put({type:'fetch',payload:{
                chartLoading: true
            }});
            const {data} = yield call(getDetailChart,{
                parameters:JSON.stringify({taskId}) 
            });
            if(data){
                yield put({type:'fetch',payload:{
                    chartOption: genChartOpt(data),
                }});
            }
            yield put({type:'fetch',payload:{
                chartLoading: false
            }});
        },
        *updateCollection({ payload }, { call, put }){
            const {taskId} = payload;
            const {data} = yield call(getDetailCollection,{
                parameters: JSON.stringify({taskId}) 
            });
            if(data){
                yield put({type:'fetch',payload:{
                    gcState: data
                }});
            }
        },
        *updateCar({ payload }, { call, put }){
            const {taskId} = payload;
            const {data} = yield call(getDetailCar,{
                parameters:JSON.stringify({taskId}) 
            });
            if(data){
                yield put({type:'fetch',payload:{
                    carState: data
                }});
            }
        },
    },

    reducers: {
        fetch(state, action) {
            return { ...state, ...action.payload };
        },
    },


}
