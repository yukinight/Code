import {getCarLeftPn, getCarList, getCarStateOpts} from '../services/remoteData'

let carStatus = [];
// for(var i=0;i < 15;i++){
//   carStatus.push({
//     driveStatus:'正常',
//     syPointNum:1,
//     collectedSyPointNum:Math.random(),
//     areaName: 'A区',
//     carCode: `苏E5898${i}`,
//     carWeight:18,
//     carLoad:22,
//   })
// }

export default {

  namespace: 'carPanel',

  state: {
    // left panel
    carQty:{
      totalCarNum:0,
      runCarNum:0,
      workCarNum:0,
      normalCarNum:0,
    },
    // right panel
    trackCar:false,
    carState: '',
    currentPayload: 0,
    totalPayload: 0,
    // mid panel
    carStatus:carStatus,
    searchText: '',
    // areaOptions:['A区','B区','C区'],
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
        const {data} = yield call(getCarLeftPn);
        if(!data) return;
        const preCarQty = yield select(state => state.carQty);
        yield put({type:'fetch', payload:{carQty:{...preCarQty, ...data}}});
    },
    *tablePnInit({ payload }, { call, put }){
        const {data} = yield call(getCarList);
        carStatus = [];
        data.forEach((rowData,i)=>{
            carStatus.push({
                ...rowData
            });
        });
        yield put({type:'fetch', payload:{carStatus:carStatus}});
    },
    *stateOptsInit({ payload }, { call, put }){
        const {data} = yield call(getCarStateOpts);
        yield put({type:'fetch',payload:{stateOptions:data.map(d => d.name)}}); 
    }
  },

  reducers: {
    fetch(state, action) {
        return { ...state, ...action.payload };
    },
    tableFilter(state, action){
        let {searchText,areaFilter,stateFilter} = state;
        let eligibleData = carStatus.filter((item)=>{
        if(searchText!==''){
          let regSearch = new RegExp(searchText, "i");
          if(! regSearch.test(item.carCode) ){
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
          if(! regFilter.test(item.driveStatus) ){
            return false;
          }
        }
        return true;
      })

      return {...state, carStatus:eligibleData}
    },
    setSearchText(state, action){
        let {searchText} = action.payload;
        searchText = searchText.replace(/(^\s*)|(\s*$)/g, "");   
        return {...state, searchText}
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
    setTrackCar(state, action){
        let {trackCar} = action.payload;
        return {...state, trackCar}
    },
    setRightPanel(state, action){
        let carProps = state.carStatus[action.payload.index]
        return {...state, trackCar:false,
            carState: carProps.driveStatus,
            currentPayload: carProps.carWeight,
            totalPayload:carProps.carLoad
        }
    },
  },

}