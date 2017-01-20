
export default {

    namespace: 'toolBar',

    state: {
        layerButton: [{
            name:'区域图',
            active: false,
        },{
            name:'热力图',
            active: true,
        },{
            name:'异常事件',
            active: false,
        },{
            name:'数据',
            active: false,
        },{
            name:'收集点',
            active: true,
        },{
            name:'商户',
            active: false,
        },{
            name:'路线',
            active: false,
        },{
            name:'视频点',
            active: false,
        },{
            name:'清运车辆',
            active: false,
        },],
        linkButton : [{
            name: '路线'
        },{
            name: '商户'
        },],
        showLayer:false,
        showLink:false,
    },

    subscriptions: {
        setup({ dispatch, history }) {
        },
    },

    effects: {
        *fetchRemote({ payload }, { call, put }) {
        },
    },

    reducers: {
        fetch(state, action) {
            return { ...state, ...action.payload };
        },
        switchLyBtState(state, action){
            const {index} = action.payload;
            let updatedLayerButton = [...state.layerButton];
            updatedLayerButton[index].active = !updatedLayerButton[index].active;
            return {...state, layerButton:updatedLayerButton};
        },
        switchLyBar(state, action){
            return {...state,showLayer:!state.showLayer}
        },
        switchLkBar(state, action){
            return {...state,showLink:!state.showLink}
        }
    },

}