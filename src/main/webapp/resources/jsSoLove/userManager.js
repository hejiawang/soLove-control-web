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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/**
	 * 查看用户信息
	 */
	userView	:	{
		
		/**
		 * 获取用户信息
		 */
		init	:	function(){
			var userViewUrl = soLove.userManager.common.myurl + '/view';
			$.ajax({
				url : userViewUrl,
				data : {
					"userID":$("#userID").val()
				},
				type: "get",
				dataType : 'json',
				success: function( result ){
					if(result.success){
						var userInfo = result.result.userInfo;
						var userDetail = result.result.userDetail;
						var userImg = result.result.userImg;
						var userHobby = result.result.userHobby;
						var userParent = result.result.userParent;
						var userChildren = result.result.userChildren;
						var userMate = result.result.userMate;
						
						soLove.userManager.userView.viewUserInfo(userInfo);
						soLove.userManager.userView.viewUserDetail(userDetail);
						soLove.userManager.userView.viewUserImg(userImg);
						soLove.userManager.userView.viewUserHobby(userHobby);
						soLove.userManager.userView.viewUserParent(userParent);
						soLove.userManager.userView.viewUserChildren(userChildren);
						soLove.userManager.userView.viewUserMate(userMate);
					}
				}
			});
		},
		
		/**
		 * 查看用户基本信息
		 */
		viewUserInfo	:	function( data ){
			$("#loginName").val(data.loginName);
			$("#userLevel").val(data.userLevel);
			$("#registerDate").val(data.registerDate);
			$("#registerType").val(data.registerType);
			$("#getChoiceNum").val(data.getChoiceNum);
			$("#setChoiceNum").val(data.setChoiceNum);
			$("#userChoiceTotal").val(data.userChoiceTotal);
			$("#userChoiceNum").val(data.userChoiceNum);
			$("#userIntegralTotal").val(data.userIntegralTotal);
			$("#userMaritalSuccess").val(data.userMaritalSuccess);
		},
		
		/**
		 * 查看用户详细信息
		 */
		viewUserDetail	:	function( data ){
			$("#userCard").val(data.userCard);
			$("#userPhone").val(data.userPhone);
			$("#userSex").val(data.userSex);
			$("#userAge").val(data.userAge);
			$("#userName").val(data.userName);
			$("#userNick").val(data.userNick);
			$("#userQQ").val(data.userQQ);
			$("#userWeixin").val(data.userWeixin);
			$("#userNation").val(data.userNation);
			$("#userFaith").val(data.userFaith);
			$("#userWork").val(data.userWork);
			$("#userIncomeLevel").val(data.userIncomeLevel);
			$("#userHeight").val(data.userHeight);
			$("#userWeight").val(data.userWeight);
			$("#userBirthday").val(data.userBirthday);
			$("#userBlood").val(data.userBlood);
			$("#userEducation").val(data.userEducation);
			$("#userSchool").val(data.userSchool);
			$("#userMagor").val(data.userMagor);
			$("#userMaritalStatus").val(data.userMaritalStatus);
			$("#userMaritalCard").val(data.userMaritalCard);
			$("#userHaveCar").val(data.userHaveCar);
			$("#userHaveHome").val(data.userHaveHome);
			$("#provinceName").val(data.provinceName);
			$("#cityName").val(data.cityName);
			$("#countyName").val(data.countyName);
			$("#townName").val(data.townName);
			$("#userEvaluation").val(data.userEvaluation);
			$("#userLovePlan").val(data.userLovePlan);
		},
		
		/**
		 * 查看用户照片
		 */
		viewUserImg	:	function( data ){
			for( var i=1; i<=10; i++ ){
				var param = "userImage" + i;
				var imageStr = data.param;
				if( param ){
					$("#userImage"i"_src").attr("src", soLove.domainUrl.baseDomain + "resources/upload/userImg/" + param);
					$("#userImage"+i).val(param);
				}
			}
		},
		
		/**
		 * 查看用户兴趣爱好
		 */
		viewUserHobby	:	function( data ){
			var htmlStr = "";
			for( var i=0, i< data.length, i++ ){
				var hobby = data[i];
				htmlStr +=	' <tr id="hobby_'+hobby.hobbyID+'"> '+
							' 	<td> '+ 
							' 		<label style="text-align:left;"><button onclick="soLove.userManager.userView.js_deleteHobby("hobby_'+hobby.hobbyID+'")" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;" >删除信息</button></label> '+
							' 		<span> '+
							' 			<select name="content"> '+
							' 				<option value="'+hobby.hobbyID+'">'+hobby.content+'</option> '+
							' 			</select> '+
							' 		</span> '+
							' 	</td>  '+
					 		' </tr> ';
			}
			$("#hobbyInfo-table").html(htmlStr);
		},
		
		/**
		 * 删除已选的用户兴趣爱好
		 */
		js_deleteHobby	:	function( hobby_hobbyID ){
			$("#" + hobby_hobbyID).remove();
		}
		
		/**
		 * 新增用户兴趣爱好的选择框
		 */
		js_raiseHobby	:	function(){
			
		}
		
		/**
		 * 查看用户父母信息
		 */
		viewUserParent	:	function( data ){
			var htmlStr = "";
			for( var i=0, i< data.length, i++ ){
				var parent = data[i];
				htmlStr +=' '+
				' <div id="parent_'+parent.parentID+'"> '+
				' 	<tr> '+
				' 		<td > '+ 
				' 			<label><span style="color:red">*</span>关系:</label> '+
				' 			<span> '+
				' 				<select name="parentRelation"> '+
				' 					<option value="man">父亲</option> '+
				' 					<option value="woman">母亲</option> '+
				' 				</select> '+
				' 			</span> '+
				' 		</td> '+
				' 	</tr> '+
				' 	<tr> '+
				' 		<td> '+
				'        	<label><span style="color:red">*</span>年龄:</label> '+
				'         	<span > <input type="text" name="parentAge" value="'+parent.parentAge+'"> </span> '+
				' 		</td> '+
				' 	</tr> '+
				' 	<tr style="height: 200px;"> '+
				' 		<td style="height: 200px;"> '+
				' 	        <label style="position:relative; top:-180px; ">简介:</label> '+
				' 			<textarea name="parentRecommend" maxlength="255" style="height: 200px;" value="'+parent.parentRecommend+'"></textarea> '+
				' 	    </td> '+
				' 	</tr> '+
				' 	<tr> '+
				' 		<td> '+
				' 			<label></label> '+
				' 			<span><button onclick="soLove.userManager.userView.js_deleteParent("parent_'+parent.parentID+'")" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;" >删除信息</button></span> '+
				' 		</td> '+
				' 	</tr> '+
				' </div> ';
			}
			$("#parentInfo-table").html(htmlStr);
		},
		
		/**
		 * 删除用户母女信息的选择框
		 */
		js_deleteParent	:	function(parent_parentID){
			$("#" + parent_parentID).remove();
		},
		
		/**
		 * 新增用户父母信息的选择框
		 */
		js_raiseParent	:	function(){
			
		},
		
		/**
		 * 查看用户子女信息
		 */
		viewUserChildren	:	function( data ){
			var htmlStr = "";
			for( var i=0, i< data.length, i++ ){
				var children = data[i];
				htmlStr +=' '+
				' <div id="parent_'+children.childrenID+'"> '+
				' 	<tr> '+
				' 		<td > '+ 
				' 			<label><span style="color:red">*</span>关系:</label> '+
				' 			<span> '+
				' 				<select name="parentRelation"> '+
				' 					<option value="man">父亲</option> '+
				' 					<option value="woman">母亲</option> '+
				' 				</select> '+
				' 			</span> '+
				' 		</td> '+
				' 	</tr> '+
				' 	<tr> '+
				' 		<td> '+
				'        	<label><span style="color:red">*</span>年龄:</label> '+
				'         	<span > <input type="text" name="parentAge" value="'+children.childrenAge+'"> </span> '+
				' 		</td> '+
				' 	</tr> '+
				' 	<tr style="height: 200px;"> '+
				' 		<td style="height: 200px;"> '+
				' 	        <label style="position:relative; top:-180px; ">简介:</label> '+
				' 			<textarea name="parentRecommend" maxlength="255" style="height: 200px;" value="'+children.childrenRecommend+'"></textarea> '+
				' 	    </td> '+
				' 	</tr> '+
				' 	<tr> '+
				' 		<td> '+
				' 			<label></label> '+
				' 			<span><button onclick="soLove.userManager.userView.js_deleteChildren("parent_'+children.childrenID+'")" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;" >删除信息</button></span> '+
				' 		</td> '+
				' 	</tr> '+
				' </div> ';
			}
			$("#childrenInfo-table").html(htmlStr);
		},
		
		/**
		 * 删除用户母女信息的选择框
		 */
		js_deleteChildren	:	function(children_childrenID){
			$("#" + children_childrenID).remove();
		},
		
		/**
		 * 新增用户父母信息的选择框
		 */
		js_raiseChildren	:	function(){
			
		},
		
		/**
		 * 查看用户择偶信息
		 */
		viewUserMate	:	function( data ){
			$("#mateSex").val(data.mateSex);
			$("#mateAgeLevel").val(data.mateAgeLevel);
			$("#mateHeightLevel").val(data.mateHeightLevel);
			$("#mateEducation").val(data.mateEducation);
			$("#mateIncomeLevel").val(data.mateIncomeLevel);
			$("#mateMaritalStatus").val(data.mateMaritalStatus);
			$("#mateHaveChildren").val(data.mateHaveChildren);
			$("#mateHaveCar").val(data.mateHaveCar);
			$("#mateHaveHome").val(data.mateHaveHome);
			$("#provinceName").val(data.provinceName);
			$("#cityName").val(data.cityName);
			$("#countyName").val(data.countyName);
			$("#townName").val(data.townName);
			$("#theNode_mate").val(data.theNode);
		},
		
		/**
		 * 关闭用户信息查看页面
		 */
		userViewClose	:	function(){
			window.close();
		}
	},
	
	/**
	 * 用户修改信息
	 */
	userModify	:	{
		
		/**
		 * 首先获取用户信息
		 */
		init	:	function(){
			var userViewUrl = soLove.userManager.common.myurl + '/view';
			$.ajax({
				url : userViewUrl,
				data : {
					"userID":$("#userID").val()
				},
				type: "get",
				dataType : 'json',
				success: function( result ){
					if(result.success){
						var userInfo = result.result.userInfo;
						var userDetail = result.result.userDetail;
						var userImg = result.result.userImg;
						var userHobby = result.result.userHobby;
						var userParent = result.result.userParent;
						var userChildren = result.result.userChildren;
						var userMate = result.result.userMate;
						
						soLove.userManager.userView.viewUserInfo(userInfo);
						soLove.userManager.userView.viewUserDetail(userDetail);
						soLove.userManager.userView.viewUserImg(userImg);
						soLove.userManager.userView.viewUserHobby(userHobby);
						soLove.userManager.userView.viewUserParent(userParent);
						soLove.userManager.userView.viewUserChildren(userChildren);
						soLove.userManager.userView.viewUserMate(userMate);
					}
				}
			});
		},
		
		
		/**
		 * 修改用户信息
		 */
		userModifySubmit	:	function(){
			/**
			 * 首先修改userInfo，
			 * 然后修改USerDetail，
			 * 在然后userImg——userHobby——userParent——userChildren——userMate
			 * 依次进行
			 * 在ajax的success回调中进行下一个修改项
			 */
			soLove.userManager.userModify.modifyUserInfo();
		},
		
		/**
		 * 修改用户userInfo
		 */
		modifyUserInfo	:	function(){
			var modifyUserInfoUrl = "";
			$.ajax({
				url : modifyUserInfoUrl,
				data :  $("#baseInfo-form").serialize(),
				type: "post",
				dataType : 'json',
				success: function( result ){
					if(result.success){
						soLove.userManager.userModify.modifyUserDetail();
					}
				}
			});
		},
		
		/**
		 * 修改用户userDetail
		 */
		modifyUserDetail	:	function(){
			var url = "";
			$.ajax({
				url : url,
				data :  $("#detailInfo-form").serialize(),
				type: "post",
				dataType : 'json',
				success: function( result ){
					if(result.success){
						soLove.userManager.userModify.modifyUserImg();
					}
				}
			});
		},
		
		/**
		 * 修改用户userImg
		 */
		modifyUserImg	:	function(){
			var url = "";
			$.ajax({
				url : url,
				data :  $("#imgInfo-form").serialize(),
				type: "post",
				dataType : 'json',
				success: function( result ){
					if(result.success){
						soLove.userManager.userModify.modifyUserHobby();
					}
				}
			});
		},
		
		/**
		 * 修改用户userHobby</br>
		 * 传数组
		 */
		modifyUserHobby	:	function(){
			var url = "";
			$.ajax({
				url : url,
				data :  $("#hobbyInfo-form").serialize(),
				type: "post",
				dataType : 'json',
				success: function( result ){
					if(result.success){
						soLove.userManager.userModify.modifyUserParent();
					}
				}
			});
		},
		
		/**
		 * 修改用户userParent
		 */
		modifyUserParent	:	function(){
			var url = "";
			$.ajax({
				url : url,
				data :  $("#parentInfo-form").serialize(),
				type: "post",
				dataType : 'json',
				success: function( result ){
					if(result.success){
						soLove.userManager.userModify.modifyUserChildren();
					}
				}
			});
		},
		
		/**
		 * 修改用户userChildren
		 */
		modifyUserChildren	:	function(){
			var url = "";
			$.ajax({
				url : url,
				data :  $("#childrenInfo-form").serialize(),
				type: "post",
				dataType : 'json',
				success: function( result ){
					if(result.success){
						soLove.userManager.userModify.modifyUserMate();
					}
				}
			});
		},
		
		/**
		 * 修改用户userMate</br>
		 * 提示修改用户信息成功,关闭修改页面，执行用户管理页的查询方法
		 */
		modifyUserMate	:	function(){
			var url = "";
			$.ajax({
				url : url,
				data :  $("#mateInfo-form").serialize(),
				type: "post",
				dataType : 'json',
				success: function( result ){
					if(result.success){
						alert("修改用户信息成功");
						window.opener.location="javascript:soLove.userManeger.goSearch()";
						window.close();
					}
				}
			});
		}
		
		/**
		 * 关闭用户信息查看页面
		 */
		userModifyClose	:	function(){
			window.close();
		}
	},
	
};