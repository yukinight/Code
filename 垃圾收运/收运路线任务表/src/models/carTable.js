
export default {

  namespace: 'carTable',

  state: {
    head:["编号","车牌号","收集点名称","任务信息"],
    selectedItems:[],
    modalVisible: true,
    carlist: [{
      selected: false,
      editable: true,
      send:false,
      mode: 'display', //  display ||  edit
      taskNum: '001',
      taskInfo: {miles:'86', time:'7.1', production:'20', amount:30,},
      carInfo:{carType:'机扫车',driver:'张全蛋',phone:'15050655263',carNum:'苏E12345'},
      collectionSpots:[{val:'汪汪汪',moveIn:false}, {val:'喵喵喵',moveIn:false},{val:'咩咩咩',moveIn:false},
      {val:'吱吱吱',moveIn:false},{val:'嘿嘿嘿',moveIn:false},{val:'嘻嘻嘻',moveIn:false}]
    },{
      selected: false,
      editable: true,
      send:false,
      mode: 'edit', //  display ||  edit
      taskNum: '001',
      taskInfo: {miles:'86', time:'7.1', production:'20', amount:30,},
      carInfo:{carType:'机扫车',driver:'张全蛋',phone:'15050655263',carNum:'苏E12345'},
      collectionSpots:[{val:'汪汪汪',moveIn:false}, {val:'喵喵喵',moveIn:false},{val:'咩咩咩',moveIn:false},
      {val:'吱吱吱',moveIn:false},{val:'嘿嘿嘿',moveIn:false},{val:'嘻嘻嘻',moveIn:false}]
    },{
      selected: false,
      editable: true,
      send:false,
      mode: 'edit', //  display ||  edit
      taskNum: '001',
      taskInfo: {miles:'86', time:'7.1', production:'20', amount:30,},
      carInfo:{carType:'机扫车',driver:'张全蛋',phone:'15050655263',carNum:'苏E12345'},
      collectionSpots:[{val:'汪汪汪',moveIn:false}, {val:'喵喵喵',moveIn:false},{val:'咩咩咩',moveIn:false},
      {val:'吱吱吱',moveIn:false},{val:'嘿嘿嘿',moveIn:false},{val:'嘻嘻嘻',moveIn:false}]
    },{
      selected: false,
      editable: true,
      send:false,
      mode: 'display', //  display ||  edit
      taskNum: '001',
      taskInfo: {miles:'86', time:'7.1', production:'20', amount:30,},
      carInfo:{carType:'机扫车',driver:'张全蛋',phone:'15050655263',carNum:'苏E12345'},
      collectionSpots:[{val:'汪汪汪',moveIn:false}, {val:'喵喵喵',moveIn:false},{val:'咩咩咩',moveIn:false},
      {val:'吱吱吱',moveIn:false},{val:'嘿嘿嘿',moveIn:false},{val:'嘻嘻嘻',moveIn:false}]
    },{
      selected: false,
      editable: true,
      send:false,
      mode: 'edit', //  display ||  edit
      taskNum: '001',
      taskInfo: {miles:'86', time:'7.1', production:'20', amount:30,},
      carInfo:{carType:'机扫车',driver:'张全蛋',phone:'15050655263',carNum:'苏E12345'},
      collectionSpots:[{val:'汪汪汪',moveIn:false}, {val:'喵喵喵',moveIn:false},{val:'咩咩咩',moveIn:false},
      {val:'吱吱吱',moveIn:false},{val:'嘿嘿嘿',moveIn:false},{val:'嘻嘻嘻',moveIn:false}]
    },{
      selected: false,
      editable: true,
      send:false,
      mode: 'edit', //  display ||  edit
      taskNum: '001',
      taskInfo: {miles:'86', time:'7.1', production:'20', amount:30,},
      carInfo:{carType:'机扫车',driver:'张全蛋',phone:'15050655263',carNum:'苏E12345'},
      collectionSpots:[{val:'汪汪汪',moveIn:false}, {val:'喵喵喵',moveIn:false},{val:'咩咩咩',moveIn:false},
      {val:'吱吱吱',moveIn:false},{val:'嘿嘿嘿',moveIn:false},{val:'嘻嘻嘻',moveIn:false}]
    },{
      selected: false,
      editable: true,
      send:false,
      mode: 'display', //  display ||  edit
      taskNum: '001',
      taskInfo: {miles:'86', time:'7.1', production:'20', amount:30,},
      carInfo:{carType:'机扫车',driver:'张全蛋',phone:'15050655263',carNum:'苏E12345'},
      collectionSpots:[{val:'汪汪汪',moveIn:false}, {val:'喵喵喵',moveIn:false},{val:'咩咩咩',moveIn:false},
      {val:'吱吱吱',moveIn:false},{val:'嘿嘿嘿',moveIn:false},{val:'嘻嘻嘻',moveIn:false}]
    },{
      selected: false,
      editable: true,
      send:false,
      mode: 'edit', //  display ||  edit
      taskNum: '001',
      taskInfo: {miles:'86', time:'7.1', production:'20', amount:30,},
      carInfo:{carType:'机扫车',driver:'张全蛋',phone:'15050655263',carNum:'苏E12345'},
      collectionSpots:[{val:'汪汪汪',moveIn:false}, {val:'喵喵喵',moveIn:false},{val:'咩咩咩',moveIn:0},
      {val:'吱吱吱',moveIn:false},{val:'嘿嘿嘿',moveIn:false},{val:'嘻嘻嘻',moveIn:false}]
    },{
      selected: false,
      editable: true,
      send:false,
      mode: 'edit', //  display ||  edit
      taskNum: '001',
      taskInfo: {miles:'86', time:'7.1', production:'20', amount:30,},
      carInfo:{carType:'机扫车',driver:'张全蛋',phone:'15050655263',carNum:'苏E12345'},
      collectionSpots:[{val:'汪汪汪',moveIn:false}, {val:'喵喵喵',moveIn:false},{val:'咩咩咩',moveIn:0},
      {val:'吱吱吱',moveIn:false},{val:'嘿嘿嘿',moveIn:false},{val:'嘻嘻嘻',moveIn:false}]
    }]
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *fetchRemote({ payload }, { call, put }) {
    },
    *saveChanges({payload},{call,put}){
        yield put({type:'saveSuccess'});
    },
    *sendOut({payload}, {call,put}){
        yield put({type:'sendSuccess'});
    }
  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
    getSuccess(state, action){

        return {...state}
    },
    sendSuccess(state, action){
        let newcarlist = state.carlist.map((item,index)=>{
            if(state.selectedItems.indexOf(index) > -1 ){
                return {...item,send:true,editable:false, mode:'display'}
            }
            else{
                return {...item}
            }
        })
        return {...state,selectedItems:[],carlist:newcarlist}
    },
    saveSuccess(state, action){
        return {...state}
    },
    taskSelect(state, action){
      let taskIndex = action.payload.rowIndex;
      console.log('select:'+ taskIndex);
      // 更新当前行的状态
      state.carlist[taskIndex].selected = !state.carlist[taskIndex].selected;
      // 更新selected列表
      let newSelectedItems = [];
      state.carlist.forEach((item,index)=>{
        if(item.selected){
            newSelectedItems.push(index);
        }
      })
      console.log(newSelectedItems);
      return {...state, selectedItems:newSelectedItems}
    },
    moveSpot(state, action){
        let {oldSpotIndex,newSpotIndex,newRowIndex,oldRowIndex} = action.payload;
        if(newRowIndex===oldRowIndex){
            let spotList = state.carlist[oldRowIndex].collectionSpots;
            let spotVal = spotList[oldSpotIndex];
            if (oldSpotIndex > newSpotIndex){
                spotList.splice(oldSpotIndex,1);
                spotList.splice(newSpotIndex,0,spotVal);
            }
            else if(oldSpotIndex < newSpotIndex){
                spotList.splice(newSpotIndex,0,spotVal);
                spotList.splice(oldSpotIndex,1);
            }   
        }
        else{
            let newSpotsList = state.carlist[newRowIndex].collectionSpots;
            let oldSpotList = state.carlist[oldRowIndex].collectionSpots;
            let spotVal = oldSpotList[oldSpotIndex];
            oldSpotList.splice(oldSpotIndex,1);
            newSpotsList.splice(newSpotIndex,0,spotVal);
        }
           
        return {...state};
    },
    deleteSpot(state, action){
        let {rowIndex,spotIndex} = action.payload;
        let spotsList = state.carlist[rowIndex].collectionSpots;
        spotsList.splice(spotIndex,1);
        return {...state};
    },
    updateSpot(state, action){
        let {rowIndex,spotsList} = action.payload;
        state.carlist[rowIndex].collectionSpots = spotsList;
        return {...state};
    },
    moveIn(state, action){
        let {rowIndex,spotIndex} = action.payload;
        state.carlist[rowIndex].collectionSpots[spotIndex].moveIn = true;
        return {...state};

    },
    moveOut(state, action){
        let {rowIndex,spotIndex} = action.payload;
        state.carlist[rowIndex].collectionSpots[spotIndex].moveIn = false;
        return {...state};
    }

  },

}