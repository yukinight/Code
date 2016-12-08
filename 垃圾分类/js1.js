(function(){
	function generateSearchCards(list){
		var listsToHtml = "<ul>";
		for(var i=0;i<list.length;i++){
			var distbinInfo = list[i];
			listsToHtml += '<li class="resCard">\
				<div class="picAreaInCard"><img src="'+ distbinInfo.src +'" class="dustbinPic"></div>\
				<div class="dustbinLabel">\
					<div class="dustbinName">'+ distbinInfo.name +'</div>\
					<div class="dustbinPos">'+ distbinInfo.pos +'</div>\
				</div>\
			</li>'
		}
		listsToHtml += '</ul>'
		return listsToHtml;
	}

	function generateDetailNavBar(list){
		var width_percent = parseInt(100/list.length);
		var li_list_html = '';
		for(var i=0;i<list.length;i++){
			if(i==0){
				li_list_html += '<li class="tabLable selected" style="width:'+ width_percent +'%;">'+ list[i].type +'</li>';
			}
			else{
				li_list_html += '<li class="tabLable" style="width:'+ width_percent +'%;">'+ list[i].type +'</li>';
			}
		}
		return '<div >\
			<ul class="detailInfoNavArea">'
				+ li_list_html +
			'</ul>\
		</div>';
	}

	function generateDetailContent(list){
		function singleTab(obj,index){
			var statusDict = {
				0:{text:'正常满溢',color:'#2da24c'},
				1:{text:'轻度满溢',color:'#efb600'},
				2:{text:'严重满溢',color:'#e14029'}
			}
			return (index===0?'<div>':'<div style="display:none;">')+
			'<table style="width:100%;">\
				<tr>\
					<td>满溢状态：</td>\
					<td style="color:'+ statusDict[obj.status].color +'">'+ statusDict[obj.status].text +'</td>\
				</tr>\
				<tr>\
					<td>满溢程度：</td>\
					<td>\
						'+ obj.percent + (obj.overflow.length===0 ? '' : (' \
						<div class="overflowArea">\
							<span class="overflowButton">详情</span>\
							<div class="overflowDegree">\
								<table style="width:100%;border-collapse:collapse;">\
									<tr style="background-color:#98adc7;color:#FFF;">\
										<th>类别</th>\
										<th>容积</th>\
										<th>编码</th>\
										<th>满溢程度</th>\
									</tr>'+ (function(){
										var overflowtrs = obj.overflow;
										var trs_html = ''
										for(var i=0;i<obj.overflow.length;i++){
											var overflow_obj = obj.overflow[i];
											trs_html += '<tr>\
											<td>'+ overflow_obj.type +'</td>\
											<td>'+ overflow_obj.code +'</td>\
											<td>' + overflow_obj.capacity + '</td>\
											<td>' + overflow_obj.percent + '</td>\
											</tr>'
										}
										return trs_html;
									})()
									+
								'</table>\
								<i class="iconfont closeButton">&#xe66c;</i>\
							</div>\
						</div>')) +
					'</td>\
				</tr>\
				<tr>\
					<td>清运人员：</td>\
					<td>'+ obj.personName +'</td>\
				</tr>\
				<tr>\
					<td>当前调度：</td>\
					<td>'+ obj.timePeriod +'</td>\
				</tr>\
				<tr>\
					<td>当前任务：</td>\
					<td>'+ obj.taskStatus +'</td>\
				</tr>\
				<tr>\
					<td>超时时长：</td>\
					<td>'+ obj.overtime +'</td>\
				</tr>\
			</table>\
			</div>';
		}
		var content = '<div class="detailContent">';
		for(var i=0;i<list.length;i++){
			content += singleTab(list[i],i);
		}
		content += '</div>';
		return content;
	}

	function generateDetailBoard(data){
		// var data={num:'SDF-548239',location:'苏州市吴中区苏州大道某某小区',name:'金风科技分类箱',detail:[
		// {type:'厨余垃圾',status:0,percent:'85%',personName:'张全蛋',timePeriod:'15:00 - 15:30',taskStatus:'已超时',overtime:'20分钟',
		// overflow:[{type:'厨余', code:'XX - 5482',capacity:'2456L',percent:'80.8%'},{type:'厨余', code:'XX - 5482',capacity:'2456L',percent:'80.8%'}]},
		// {type:'其他',status:1,percent:'55%',personName:'张全蛋',timePeriod:'15:00 - 15:30',taskStatus:'已超时',overtime:'20分钟',overflow:[]},
		// {type:'其他垃圾',status:2,percent:'25%',personName:'张全蛋',timePeriod:'15:00 - 15:30',taskStatus:'已超时',overtime:'20分钟',overflow:[]}
		// ]}

		return '<div class="detailBoard" id="detailRes">\
			<div class="detailHead">\
				<i class="iconfont backIcon">&#xe655;</i>\
				'+ data.name +'\
			</div>\
			<div>\
				<div class="detailOverview">\
					<div class="detailPicArea"><img src="Artboard 1_MarkMan.png" class="detailPic"></div>\
					<div class="detailLabel">\
						<div class="detailNum">'+ data.num +'</div>\
						<div class="detailPos">'+ data.location +'</div>\
					</div>\
				</div>\
				<div>'
				+ (data.detail.length===0 ? '': (generateDetailNavBar(data.detail)+ generateDetailContent(data.detail))) + 
				'</div>\
			</div>\
		</div>'
	}

	function showThumbnailRes(){
		$('#searchRes').slideUp('200',function(){
			$('#ThumbnailRes').show();
		});
	}

	function showDetailedRes(){
		$('#ThumbnailRes').hide();
		$('#searchRes').slideDown();
	}

	jQuery(document).ready(function($) {
		$(window).resize(function(){
			$('#resBody').css({
				'max-height': $('#left_panel').height()-95+'px'
			});
		});
		$(document).click(function(e){
			// 条件筛选弹框收起
			if($.inArray(e.target, $('li.headLi'))===-1){
				$('li.headLi div[name=popup]').slideUp();
			}
			// console.log($(e.target).parents('div').is($('#left_panel')))
			// console.log($('#searchRes').css('display')!=='none');
			// 点击页面其他位置查询结果收起，方便操作地图
			if(!$(e.target).parents('div').is($('#left_panel'))){
				if($('#searchRes').css('display')!=='none'){
					showThumbnailRes();
				}
			}
		});

		// 清空查询框
		$('#clearInput').click(function(){
			$('#search_text').val('');
		});
		// 查询
		$('#searchButton').click(function(){
		});
		// 展开详细查询结果
		$('#ThumbnailRes').click(function(){
			showDetailedRes();
		});
		// 查询结果筛选
		$('div.headPopUp li').click(function(){

		});

		$('li.headLi').click(function(e){
			e.stopPropagation(); 
			$(this).siblings('li').find('div[name=popup]').slideUp();
			$(this).find('div[name=popup]').slideToggle();
		});
		// 进入详情
		$('#searchRes').on('click','li.resCard',function(){
			// 应通过ajax取数据，此处用mock
			var data={num:'SDF-548239',location:'苏州市吴中区苏州大道某某小区',name:'金风科技分类箱',detail:[
			{type:'厨余垃圾',status:0,percent:'85%',personName:'张全蛋',timePeriod:'15:00 - 15:30',taskStatus:'已超时',overtime:'20分钟',
			overflow:[{type:'厨余', code:'XX - 5482',capacity:'2456L',percent:'80.8%'},{type:'厨余', code:'XX - 5482',capacity:'2456L',percent:'80.8%'}]},
			{type:'其他',status:1,percent:'55%',personName:'张全蛋',timePeriod:'15:00 - 15:30',taskStatus:'已超时',overtime:'20分钟',overflow:[]},
			{type:'其他垃圾',status:2,percent:'25%',personName:'张全蛋',timePeriod:'15:00 - 15:30',taskStatus:'已超时',overtime:'20分钟',
			overflow:[{type:'厨余', code:'XX - 5482',capacity:'2456L',percent:'80.8%'},{type:'厨余', code:'XX - 5482',capacity:'2456L',percent:'80.8%'}]}
			]}
			$('#left_panel').append(generateDetailBoard(data));
			$('#searchRes').hide();
		});

		$('#left_panel').on('click','div.detailHead',function(e){
			// 详情页切换回查询栏
			e.stopPropagation();
			$('#detailRes').remove();
			$('#searchRes').show();
		}).on('click','ul.detailInfoNavArea>li',function(){
			// 标签栏控制
			var li_index = $('ul.detailInfoNavArea li').index($(this));
			$(this).siblings('li').removeClass('selected');
			$(this).addClass('selected');
			$('div.detailContent').children('div').eq(li_index).show().siblings('div').hide();
		}).on('click','span.overflowButton',function(){
			// 打开详情表格
			$(this).next('div.overflowDegree').slideDown();
		}).on('click','i.closeButton',function(){
			// 关闭详情表格
			$(this).closest('div.overflowDegree').slideUp();
		})

		// ajax取得初始数据
		var dustbinList = [{name:'雄狮创业分类箱', pos:'某某某小区', src:'Artboard 1_MarkMan.png'},
		{name:'雄狮创业分类箱', pos:'某某某小区', src:'Artboard 1_MarkMan.png'},
		{name:'雄狮创业分类箱', pos:'某某某小区', src:'Artboard 1_MarkMan.png'},
		{name:'雄狮创业分类箱', pos:'某某某小区', src:'Artboard 1_MarkMan.png'},
		{name:'雄狮创业分类箱', pos:'某某某小区', src:'Artboard 1_MarkMan.png'},
		{name:'雄狮创业分类箱', pos:'某某某小区', src:'Artboard 1_MarkMan.png'},
		{name:'雄狮创业分类箱', pos:'某某某小区', src:'Artboard 1_MarkMan.png'}
		]
		// 取得初始数据后的操作
		$('#resBody').html(generateSearchCards(dustbinList));
		$(window).trigger('resize');
		$('#resNum').text(dustbinList.length);
		
	});
})();