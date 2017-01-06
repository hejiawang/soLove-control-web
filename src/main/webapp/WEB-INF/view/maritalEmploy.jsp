<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html lang="zh">
<head>
	<base href="<%=basePath%>">
 	<title>solove后台管理系统系统</title>
	<meta name="keywords" content="solove后台管理" />
  	<meta name="description" content="solove后台管理" />
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
					<li class="active">后台管理</li>
					<li class="active">婚介老师管理</li>
				</ul><!-- /.breadcrumb -->

				<!-- search start -->
				<%@include file="resource/search.jsp"%>
				<!-- search end -->
			</div>

			<div class="page-content  col-lg-12 col-md-12 col-sm-12 col-xs-12" >
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
	                <div class="row">
						<div class="col-xs-12">
							<div class="col-xs-12">
								<div id="elementbut" style="padding-bottom: 10px;">
								</div>
						    </div>	
							<div class="col-xs-12" style="background-color: #F0F0F0; padding-top: 10px; padding-bottom: 10px;">
							    <input class="input-sm" id="maritalEmployNameSerch" name="maritalEmployName"  placeholder="婚介老师姓名"   type="text">
							    <input class="input-sm" id="maritalEmployNickSerch" name="maritalEmployNick"  placeholder="婚介老师昵称"   type="text">
							    <input class="input-sm" id="maritalAgencyNameSerch" name="maritalAgencyName"  placeholder="婚介所名称"   type="text">
						        <input class="btn btn-info" type="button" value="检索" id="goSearch" onclick="soLove.maritalEmploy.goSearch();" style="margin-left: 20px;"/>	
						        <input class="btn btn-info" type="button" value="清空" id="goReset" onclick="soLove.maritalEmploy.goReset();" style="margin-left: 20px;"/>
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
				<!-- 选择婚介所的隐藏框 -->
				<div id="maritalAgency-dialog" class="hide">
					<input class="input-sm" id="maritalAgencyNameSerch" name="maritalAgencyName"  placeholder="婚介所名称"   type="text">
			        <input class="btn btn-info" type="button" value="检索" id="goSearch" onclick="soLove.maritalEmploy.goSearch_agency();" style="margin-left: 20px;"/>	
			        <input class="btn btn-info" type="button" value="清空" id="goReset" onclick="soLove.maritalEmploy.goReset_agency();" style="margin-left: 20px;"/>
					<div class="table-responsive" style="margin-top: 10px;">
						<table id="example_agency" class="table table-striped table-bordered table-hover">
						
						</table>  
					</div>
				</div>
				
				<!-- 新增婚介所老师 -->
				<div id="raiseMaritalEmploy-dialog"  class="hide">
					<form  class="form-horizontal" id="raiseMaritalEmploy-form" role="form" action="">
						<input type="hidden" id="maritalEmployID" name="maritalEmployID">
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="maritalAgencyName"><span style="color:red">*</span>婚介所名称:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="maritalAgencyName" name="maritalAgencyName" readonly="readonly" onclick="solove.maritalEmploy.chooseMaritalAgency()" class="col-xs-10 col-sm-3" />
									<span for="maritalAgencyName" class="help-block" style="color:red;display:none;" id="maritalAgencyNameSpan">婚介所名称重复!</span>
									<input type="hidden" id="maritalAgencyID" name="maritalAgencyID">
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="maritalEmploySex"><span style="color:red">*</span>性别:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<select id="maritalEmploySex" name="maritalEmploySex" class="col-xs-10 col-sm-3">
										<option value="">请选择</option>
										<option value="man">男</option>
										<option value="woman">女</option>
									</select>
									<span for="maritalEmploySex" class="help-block" style="color:red;display:none;" id="maritalEmploySexSpan">请选择性别</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="maritalEmployAge"><span style="color:red">*</span>年龄:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="maritalEmployAge" name="maritalEmployAge"  class="col-xs-10 col-sm-3" />
									<span for="maritalEmployAge" class="help-block" style="color:red;display:none;" id="maritalEmployAgeSpan">请填写年龄!</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="maritalEmployName"><span style="color:red">*</span>真实姓名:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="maritalEmployName" name="maritalEmployName"  class="col-xs-10 col-sm-3" />
									<span for="maritalEmployName" class="help-block" style="color:red;display:none;" id="maritalEmployNameSpan">请填写真实姓名!</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="maritalEmployNick"><span style="color:red">*</span>昵称:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="maritalEmployNick" name="maritalEmployNick"  class="col-xs-10 col-sm-3" />
									<span for="maritalEmployNick" class="help-block" style="color:red;display:none;" id="maritalEmployNickSpan">请填写昵称!</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="maritalEmployPhone"><span style="color:red">*</span>联系电话:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="maritalEmployPhone" name="maritalEmployPhone"  class="col-xs-10 col-sm-3" />
									<span for="maritalEmployPhone" class="help-block" style="color:red;display:none;" id="maritalEmployPhoneSpan">请填写联系电话!</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="maritalEmployQQ"><span style="color:red">*</span>QQ:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="maritalEmployQQ" name="maritalEmployQQ"  class="col-xs-10 col-sm-3" />
									<span for="maritalEmployQQ" class="help-block" style="color:red;display:none;" id="maritalEmployQQSpan">请填写QQ!</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="maritalEmployWeixin"><span style="color:red">*</span>微信:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="maritalEmployWeixin" name="maritalEmployWeixin"  class="col-xs-10 col-sm-3" />
									<span for="maritalEmployWeixin" class="help-block" style="color:red;display:none;" id="maritalEmployWeixinSpan">请填写微信!</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="sort"><span style="color:red">*</span>排序:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="sort" name="sort"  class="col-xs-10 col-sm-3" />
									<span for="sort" class="help-block" style="color:red;display:none;" id="sortSpan">请填写排序!</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="maritalEmployEvaluation"><span style="color:red">*</span>简介:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<textarea id="maritalEmployEvaluation" name="maritalEmployEvaluation" maxlength="255" class="col-xs-10 col-sm-3" style="height: 200px;"></textarea>
									<span for="maritalEmployEvaluation" class="help-block" style="color:red;display:none;" id="maritalEmployEvaluationSpan">简介不正确</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="theNode"><span style="color:red">*</span>备注:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="theNode" name="theNode"  class="col-xs-10 col-sm-3" />
									<span for="theNode" class="help-block" style="color:red;display:none;" id="theNodeSpan">备注!</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
					</form>
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
<script type="text/javascript" src="<%= basePath%>resources/jsSoLove/maritalEmploy.js"></script>
<script type="text/javascript">
	solove.maritalEmploy.init();
</script>
</body>
</html>

