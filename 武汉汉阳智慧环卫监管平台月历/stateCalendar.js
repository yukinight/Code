/**
 * 
 * @authors TianQi Zhang
 * @date    2016-12-22 11:23:08
 * @version $1.0$
 */

// 调用方法：
// new stateCalendar({
// 	containerID: 'c1',
// 	year: 2016,
// 	month: 3,
// 	dayState:{
// 		normal:[5,6,9,15,18,22],
// 		abnormal:[3,11,17,26,28]
// 	},
// 	monthChange: function(time_str){
// 		// time_str = '2016-8'
// 		var newDayState = {
// 			normal:[5,6,9,15,18,22],
// 			abnormal:[3,11,17,26,28]
// 		}
// 		return newDayState;
// 	}
// });


function stateCalendar(config){
	this.containerID = config.containerID;
	this.year = config.year;
	this.month = config.month;
	this.dayState = config.dayState;
	this.monthChange = config.monthChange;
	this.weekName = config.weekName || ['日','一', '二', '三', '四', '五', '六'];
	this.stateCssMap = config.stateCssMap || {
		normal: 'status-normal',
		abnormal: 'status-abnormal'
	}
	this.$calendarDiv = null;
	var _this = this;
	

	this.genHead = function(){
		return '<div class="cal-head" name="cal-head"><i class="head-left-arrow" >&lt;</i><span name="month">'+ this.month +'</span>月<span name="year">'+ this.year +'</span>年<i class="head-right-arrow">&gt;</i></div>'
	};

	this.genTable = function(){
		var weekday_of_firstday = moment(this.year+"-"+this.month +"-1","YYYY-M-D").day();
		var last_day = moment(this.year+"-"+this.month,"YYYY-M").daysInMonth();

		var row_num = Math.ceil((last_day+weekday_of_firstday)/7);
		
		var current_date;
		var tb_html = '<div name="cal-body"><table>';
		tb_html += '<tr>';
		for(var i=0, len=this.weekName.length;i<len;i++){
			tb_html += '<td><div class="cal-td">'+ this.weekName[i] +'</div></td>';
		}
		tb_html += '</tr>';
		for(var i=0;i<row_num;i++){
			tb_html += '<tr>';
			for(var j=0;j<7;j++){
				current_date = i*7+j- weekday_of_firstday +1;
				if(current_date>=1 && current_date <=last_day){
					var status_class = '';
					for(var state in this.dayState){
						if(this.dayState[state].indexOf(current_date)>-1){
							status_class = this.stateCssMap[state];
							break;
						}
					}
					tb_html += '<td><div class="cal-td '+ status_class +'">'+ current_date +'</div></td>';
				}
				else{
					tb_html += '<td></td>';
				}
			}
			tb_html += '</tr>';
		}
		tb_html += '</table></div>';
		return tb_html;
	};

	this.genHtml = function(){
		return '<div class="calendarSec">'+this.genHead() + 
		this.genTable() + '</div>';
	};

	this.init = function(containerID){
		_this.$calendarDiv = $(this.genHtml()).appendTo('#'+containerID)
		.find('div.cal-head > i.head-left-arrow').click(function(){
			var new_time = moment(_this.year+'-'+_this.month,'YYYY-M').subtract(1, 'month');
			_this.year = new_time.year();
			_this.month = new_time.month()+1;
			_this.dayState = _this.monthChange(new_time.format('YYYY-M')) || _this.dayState;
			_this.refresh();
		}).end().find('div.cal-head > i.head-right-arrow').click(function(){
			var new_time = moment(_this.year+'-'+_this.month,'YYYY-M').add(1, 'month');
			_this.year = new_time.year();
			_this.month = new_time.month()+1;
			_this.dayState = _this.monthChange(new_time.format('YYYY-M')) || _this.dayState;
			_this.refresh();
		}).end();
	}

	this.refresh = function(){
		_this.$calendarDiv.find('span[name=month]').text(_this.month).end().find('span[name=year]').text(_this.year).end().find('div[name=cal-body]').replaceWith(_this.genTable());
	}

	this.init(this.containerID);
}