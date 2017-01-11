var soLove = soLove || {};

/**
 * 消息管理
 * 
 * @author HeJiawang
 * @date 2017.01.11
 */
soLove.message = {
	
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
		myurl	:	soLove.domainUrl.baseDomain + '/message',
		
		/**
		 * usermanager url
		 */
		userUrl	:	soLove.domainUrl.baseDomain + '/userManager',
		
		/**
		 * 系统类型列表选中项
		 */
		tableRowDateObj	: Object,
		
		/**
		 * 系统类型列表选中项
		 */
		tableRowDateObj_user	: Object,
		
		/**
		 * 表单验证
		 */
		validate	:	$('#validation-form').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			rules: {
				sendUserID	:{
					required: true,
				},
				receiveUserID:{
					required: true,
				},
				messageContent:{
					required: true,
				},
				theNode:{
					required: true,
				},
				isLook:{
					required: true,
				},
				isAudit:{
					required: true,
				}
			},
	
			messages: {
				sendUserID	:{
					required: "必填",
				},
				receiveUserID:{
					required: "必填",
				},
				messageContent:{
					required:  "必填",
				},
				theNode:{
					required:  "必填",
				},
				isLook:{
					required:  "必填",
				},
				isAudit:{
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
		_that.initTable_user();
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
					"data" : "messageID",
					"orderable" : false,
					"visible" : true,
					"width" : "5%",
					"render" : function(data, type, full, meta) {
						return '<input type="checkbox" name="selectID" value="' + data + '"/>';
					},
				}, 
				{
					"title" : "发送者",
					"data" : "sendUserName",
					"visible" : false,
					"orderable" : false,
				}, 
				{
					"title" : "发送者ID",
					"data" : "sendUserID",
					"visible" : false,
					"orderable" : false,
				}, 
				{
					"title" : "接收者",
					"data" : "receiveUserName",
					"visible" : true,
					"orderable" : false,
				}, 
				{
					"title" : "接收者ID",
					"data" : "receiveUserID",
					"visible" : false,
					"orderable" : false,
				}, 
				{
					"title" : "内容",
					"data" : "messageContent",
					"visible" : true,
					"orderable" : false,
				}, 
				{
					"title" : "备注",
					"data" : "theNode",
					"visible" : true,
					"orderable" : false,
				}, 
				{
					"title" : "查看状态",
					"data" : "isLook",
					"visible" : true,
					"orderable" : false,
					"render" : function(data, type, full, meta) {
						if( data == "yes" ){
							return "已查看";
						} else {
							return "未查看";
						}
					},
				},
				{
					"title" : "审核状态",
					"data" : "maritalEmployQQ",
					"visible" : true,
					"orderable" : false,
					"render" : function(data, type, full, meta) {
						if( data == "yes" ){
							return "已通过";
						} else {
							return "未通过";
						}
					},
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
		$("#sendUserNameSerch").val("");
		$("#receiveUserNameSerch").val("");
		table.ajax.url( _that.common.myurl+"/page").load();
	},
	
	/**
	 * 检索
	 */
	goSearch	:	function(){
		var _that = this;
		
		var table = $('#example').DataTable();
		var sendUserName = $("#sendUserNameSerch").val();
		var receiveUserName = $("#receiveUserNameSerch").val();
		table.ajax.url( _that.common.myurl+"/page?sendUserName=" + sendUserName + "&receiveUserName="+receiveUserName).load();
	},
	
	/**
	 * 新增消息
	 */
	goRaise	:	function(){
		var _that = this;
		
		$("#raiseMessage-form input").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
        $( "#raiseMessage-form textarea").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
		$("#raiseMessage-form .help-block").css("display","none");
	 	$("#raiseMessage-form .form-group").removeClass('has-error').addClass('has-info');

	 	$("#sendUserID").attr("disabled", "disabled");
	 	
	 	$("#messageID").val("");
		$("#sendUserID").val("0");
		$("#sendUserName").val("");
		$("#receiveUserID").val("");
		$("#receiveUserName").val("");
		$("#messageContent").val("");
		$("#theNode").val("");
		$("#isLook").val("no");
		$("#isAudit").val("yes");
	 	
		$("#raiseMessage-dialog" ).removeClass('hide').dialog({
		     modal: true,
		     title: "新增消息",
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
						 	if($("#raiseMessage-form").valid()){
						 		$.ajax({
									url :  _that.common.myurl + '/raise',
									data : $("#raiseMessage-form").serialize(),
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
	 * 修改消息
	 */
	goModify	:	function(){
		var _that = this;
		
		$("#raiseMessage-form .help-block").css("display","none");
	 	$("#raiseMessage-form .form-group").removeClass('has-error').addClass('has-info');
        
        $("#raiseMessage-form input").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
        $( "#raiseMessage-form textarea").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
        
		var count = _that.goCheck();
		if(count>0){
			$("#messageID").val(_that.common.tableRowDateObj.messageID);
			$("#sendUserID").val(_that.common.tableRowDateObj.sendUserID);
			$("#sendUserName").val(_that.common.tableRowDateObj.sendUserName);
			$("#receiveUserID").val(_that.common.tableRowDateObj.receiveUserID);
			$("#receiveUserName").val(_that.common.tableRowDateObj.receiveUserName);
			$("#messageContent").val(_that.common.tableRowDateObj.messageContent);
			$("#theNode").val(_that.common.tableRowDateObj.theNode);
			$("#isLook").val(_that.common.tableRowDateObj.isLook);
			$("#isAudit").val(_that.common.tableRowDateObj.isAudit);
			
			$("#raiseMessage-dialog" ).removeClass('hide').dialog({
			     modal: true,
			     title: "修改消息",
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
			     				
							 	if($("#raiseMessage-form").valid()){
							 		$.ajax({
										url :  _that.common.myurl + '/modify',
										data : $("#raiseMessage-form").serialize(),
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
		$("#raiseMessage-form .help-block").css("display","none");
	 	$("#raiseMessage-form .form-group").removeClass('has-error').addClass('has-info');
        $("#raiseMessage-form input").each(function(index){
            $(this).attr("disabled" ,"disabled" );
        });
        $( "#raiseMessage-form textarea").each(function(index){
            $(this).attr("disabled" ,"disabled" );
        }); 
		var count = _that.goCheck();
		if(count>0){
			$("#messageID").val(_that.common.tableRowDateObj.messageID);
			$("#sendUserID").val(_that.common.tableRowDateObj.sendUserID);
			$("#sendUserName").val(_that.common.tableRowDateObj.sendUserName);
			$("#receiveUserID").val(_that.common.tableRowDateObj.receiveUserID);
			$("#receiveUserName").val(_that.common.tableRowDateObj.receiveUserName);
			$("#messageContent").val(_that.common.tableRowDateObj.messageContent);
			$("#theNode").val(_that.common.tableRowDateObj.theNode);
			$("#isLook").val(_that.common.tableRowDateObj.isLook);
			$("#isAudit").val(_that.common.tableRowDateObj.isAudit);
	 		
	 		$("#raiseMessage-dialog" ).removeClass('hide').dialog({
			     modal: true,
			     title: "查看消息",
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
	 * 删除消息
	 */
	goEarse	:	function(){
		var _that = this;
		var messageID = _that.goCheck();
		if( messageID != 0 ){
			var goEraseUrl = _that.common.myurl + '/erase';
			
			layer.confirm('确认删除！', {
				  btn: ['删除','取消'], //按钮
				  shade: false //不显示遮罩
			}, function(){
				$.ajax({
					url : goEraseUrl,
					data : {'messageID':messageID},
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
	 * 审核消息
	 */
	goAudit	:	function(){
		var _that = this;
		var messageID = _that.goCheck();
		if( messageID != 0 ){
			var goEraseUrl = _that.common.myurl + '/audit';
			
			layer.confirm('审核消息！', {
				  btn: ['通过','拒绝'], //按钮
				  shade: false //不显示遮罩
			}, function(){
				//审核通过
				$.ajax({
					url : goEraseUrl,
					data : {'messageID':messageID, 'isAudit':'yes'},
					type: "get",
					dataType : 'json',
					success:function(result) {
						layer.msg(result.message);
						
						var table = $('#example').DataTable();
						table.ajax.url(_that.common.myurl + '/page').load();
					}
				});
			}, function(){
				//审核拒绝
				$.ajax({
					url : goEraseUrl,
					data : {'messageID':messageID, 'isAudit':'no'},
					type: "get",
					dataType : 'json',
					success:function(result) {
						layer.msg(result.message);
						
						var table = $('#example').DataTable();
						table.ajax.url(_that.common.myurl + '/page').load();
					}
				});
			});
		}
	},
	
	/**
	 * 选择婚介老师所在的婚介所
	 */
	chooseReceiveUser	:	function(){
		var dialogAgency= $("#user-dialog" ).removeClass('hide').dialog({
			modal: true,
			title: "选择消息接收者",
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
						var id = soLove.message.goCheck_user();
						if( id != 0 ){
							
							$("#receiveUserName").val(tableRowDateObj_user.userName);
							$("#receiveUserID").val(tableRowDateObj_user.user);
							$(dialogAgency).dialog("close");
						}
					} 
				}
			]
		});
	},
	
//....消息接收者表单..start....................................................//
	/**
	 * 初始化表单
	 */
	initTable_user	:	function(){
		var _that = this;
		$('#example_user').dataTable({
			"processing" : true,
			"serverSide" : true,
			"ajax" : {
				"url" : _that.common.userUrl + '/page',
				"type" : "GET",
			},
			"dom" : 'rtilp',
			"language" : {
				"url" : "resources/i18n/Chinese.json"
			},
			"columns" : [
				{
					"data" : "userID",
					"orderable" : false,
					"visible" : true,
					"width" : "5%",
					"render" : function(data, type, full, meta) {
						return '<input type="checkbox" name="selectID_user" value="' + data + '"/>';
					},
				}, 
				{
					"title" : "姓名",
					"data" : "userName",
					"orderable" : false,
				}, 
				{
					"title" : "年龄",
					"data" : "userAge",
					"orderable" : false,
				}, 
				{
					"title" : "性别",
					"data" : "userSex",
					"orderable" : false,
					"render" : function(data, type, full, meta) {
						var userSexStr = "";
						if(data == 'man'){
							userSexStr = "男";
						} else if(data == 'woman'){
							userSexStr = "女";
						} else {
							userSexStr = "其他";
						}
						
						return userSexStr;
					},
				}, {
					"title" : "地址",
					"data" : "provinceName",
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
						
						return areaStr;
					},
				},
				{
					"title" : "级别",
					"data" : "userLevel",
					"orderable" : false,
					"render" : function(data, type, full, meta) {
						var userLevelStr = "";
						if(data == 'general'){
							userLevelStr = "注册用户";
						} else if(data == 'member'){
							userLevelStr = "会员用户";
						} else {
							userLevelStr = "其他";
						}
						
						return userLevelStr;
					},
				},
				{
					"title" : "积分总额",
					"data" : "userIntegralTotal",
					"orderable" : false,
				},
				{
					"title" : "获赞数",
					"data" : "getChoiceNum",
					"orderable" : false,
				},
				{
					"title" : "点赞数",
					"data" : "setChoiceNum",
					"orderable" : false,
				},
				{
					"title" : "可查看条目",
					"data" : "userChoiceTotal",
					"orderable" : false,
				},
				{
					"title" : "已查看条目",
					"data" : "userChoiceNum",
					"orderable" : false,
				}
			],
		});

		_that.singleSelectFun_user();
		_that.pageLengthChangeFun_user();
		_that.getTableRowData_user();
	},
	
	/**
	 * 为表单绑定点击事件
	 */
	getTableRowData_user	:	function(){
		var _that = this;
	    var table = $('#example_user').DataTable();
	    $('#example_user tbody').on( 'click', 'tr', function () {
	    	_that.common.tableRowDateObj_user = table.row( this ).data();
	    } );
	},
	
	/**
	 * 为表单复选框绑定单选
	 */
	singleSelectFun_user	:	function(){
		var _that = this;
		var table = $('#example_user').DataTable();
		var lastSelectItem = -1;//-1表示未选中  
		$('#example_user tbody').on( 'click', 'tr', function () {
			var index = table.row( this ).index();
			if(lastSelectItem<0){//如果未选中
				$("#example_user input[name=selectID_user]:eq("+index+")").prop("checked",true);
				$(this).addClass("selected");
				lastSelectItem = index;
			}else{//如果选中
				if(lastSelectItem==index){//如果选的是上一个
			        $("#example_user input[name=selectID_user]:eq("+lastSelectItem+")").prop("checked",false);
			        $("#example_user tbody tr:eq("+lastSelectItem+")").removeClass("selected");
			        lastSelectItem = -1;
				}else{
					$("#example_user input[name=selectID_user]:eq("+lastSelectItem+")").prop("checked",false);
					 $("#example_user tbody tr:eq("+lastSelectItem+")").removeClass("selected");
					$("#example_user input[name=selectID_user]:eq("+index+")").prop("checked",true);
					$(this).addClass("selected");
					lastSelectItem = index;	
				}
			}
	    } );
	}, 

	/**
	 * 为系统类型表单绑定翻页事件
	 */
	pageLengthChangeFun_user	:	function(){
		var _that = this;
		$('#example_user').on( 'length.dt', function ( e, settings, len ) {
			_that.reloadDatatables_user();
		} );
	},
	
	/**
	 * 重新加载系统类型表单
	 */
	reloadDatatables_user	:	function(){
		var _that = this;
		var table = $('#example_user').DataTable();
		table.ajax.url(_that.common.userUrl + '/page').load();
	},
	
	/**
	 * 判断是否选中组织列表数据
	 */
	goCheck_user	:	function(){
		var ids = document.getElementsByName("selectID_user");
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
	goReset_user	:	function(){
		var _that = this;
		
		var table = $('#example_user').DataTable();
		$("#userName").val("");
		table.ajax.url( _that.common.userUrl+"/page").load();
	},
	
	/**
	 * 检索
	 */
	goSearch_user	:	function(){
		var _that = this;
		
		var table = $('#example_user').DataTable();
		var userName = $("#userNameSerch").val();
		table.ajax.url( _that.common.userUrl+"/page?userName=" + userName ).load();
	},
//....婚介所表单..end......................................................//
	
}