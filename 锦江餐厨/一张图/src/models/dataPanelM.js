import { getDataPnData,getDataChart } from '../services/remoteData'

let tableData = [];
// for (let i = 0; i < 100; i++) {
//   tableData.push({
//     key: i,
//     area: `姑苏区 ${i}`,
//     today: 50,
//     average: 110,
//     spot_status: '20/50',
//     trash_status: '36/66',
//     merchant_status: '36/66'
//   });
// }

let chartsOption = {
    // week:{
    //     tooltip : {
    //       trigger: 'axis',
    //         textStyle: {
    //         fontSize: 9,
    //       }
    //     },
    //     grid: {
    //       left: '3%',
    //       right: '4%',
    //       bottom: '3%',
    //       top: '8%',
    //       containLabel: true
    //     },
    //     xAxis :{
    //         type : 'category',
    //         boundaryGap : false,
    //         data : ['周一','周二','周三','周四','周五','周六','周日'],
    //         axisLabel:{
    //           textStyle:{
    //             fontSize: 9,
    //           }
    //         },
    //   },
    //   yAxis : {
    //     type : 'value',
    //     axisLabel:{
    //       textStyle:{
    //         fontSize: 9,
    //       }
    //     },
    //   },
    //   series : [
    //     {
    //         name:'邮件营销',
    //         type:'line',
    //         stack: '总量',
    //         areaStyle: {normal: {}},
    //         data:[120, 132, 101, 134, 90, 230, 210]
    //     },
    //     {
    //         name:'联盟广告',
    //         type:'line',
    //         stack: '总量',
    //         areaStyle: {normal: {}},
    //         data:[220, 182, 191, 234, 290, 330, 310]
    //     },
    //     {
    //         name:'视频广告',
    //         type:'line',
    //         stack: '总量',
    //         areaStyle: {normal: {}},
    //         data:[150, 232, 201, 154, 190, 330, 410]
    //     },
    //     {
    //         name:'直接访问',
    //         type:'line',
    //         stack: '总量',
    //         areaStyle: {normal: {}},
    //         data:[320, 332, 301, 334, 390, 330, 320]
    //     },
    //     {
    //         name:'搜索引擎',
    //         type:'line',
    //         stack: '总量',
    //         areaStyle: {normal: {}},
    //         data:[820, 932, 901, 934, 1290, 1330, 1320]
    //     }
    //   ]
    // }
};


const chartDataHandler = (rawData)=>{
    let config = {
        tooltip : {
            trigger: 'axis',
            textStyle: {
                fontSize: 9,
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '8%',
            containLabel: true
        },
        xAxis :{
            type : 'category',
            boundaryGap : false,
            data : [],
            axisLabel:{
              textStyle:{
                fontSize: 9,
              }
            },
        },
        yAxis : {
            type : 'value',
            axisLabel:{
                textStyle:{
                    fontSize: 9,
                }
            },
        },
        series : []
    }
    if(rawData.xAxisData){
        config.xAxis.data = [...rawData.xAxisData];
    }
    if(rawData.seriesData){
        for(let seriesData of rawData.seriesData){
            config.series.push({
                name: seriesData.name,
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: seriesData.data
            });
        }
    }
    return config;
}

export default {

  namespace: 'dataPanel',

  state: {
    // left panel
    collectQty:{
        today: 0,
        average: 0,
    },
    enterQty:{
        today: 0,
        average: 0,
    },
    thermodynamicCheck: false,
    areaCheck: false,

    // right panel
    chartCat: 'week',
    chartOption: undefined,
    chartLoading:false,
    // mid panel
    tableData:tableData,
    
  },

  subscriptions: {
    setup({ dispatch, history }) {
        dispatch({type:'fetchRemote'});
        dispatch({type:'changeChartCat',payload:{chartCat:'week'}});
    },
  },

  effects: {
    *fetchRemote({ payload }, { call, put }) {
        const {data} = yield call(getDataPnData);
        if(!data) return;
        yield put({type:'panelStateInit',payload:{data}});
    },
    *changeChartCat({ payload }, { call, put }){
        const newCat = payload.chartCat;
        if(!chartsOption[newCat]){
            yield put({type:'switchChartLoading'});
            const {data} = yield call(getDataChart,{period:newCat});
            if(!data) return;
            chartsOption[newCat] = chartDataHandler(data);
            yield put({type:'switchChartLoading'});
        }
        yield put({type:'setChartOpt',payload:{
            chartOption: chartsOption[newCat]
        }});
    },
  },

  reducers: {
    panelStateInit(state, action){
        let {data} = action.payload;
        tableData = [];
        if(data.panelData){
            data.panelData.forEach((rowData, index)=>{
                tableData.push({
                    key: index,
                    area: rowData.areaName,
                    today: rowData.output,
                    average: rowData.dailyOutput,
                    spot_status: `${rowData.collectedSypointNum}/${rowData.sypointNum}`,
                    trash_status: `${rowData.collectedRfidNum}/${rowData.rfidNum}`,
                    merchant_status: `${rowData.collectedRestaurantNum}/${rowData.restaurantNum}`
                });
            });
        }
        return {...state, 
            collectQty: {today:data.output, average:data.dailyOutput},
            enterQty: {today:data.input, average:data.dailyInput},
            tableData
        }
    },
    changeThermodynamicCheck(state, action){
        let {thermodynamicCheck} = action.payload;
        return {...state, thermodynamicCheck}
    },
    changeAreaCheck(state, action){
        let {areaCheck} = action.payload;
        return {...state, areaCheck}
    },
    switchChartLoading(state, action){
        return {...state, chartLoading:!state.chartLoading};
    },
    setChartOpt(state, action){
        let {chartOption} = action.payload;
        return {...state, chartOption}
    },
    changeChartCat(state, action){
        const newCat = action.payload.chartCat;
        return {...state, chartCat:newCat}
    },
  },

}