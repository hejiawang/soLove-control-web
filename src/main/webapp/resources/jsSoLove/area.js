var soLove = soLove || {};

/**
 * 地区管理
 * 
 * @author HeJiawang
 * @date 2016.12.28
 */
soLove.area = {
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
		myurl	:	soLove.domainUrl.baseDomain + '/area',
		
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
				areaCode: {
					required: true,
					number: true,
					maxlength: 8,
				},
				areaName:{
					required: true,
					maxlength: 50,
				},
				shortName:{
					required: true,
					maxlength: 50,
				},
				parentID:{
					required: true
				},
				areaLevel: {
					required: true,
					number: true,
					maxlength: 6
				},
				sortNum: {
					required: true,
					number: true,
					maxlength: 6
				},
				theNote: {
					required: false,
					maxlength: 300
				}
			},
	
			messages: {
				areaCode: {
					required: "编码必填!",
					number: "必须为正整数!",
					maxlength: "最多填写8位字符!",
				},
				areaName: {
					required: "名称必填!",
					maxlength: "最多填写50位字符!",
				},
				shortName: {
					required: "简称必填!",
					maxlength: "最多填写50位字符!",
				},
				parentID: {
					required: "所属地区必选!"
				},
				areaLevel: {
					required: "等级必填!",
					number: "必须为正整数!",
					maxlength:"最多填写6位数字!"
				},
				sortNum: {
					required: "排序必填!",
					number: "必须为正整数!",
					maxlength:"最多填写6位数字!"
				},
				theNote: {
					maxlength:"最多填写300位字符!"
				}
			},
	
			invalidHandler: function (event, validator) { //display error alert on form submit   
				$('.alert-danger', $('.login-form')).show();
			},
	
			highlight: function (e) {
				$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
			},
	
			success: function (e) {
				$(e).closest('.form-group').removeClass('has-error').addClass('has-info');
				$(e).remove();
			},
		}),
	},
	
	/**
	 * 机构树参数
	 */
	treeSetting	:	{
		view: {
			selectedMulti: false
		},
		async: {
			enable		:	true,
			url			:	soLove.domainUrl.baseDomain + '/area/tree',
			dataType	:	"text",
			type		:	"get",
			autoParam	:	["id"]
		},
		callback: {
			beforeClick	: 	function(treeId, treeNode){
				soLove.area.treeBeforeClick(treeId, treeNode);
			}
		} 
	},
	
	/**
	 * 数据初始化
	 */
	init	:	function(){
		var _that = this;
		
		_that.initMenuResource();
		_that.initTable();
		_that.initTree();
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
	
	initTable	:	function(){
		var _that = this;
		$('#example').dataTable({
			  "processing": true,
		      "serverSide": true,
		      "ajax": {
		            "url": _that.common.myurl + '/page',
		            "type": "POST",
		      },
			 "dom": 'rtilp',
			  "language": {
			                "url": "assets/i18n/Chinese.json"
			            },
		      "columns": [
		            { 
		            	"data": "areaID",
		          	 	"orderable": false,
		            	"visible": true,
		            	"width":"5%",
				        "render":function ( data, type, full, meta ) {
		                return '<input type="checkbox" name="selectID" value="'+data+'"/>';
		              },	 
		            },
		            { 
		            	"title":"地区名称",
		            	"data": "areaName",
		            	"orderable": false,	
		            },
		            { 
		            	"title":"地区简称",
		            	"data": "shortName",
		            	"orderable": false,	
		            },
		            { 
		            	"title":"所属地区",
		            	"data": "parentName",
		            	"orderable": false,	
		            },
		            { 
		            	"title":"地区等级",
		            	"data": "areaLevel",
		            	"orderable": false,	
		            	"render":function ( data, type, full, meta ) {
		            		if(data==1){
		            			return '国';
		            		}else if(data==2){
		            			return '省';
		            		}else if(data==3){
		            			return '市';
		            		}else if(data==4){
		            			return '区/县';
		            		}else if(data==5){
		            			return '乡镇';
		            		}else{
		            			return '直辖市';
		            		}
		                } 
		            },
		            { 
		            	"title":"排序",
		            	"data": "sortNum",
		            	"orderable": false,	
		            },
		            { 
		            	"title":"",
		            	"data": "parentID",
		            	"orderable": false,
		            	"visible": false
		            },
		            { 
		            	"title":"",
		            	"data": "isDelete",
		            	"orderable": false,
		            	"visible": false
		            },
		            { 
		            	"title":"",
		            	"data": "theNote",
		            	"orderable": false,
		            	"visible": false
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
	 * 为表单绑定翻页事件
	 */
	pageLengthChangeFun	:	function(){
		var _that = this;
		$('#example').on( 'length.dt', function ( e, settings, len ) {
			_that.reloadDatatables();
		} );
	},
	
	/**
	 * 重新加载表单
	 */
	reloadDatatables	:	function(){
		var _that = this;
		var table = $('#example').DataTable();
		table.ajax.url(_that.common.myurl + '/page').load();
	},
	
	/**
	 * 判断是否选中列表数据
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
	 * 初始化树
	 */
	initTree	:	function(){
		var _that = this;
		$.fn.zTree.init($("#treeDemo"), _that.treeSetting);
	},
	
	/**
	 * 机构树点击事件
	 */
	treeBeforeClick	:	function( treeId, treeNode ){
		var _that = this
		
		var id = treeNode.id;
		var areaLevel = treeNode.garade;
		var table = $('#example').DataTable();
		table.ajax.url( _that.common.myurl + "?parentID=" + id + "&areaLevel=" + areaLevel).load();
		return true;
	},
	
	/**
	 * 显示父地区树
	 */
	showParentTree	:	function(){
		var settingPar = {
				check	: {
					enable: true,
					chkStyle: "radio",
					radioType: "all"
				},
				view	: {
					dblClickExpand: false
				},
				data	: {
					simpleData: {
						enable: true
					}
				},
				async	: {
					enable	: true,
					url		:soLove.domainUrl.baseDomain + '/area/tree',
					dataType: "text",
					type	:"post",
					autoParam: ["id"]
				} 
		};
		$.fn.zTree.init($("#parentTree"), settingPar);
		var dialogType = $("#areaParentTree-message" ).removeClass('hide').dialog({
			modal: true,
			title: "所属地区",
			title_html: true,
			width:300,
			buttons: [ 
				{
					text: "取消",
					"class" : "btn btn-primary btn-xs",
					click: function() {
						$(dialogType).dialog("close");
					} 
				},
				{
					text: "确认",
					"class" : "btn btn-primary btn-xs",
					click: function() {
						var zTree = $.fn.zTree.getZTreeObj("parentTree");
						nodes = zTree.getCheckedNodes(true);
						if(nodes.length>0){
							var parentID = nodes[0].id;
							var parentName = nodes[0].name;
							var areaLevel = nodes[0].garade;
							$("#parentID").val(parentID);
							$("#parentName").val(parentName);
							$(dialogType).dialog("close");	
						}else{
							layer.msg("所属地区必选");
						}
					} 
				}
			]
		});
	},
	
	/**
	 * 新增地区
	 */
	goRaise	:	function(){
		var _that = this;
		
		$("#validation-form input").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
        $( "#validation-form textarea").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
		$("#validation-form .help-block").css("display","none");
	 	$("#validation-form .form-group").removeClass('has-error').addClass('has-info');
		$("#areaCode").css("border-color","#b5b5b5");
		$("#areaName").css("border-color","#b5b5b5");
        $("#hintCode").css("display","none");
        $("#hintName").css("display","none");
        $("#areaCode").removeAttr("readonly","");
		$("#areaCode").val("");
		$("#areaName").val("");
	  	$("#shortName").val("");
	  	$("#areaLevel").val("");
	  	$("#parentID").val("");
	  	$("#parentName").val("");
	  	$("#sortNum").val("");
	  	$("#theNote").val("");
	 	$.widget("ui.dialog", 
	 			$.extend(
	 					{}, 
	 					$.ui.dialog.prototype, 
	 					{
	 						_title: function(title) {
				     	  		var $title = this.options.title || '&nbsp;'
				     			if( ("title_html" in this.options) && this.options.title_html == true )
				     				title.html($title);
				     			else title.text($title);
			     			}
	 					}
	 			)
	 	);
		$("#dialog-message" ).removeClass('hide').dialog({
		     modal: true,
		     title: "新增地区",
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
						 	if($("#validation-form").valid()){
						 		$.ajax({
									url :  _that.common.myurl + '/raise',
									data : $("#validation-form").serialize(),
									type: "post",
									dataType : 'json',
									success: function(result){
										layer.msg(result.message);
										
										$("#areaCode").css("border-color","#b5b5b5");
							            $("#hintCode").css("display","none");
							            $("#areaName").css("border-color","#b5b5b5");
							            $("#hintName").css("display","none");
							            
										if( result.success ){
											_that.reloadDatatables();
											$.fn.zTree.init($("#treeDemo"), _that.treeSetting);
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
	 * 修改地区
	 */
	goModify	:	function(){
		var _that = this;
		
		$("#validation-form .help-block").css("display","none");
	 	$("#validation-form .form-group").removeClass('has-error').addClass('has-info');
		$("#areaCode").css("border-color","#b5b5b5");
		$("#areaName").css("border-color","#b5b5b5");
        $("#hintCode").css("display","none");
        $("#hintName").css("display","none");
        
        $("#validation-form input").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
        $( "#validation-form textarea").each(function(index){
            $(this).removeAttr("disabled" ,"" );
        });
        
		var count = _that.goCheck();
		if(count>0){
			$("#areaID").val(_that.common.tableRowDateObj.areaID);
			$("#areaCode").val(_that.common.tableRowDateObj.areaCode);
			$("#areaName").val(_that.common.tableRowDateObj.areaName);
			$("#shortName").val(_that.common.tableRowDateObj.shortName);
			$("#areaLevel").val(_that.common.tableRowDateObj.areaLevel);
	 		$("#parentID").val(_that.common.tableRowDateObj.parentID);
	 		$("#parentName").val(_that.common.tableRowDateObj.parentName);
	 		$("#sortNum").val(_that.common.tableRowDateObj.sortNum);
	 		$("#theNote").val(_that.common.tableRowDateObj.theNote);
	 		$("#areaCode").attr("readonly","readonly");
	 		
	 		$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
			     _title: function(title) {
			     	  var $title = this.options.title || '&nbsp;'
			     			if( ("title_html" in this.options) && this.options.title_html == true )
			     				title.html($title);
			     			else title.text($title);
			     			}
			}));
			$("#dialog-message" ).removeClass('hide').dialog({
			     modal: true,
			     title: "修改地区",
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
			     				
							 	if($("#validation-form").valid()){
							 		$.ajax({
										url :  _that.common.myurl + '/modify',
										data : $("#validation-form").serialize(),
										type: "post",
										dataType : 'json',
										success: function(result){
											layer.msg(result.message);
											
											$("#areaName").css("border-color","#b5b5b5");
								            $("#hintName").css("display","none");
								            
											if( result.success ){
												_that.reloadDatatables();
												$.fn.zTree.init($("#treeDemo"), _that.treeSetting);
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
	 * 查看地区信息
	 */
	goView	:	function(){
		var _that = this;
		
		$("#validation-form .help-block").css("display","none");
	 	$("#validation-form .form-group").removeClass('has-error').addClass('has-info');
		$("#areaCode").css("border-color","#b5b5b5");
		$("#areaName").css("border-color","#b5b5b5");
        $("#hintCode").css("display","none");
        $("#hintName").css("display","none");
        $("#areaCode").removeAttr("readonly","");
        $("#validation-form input").each(function(index){
            $(this).attr("disabled" ,"disabled" );
        });
        $( "#validation-form textarea").each(function(index){
            $(this).attr("disabled" ,"disabled" );
        }); 
		var count = _that.goCheck();
		if(count>0){
			$("#areaCode").val(_that.common.tableRowDateObj.areaCode);
			$("#areaName").val(_that.common.tableRowDateObj.areaName);
			$("#shortName").val(_that.common.tableRowDateObj.shortName);
			$("#areaLevel").val(_that.common.tableRowDateObj.areaLevel);
	 		$("#parentID").val(_that.common.tableRowDateObj.parentID);
	 		$("#parentName").val(_that.common.tableRowDateObj.parentName);
	 		$("#sortNum").val(_that.common.tableRowDateObj.sortNum);
	 		$("#theNote").val(_that.common.tableRowDateObj.theNote);
	 		$("#dialog-message" ).removeClass('hide').dialog({
			     modal: true,
			     title: "查看地区",
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
	 * 删除地区
	 */
	goErase	:	function(){
		var _that = this;
		var areaID = _that.goCheck();
		if( areaID != 0 ){
			var goEraseUrl = _that.common.myurl + '/erase';
			
			layer.confirm('确认删除信息！', {
				  btn: ['删除','取消'], //按钮
				  shade: false //不显示遮罩
			}, function(){
				$.ajax({
					url : goEraseUrl,
					data : {
						'areaID':areaID
					},
					type: "get",
					dataType : 'json',
					success:function(result) {
						layer.msg(result.message);
						
						_that.reloadDatatables();
						$.fn.zTree.init($("#treeDemo"), _that.treeSetting);
					}
				});
			}, function(){
			});
		}
	}
};