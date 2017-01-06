var soLove = soLove || {};

/**
 * 婚介所老师信息管理
 * 
 * @author HeJiawang
 * @date 2014.01.03
 */
soLove.maritalEmploy = {
	
	/**
	 * 消息
	 */
	message    : {
		netWorkError: '网络异常,请稍后重试!'
	},
		
	common	:	{
		/**
		 * url
		 */
		myurl	:	soLove.domainUrl.baseDomain + '/maritalEmploy',
		
		/**
		 * maritalAgencyUrl
		 */
		maritalAgencyUrl	:	soLove.domainUrl.baseDomain + '/maritalAgency',
		
		/**
		 * 系统类型列表选中项
		 */
		tableRowDateObj	: Object,
		
		/**
		 * 系统类型列表选中项
		 */
		tableRowDateObj_agency	: Object,
		
		/**
		 * 表单验证
		 */
		validate	:	$('#validation-form').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			rules: {
				maritalAgencyID	:{
					required: true,
				},
				maritalEmploySex:{
					required: true,
				},
				maritalEmployAge:{
					required: true,
				},
				maritalEmployName:{
					required: true,
				},
				maritalEmployNick:{
					required: true,
				},
				maritalEmployPhone:{
					required: true,
				},
				maritalEmployQQ:{
					required: true,
				},
				maritalEmployWeixin:{
					required: true,
				},
				sort:{
					required: true,
				},
				maritalEmployEvaluation:{
					required: true,
				},
			},
	
			messages: {
				maritalAgencyID	:{
					required: "必填",
				},
				maritalEmploySex:{
					required: "必填",
				},
				maritalEmployAge:{
					required:  "必填",
				},
				maritalEmployName:{
					required:  "必填",
				},
				maritalEmployNick:{
					required:  "必填",
				},
				maritalEmployPhone:{
					required:  "必填",
				},
				maritalEmployQQ:{
					required:  "必填",
				},
				maritalEmployWeixin:{
					required:  "必填",
				},
				sort:{
					required:  "必填",
				},
				maritalEmployEvaluation:{
					required: "必填",
				},
			},
	
			invalidHandler: function (event, validator) {   
				$('.alert-danger', $('.login-form')).show();
			},
	
			highlight: function (e) {
				$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
			},
	
			success: function (e) {
				$(e).closest('.form-group').removeClass('has-error').addClass('has-info');
				$(e).remove();
			},
		})
	},
	
	/**
	 * 数据初始化
	 */
	init	:	function(){
		var _that = this;
		
		_that.initMenuResource();
		_that.initTable();
		_that.initTable_agency();
	},
	
	/**
	 * 初始化权限菜单
	 * @date 2016.12.23
	 */
	initMenuResource	:	function(){
		var mid = UrlParm.parm("sid");
		$("#menu_"+UrlParm.parm("sid")).attr("class","active");
		
		$.ajax({
			url : soLove.domainUrl.baseDomain + "/permission/core/initElement",
			data : {"menuID" : mid},
			type: "get",
			dataType : 'json',
			success:function(result) {
				$("#elementbut").html(result.result);
			}
		});
	},
	
	/**
	 * 初始化表单
	 */
	initTable	:	function(){
		var _that = this;
		$('#example').dataTable({
			"processing" : true,
			"serverSide" : true,
			"ajax" : {
				"url" : _that.common.myurl + '/page',
				"type" : "GET",
			},
			"dom" : 'rtilp',
			"language" : {
				"url" : "resources/i18n/Chinese.json"
			},
			"columns" : [
				{
					"data" : "maritalEmployID",
					"orderable" : false,
					"visible" : true,
					"width" : "5%",
					"render" : function(data, type, full, meta) {
						return '<input type="checkbox" name="selectID" value="' + data + '"/>';
					},
				}, 
				{
					"title" : "婚介ID",
					"data" : "maritalAgencyID",
					"visible" : false,
					"orderable" : false,
				}, 
				{
					"title" : "婚介名称",
					"data" : "maritalAgencyName",
					"visible" : true,
					"orderable" : false,
				}, 
				{
					"title" : "性别",
					"data" : "maritalEmploySex",
					"visible" : true,
					"orderable" : false,
				}, 
				{
					"title" : "年龄",
					"data" : "maritalEmployAge",
					"visible" : true,
					"orderable" : false,
				}, 
				{
					"title" : "姓名",
					"data" : "maritalEmployName",
					"visible" : true,
					"orderable" : false,
				}, 
				{
					"title" : "昵称",
					"data" : "maritalEmployNick",
					"visible" : true,
					"orderable" : false,
				}, 
				{
					"title" : "手机",
					"data" : "maritalEmployPhone",
					"visible" : true,
					"orderable" : false,
				},
				{
					"title" : "QQ",
					"data" : "maritalEmployQQ",
					"visible" : true,
					"orderable" : false,
				},
				{
					"title" : "微信",
					"data" : "maritalEmployWeixin",
					"visible" : true,
					"orderable" : false,
				},
				{
					"title" : "排序",
					"data" : "sort",
					"visible" : true,
					"orderable" : false,
				},
				{
					"title" : "简介",
					"data" : "maritalEmployEvaluation",
					"visible" : true,
					"orderable" : false,
				},
				{
					"title" : "备注",
					"data" : "theNode",
					"visible" : true,
					"orderable" : false,
				}
			],
		});

		_that.singleSelectFun();
		_that.pageLengthChangeFun();
		_that.getTableRowData();
	},
	
	/**
	 * 为表单绑定点击事件
	 */
	getTableRowData	:	function(){
		var _that = this;
	    var table = $('#example').DataTable();
	    $('#example tbody').on( 'click', 'tr', function () {
	    	_that.common.tableRowDateObj = table.row( this ).data();
	    } );
	},
	
	/**
	 * 为表单复选框绑定单选
	 */
	singleSelectFun	:	function(){
		var _that = this;
		var table = $('#example').DataTable();
		var lastSelectItem = -1;//-1表示未选中  
		$('#example tbody').on( 'click', 'tr', function () {
			var index = table.row( this ).index();
			if(lastSelectItem<0){//如果未选中
				$("#example input[name=selectID]:eq("+index+")").prop("checked",true);
				$(this).addClass("selected");
				lastSelectItem = index;
			}else{//如果选中
				if(lastSelectItem==index){//如果选的是上一个
			        $("#example input[name=selectID]:eq("+lastSelectItem+")").prop("checked",false);
			        $("#example tbody tr:eq("+lastSelectItem+")").removeClass("selected");
			        lastSelectItem = -1;
				}else{
					$("#example input[name=selectID]:eq("+lastSelectItem+")").prop("checked",false);
					 $("#example tbody tr:eq("+lastSelectItem+")").removeClass("selected");
					$("#example input[name=selectID]:eq("+index+")").prop("checked",true);
					$(this).addClass("selected");
					lastSelectItem = index;	
				}
			}
	    } );
	}, 

	/**
	 * 为系统类型表单绑定翻页事件
	 */
	pageLengthChangeFun	:	function(){
		var _that = this;
		$('#example').on( 'length.dt', function ( e, settings, len ) {
			_that.reloadDatatables();
		} );
	},
	
	/**
	 * 重新加载系统类型表单
	 */
	reloadDatatables	:	function(){
		var _that = this;
		var table = $('#example').DataTable();
		table.ajax.url(_that.common.myurl + '/page').load();
	},
	
	/**
	 * 判断是否选中组织列表数据
	 */
	goCheck	:	function(){
		var ids = document.getElementsByName("selectID");
   		var count = 0;
   		var id =0;
   		for (var i=0;i<ids.length;i++ ){
   			if(ids[i].checked){ //判断复选框是否选中
   				count=count+1;
   			}
   		}
   		if(count==0){
   			layer.msg("请选择要操作的行！");
   			return id;
   		}else if(count>1){
   			layer.msg("只能操作一行数据！");
   			return id;
   		}else if(count==1){
   			for (var i=0;i<ids.length;i++ ){
			    if(ids[i].checked){ 
		           id=ids[i].value;
			    }
      		}
   			return id;
   		}
	},
	
	/**
	 * 重置检索框
	 */
	goReset	:	function(){
		var _that = this;
		
		var table = $('#example').DataTable();
		$("#maritalEmployNameSerch").val("");
		$("#maritalEmployNickSerch").val("");
		$("#maritalAgencyNameSerch").val("");
		table.ajax.url( _that.common.myurl+"/page").load();
	},
	
	/**
	 * 检索
	 */
	goSearch	:	function(){
		var _that = this;
		
		var table = $('#example').DataTable();
		var maritalEmployName = $("#maritalEmployNameSerch").val();
		var maritalEmployNick = $("#maritalEmployNickSerch").val();
		var maritalAgencyName = $("#maritalAgencyNameSerch").val();
		table.ajax.url( _that.common.myurl+"/page?maritalEmployName=" + maritalEmployName + 
				"&maritalEmployNick="+maritalEmployNick + "&maritalAgencyName=" + maritalAgencyName ).load();
	},
	
	/**
	 * 新增婚介所老师
	 */
	goRaise	:	function(){
		var _that = this;
		
		$("#raiseMaritalEmploy-form input").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
        $( "#raiseMaritalEmploy-form textarea").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
		$("#raiseMaritalEmploy-form .help-block").css("display","none");
	 	$("#raiseMaritalEmploy-form .form-group").removeClass('has-error').addClass('has-info');

	 	$("#maritalEmployID").val("");
		$("#maritalAgencyName").val("");
		$("#maritalAgencyID").val("");
		$("#maritalEmploySex").val("");
		$("#maritalEmployAge").val("");
		$("#maritalEmployName").val("");
		$("#maritalEmployNick").val("");
		$("#maritalEmployPhone").val("");
		$("#maritalEmployQQ").val("");
		$("#maritalEmployWeixin").val("");
		$("#sort").val("");
		$("#maritalEmployEvaluation").val("");
		$("#theNode").val("");
	 	
		$("#raiseMaritalEmploy-dialog" ).removeClass('hide').dialog({
		     modal: true,
		     title: "新增婚老师",
		     title_html: true,
		     width:500,
		     buttons: [ 
		     		{
		     			text: "取消",
		     			"class" : "btn btn-xs",
		     			click: function() {
		     			 $( this ).dialog( "close" ); 
		     			} 
		     		},
		     		{
		     			text: "增加",
		     			"class" : "btn btn-primary btn-xs",
		     			click: function() {
		     				var dg = $( this );
						 	if($("#raiseMaritalEmploy-form").valid()){
						 		$.ajax({
									url :  _that.common.myurl + '/raise',
									data : $("#raiseMaritalEmploy-form").serialize(),
									type: "post",
									dataType : 'json',
									success: function(result){
										layer.msg(result.message);
							            
										if( result.success ){
											_that.reloadDatatables();
										}
									}
								});
						 	}
		     			} 
		     		}
		     	]
		});
	},
	
	/**
	 * 修改婚介老师信息
	 */
	goModify	:	function(){
		var _that = this;
		
		$("#raiseMaritalEmploy-form .help-block").css("display","none");
	 	$("#raiseMaritalEmploy-form .form-group").removeClass('has-error').addClass('has-info');
        
        $("#raiseMaritalEmploy-form input").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
        $( "#raiseMaritalEmploy-form textarea").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
        
		var count = _that.goCheck();
		if(count>0){
			$("#maritalEmployID").val(_that.common.tableRowDateObj.maritalEmployID);
			$("#maritalAgencyName").val(_that.common.tableRowDateObj.maritalAgencyName);
			$("#maritalAgencyID").val(_that.common.tableRowDateObj.maritalAgencyID);
			$("#maritalEmploySex").val(_that.common.tableRowDateObj.maritalEmploySex);
			$("#maritalEmployAge").val(_that.common.tableRowDateObj.maritalEmployAge);
			$("#maritalEmployName").val(_that.common.tableRowDateObj.maritalEmployName);
			$("#maritalEmployNick").val(_that.common.tableRowDateObj.maritalEmployNick);
			$("#maritalEmployPhone").val(_that.common.tableRowDateObj.maritalEmployPhone);
			$("#maritalEmployQQ").val(_that.common.tableRowDateObj.maritalEmployQQ);
			$("#maritalEmployWeixin").val(_that.common.tableRowDateObj.maritalEmployWeixin);
			$("#sort").val(_that.common.tableRowDateObj.sort);
			$("#maritalEmployEvaluation").val(_that.common.tableRowDateObj.maritalEmployEvaluation);
			$("#theNode").val(_that.common.tableRowDateObj.theNode);
			
			$("#raiseMaritalEmploy-dialog" ).removeClass('hide').dialog({
			     modal: true,
			     title: "修改婚介老师",
			     title_html: true,
			     width:500,
			     buttons: [ 
			     		{
			     			text: "取消",
			     			"class" : "btn btn-xs",
			     			click: function() {
			     			 $( this ).dialog( "close" ); 
			     			} 
			     		},
			     		{
			     			text: "修改",
			     			"class" : "btn btn-primary btn-xs",
			     			click: function() {
			     				var dg = $( this );
			     				
							 	if($("#raiseMaritalEmploy-form").valid()){
							 		$.ajax({
										url :  _that.common.myurl + '/modify',
										data : $("#raiseMaritalEmploy-form").serialize(),
										type: "post",
										dataType : 'json',
										success: function(result){
											layer.msg(result.message);
								            
											if( result.success ){
												_that.reloadDatatables();
											}
										}
									});
							 	}
			     			} 
		     			}
			     	]
		     });
		}
	},
	
	/**
	 * 婚介所信息查看
	 */
	goView	:	function(){
		$("#raiseMaritalEmploy-form .help-block").css("display","none");
	 	$("#raiseMaritalEmploy-form .form-group").removeClass('has-error').addClass('has-info');
        $("#raiseMaritalEmploy-form input").each(function(index){
            $(this).attr("disabled" ,"disabled" );
        });
        $( "#raiseMaritalEmploy-form textarea").each(function(index){
            $(this).attr("disabled" ,"disabled" );
        }); 
		var count = _that.goCheck();
		if(count>0){
			$("#maritalEmployID").val(_that.common.tableRowDateObj.maritalEmployID);
			$("#maritalAgencyName").val(_that.common.tableRowDateObj.maritalAgencyName);
			$("#maritalAgencyID").val(_that.common.tableRowDateObj.maritalAgencyID);
			$("#maritalEmploySex").val(_that.common.tableRowDateObj.maritalEmploySex);
			$("#maritalEmployAge").val(_that.common.tableRowDateObj.maritalEmployAge);
			$("#maritalEmployName").val(_that.common.tableRowDateObj.maritalEmployName);
			$("#maritalEmployNick").val(_that.common.tableRowDateObj.maritalEmployNick);
			$("#maritalEmployPhone").val(_that.common.tableRowDateObj.maritalEmployPhone);
			$("#maritalEmployQQ").val(_that.common.tableRowDateObj.maritalEmployQQ);
			$("#maritalEmployWeixin").val(_that.common.tableRowDateObj.maritalEmployWeixin);
			$("#sort").val(_that.common.tableRowDateObj.sort);
			$("#maritalEmployEvaluation").val(_that.common.tableRowDateObj.maritalEmployEvaluation);
			$("#theNode").val(_that.common.tableRowDateObj.theNode);
	 		
	 		$("#raiseMaritalEmploy-dialog" ).removeClass('hide').dialog({
			     modal: true,
			     title: "查看婚介老师信息",
			     title_html: true,
			     width:500,
			     buttons: [ 
			     		{
			     			text: "取消",
			     			"class" : "btn btn-xs",
			     			click: function() {
			     				$( this ).dialog( "close" ); 
			     			} 
			     		}
			     	]
		     });
		}
	},
	
	/**
	 * 删除婚介所信息
	 */
	goEarse	:	function(){
		var _that = this;
		var maritalEmployID = _that.goCheck();
		if( maritalEmployID != 0 ){
			var goEraseUrl = _that.common.myurl + '/erase';
			
			layer.confirm('确认删除！', {
				  btn: ['删除','取消'], //按钮
				  shade: false //不显示遮罩
			}, function(){
				$.ajax({
					url : goEraseUrl,
					data : {'maritalEmployID':maritalEmployID},
					type: "get",
					dataType : 'json',
					success:function(result) {
						layer.msg(result.message);
						
						var table = $('#example').DataTable();
						table.ajax.url(_that.common.myurl + '/page').load();
					}
				});
			}, function(){
			});
		}
	},
	
	/**
	 * 选择婚介老师所在的婚介所
	 */
	chooseMaritalAgency	:	function(){
		var dialogAgency= $("#maritalAgency-dialog" ).removeClass('hide').dialog({
			modal: true,
			title: "选择婚介所",
			title_html: true,
			width:800,
			buttons: [ 
				{
					text: "取消",
					"class" : "btn btn-primary btn-xs",
					click: function() {
						$(dialogAgency).dialog("close");
					} 
				},
				{
					text: "确认",
					"class" : "btn btn-primary btn-xs",
					click: function() {
						var id = soLove.maritalEmploy.goCheck_agency();
						if( id != 0 ){
							
							$("#maritalAgencyName").val(tableRowDateObj_agency.maritalAgencyName);
							$("#maritalAgencyID").val(tableRowDateObj_agency.maritalAgencyID);
							$(dialogAgency).dialog("close");
						}
					} 
				}
			]
		});
	},
	
//....婚介所表单..start....................................................//
	/**
	 * 初始化表单
	 */
	initTable_agency	:	function(){
		var _that = this;
		$('#example_agency').dataTable({
			"processing" : true,
			"serverSide" : true,
			"ajax" : {
				"url" : _that.common.maritalAgencyUrl + '/page',
				"type" : "GET",
			},
			"dom" : 'rtilp',
			"language" : {
				"url" : "resources/i18n/Chinese.json"
			},
			"columns" : [
				{
					"data" : "maritalAgencyID",
					"orderable" : false,
					"visible" : true,
					"width" : "5%",
					"render" : function(data, type, full, meta) {
						return '<input type="checkbox" name="selectID_agency" value="' + data + '"/>';
					},
				}, 
				{
					"title" : "婚介名称",
					"data" : "maritalAgencyName",
					"visible" : true,
					"orderable" : false,
				}, 
				{
					"title" : "婚介log",
					"data" : "maritalAgencyLogo",
					"visible" : true,
					"orderable" : false,
				}, 
				{
					"title" : "联系方式",
					"data" : "maritalAgencyPhone",
					"visible" : true,
					"orderable" : false,
				}, 
				{
					"title" : "简介",
					"data" : "maritalAgencyDetail",
					"visible" : true,
					"orderable" : false,
				}, 
				{
					"title" : "地址",
					"data" : "areaName",
					"visible" : true,
					"orderable" : false,
					"render" : function(data, type, full, meta) {
						var areaStr = "";
						if( full.provinceName != null ){
							areaStr += full.provinceName;
						} 
						if( full.cityName != null ){
							areaStr += full.cityName;
						}
						if( full.countyName != null ){
							areaStr += full.countyName;
						}
						if( full.townName != null ){
							areaStr += full.townName;
						}
						if( full.areaName != null ){
							areaStr += full.areaName;
						}
						
						return areaStr;
					},
				}, 
				{
					"title" : "备注",
					"data" : "theNode",
					"visible" : true,
					"orderable" : false,
				},
				{
					"title" : "",
					"data" : "provinceID",
					"visible" : false,
					"orderable" : false,
				},
				{
					"title" : "",
					"data" : "provinceName",
					"visible" : false,
					"orderable" : false,
				},
				{
					"title" : "",
					"data" : "cityID",
					"visible" : false,
					"orderable" : false,
				},
				{
					"title" : "",
					"data" : "cityName",
					"visible" : false,
					"orderable" : false,
				},
				{
					"title" : "",
					"data" : "countyID",
					"visible" : false,
					"orderable" : false,
				},
				{
					"title" : "",
					"data" : "countyName",
					"visible" : false,
					"orderable" : false,
				},
				{
					"title" : "",
					"data" : "townID",
					"visible" : false,
					"orderable" : false,
				},
				{
					"title" : "",
					"data" : "townName",
					"visible" : false,
					"orderable" : false,
				},
				{
					"title" : "",
					"data" : "areaName",
					"visible" : false,
					"orderable" : false,
				}
			],
		});

		_that.singleSelectFun_agency();
		_that.pageLengthChangeFun_agency();
		_that.getTableRowData_agency();
	},
	
	/**
	 * 为表单绑定点击事件
	 */
	getTableRowData_agency	:	function(){
		var _that = this;
	    var table = $('#example_agency').DataTable();
	    $('#example_agency tbody').on( 'click', 'tr', function () {
	    	_that.common.tableRowDateObj_agency = table.row( this ).data();
	    } );
	},
	
	/**
	 * 为表单复选框绑定单选
	 */
	singleSelectFun_agency	:	function(){
		var _that = this;
		var table = $('#example_agency').DataTable();
		var lastSelectItem = -1;//-1表示未选中  
		$('#example_agency tbody').on( 'click', 'tr', function () {
			var index = table.row( this ).index();
			if(lastSelectItem<0){//如果未选中
				$("#example_agency input[name=selectID_agency]:eq("+index+")").prop("checked",true);
				$(this).addClass("selected");
				lastSelectItem = index;
			}else{//如果选中
				if(lastSelectItem==index){//如果选的是上一个
			        $("#example_agency input[name=selectID_agency]:eq("+lastSelectItem+")").prop("checked",false);
			        $("#example_agency tbody tr:eq("+lastSelectItem+")").removeClass("selected");
			        lastSelectItem = -1;
				}else{
					$("#example_agency input[name=selectID_agency]:eq("+lastSelectItem+")").prop("checked",false);
					 $("#example_agency tbody tr:eq("+lastSelectItem+")").removeClass("selected");
					$("#example_agency input[name=selectID_agency]:eq("+index+")").prop("checked",true);
					$(this).addClass("selected");
					lastSelectItem = index;	
				}
			}
	    } );
	}, 

	/**
	 * 为系统类型表单绑定翻页事件
	 */
	pageLengthChangeFun_agency	:	function(){
		var _that = this;
		$('#example_agency').on( 'length.dt', function ( e, settings, len ) {
			_that.reloadDatatables_agency();
		} );
	},
	
	/**
	 * 重新加载系统类型表单
	 */
	reloadDatatables_agency	:	function(){
		var _that = this;
		var table = $('#example_agency').DataTable();
		table.ajax.url(_that.common.maritalAgencyUrl + '/page').load();
	},
	
	/**
	 * 判断是否选中组织列表数据
	 */
	goCheck_agency	:	function(){
		var ids = document.getElementsByName("selectID_agency");
   		var count = 0;
   		var id =0;
   		for (var i=0;i<ids.length;i++ ){
   			if(ids[i].checked){ //判断复选框是否选中
   				count=count+1;
   			}
   		}
   		if(count==0){
   			layer.msg("请选择要操作的行！");
   			return id;
   		}else if(count>1){
   			layer.msg("只能操作一行数据！");
   			return id;
   		}else if(count==1){
   			for (var i=0;i<ids.length;i++ ){
			    if(ids[i].checked){ 
		           id=ids[i].value;
			    }
      		}
   			return id;
   		}
	},
	
	/**
	 * 重置检索框
	 */
	goReset_agency	:	function(){
		var _that = this;
		
		var table = $('#example_agency').DataTable();
		$("#maritalAgencyNameSerch").val("");
		table.ajax.url( _that.common.maritalAgencyUrl+"/page").load();
	},
	
	/**
	 * 检索
	 */
	goSearch_agency	:	function(){
		var _that = this;
		
		var table = $('#example_agency').DataTable();
		var maritalAgencyName = $("#maritalAgencyNameSerch").val();
		table.ajax.url( _that.common.maritalAgencyUrl+"/page?maritalAgencyName=" + maritalAgencyName ).load();
	},
//....婚介所表单..end......................................................//
	
}