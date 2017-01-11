var soLove = soLove || {};

/**
 * 活动管理
 * 
 * @author HeJiawang
 * @date 2017.01.11
 */
soLove.activity = {
	
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
		myurl	:	soLove.domainUrl.baseDomain + '/activity',
		
		/**
		 * 系统类型列表选中项
		 */
		tableRowDateObj	: Object,
		
		/**
		 * 表单验证
		 */
		validate	:	$('#raiseActivity-form').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			rules: {
				activityMoney:{
					required: true,
				},
				activityStartTime:{
					required: true,
				},
				activityEndTime:{
					required: true,
				},
				sort:{
					required: true,
				},
				activityContent:{
					required: true,
				}
			},
	
			messages: {
				activityMoney:{
					required: "必填",
				},
				activityStartTime:{
					required:  "必填",
				},
				activityEndTime:{
					required:  "必填",
				},
				sort:{
					required:  "必填",
				},
				activityContent:{
					required:  "必填",
				}
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
					"data" : "activityID",
					"orderable" : false,
					"visible" : true,
					"width" : "5%",
					"render" : function(data, type, full, meta) {
						return '<input type="checkbox" name="selectID" value="' + data + '"/>';
					},
				}, 
				{
					"title" : "活动费用",
					"data" : "activityMoney",
					"visible" : true,
					"orderable" : false,
				}, 
				{
					"title" : "开始时间",
					"data" : "activityStartTime",
					"visible" : true,
					"orderable" : false,
				}, 
				{
					"title" : "结束时间",
					"data" : "activityEndTime",
					"visible" : true,
					"orderable" : false,
				}, 
				{
					"title" : "顺序",
					"data" : "sort",
					"visible" : true,
					"orderable" : false,
				}, 
				{
					"title" : "活动内容",
					"data" : "activityContent",
					"visible" : true,
					"orderable" : false,
				}, 
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
	 * 为表单绑定翻页事件
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
		$("#activityStartTimeSerch").val("");
		$("#activityEndTimeSerch").val("");
		table.ajax.url( _that.common.myurl+"/page").load();
	},
	
	/**
	 * 检索
	 */
	goSearch	:	function(){
		var _that = this;
		
		var table = $('#example').DataTable();
		var activityStartTime = $("#activityStartTimeSerch").val();
		var activityEndTime = $("#activityEndTimeSerch").val();
		table.ajax.url( _that.common.myurl+"/page?activityStartTime=" + activityStartTime + "&activityEndTime=" + activityEndTime ).load();
	},
	
	/**
	 * 新增活动
	 */
	goRaise	:	function(){
		var _that = this;
		
		$("#raiseActivity-form input").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
        $( "#raiseActivity-form textarea").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
		$("#raiseActivity-form .help-block").css("display","none");
	 	$("#raiseActivity-form .form-group").removeClass('has-error').addClass('has-info');

	 	$("#activityID").val("");
		$("#activityMoney").val("");
		$("#activityStartTime").val("");
		$("#activityEndTime").val("");
		$("#sort").val("");
		$("#activityContent").val("");
	 	
		$("#raiseActivity-dialog" ).removeClass('hide').dialog({
		     modal: true,
		     title: "新增活动",
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
						 	if($("#raiseActivity-form").valid()){
						 		$.ajax({
									url :  _that.common.myurl + '/raise',
									data : $("#raiseActivity-form").serialize(),
									type: "post",
									dataType : 'json',
									success: function(result){
										layer.msg(result.message);
							            
										if( result.success ){
											_that.reloadDatatables();
											$( this ).dialog( "close" ); 
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
	 * 修改活动信息
	 */
	goModify	:	function(){
		var _that = this;
		
		$("#raiseActivity-form .help-block").css("display","none");
	 	$("#raiseActivity-form .form-group").removeClass('has-error').addClass('has-info');
        
        $("#raiseActivity-form input").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
        $( "#raiseActivity-form textarea").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
        
		var count = _that.goCheck();
		if(count>0){
			$("#activityID").val(_that.common.tableRowDateObj.activityID);
			$("#activityMoney").val(_that.common.tableRowDateObj.activityMoney);
			$("#activityStartTime").val(_that.common.tableRowDateObj.activityStartTime);
			$("#activityEndTime").val(_that.common.tableRowDateObj.activityEndTime);
			$("#sort").val(_that.common.tableRowDateObj.sort);
			$("#activityContent").val(_that.common.tableRowDateObj.activityContent);

			$("#raiseActivity-dialog" ).removeClass('hide').dialog({
			     modal: true,
			     title: "修改活动信息",
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
			     				
							 	if($("#raiseActivity-form").valid()){
							 		$.ajax({
										url :  _that.common.myurl + '/modify',
										data : $("#raiseActivity-form").serialize(),
										type: "post",
										dataType : 'json',
										success: function(result){
											layer.msg(result.message);
								            
											if( result.success ){
												_that.reloadDatatables();
												$( this ).dialog( "close" ); 
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
		$("#raiseActivity-form .help-block").css("display","none");
	 	$("#raiseActivity-form .form-group").removeClass('has-error').addClass('has-info');
        $("#raiseActivity-form input").each(function(index){
            $(this).attr("disabled" ,"disabled" );
        });
        $( "#raiseActivity-form textarea").each(function(index){
            $(this).attr("disabled" ,"disabled" );
        }); 
		var count = _that.goCheck();
		if(count>0){
			$("#activityID").val(_that.common.tableRowDateObj.activityID);
			$("#activityMoney").val(_that.common.tableRowDateObj.activityMoney);
			$("#activityStartTime").val(_that.common.tableRowDateObj.activityStartTime);
			$("#activityEndTime").val(_that.common.tableRowDateObj.activityEndTime);
			$("#sort").val(_that.common.tableRowDateObj.sort);
			$("#activityContent").val(_that.common.tableRowDateObj.activityContent);
	 		
	 		$("#raiseActivity-dialog" ).removeClass('hide').dialog({
			     modal: true,
			     title: "查看活动信息",
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
	 * 删除活动信息
	 */
	goEarse	:	function(){
		var _that = this;
		var ActivityID = _that.goCheck();
		if( ActivityID != 0 ){
			var goEraseUrl = _that.common.myurl + '/erase';
			
			layer.confirm('确认删除！', {
				  btn: ['删除','取消'], //按钮
				  shade: false //不显示遮罩
			}, function(){
				$.ajax({
					url : goEraseUrl,
					data : {'ActivityID':ActivityID},
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