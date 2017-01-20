import { getAreaOpts } from '../services/remoteData';

export default {

  namespace: 'bottomPanel',

    state: {
        show:true,
        areaOptions:[],
    },

    subscriptions: {
        setup({ dispatch, history }) {
            dispatch({type:'fetchRemote'});
        },
    },

    effects: {
        *fetchRemote({ payload }, { call, put }) {
            const {data} = yield call(getAreaOpts);
            if(!data)return;
            yield put({type:'fetch',payload:{areaOptions:data.map(d => d.name)}});     
        },
    },

    reducers: {
        fetch(state, action) {
            return { ...state, ...action.payload };
        },
        toggle(state,action){
            return {...state, show:!state.show}
        },
    },

}
