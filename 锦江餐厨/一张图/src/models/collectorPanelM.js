import { getCollectorLeftPn, getCollectorTable, getCollectorStateOpts} from '../services/remoteData'

let tableData = [];
// for (let i = 0; i < 50; i++) {
//     tableData.push({
//         key: i,
//         name: `test ${i}`,
//         areaName: `姑苏区 ${i}`,
//         cleanStatus: '已收运',
//         address: '苏州市吴中区干将西路420号', 
//         output: 50,
//         dailyOutput: 110,
//         rfidNum: '',
//         restaurantNum: '',
//         collectTime: '5AM ~ 5PM',
//         collectCycle: '2天',
//         carCode: '苏E88888',
//         restaurantName:['A商户','B商户','C商户']
//     });
// }

export default {

    namespace: 'collectorPanel',

    state: {
        // left panel
        collectorQty:{
          collectedNum:0,
          uncollectedNum:0,
          partCollectedNum: 0
        },
        // right panel
        rules:{
          timeSlot: '',
          period:'',
          relatedCar: '',
        },
        relatedMerchs:[],
        // mid panel
        tableData:tableData,
        searchText: '',
        // areaOptions:['姑苏区','X区'],
        areaFilter:undefined,
        stateOptions:[],
        stateFilter:undefined,
    },

    subscriptions: {
        setup({ dispatch, history }) {
            dispatch({type:'leftPnInit'});
            dispatch({type:'tablePnInit'});
            dispatch({type:'stateOptsInit'});
        },
    },

    effects: {
        *fetchRemote({ payload }, { call, put }) {
        },
        *leftPnInit({ payload }, { call, put, select }){
            const {data} = yield call(getCollectorLeftPn);
            if(!data) return;
            const preCollectorQty = yield select(state => state.collectorQty);
            yield put({type:'fetch', payload:{collectorQty:{
                ...preCollectorQty,
                ...data
            }}});
        },
        *tablePnInit({ payload }, { call, put }){
            const {data} = yield call(getCollectorTable);
            tableData = [];
            data.forEach((rowData,i)=>{
                tableData.push({
                    key: `row${i}`,
                    ...rowData
                });
            });
            yield put({type:'fetch', payload:{tableData:tableData}});
        },
        *stateOptsInit({ payload }, { call, put }){
            const {data} = yield call(getCollectorStateOpts);
            yield put({type:'fetch',payload:{stateOptions:data.map(d => d.name)}}); 
        }
    },

    reducers: {
        fetch(state, action) {
            return { ...state, ...action.payload };
        },
        tableFilter(state, action){
          let {searchText,areaFilter,stateFilter} = state;
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
            if(stateFilter){
                let regFilter = new RegExp(stateFilter, "i");
                if(! regFilter.test(item.cleanStatus) ){
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
            else if (name==='state'){
                return {...state, stateFilter:filterVal}
            }
        },
        setRightPanel(state, action){
            const {rowData} = action.payload
            return {...state, rules:{
                timeSlot: rowData.collectTime,
                period:rowData.collectCycle,
                relatedCar: rowData.carCode,
            }, relatedMerchs:rowData.restaurantName}
        }
    },
}