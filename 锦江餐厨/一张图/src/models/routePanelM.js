import { getRouteLeftPn, getRouteTable } from '../services/remoteData'

// let collectSpots = [];
// for(var i = 0; i< 15;i++){
//   collectSpots.push('XXXXX点');
// }

let tableData = [];
// for (let i = 0; i < 50; i++) {
//   tableData.push({
//     key: i,
//     code: 'SZ465487',
//     name: `test${i}`,
//     output: 50,
//     dailyOutput: 110,
//     isScheduling: true,  
//     isSchedulingCN: '是', //中文显示数据 true, false
//     spotNum: '6/15',  //拼接
//     totalNum: 15,
//     collectedSyPointNum: 6,
//     syNum: 8,
//     areaName: '商户',
//     makerName:'某某某',
//     makeTime:'2017.1.3',
//     syPointName:collectSpots
//   });
// }


export default {
    namespace: 'routePanel',

    state: {
        // left panel
        route:{
            totalNum:0,
            haveCarNum:0,
            noCarNum:0,
            normalNum:0,
            abnormalNum:0
        },
        // right panel
        spots:[],
        formulatePerson: '',
        formulateTime: '',
        // mid panel
        tableData:tableData,
        searchText: '',
        // areaOptions:['车载','商户','厂区'],
        areaFilter:undefined,
        scheduleOptions:['是','否'],
        scheduleFilter:undefined,
    },

    subscriptions: {
        setup({ dispatch, history }) {
            dispatch({type:'leftPnInit'});
            dispatch({type:'tablePnInit'});
        },
    },

    effects: {
        *fetchRemote({ payload }, { call, put }) {
        },
        *leftPnInit({ payload }, { call, put, select }){
            const {data} = yield call(getRouteLeftPn);
            if(!data) return;
            const preRoute = yield select(state => state.route);
            yield put({type:'fetch', payload:{route:{
                ...preRoute,
                ...data
            }}});
        },
        *tablePnInit({ payload }, { call, put }){
            const {data} = yield call(getRouteTable);
            if(!data) return;
            tableData = [];
            data.forEach((rowData,i)=>{
                tableData.push({
                    key: `row${i}`,
                    spotNum: `${rowData.collectedSyPointNum}/${rowData.totalNum}`,
                    isSchedulingCN: rowData.isScheduling ? '是' : '否',
                    ...rowData
                });
            });
            yield put({type:'fetch', payload:{tableData:tableData}});
        }
    },

  reducers: {
    fetch(state, action) {
        return { ...state, ...action.payload };
    },
    tableFilter(state, action){
        let {searchText,areaFilter,scheduleFilter} = state;
        let eligibleData = tableData.filter((item)=>{
            if(searchText!==''){
                let regSearch = new RegExp(searchText, "i");
                if(! regSearch.test(item.name) ){
                    return false;
                }
            }
            if(areaFilter){
                let regFilter = new RegExp(areaFilter, "i");
                if(! regFilter.test(item.areaName) ){
                    return false;
                }
            }
            if(scheduleFilter){
                let regFilter = new RegExp(scheduleFilter, "i");
                if(! regFilter.test(item.isSchedulingCN) ){
                    return false;
                }
            }
            return true;
        })

        return {...state, tableData:eligibleData}
    },
    setSearchText(state, action){
        let {searchText} = action.payload;
        searchText = searchText.replace(/(^\s*)|(\s*$)/g, "");   
        return {...state, searchText:searchText}
    },
    setFilter(state, action){
        let {filterVal, name} = action.payload;
        if(name==='area'){
            return {...state, areaFilter:filterVal}
        }
        else if (name==='schedule'){
            return {...state, scheduleFilter:filterVal}
        }
    },
    setRightPanel(state, action){
        const {rowData} = action.payload;
        return {...state, 
            spots:rowData.syPointName,
            formulatePerson: rowData.makerName,
            formulateTime: rowData.makeTime
        }
    }
  },

}