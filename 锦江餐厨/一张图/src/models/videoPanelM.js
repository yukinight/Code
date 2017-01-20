import { getVideoLeftPn, getVideoTable, getVideoTypeOpts } from '../services/remoteData'

let tableData = [];
// for(var i=0;i < 20;i++){
//     tableData.push({
//         key: i,
//         code: `LB007${i}`,
//         name: `test${i}`,
//         address: `苏州市吴中区干将西路420号 ${i}`,
//         modelName: '车载',
//     });
// }

export default {
    namespace: 'videoPanel',

    state: {
        cameraNum:{
            totalNum: 0,
            vehicleNum:0,
            restaurantNum:0,
            factoryNum:0
        },
        tableData:tableData,
        searchText: '',
        typeOptions:[],
        typeFilter:undefined,
    },

    subscriptions: {
        setup({ dispatch, history }) {
            dispatch({type:'leftPnInit'});
            dispatch({type:'tablePnInit'});
            dispatch({type:'typeOptsInit'});
        },
    },

    effects: {
        *fetchRemote({ payload }, { call, put }) {
        },
        *leftPnInit({ payload }, { call, put, select }){
            const {data} = yield call(getVideoLeftPn);
            if(!data) return;
            const preCameraNum = yield select(state => state.cameraNum);
            yield put({type:'fetch', payload:{cameraNum:{
                ...preCameraNum,
                ...data
            }}});
        },
        *tablePnInit({ payload }, { call, put }){
            const {data} = yield call(getVideoTable);
            if(!data) return;
            tableData = [];
            data.forEach((rowData,i)=>{
                tableData.push({
                    key: `row${i}`,
                    ...rowData
                });
            });
            yield put({type:'fetch', payload:{tableData:tableData}});
        },
        *typeOptsInit({ payload }, { call, put }){
            const {data} = yield call(getVideoTypeOpts);
            if(!data) return;
            yield put({type:'fetch',payload:{typeOptions:data.map(d => d.name)}}); 
        },
    },

    reducers: {
        fetch(state, action) {
            return { ...state, ...action.payload };
        },
        tableFilter(state, action){
            let {searchText,typeFilter} = state;
            let eligibleData = tableData.filter((item)=>{
                if(searchText!==''){
                    let regSearch = new RegExp(searchText, "i");
                    if(! regSearch.test(item.name) ){
                        return false;
                    }
                }
                if(typeFilter){
                    let regFilter = new RegExp(typeFilter, "i");
                    if(! regFilter.test(item.modelName) ){
                        return false;
                    }
                }
                return true;
            })

          return {...state, tableData:eligibleData}
        },
        setSearchText(state, action){
            let searchText = action.payload.searchText;
            searchText = searchText.replace(/(^\s*)|(\s*$)/g, "");   
            return {...state, searchText:searchText}
        },
        setTypeFilter(state, action){
            let typeFilter = action.payload.typeFilter;
            return {...state, typeFilter:typeFilter}
        }
    },

}