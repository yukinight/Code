import { getMerchantLeftPn, getMerchantTable, 
    getMerchantStateOpts, getMerchantTypeOpts } from '../services/remoteData'

let tableData = [];
// for (let i = 0; i < 50; i++) {
//   tableData.push({
//     key: 'oo'+i,
//     areaName: '姑苏区',
//     name: '文辉食堂',
//     collectedStatusName: '已收运',
//     classesName: 'kkk',
//     output: '50kg',
//     collectedTimes: 1,
//     shouldTimes: 3,
//     times: '0/2',
//     rfids:[{
//             rfideCode:'5451',
//             trashbinModel: 'dafwfwa',
//             manufacturer: 'XXXXXXXXXXXXXX'
//         },{
//             rfideCode:'5451',
//             trashbinModel: 'dafwfwa',
//             manufacturer: 'XXXXXXXXXXXXXX'
//         }],
//     address: 'XXXXXXXXXXXXXXX',
//     contactPhone: '135-2333-2333',
//   });
// }

export default {

    namespace: 'merchantPanel',

    state: {
        // left panel
        merchantQty:{
          collectedNum:0,
          uncollectedNum:0,
          partCollectedNum: 0
        },
        // right panel
        merchantInfo:{
          address: '',
          classesName:'',
          contactPhone: '',
        },
        relatedTrash:[],
        // mid panel
        tableData:tableData,
        searchText: '',
        // areaOptions:['姑苏区','X区'],
        areaFilter:undefined,
        stateOptions:[],
        stateFilter:undefined,
        typeOptions:[],
        typeFilter:undefined,
    },

    subscriptions: {
        setup({ dispatch, history }) {
            dispatch({type:'leftPnInit'});
            dispatch({type:'tablePnInit'});
            dispatch({type:'stateOptsInit'});
            dispatch({type:'typeOptsInit'});
        },
    },

    effects: {
        *fetchRemote({ payload }, { call, put }) {
        },
        *leftPnInit({ payload }, { call, put, select }){
            const {data} = yield call(getMerchantLeftPn);
            if(!data) return;
            const preMerchantQty = yield select(state => state.merchantQty);
            yield put({type:'fetch', payload:{merchantQty:{
                ...preMerchantQty,
                ...data
            }}});
        },
        *tablePnInit({ payload }, { call, put }){
            const {data} = yield call(getMerchantTable);
            if(!data) return;
            tableData = [];
            data.forEach((rowData,i)=>{
                tableData.push({
                    key: `row${i}`,
                    times: `${rowData.collectedTimes}/${rowData.shouldTimes}`,
                    ...rowData
                });
            });
            yield put({type:'fetch', payload:{tableData:tableData}});
        },
        *stateOptsInit({ payload }, { call, put }){
            const {data} = yield call(getMerchantStateOpts);
            if(!data) return;
            yield put({type:'fetch',payload:{stateOptions:data.map(d => d.name)}}); 
        },
        *typeOptsInit({ payload }, { call, put }){
            const {data} = yield call(getMerchantTypeOpts);
            if(!data) return;
            yield put({type:'fetch',payload:{typeOptions:data.map(d => d.name)}}); 
        },
    },

    reducers: {
        fetch(state, action) {
            return { ...state, ...action.payload };
        },
        tableFilter(state, action){
          let {searchText,areaFilter,stateFilter,typeFilter} = state;
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
                if(! regFilter.test(item.collectedStatusName) ){
                    return false;
                }
            }
            if(typeFilter){
                let regFilter = new RegExp(typeFilter, "i");
                if(! regFilter.test(item.classesName) ){
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
          else if(name==='type'){
            return {...state, typeFilter:filterVal}
          }
        },
        setRightPanel(state, action){
            const {rowData} = action.payload;
            return {...state, merchantInfo:{
                address: rowData.address,
                classesName:rowData.classesName,
                contactPhone: rowData.contactPhone,
            }, relatedTrash:rowData.rfids}
        }
    },
}