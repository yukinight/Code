// JSON: [{key:'',value:''}]
// [{key:'作业时间',value:'8:30:00~12:30:00'},
// {key:'作业类型',value:'洒水作业'},
// {key:'作业路段',value:'独墅湖大道'}]
function dataToTable(data){
	var tb_tag = '<table>';
	for(var i=0,len=data.length;i<len;i++){
		tb_tag += '<tr><td>'+ data[i].key +':</td><td>'+ data[i].value +'</td></tr>';
	}
	tb_tag += '</table>';
	return tb_tag;
}

function genCalendarData(){
	var data = [
		{
			title: '附加数据1',
			start: '2016-12-07',
			end: '2016-12-10',
			data:[
				{key:'作业时间',value:'8:30:00~12:30:00'},
				{key:'作业类型',value:'洒水作业111'},
				{key:'作业路段',value:'独墅湖大道'}
			],
			color: '#64A4FC'
		},
		{
			title: '附加数据2',
			start: '2016-12-02',
			end: '2016-12-09',
			data:[
				{key:'作业时间',value:'8:30:00~12:30:00'},
				{key:'作业类型',value:'洒水作业222'},
				{key:'作业路段',value:'独墅湖大道'}
			],
			color: '#66BB6A'
		},
		{
			title: '附加数据3',
			start: '2016-12-12',
			end: '2016-12-18',
			data:[
				{key:'作业时间',value:'8:30:00~12:30:00'},
				{key:'作业类型',value:'洒水作业333'},
				{key:'作业路段',value:'独墅湖大道'}
			],
			color: '#4D7FC3'
		},
		{
			title: '附加数据4',
			start: '2016-12-07',
			end: '2016-12-20',
			data:[
				{key:'作业时间',value:'8:30:00~12:30:00'},
				{key:'作业类型',value:'洒水作业444'},
				{key:'作业路段',value:'独墅湖大道'}
			],
			color: '#982672'
		},
		{
			title: '附加数据5',
			start: '2016-12-22',
			end: '2016-12-22',
			data:[
				{key:'作业时间',value:'8:30:00~12:30:00'},
				{key:'作业类型',value:'洒水作业555'},
				{key:'作业路段',value:'独墅湖大道'}
			],
			color: '#4D7FC3'
		},
	]

	return data;
}

$(document).ready(function() {

	$('#m_calendar').fullCalendar({
		header:{
		    left:   'prev,next today',
		    center: 'title',
		    right:  'myCustomButton',
		},
		customButtons: {
	        myCustomButton: {
	            text: '新增路段作业规则',
	            click: function() {
	                alert('clicked the custom button!');
	            }
	        }
	    },
	    height: $('#m_calendar').height(),
	    firstDay:1,
		editable: false,
		eventLimit: true, // allow "more" link when too many events
		events: genCalendarData(),
		eventClick: function(calEvent, jsEvent, view) {
			// console.log(calEvent.data)
			var d = dialog({
				id:'popup',
			    title: '时段信息',
			    content: dataToTable(calEvent.data),
			    quickClose: true,
			    okValue: '确定',
		        ok: function () {
		            this.title('提交中…');
		            return false;
		        },
		        cancelValue: '取消',
		        cancel: function () {
		        	
		        }
			});
			d.show();		        
	    }
	});

	var left_calendar1 = new stateCalendar({
		containerID: 'lc1',
		year: 2016,
		month: 11,
		dayState:{
			normal:[5,6,9,15,18,22],
			abnormal:[3,11,17,26,28]
		},
		monthChange: function(time_str){
			// time_str = '2016-8'
			var newDayState = {
				normal:[5,6,9,15,18,22],
				abnormal:[3,11,17,26,28,31]
			}
			return newDayState;
		}
	});

	var left_calendar2 = new stateCalendar({
		containerID: 'lc2',
		year: 2016,
		month: 12,
		dayState:{
			normal:[5,6,9,15,18,22],
			abnormal:[3,11,17,26,28]
		},
		monthChange: function(time_str){
			var newDayState = {
				normal:[5,6,9,15,18,22],
				abnormal:[3,11,17,26,28]
			}
			return newDayState;
		}
	});
	
});