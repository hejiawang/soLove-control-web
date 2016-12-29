<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html lang="zh">
<head>
	<base href="<%=basePath%>">
 	<title>SoLove后台管理系统</title>
	<meta name="keywords" content="SoLove后台管理系统" />
  	<meta name="description" content="SoLove后台管理系统" />
	<%@include file="resource/resource.jsp"%>
	<style type="text/css">
	    .dataTables_length {
	         width: 150px !important;
	         float: right;
	         margin-top:10px;                 
	    }
	    .dataTables_info {
		    position: relative;
		    float: left;
		    top: 10px;
		}
		.dataTables_paginate {
		    text-align: right;
		    margin-top:10px;    
		}
	    .tree-btn{
	          position: relative;
	          width: auto;
	          height: auto;
	          float: left;
	    }
	    .tree-btn-width2{
	          width: 80%;
	          margin-left: 15px;
	    }               
	    @media (max-width:375px){
	       #row-btn{
	           position: relative;
	           margin-top: 30px;
	           margin-right: 0;
	           margin-left: 8%;
	       }
	       .hr-12, .hr12{
	           margin-left: -40px;
	       }
	       .content_wrap{
	          position: relative;
	          width: 100%;
	          height: auto;
	       }
	       .tree-btn{
	          position: relative;
	          width: 100%;
	          height: auto;
	          float: none;
	          margin-left: 8%;
	       }                            
	    }
	    .clearfix input[type=text]{
	        width: 75% !important;
	    }			    
	    .clearfix textarea{
	        width: 75% !important;
	    }			    
	</style>	
</head>

<body class="no-skin">
	<!-- top start -->
	<%@include file="resource/top.jsp"%>
	<!-- top end -->
	<div class="main-container" id="main-container">
		<script type="text/javascript">
			try{ace.settings.check('main-container' , 'fixed');}catch(e){}
		</script>

		<div id="sidebar" class="sidebar                  responsive">
			<script type="text/javascript">
				try{ace.settings.check('sidebar' , 'fixed');}catch(e){}
			</script>
			<!-- menu start -->
			<%@include file="resource/menu.jsp"%>
			<!-- menu end -->
			<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
				<i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
			</div>

			<script type="text/javascript">
				try{ace.settings.check('sidebar' , 'collapsed');}catch(e){}
			</script>
		</div>

		<div class="main-content">
			<div class="breadcrumbs" id="breadcrumbs">
				<script type="text/javascript">
					try{ace.settings.check('breadcrumbs' , 'fixed');}catch(e){}
				</script>

				<ul class="breadcrumb">
					<li>
						<i class="ace-icon fa fa-home home-icon"></i>
						<a href="index">我的工作台</a>
					</li>
					<li class="active">地区管理</li>
					<li class="active">地区管理</li>
				</ul><!-- /.breadcrumb -->

				<!-- search start -->
				<%@include file="resource/search.jsp"%>
				<!-- search end -->
			</div>

			<div class="page-content  col-lg-12 col-md-12 col-sm-12 col-xs-12" >
				<div class="zTreeDemoBackground left col-lg-3 col-md-3 col-sm-12 col-xs-12">
					<ul id="treeDemo" class="ztree">
					</ul>
				</div>
				<div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
	                <div class="row">
						<div class="col-xs-12">
							<div class="col-xs-12">
								<div id="elementbut" style="padding-bottom: 10px;">
								</div>
						    </div>	
							<div class="col-xs-12" style="background-color: #F0F0F0; padding-top: 10px; padding-bottom: 10px;">
								<div class="table-responsive" style="margin-top: 10px;">
									<table id="example" class="table table-striped table-bordered table-hover">
									
									</table>  
								</div><!-- /.table-responsive -->
							</div><!-- /span -->			  
						</div>
						<!-- PAGE CONTENT ENDS -->
					</div><!-- /.col -->
				</div>
				
				<!-- 隐藏的弹出框 -->
				<div id="dialog-message"  class="hide">
					<form class="form-horizontal" id="validation-form" role="form">
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="areaCode"><span style="color: red">*</span>地区编码:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="areaCode" name="areaCode" class="col-xs-10 col-sm-3" /> 
									<span for="areaCode" class="help-block" style="color: red; display: none;" id="hintCode">编码重复!</span>
								</div>
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="areaName">
							<span style="color: red">*</span>地区名称:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="areaName" name="areaName" class="col-xs-10 col-sm-3" /> 
									<span for="areaName" class="help-block" style="color: red; display: none;" id="hintName">名称重复!</span>
								</div>
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="shortName">
							<span style="color: red">*</span>地区简称:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="shortName" name="shortName" class="col-xs-10 col-sm-3" />
								</div>
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="parentID">
							<span style="color: red">*</span>所属地区:</label>
							<div class="col-xs-12 col-sm-9">
								<div class="clearfix">
									<input type="text" id="parentName" readonly="readonly" name="parentName" onclick="solove.area.showParentTree();" class="col-xs-12 col-sm-6" /> 
									<input type="hidden" id="parentID" name="parentID" />
								</div>
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="areaLevel">
							<span style="color: red">*</span>地区等级:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="areaLevel" name="areaLevel" class="col-xs-12 col-sm-6" />
								</div>
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="sortNum">
							<span style="color: red">*</span>排序:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="sortNum" name="sortNum" class="col-xs-12 col-sm-6" />
								</div>
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="theNote">备注:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<textarea class="input-xlarge" id="theNote" name="theNote" maxlength="50"></textarea>
								</div>
							</div>
						</div>
						<div class="space-2"></div>
						<input type="hidden" id="areaID" name="areaID" class="col-xs-10 col-sm-3" />
					</form>
				</div>
				<div id="areaParentTree-message" class="hide">
					<div>
						<ul id="parentTree" class="ztree"></ul>
					</div>
			   </div>
				
				<%@include file="resource/footer.jsp"%>
	            <!-- footer end -->
	            <!-- upper start -->
	            <%@include file="resource/upper.jsp"%>
	            <!-- upper end -->							
			</div><!-- /.row -->						
		</div><!-- /.page-content-area -->
	</div>
<!-- inline scripts related to this page -->
<script type="text/javascript" src="<%= basePath%>resources/jsSoLove/area.js"></script>
<script type="text/javascript">
	solove.area.init();
</script>
</body>
</html>

