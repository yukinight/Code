
export default {

  namespace: 'shoppingCartD',

  state: {
    total:0,
    loading:false,
    orders:[
      {
        name:"卡拉丁汽车上门保养服务+保养qichefuwu",
        picSrc:"../img/QQ截图20161214093021.png",
        subName:"规格 M3201",
        price:300.50,
        qty:2,
        selected:false,
        showConfirm:false
      },
      {
        name:"卡拉丁汽车上门保养服务+保养qichefuwu",
        picSrc:"../img/QQ截图20161214093021.png",
        subName:"规格 M3201",
        price:100.32,
        qty:5,
        selected:true,
        showConfirm:false
      },
      {
        name:"卡拉丁汽车上门保养服务+保养qichefuwu",
        picSrc:"../img/QQ截图20161214093021.png",
        subName:"规格 M3201",
        price:300,
        qty:2,
        selected:false,
        showConfirm:false
      },
      {
        name:"卡拉丁汽车上门保养服务+保养qichefuwu",
        picSrc:"../img/QQ截图20161214093021.png",
        subName:"规格 M3201",
        price:100,
        qty:5,
        selected:true,
        showConfirm:false
      },
    ]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({type:'sumTotal'});
    },
  },

  effects: {
    *fetchRemote({ payload }, { call, put }) {
    },
    *getInitialData({ payload }, { call, put }){
      const {data} = payload;
      // yield call();
      yield put({type:'handleInitialData',payload:{data}})
      yield put({type:'sumTotal'});
    },
    *sendRemoveProd({ payload }, { call, put }){
      const {orderIndex} = payload;
      yield call();
      // yield put({type:'removeProd',payload});
      // yield put({type:'shoppingCartD/sumTotal'});
    },
    *sendQtyChange({ payload }, { call, put }){
      // yield put({type:'shoppingCartD/changeQTY',payload:{orderIndex,changedQty}});
    },
    *submitOrder({ payload }, { call, put }){

    }

  },

  reducers: {
    fetch(state, action) {
      return { ...state, ...action.payload };
    },
    handleInitialData(state, action){
      const {data} = action.payload;
      let orders = data.orders;
      orders = orders.map((item)=>{
        item = {...item, selected:false, showConfirm:false}
        return item;
      })
      return {
        total:0,
        loading:false,
        orders
      }
    },
    sumTotal(state, action){
      let sum = 0;
      state.orders.forEach(function(item){
        if(item.selected){
          sum += item.price*item.qty;
        }
      });
      sum = sum.toFixed(2);
      return {...state, total:sum}
    },
    addQty(state, action){
      let {orderIndex} = action.payload;
      state.orders[orderIndex].qty += 1;
      return {...state};
    },
    minusQty(state, action){
      let {orderIndex} = action.payload;
      if(state.orders[orderIndex].qty>1){
        state.orders[orderIndex].qty -= 1;
      }
      return {...state};
    },
    changeQTY(state, action){
      let {orderIndex,changedQty} = action.payload;
      if(/^\d*$/.test(changedQty)){
        state.orders[orderIndex].qty = changedQty;
      }
      return {...state};
    },
    qtyValid(state, action){
      let {orderIndex,changedQty} = action.payload;
      changedQty = parseInt(changedQty)>0 ? parseInt(changedQty) : 1;
      state.orders[orderIndex].qty = changedQty
      return {...state};
    },
    selectProd(state, action){
      let {orderIndex} = action.payload;
      state.orders[orderIndex].selected = !state.orders[orderIndex].selected;
      return {...state};
    },
    showConfirm(state, action){
      let {orderIndex} = action.payload;
      state.orders[orderIndex].showConfirm = true;
      return {...state};
    },
    hideConfirm(state, action){
      let {orderIndex} = action.payload;
      state.orders[orderIndex].showConfirm = false;
      return {...state};
    },
    removeProd(state, action){
      let {orderIndex} = action.payload;
      state.orders.splice(orderIndex, 1);
      return {...state};
    },
    subOrder(state, action){

    }
  },

}
