// require(["vortex.chart.lib" ], function(){
	function myEchart(){
		this.initCollectionStatus = function(div_id){
			var myChart = echarts.init(document.getElementById(div_id));
			var option = {
				color: ['#FECCBA','#FF7242'],
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    series : [
			        {
			            name: '收运状态',
			            type: 'pie',
			            radius : '55%',
			            center: ['50%', '60%'],
			            data: [],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			};
			myChart.setOption(option);
			return myChart;
		},

		this.genOpt4CS = function(data){
			// data = {"逾期未收":90, "按时收运":600}
			return {
				series :[{
					data:[
		            	{
		            		value:data["逾期未收"], 
		            		name:'逾期未收',
		            		label:{
		            			normal:{
		            				 formatter: '逾期未收数量: {c}',
		            				 textStyle: {
		            				 	color: '#7A8895'
		            				 }
		            			}
		            		}
		            	},
		                {
		                	value:data["按时收运"], 
		                	name:'按时收运',
		                	label:{
		                		normal:{
		                			 formatter: '按时收运率: {d}%',
		                			 textStyle: {
		            				 	color: '#7A8895'
		            				 }
		                		}
		                	}
		                }
		            ]
				}]
			}
		},

		this.initGarbageAmount = function(div_id){
			var myChart = echarts.init(document.getElementById(div_id));
			option = {
			    color: ['#00C60C'],//'#3398DB'
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            
			            type : 'shadow'
			        },
			        formatter: "{b} : {c}t"
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : [],
			            axisTick: {
			            	show: false,
			                alignWithLabel: true
			            }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            boundaryGap: ['20%', '20%'],
			            axisLabel:{formatter: '{value}t'}
			        }
			    ],
			    series : [
			        {
			            name:'垃圾规模',
			            type:'bar',
			            label:{
			            	normal:{
			            		show:true,
			            		formatter: '{c}t',
			            		position: 'top'
			            	}
			            }
			        }
			    ]
			};
			myChart.setOption(option);
			return myChart;
		},

		this.genOpt4GA = function(data){
			// data = {x:['日产量', '预计量', '已收量'],y:[500, 450, 300]}
			return {
				xAxis : [
			        {
			            data : data.x,
			        }
			    ],
			    series : [
			    	{
			    		data:data.y,
			    	}
			    ]
			}
		},

		this.initCollectionPercent = function(div_id){
			var myChart = echarts.init(document.getElementById(div_id));
			option = {
			    tooltip : {
			        trigger: 'item',
			        formatter: "{b} :  {d}%"
			    },
			    series : [
			        {
			            type: 'pie',
			            radius : ['45%', '70%'],
			            label: {
			                normal: {
			                    position: 'center'
			                }  
			            },
			            avoidLabelOverlap: false,
			            data:[]
			        }
			    ]
			};
			myChart.setOption(option);
			return myChart;
		},
		this.genOpt4CP = function (data) {
			// data = {finish:60}
			return {
			    series : [
			        {
			            data:[
			                {
			                    value:data.finish, 
			                    name:'完成率',
			                    itemStyle: {
			                        normal: {
			                            color: '#5B9FF5'
			                        }
			                    },
			                    label: {
			                        normal: {
			                            formatter: '{d}%',
			                            textStyle: {
			                                fontSize: 12,
			                                fontWeight: 'bold'
			                            }
			                        }
			                    }
			                },
			                {
			                    value:100-data.finish, 
			                    name:'占位',
			                    tooltip: {
			                        show: false
			                    },
			                    itemStyle: {
			                        normal: {
			                            color: '#D2DDDD'
			                        }
			                    },
			                    label: {
			                        normal: {
			                            show:false
			                        }
			                    }
			                }
			            ]
			        }
			    ]
			};
		}
	}

	function card(data, card_index){
		this.genHTML = function(){
			return '<li class="card_area">\
				<div class="card_left_panel">\
					<ul>\
						<li class="cldli"><i class="iconfont carstatusicon">&#xe6ff;</i>'+ data.carCode +'</li>\
						<li class="cldli"><i class="iconfont carstatusicon">&#xe637;</i>'+ data.carType +'</li>\
						<li class="cldli"><i class="iconfont carstatusicon">&#x3443;</i>'+ data.driver +'</li>\
						<li class="cldli"><i class="iconfont carstatusicon">&#xe603;</i>'+ data.phone +'</li>\
					</ul>\
				</div>\
				<div class="card_right_panel">\
					<ul>\
						<li class="crdli">里程 <span class="crdv">'+ data.transMiles.max +'/<span style="color:red;">'+ data.transMiles.current +'</span> km</span> </li>\
						<li class="crdli">产量 <span class="crdv">'+ data.weight.max +'/<span style="color:red;">'+ data.weight.current +'</span> t</span> </li>\
						<li class="crdli">耗时 <span class="crdv">'+ data.duration.max +'/<span style="color:red;">'+ data.duration.current +'</span> h</span> </li>\
					</ul>\
				</div>\
				<div class="card_mid_panel">\
					<div class="card_mid_left">\
						<div id="cd1p_'+ card_index +'" style="width:100px;height:100px;"></div>\
					</div>\
					<div class="card_mid_right">\
						<div class="timelistwraptable"><div class="timelistwrapcell">\
						<ul>\
				            '+ this.timeLineHTML(data.transStatus) +
				        '</ul>\
				        </div></div>\
				        <div class="clear"></div>\
					</div>\
				</div>\
				<div class="clear"></div>\
			</li>';
		}

		this.timeLineHTML = function(time_data){
			var tl_html = '';
			// console.log(time_data);
			var did_len = time_data.did.length;
			var will_len = time_data.will.length;
			var status_mapping = {
				0: 'cst3',  //未收
				1: 'cst1',  //已收
				2: 'cst2'   //延时收
			}
			// <li class='cstli cstline1'><div class='cstdiv cst1'><div class="csttime">04:50</div></div></li>
			for(var i=0;i<did_len;i++){
				var current_status = time_data.did[i];
				if(i==did_len-1){
					if(will_len)
						tl_html += '<li class="cstli cstline2">';
					else
						tl_html += '<li class="cstli">';
				}
				else
					tl_html += '<li class="cstli cstline1">';
				tl_html += '<div class="cstdiv '+ status_mapping[current_status.status] +'"><div class="csttime">'+ current_status.time +'</div></div></li>';
			}
			for(var i=0;i<will_len;i++){
				var current_status = time_data.will[i];
				if(i==will_len-1)
					tl_html += '<li class="cstli">';
				else
					tl_html += '<li class="cstli cstline2">';
				tl_html += '<div class="cstdiv '+ status_mapping[current_status.status] +'"><div class="csttime">'+ current_status.time +'</div></div></li>';
			}
			return tl_html;
		}

		this.appendToPage = function(ul_id){
			$('#'+ul_id).append(this.genHTML());
			var myEC = new myEchart();
			var chart = myEC.initCollectionPercent('cd1p_'+card_index);
			chart.setOption(myEC.genOpt4CP({finish: data.finish}));
		}
	}

	function addCards(cards_info,cards_ul_id){
		for(var i=0;i<cards_info.length;i++){
			var the_card = new card(cards_info[i],i);
			the_card.appendToPage(cards_ul_id);
		}
	}


	// ------------------------------Main--------------------------------------

	var myEC = new myEchart();
	var chart1 = myEC.initCollectionStatus('status_chart_area');
	var chart2 = myEC.initGarbageAmount('amount_chart_area');

	// var data1 = {"逾期未收":90, "按时收运":600};
	// var data2 = {x:['日产量', '预计量', '已收量'], y:[500, 450, 300]};

	// 收运状态饼图
	chart1.showLoading();
	$.ajax({
		url: 'cloud/page/ljsy/taskTransKanBan/getPieChartData.jhtml',
		type: 'get',
		dataType: 'json',
	})
	.done(function(data) {
		chart1.setOption(myEC.genOpt4CS(data));
	})
	.fail(function() {
		console.log("getPieChartData error");
	})
	.always(function() {
		chart1.hideLoading();
	});


	// 垃圾规模柱状图
	chart2.showLoading();
	$.ajax({
		url: 'cloud/page/ljsy/taskTransKanBan/getWasteAmountColumnData.jhtml',
		type: 'get',
		dataType: 'json',
	})
	.done(function(data) {
		chart2.setOption(myEC.genOpt4GA(data));
	})
	.fail(function() {
		console.log("getWasteAmountColumnData error");
	})
	.always(function() {
		chart2.hideLoading();
	});


	// 垃圾车辆运行状态 'cloud/page/ljsy/taskTransKanBan/getTaskItem.jhtml'
	$.getJSON('data.txt')
	.done(function(data){
		// console.log(data);
		addCards(data,'cards_ul');
	});

	// var data =  {
	// 	'carCode':'苏 E12345', 'carType':'机扫车', 'driver':'张全蛋','phone':'15050655263', 
	// 	'transMiles':{max:152, current:86}, 'weight':{max:21.2,current:20},'duration':{max:7.6, current:7.1},
	// 	'finish':50,
	// 	'transStatus':{
	// 		'did':[
	// 			{time:'04:50',status:1},{time:'04:50',status:1},{time:'04:50',status:1},{time:'04:50',status:1},{time:'04:50',status:1},
	// 			{time:'04:50',status:0},{time:'04:50',status:1},{time:'04:50',status:2},{time:'04:50',status:1},{time:'04:50',status:2},{time:'04:50',status:1},
	// 			{time:'04:50',status:1},{time:'04:50',status:1}
	// 		],
	// 		'will':[
	// 			{time:'04:50',status:0},{time:'04:50',status:0},{time:'04:50',status:0},{time:'04:50',status:0},
	// 			{time:'04:50',status:0},{time:'04:50',status:0},{time:'04:50',status:0},{time:'04:50',status:0},{time:'04:50',status:0}
	// 		]
	// 	}
	// }
	// for(var i=0;i<12;i++){
	// 	var the_card = new card(data,i);
	// 	the_card.appendToPage('cards_ul');
	// }
// })
