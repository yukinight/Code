      
export default {
    namespace: 'slideStateList',

    state: {
        marginLeft: 0,
        leftArrow: false,
        rightArrow: false,
        PADDING : 80,
        ELEWIDTH : 100,
        showImgModal: false,
        firstImgIndex:0,
        currentImg:0
    },

    subscriptions: {
        setup({ dispatch, history }) {

        },
    },

    effects: {
        *fetchRemote({ payload }, { call, put }) {
            
        },
        *slide({ payload }, { call, put }){  
            const {direction, width, spotNum} = payload;
            yield put({type:'setMargin',payload:{
                direction, width
            }});
            yield put({type:'updateArrowState',payload:{
                spotNum, ctWidth: width
            }});
        }

    },

    reducers: {
        fetch(state, action) {
            return { ...state, ...action.payload };
        },
        setMargin(state, action){
            let {direction,width} = action.payload;
            width = width - state.PADDING ;
            width = width < state.ELEWIDTH ? state.ELEWIDTH : state.ELEWIDTH*(parseInt(width/state.ELEWIDTH));
            let ml = state.marginLeft;
            if(direction==='left'){
              ml += width;
              if(ml>0)
                  ml = 0;
            }
            else{
              ml -= width;
            }
            return {...state, marginLeft:ml};
        },
        updateArrowState(state, action){
            const {ctWidth,spotNum} = action.payload;
            let newstt = {
                leftArrow: state.marginLeft < 0 ? true : false,
                rightArrow: state.marginLeft > state.ELEWIDTH*parseInt((ctWidth - state.PADDING)/state.ELEWIDTH) - state.ELEWIDTH*spotNum ? true : false,
            }; 
            return {...state, ...newstt};
        },
        imgModalToggle(state, action){
            const {show, index=0} = action.payload;
            return {...state, showImgModal:show,firstImgIndex:index, currentImg:index}
        },
        changeCurrent(state, action){
            const {index} = action.payload;
            return {...state, currentImg:index}
        },
        imgSlide(state, action){
            const {direction,spotNum} = action.payload;
            let newIndex = state.firstImgIndex;
            if(direction==='left'){
                newIndex -= 4;
                newIndex = newIndex<0 ? 0 : newIndex;
            }
            else{
                newIndex += 4;
                newIndex = newIndex>=spotNum ? spotNum-1 : newIndex;
            }
            return {...state, firstImgIndex:newIndex, currentImg:newIndex}
        }
    },

}