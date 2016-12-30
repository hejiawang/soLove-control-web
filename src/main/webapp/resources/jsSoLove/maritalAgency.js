var soLove = soLove || {};

/**
 * 婚介所管理
 * 
 * @author HeJiawang
 * @date 2016.12.30
 */
soLove.maritalAgency = {
	
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
		myurl	:	soLove.domainUrl.baseDomain + '/maritalAgency',
		
		/**
		 * 系统类型列表选中项
		 */
		tableRowDateObj	: Object,
		
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
				maritalAgencyName:{
					required: true,
				},
				maritalAgencyLogo:{
					required: true,
				},
				maritalAgencyPhone:{
					required: true,
				},
				maritalAgencyDetail:{
					required: true,
				},
				provinceID:{
					required: true,
				},
				cityID:{
					required: true,
				},
				countyID:{
					required: true,
				},
				townID:{
					required: true,
				},
			},
	
			messages: {
				maritalAgencyID	:{
					required: "必填",
				},
				maritalAgencyName:{
					required: "必填",
				},
				maritalAgencyLogo:{
					required:  "必填",
				},
				maritalAgencyPhone:{
					required:  "必填",
				},
				maritalAgencyDetail:{
					required:  "必填",
				},
				provinceID:{
					required:  "必填",
				},
				cityID:{
					required:  "必填",
				},
				countyID:{
					required:  "必填",
				},
				townID:{
					required:  "必填",
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
					"data" : "maritalAgencyID",
					"orderable" : false,
					"visible" : true,
					"width" : "5%",
					"render" : function(data, type, full, meta) {
						return '<input type="checkbox" name="selectID" value="' + data + '"/>';
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
		$("#maritalAgencyNameSerch").val("");
		table.ajax.url( _that.common.myurl+"/page").load();
	},
	
	/**
	 * 检索
	 */
	goSearch	:	function(){
		var _that = this;
		
		var table = $('#example').DataTable();
		var maritalAgencyName = $("#maritalAgencyNameSerch").val();
		table.ajax.url( _that.common.myurl+"/page?maritalAgencyName=" + maritalAgencyName ).load();
	},
	
	/**
	 * 新增婚介所
	 */
	goRaise	:	function(){
		var _that = this;
		
		$("#raiseMaritalAgency-form input").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
        $( "#raiseMaritalAgency-form textarea").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
		$("#raiseMaritalAgency-form .help-block").css("display","none");
	 	$("#raiseMaritalAgency-form .form-group").removeClass('has-error').addClass('has-info');

	 	$("#maritalAgencyID").val("");
		$("#maritalAgencyName").val("");
		$("#maritalAgencyLogo").val("");
		$("#maritalAgencyPhone").val("");
		$("#maritalAgencyDetail").val("");
		$("#provinceID").val("");
		$("#provinceName").val("");
		$("#cityID").val("");
		$("#cityName").val("");
		$("#countyID").val("");
		$("#countyName").val("");
		$("#townID").val("");
		$("#townName").val("");
		$("#areaName").val("");
		$("#theNode").val("");
	 	
		$("#raiseMaritalAgency-dialog" ).removeClass('hide').dialog({
		     modal: true,
		     title: "新增婚介所",
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
						 	if($("#raiseMaritalAgency-form").valid()){
						 		$.ajax({
									url :  _that.common.myurl + '/raise',
									data : $("#raiseMaritalAgency-form").serialize(),
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
	 * 修改婚介所信息
	 */
	goModify	:	function(){
		var _that = this;
		
		$("#raiseMaritalAgency-form .help-block").css("display","none");
	 	$("#raiseMaritalAgency-form .form-group").removeClass('has-error').addClass('has-info');
        
        $("#raiseMaritalAgency-form input").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
        $( "#raiseMaritalAgency-form textarea").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
        
		var count = _that.goCheck();
		if(count>0){
			$("#maritalAgencyID").val(_that.common.tableRowDateObj.maritalAgencyID);
			$("#maritalAgencyName").val(_that.common.tableRowDateObj.maritalAgencyName);
			$("#maritalAgencyLogo").val(_that.common.tableRowDateObj.maritalAgencyLogo);
			$("#maritalAgencyPhone").val(_that.common.tableRowDateObj.maritalAgencyPhone);
			$("#maritalAgencyDetail").val(_that.common.tableRowDateObj.maritalAgencyDetail);
			$("#provinceID").val(_that.common.tableRowDateObj.provinceID);
			$("#provinceName").val(_that.common.tableRowDateObj.provinceName);
			$("#cityID").val(_that.common.tableRowDateObj.cityID);
			$("#cityName").val(_that.common.tableRowDateObj.cityName);
			$("#countyID").val(_that.common.tableRowDateObj.countyID);
			$("#countyName").val(_that.common.tableRowDateObj.countyName);
			$("#townID").val(_that.common.tableRowDateObj.townID);
			$("#townName").val(_that.common.tableRowDateObj.townName);
			$("#areaName").val(_that.common.tableRowDateObj.areaName);
			$("#theNode").val(_that.common.tableRowDateObj.theNode);
	 		
			$("#raiseMaritalAgency-dialog" ).removeClass('hide').dialog({
			     modal: true,
			     title: "修改婚介所信息",
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
			     				
							 	if($("#raiseMaritalAgency-form").valid()){
							 		$.ajax({
										url :  _that.common.myurl + '/modify',
										data : $("#raiseMaritalAgency-form").serialize(),
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
		$("#raiseMaritalAgency-form .help-block").css("display","none");
	 	$("#raiseMaritalAgency-form .form-group").removeClass('has-error').addClass('has-info');
        $("#raiseMaritalAgency-form input").each(function(index){
            $(this).attr("disabled" ,"disabled" );
        });
        $( "#raiseMaritalAgency-form textarea").each(function(index){
            $(this).attr("disabled" ,"disabled" );
        }); 
		var count = _that.goCheck();
		if(count>0){
			$("#maritalAgencyID").val(_that.common.tableRowDateObj.maritalAgencyID);
			$("#maritalAgencyName").val(_that.common.tableRowDateObj.maritalAgencyName);
			$("#maritalAgencyLogo").val(_that.common.tableRowDateObj.maritalAgencyLogo);
			$("#maritalAgencyPhone").val(_that.common.tableRowDateObj.maritalAgencyPhone);
			$("#maritalAgencyDetail").val(_that.common.tableRowDateObj.maritalAgencyDetail);
			$("#provinceID").val(_that.common.tableRowDateObj.provinceID);
			$("#provinceName").val(_that.common.tableRowDateObj.provinceName);
			$("#cityID").val(_that.common.tableRowDateObj.cityID);
			$("#cityName").val(_that.common.tableRowDateObj.cityName);
			$("#countyID").val(_that.common.tableRowDateObj.countyID);
			$("#countyName").val(_that.common.tableRowDateObj.countyName);
			$("#townID").val(_that.common.tableRowDateObj.townID);
			$("#townName").val(_that.common.tableRowDateObj.townName);
			$("#areaName").val(_that.common.tableRowDateObj.areaName);
			$("#theNode").val(_that.common.tableRowDateObj.theNode);
	 		
	 		$("#raiseMaritalAgency-dialog" ).removeClass('hide').dialog({
			     modal: true,
			     title: "查看婚介所信息",
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
		var maritalAgencyID = _that.goCheck();
		if( maritalAgencyID != 0 ){
			var goEraseUrl = _that.common.myurl + '/erase';
			
			layer.confirm('确认删除！', {
				  btn: ['删除','取消'], //按钮
				  shade: false //不显示遮罩
			}, function(){
				$.ajax({
					url : goEraseUrl,
					data : {'maritalAgencyID':maritalAgencyID},
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
}