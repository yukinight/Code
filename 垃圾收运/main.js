require(["text!card_template.html","jquery.min","echarts","arttemplate-native"],function(){
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

	// function card(data, card_index){
	// 	this.genHTML = function(){
	// 		return '<li class="card_area">\
	// 			<div class="card_left_panel">\
	// 				<ul>\
	// 					<li class="cldli"><i class="iconfont carstatusicon">&#xe6ff;</i>'+ data.car_number +'</li>\
	// 					<li class="cldli"><i class="iconfont carstatusicon">&#xe637;</i>'+ data.car_type +'</li>\
	// 					<li class="cldli"><i class="iconfont carstatusicon">&#x3443;</i>'+ data.driver +'</li>\
	// 					<li class="cldli"><i class="iconfont carstatusicon">&#xe603;</i>'+ data.phone +'</li>\
	// 				</ul>\
	// 			</div>\
	// 			<div class="card_right_panel">\
	// 				<ul>\
	// 					<li class="crdli">里程 <span class="crdv">'+ data['里程'].max +'/<span style="color:red;">'+ data['里程'].current +'</span> km</span> </li>\
	// 					<li class="crdli">产量 <span class="crdv">'+ data['产量'].max +'/<span style="color:red;">'+ data['产量'].current +'</span> t</span> </li>\
	// 					<li class="crdli">耗时 <span class="crdv">'+ data['耗时'].max +'/<span style="color:red;">'+ data['耗时'].current +'</span> h</span> </li>\
	// 				</ul>\
	// 			</div>\
	// 			<div class="card_mid_panel">\
	// 				<div class="card_mid_left">\
	// 					<div id="cd1p_'+ card_index +'" style="width:100px;height:100px;"></div>\
	// 				</div>\
	// 				<div class="card_mid_right">\
	// 					<div class="timelistwraptable"><div class="timelistwrapcell">\
	// 					<ul>\
	// 			            '+ this.timeLineHTML(data.time_status) +
	// 			        '</ul>\
	// 			        </div></div>\
	// 			        <div class="clear"></div>\
	// 				</div>\
	// 			</div>\
	// 			<div class="clear"></div>\
	// 		</li>';
	// 	}

	// 	this.timeLineHTML = function(time_data){
	// 		var tl_html = '';
	// 		// console.log(time_data);
	// 		var did_len = time_data.did.length;
	// 		var will_len = time_data.will.length;
	// 		var status_mapping = {
	// 			0: 'cst3',
	// 			1: 'cst1',
	// 			2: 'cst2'
	// 		}
	// 		// <li class='cstli cstline1'><div class='cstdiv cst1'><div class="csttime">04:50</div></div></li>
	// 		for(var i=0;i<did_len;i++){
	// 			var current_status = time_data.did[i];
	// 			if(i==did_len-1){
	// 				if(will_len)
	// 					tl_html += '<li class="cstli cstline2">';
	// 				else
	// 					tl_html += '<li class="cstli">';
	// 			}
	// 			else
	// 				tl_html += '<li class="cstli cstline1">';
	// 			tl_html += '<div class="cstdiv '+ status_mapping[current_status.status] +'"><div class="csttime">'+ current_status.time +'</div></div></li>';
	// 		}
	// 		for(var i=0;i<will_len;i++){
	// 			var current_status = time_data.will[i];
	// 			if(i==will_len-1)
	// 				tl_html += '<li class="cstli">';
	// 			else
	// 				tl_html += '<li class="cstli cstline2">';
	// 			tl_html += '<div class="cstdiv '+ status_mapping[current_status.status] +'"><div class="csttime">'+ current_status.time +'</div></div></li>';
	// 		}
	// 		return tl_html;
	// 	}

	// 	this.appendToPage = function(ul_id){
	// 		$('#'+ul_id).append(this.genHTML());
	// 		var myEC = new myEchart();
	// 		var chart = myEC.initCollectionPercent('cd1p_'+card_index);
	// 		chart.setOption(myEC.genOpt4CP({finish: data.finish}));
	// 	}
	// }


	// ------------------------------Main--------------------------------------

	var myEC = new myEchart();
	var chart1 = myEC.initCollectionStatus('status_chart_area');
	var chart2 = myEC.initGarbageAmount('amount_chart_area');

	var data1 = {"逾期未收":90, "按时收运":600};
	var data2 = {x:['日产量', '预计量', '已收量'], y:[500, 450, 300]};


	// chart1.showLoading();
	// chart2.showLoading();

	setTimeout(function(){
		// chart1.hideLoading();
		chart1.setOption(myEC.genOpt4CS(data1));
		// chart2.hideLoading();
		chart2.setOption(myEC.genOpt4GA(data2));
	},3000);

	var card_tmp= template('cards_group_tmp');
	$.getJSON('data.txt').done(function(data){
		// data处理
		for(var i=0;i<data.length;i++){
			var did_list = data[i]['transStatus']['did'];
			var will_list = data[i]['transStatus']['will'];
			for(var j=0;j<did_list.length;j++){
				did_list[j]['line_status'] = 1;
				if(j==did_list.length-1){
					if(will_list.length==0)
						did_list[j]['line_status'] = 0;
					else
						did_list[j]['line_status'] = 2;
				}
			}
			for(var j=0;j<will_list.length;j++){
				will_list[j]['line_status'] = 2;
				if(j==will_list.length-1){
					will_list[j]['line_status'] = 0;
				}
			}
		}
		// 模板加载
		$('#cards_area').html(card_tmp({'list':data}))
		// 模板中echart加载
		for(var i=0;i<data.length;i++){
			var myEC = new myEchart();
			var chart = myEC.initCollectionPercent('cd1p_'+i);
			chart.setOption(myEC.genOpt4CP({finish: data[i].finish}));
		}
	});
})