/*
 * vortex datagrid lib js
 * version 0.4
 * depends on easy UI Datagrid
 * xuchi
 * 20160601
 * */

$(document).ready(function(){
	hideQueryExpandButton(queryBoxHeight());
	
    $('.form-box').on('click','span.input-hint',function(){
        $(this).hide();
    });
        
    $('#button-expand-query-box').on("click",null,function(){
    //query box can be expanded using this button
    //the height will be calculated automatiocally
        var queryBox = $('.query-box');
        var numberOfInput = queryBox.children('.query-input-box').children('.query-input-group').length;
        var numberOfTime = queryBox.children('.query-input-box').children('.query-time-group').length;
        var numberOfNormalInput = numberOfInput -numberOfTime;
        var queryBoxHeight;
        numberOfNormalInput = Math.ceil(numberOfNormalInput/4) + Math.ceil(numberOfTime/2) ;
        queryBoxHeight = numberOfNormalInput = numberOfNormalInput*42+8;

        if (queryBox.hasClass('query-box-folded')){
        	$(".panel-box").prepend("<div class='instead-query-box query-box'></div>");
            queryBox.removeClass('query-box-folded').addClass('query-box-expanded');
            queryBox.animate({height:queryBoxHeight},'1200','swing');
            $(this).html('--');
        }else{
        	queryBox.animate({height:'40px'});
        	setTimeout(function(){
        		$(".instead-query-box").remove();
                queryBox.removeClass('query-box-expanded').addClass('query-box-folded');
        	},1000);
        	$(this).html('+');
        }
    });  
});

function hideQueryExpandButton(height){
	if (height <= 50){
		$('#button-expand-query-box').hide();
	}
}

function queryBoxHeight(){
    var queryBox = $('.query-box');
    var numberOfInput = queryBox.children('.query-input-box').children('.query-input-group').length;
    var numberOfTime = queryBox.children('.query-input-box').children('.query-time-group').length;
    var numberOfNormalInput = numberOfInput -numberOfTime;
    var queryBoxHeight;
    numberOfNormalInput = Math.ceil(numberOfNormalInput/4) + Math.ceil(numberOfTime/2) ;
    queryBoxHeight = numberOfNormalInput = numberOfNormalInput*42+8;
    //console.log(queryBoxHeight);
    return queryBoxHeight;
}

VortexDatagrid = function(config) {
    config = config || {};

    this.gridId = config.gridId;
    this.gridUrl = config.gridUrl;
    this.exportUrl = config.exportUrl;
    this.importOptions = config.importOptions;
    this.gridToolbar = config.gridToolbar;
    this.successCallback = config.successCallback;
    this.gridClickRow = config.gridClickRow;
    this.gridDblClickRow = config.gridDblClickRow;
    this.gridLoadSuccess = config.gridLoadSuccess;
    this.gridQueryParam = config.gridQueryParam;
    this.gridOnCheck = config.gridOnCheck;
    this.gridOnUnCheck = config.gridOnUnCheck;
    this.gridOnCheckAll = config.gridOnCheckAll;
    this.gridOnUnCheckAll = config.gridOnUnCheckAll;
    this.singleSelctAndChecks = config.singleSelctAndChecks||false;
    this.onExpandRow = config.onExpandRow;
    this.detailFormatter = config.detailFormatter;
    this.timerToResize = 0;
    this.timeToResize = VortexDatagrid.defaults.timeToResize;
    this.editIndex = undefined;
 
    // 自定义设置列的内容
    this.setColumnsFormat = function(){
        if(!config.columns){
            return;
        }
        var columnGroups = config.columns;
        for(var i=0;i<columnGroups.length;i++){
            var columns = columnGroups[i];
            for(var j=0;j<columns.length;j++){
                var the_column = columns[j];
                if(the_column.formatter){
                    continue;
                }
                the_column.formatter = function(value,row,index){ 
                    if(value!==null && value!==undefined){
                        return '<span title='+value+'>'+value+'</span>';
                    }        
                } 
            }   
        }
    }
    this.setColumnsFormat();   

    config = $.extend({}, VortexDatagrid.defaults, {
        onLoadSuccess : function(data) {
            // 自动调整rownumber宽度
            // if (config.rownumbers){
            //     $(this).datagrid("fixRownumber");
            // }
            if (typeof config.gridLoadSuccess == 'function') {
                config.gridLoadSuccess(data);
            }
//            $('#' + config.gridId).datagrid("fixRownumber");
//            $('#' + config.gridId).datagrid('fixColumnSize');
        },
        onClickRow : function(rowIndex, rowData) {
            if(config.singleSelctAndChecks){
                $('#' + config.gridId).datagrid('unselectAll');
                $('#' + config.gridId).datagrid('uncheckAll');
                $('#' + config.gridId).datagrid('selectRow',rowIndex);
            }
            if (typeof config.gridClickRow == 'function') {
                config.gridClickRow(rowIndex, rowData);
            }
        },
        // 双击事件
        onDblClickRow : function(rowIndex, rowData) {
            if (typeof config.gridDblClickRow == 'function') {
                config.gridDblClickRow(rowIndex, rowData);
            }
        },
        // 勾选事件
        onCheck : function(rowIndex, rowData) {
            if (typeof config.gridOnCheck == 'function') {
                config.gridOnCheck(rowIndex, rowData);
            }
        },
        // 取消勾选事件
        onUncheck : function(rowIndex, rowData) {
            if (typeof config.gridOnUnCheck == 'function') {
                config.gridOnUnCheck(rowIndex, rowData);
            }
        },
        // 勾选全部事件
        onCheckAll : function(rows) {
            if (typeof config.gridOnCheckAll == 'function') {
                config.gridOnCheckAll(rows);
            }
        },
        // 取消全部勾选事件
        onUncheckAll : function(rows) {
            if (typeof config.gridOnUnCheckAll == 'function') {
                config.gridOnUnCheckAll(rows);
            }
        },
        // 展开行
        // onExpandRow : function(rowIndex, rowData) {
        //     if (typeof config.onExpandRow == 'function') {
        //         config.onExpandRow(rowIndex, rowData);
        //     }
        // },
        // detailFormatter : function(rowIndex, rowData) {
        //     if (typeof config.detailFormatter == 'function') {
        //         config.detailFormatter(rowIndex, rowData);
        //     }
        // },
        onHeaderContextMenu : function(e, field) {
            e.preventDefault();
            if (!$('#' + config.gridId + '_colMenu').length) {
                GridColumnMenu.createColumnMenu(config.gridId);
            }
            $('#' + config.gridId + '_colMenu').menu('show', {
                left : e.pageX,
                top : e.pageY
            });
        }
    }, config);

    this.options = config;

    this.init();
};
VortexDatagrid.prototype.init = function() {
    var t = this;

    t.initGrid(t.options);
	$(window).resize(function() {
		clearTimeout(t.timerToResize);
		t.timerToResize = setTimeout(function() {
			$('#'+t.gridId).datagrid('resize');
		}, t.timeToResize);
	});    
    t.fitHeight();
};
VortexDatagrid.prototype.resize = function() {
	var t = this;
	$('#'+t.gridId).datagrid('resize');
};
VortexDatagrid.prototype.initGrid = function(config) {
    var t = this;
    if (t.gridUrl) {
        config.url = t.gridUrl;
    }
    // 工具栏
    if (t.gridToolbar) {
        config.toolbar = t.gridToolbar;
    }
    if (t.gridQueryParam) {
        if (typeof t.gridQueryParam == 'function') {
            config.queryParams = t.gridQueryParam.call(window || this);
        } else if (typeof t.gridQueryParam == 'object') {
            config.queryParams = t.gridQueryParam;
        }
    }
    $('#' + t.gridId).datagrid(config);
    if (config.pagination) {
        $('#' + t.gridId).pagination().find('a.l-btn').tooltip(
                {
                    content : function() {
                        var cc = $(this).find('span.l-btn-empty').attr('class')
                                .split(' ');
                        var icon = cc[1].split('-')[1];
                        return icon + ' 页';
                    }
                });
        $.parser.parse('#' + t.gridId);
    }

};
VortexDatagrid.prototype.getSelected = function() {
    var t = this;
    var row = $('#' + t.gridId).datagrid('getSelected');
    return row;
};
VortexDatagrid.prototype.getSelections = function() {
    var t = this;
    var rows = $('#' + t.gridId).datagrid('getSelections');
    return rows;
};
VortexDatagrid.prototype.validSelected = function() {
    var t = this;
    var rows = $('#' + t.gridId).datagrid('getSelected');
    if (!rows) {
        VortexShow.showInfo({
   		 infoString : '请选择要操作的行'
        });
        return false;
    } else {
        return true;
    }
};
// 判断是否选择一条数据
VortexDatagrid.prototype.validCheckedOne = function() {
    var t = this;
    var rows = $('#' + t.gridId).datagrid('getChecked');
    if (rows.length > 1) {
    	VortexShow.showInfo({
    		 infoString : '请选择一条数据'
        });
        return false;
    } else {
        return true;
    }
};
VortexDatagrid.prototype.load = function(queryParam) {
    var t = this;
    t.dataLoad('load', queryParam);

};
VortexDatagrid.prototype.loadData = function(data) {
    var t = this;
    t.dataLoad('loadData', data);
};

VortexDatagrid.prototype.dataLoad = function(loadOrReload, queryParam) {
    var t = this;
    if (queryParam) {
        $('#' + t.gridId).datagrid(loadOrReload, queryParam);
    } else {
        if (typeof t.gridQueryParam == 'function') {
            $('#' + t.gridId).datagrid(loadOrReload, t.gridQueryParam());
        } else {
            $('#' + t.gridId).datagrid(loadOrReload, t.gridQueryParam);
        }
    }

};
VortexDatagrid.prototype.reload = function(queryParam) {
    var t = this;
    t.dataLoad('reload', queryParam);
};
VortexDatagrid.prototype.selectRow = function(index) {
    var t = this;
    $('#' + t.gridId).datagrid('unselectAll');
    $('#' + t.gridId).datagrid('selectRow', index);
    $('#' + t.gridId).datagrid('checkRow', index);
};
VortexDatagrid.prototype.showPanel = function(index) {
    var t = this;
    $('#' + t.gridId).datagrid('unselectAll');
    $('#' + t.gridId).datagrid('selectRow', index);
    $('#' + t.gridId).datagrid('checkRow', index);
};
VortexDatagrid.prototype.exportData = function(type) {
	var t = this;
	if(!t.exportUrl){
		return;
	}
    type = type ? type : VortexDatagrid.constants.exportType.selected;
    
	var options = $('#' + t.gridId).datagrid('options');
	var rows = $('#' + t.gridId).datagrid('getSelections');
	var exportFrameId = t.gridId + "_" + 'excelIFrame';
	var excelIframe = document.getElementById(exportFrameId);
	if(!excelIframe){
		$("body").append('<iframe id="' + exportFrameId + '" name="' + exportFrameId + '" style="display:none;"></iframe>');
		excelIframe = document.getElementById(exportFrameId);
	}
	var columns = options.columns[0];
	var columnFields = new Array();
	var columnNames = new Array();
	for ( var i = 0; i < columns.length; i++) {
		if (columns[i].field == 'ck') {
			continue;
		}
		if (columns[i].field == 'id') {
			continue;
		}
		if (!columns[i].hidden) {
			columnFields.push(columns[i].field);
			columnNames
					.push(columns[i].title ? columns[i].title
							: "");
		}
	}
	var ids = new Array();
	if (rows) {
		$(rows).each(function(index, row) {
			ids.push(row.id);
		});
	}
	if(type == VortexDatagrid.constants.exportType.selected && ids.length == 0){
		VortexShow.showInfo({
   		 infoString : '请选择一条数据'
		});
		return;
	}
	var postParams = {};
	for ( var property in options.queryParams) {
		postParams[property] = options.queryParams[property];
	}
	postParams.page = options.pageNumber;
	postParams.rows = options.pageSize;
	postParams.columnFields = columnFields.toString();
	postParams.columnNames = columnNames.toString();
	postParams.sort = options.sortName;
	postParams.order = options.sortOrder;
	postParams.title = options.title;
	switch (type) {
	case VortexDatagrid.constants.exportType.selected:
		postParams.downloadAll = true;
		postParams.downloadIds = ids.toString();
		break;
	case VortexDatagrid.constants.exportType.thisPage:
		postParams.downloadAll = false;
		break;
	case VortexDatagrid.constants.exportType.all:
		postParams.downloadAll = true;
		break;
	default:
		break;
	}
	var dynamicForm = new DynamicForm({
		actionUrl : t.exportUrl,
		target : excelIframe.name 
	});
	dynamicForm.requestParams = postParams;
	dynamicForm.submitForm();
	dynamicForm.removeForm();
};
VortexDatagrid.prototype.importData = function(fileId) {
    var t = this;
    if(!t.importOptions){
    	return;
    }
    if(!t.importOptions.importUrl){
    	return;
    }
	$.ajaxFileUpload({
		url : path + t.importOptions.importUrl,
		secureuri : false,
		fileElementId : fileId,
		dataType : 'json',
		beforeSend : function() {
			$.messager.progress({
				title : '上传提示',
				msg : '正在上传数据'
			});
		},
		complete : function() {
			$.messager.progress('close');
		},
		success : function(data, status) {
			$.messager.progress('close');
			if (typeof t.importOptions.onImportSuccess == 'function') {
				t.importOptions.onImportSuccess(data, status);
	        }
		},
		error : function(data, status, e) {
			$.messager.progress('close');
			if (typeof t.importOptions.onImportError == 'function') {
				t.importOptions.onImportError(data, status, e);
	        }
		}
	}); 
};

/* 
 * endEditing 
 * end the current row editing(if any) status
 */
VortexDatagrid.prototype.endEditing = function(){
    var t = this;
    if (t.editIndex == undefined){return true}
    if ($('#'+t.gridId).datagrid('validateRow', t.editIndex)){
        $('#'+t.gridId).datagrid('endEdit', t.editIndex);
        t.editIndex = undefined;
        return true;
    } else {
        return false;
    }
};
/* 
 * inline edit
 * when double clickd(or triggerred by other things), the selected row enters editing status
 * index is the row index, starting by 0
 * field is the editing field
 */
VortexDatagrid.prototype.inlineEdit = function(index, field) {
    var t = this;
    if (t.editIndex != index){
        if (t.endEditing()){
            $('#'+t.gridId).datagrid('selectRow', index)
                    .datagrid('beginEdit', index);
            var ed = $('#'+t.gridId).datagrid('getEditor', {index:index,field:field});
            if (ed){
                ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
            }
            t.editIndex = index;
        } else {
            setTimeout(function(){
                $('#'+t.gridId).datagrid('selectRow', t.editIndex);
            },0);
        }
    }     
};
VortexDatagrid.prototype.fitHeight = function(){
    var t = this,
//        hei = $(window.parent.document).find('#contentFrame').height(),
    	hei = $(window).height(),
        $table = $('.datagrid-box'),
        $tree = $('.panel-box .leftTree'),
        $body = $('.panel-body');

    var tableOffset = 0;
    if($table.offset()){
    	tableOffset = $table.offset().top ;
    }
    $table.height(hei - tableOffset - 10);
    $tree.height(hei - 22);
    $body.height(hei - 50);
    $('#'+t.gridId).datagrid('resize');
};
/* 
 * accept the changes in datagrid
 */
VortexDatagrid.prototype.accept = function(){
    var t = this;
    if (t.endEditing()){
        $('#'+t.gridId).datagrid('acceptChanges');
    }    
};
/* 
 * reject the changes in datagrid
 */
VortexDatagrid.prototype.reject = function(){
    var t = this;
    $('#'+t.gridId).datagrid('rejectChanges');
    t.editIndex = undefined;    
};
/* 
 * remove the selected row in datagrid
 */
/*VortexDatagrid.prototype.removeRow = function(){
    var t = this;
    if (t.editIndex == undefined){return false}
    $('#'+t.gridId).datagrid('cancelEdit', t.editIndex)
            .datagrid('deleteRow', t.editIndex);
    t.editIndex = undefined;
    return true; 
};*/
/* 
 * append a empty row in the end of the datagrid
 * row is object, if it is absent, a empty object {} will be used
 */
VortexDatagrid.prototype.append = function(row){
    var t = this;
    var _row = {};
    if(row){ _row = row}else{}
    if (t.endEditing()){
        $('#'+t.gridId).datagrid('appendRow',_row);
        t.editIndex = $('#'+t.gridId).datagrid('getRows').length-1;
        $('#'+t.gridId).datagrid('selectRow', t.editIndex)
                .datagrid('beginEdit', t.editIndex);
    }    
};

VortexDatagrid.defaults = {
    // height : 'auto',
    rownumbers : true,
    border : true,
    plain : true,
    pagination : true,
    fit : true,
    fitColumns : true,
    singleSelect : false,
    striped : false,
    remoteSort : true,
    timeToResize : 50,
};

VortexDatagrid.constants = {
    exportType : {
        selected : 'selected',
        thisPage : 'thisPage',
        all : 'all'
    }
};