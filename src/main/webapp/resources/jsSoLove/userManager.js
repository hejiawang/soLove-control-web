var soLove = soLove || {};

/**
 * 用户管理
 * @date 2016.12.23
 */
soLove.userManager = {
	
	/**
	 * 消息
	 */
	message    : {
		netWorkError: '网络异常,请稍后重试!'
	},
		
	common	:	{
		/**
		 * 系统类型url
		 */
		myurl	:	soLove.domainUrl.baseDomain + '/userManage',
		
		/**
		 * 系统类型列表选中项
		 */
		tableRowDateObj	: Object,
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
					"data" : "userID",
					"orderable" : false,
					"visible" : true,
					"width" : "5%",
					"render" : function(data, type, full, meta) {
						return '<input type="checkbox" name="selectID" value="' + data + '"/>';
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
		$("#userName").val("");
		table.ajax.url( _that.common.myurl+"/page").load();
	},
	
	/**
	 * 检索
	 */
	goSearch	:	function(){
		var _that = this;
		
		var table = $('#example').DataTable();
		var userName = $("#userNameSerch").val();
		table.ajax.url( _that.common.myurl+"/page?userName=" + userName ).load();
	},
	
	/**
	 * 删除用户
	 */
	goErase	:	function(){
		var _that = this;
		var userID = _that.goCheck();
		if( userID != 0 ){
			var goEraseUrl = _that.common.myurl + '/erase';
			
			layer.confirm('确认删除！', {
				  btn: ['删除','取消'], //按钮
				  shade: false //不显示遮罩
			}, function(){
				$.ajax({
					url : goEraseUrl,
					data : {'userID':userID},
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
	 * 查看用户信息
	 */
	goView	:	function(){
		var _that = this;
		var userID = _that.goCheck();
		if( userID != 0 ){
			window.location.href = soLove.domainUrl.baseDomain + "/pageGoto/userManagerView?userID" + userID;
		}
	},
	
	/**
	 * 修改用户信息
	 */
	goModify	:	function(){
		var _that = this;
		var userID = _that.goCheck();
		if( userID != 0 ){
			window.location.href = soLove.domainUrl.baseDomain + "/pageGoto/userManagerModify?userID" + userID;
		}
	},
	
	/**
	 * 新增用户信息
	 */
	goRaise	:	function(){
		var _that = this;
		
		$("#loginName").val("");
		$("#passWord").val("123456");
		
		$("#dialog-message").removeClass('hide').dialog({
			 modal: true,
		     title: "新增用户",
		     title_html: true,
			 width:600,
		     buttons: [ {
					text: "确定",
					"class" : "btn btn-primary btn-xs",
					click: function() {
						var goRaiseUrl = _that.common.myurl + '/raise';
						$.ajax({
							url : goRaiseUrl,
							data : $("#raiseUser-form").serialize(),
							type: "post",
							dataType : 'json',
							success: function( result ){
								layer.msg(result.message);

								if(result.success){
									$( this ).dialog( "close" ); 
									
									var table = $('#example').DataTable();
									table.ajax.url(_that.common.myurl + '/page').load();
								}
							}
						});
					} 
				},
				{
					text: "关闭",
					"class" : "btn btn-primary btn-xs",
					click: function() {
						$( this ).dialog( "close" ); 
					} 
				}]
		 });
	},
	
};