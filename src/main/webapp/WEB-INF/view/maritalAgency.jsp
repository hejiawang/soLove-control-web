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
					<li class="active">婚介所管理</li>
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
							    <input class="input-sm" id="maritalAgencyNameSerch" name="maritalAgencyName"  placeholder="婚介所名称"   type="text">
						        <input class="btn btn-info" type="button" value="检索" id="goSearch" onclick="soLove.maritalAgency.goSearch();" style="margin-left: 20px;"/>	
						        <input class="btn btn-info" type="button" value="清空" id="goReset" onclick="soLove.maritalAgency.goReset();" style="margin-left: 20px;"/>
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
				<!-- 新增婚介所 -->
				<div id="raiseMaritalAgency-dialog"  class="hide">
					<form  class="form-horizontal" id="raiseMaritalAgency-form" role="form" action="">
						<input type="hidden" id="maritalAgencyID" name="maritalAgencyID">
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="maritalAgencyName"><span style="color:red">*</span>婚介所名称:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="maritalAgencyName" name="maritalAgencyName"  class="col-xs-10 col-sm-3" />
									<span for="maritalAgencyName" class="help-block" style="color:red;display:none;" id="maritalAgencyNameSpan">婚介所名称重复!</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="maritalAgencyPhone"><span style="color:red">*</span>联系方式:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="maritalAgencyPhone" name="maritalAgencyPhone"  class="col-xs-10 col-sm-3" />
									<span for="maritalAgencyPhone" class="help-block" style="color:red;display:none;" id="maritalAgencyPhoneSpan">联系方式不正确</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="maritalAgencyDetail"><span style="color:red">*</span>简介:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<textarea id="maritalAgencyDetail" name="maritalAgencyDetail" maxlength="255" class="col-xs-10 col-sm-3" style="height: 200px;"></textarea>
									<span for="maritalAgencyDetail" class="help-block" style="color:red;display:none;" id="maritalAgencyDetailSpan">简介不正确</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="provinceID"><span style="color:red">*</span>省:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<select id="provinceID" name="provinceID">
				 						<option value=""></option>
				 					</select>
				 					<input type="hidden" id="provinceName" name="provinceName" >
									<span for="provinceID" class="help-block" style="color:red;display:none;" id="provinceIDSpan">省必填</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="cityID"><span style="color:red">*</span>市:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<select id="cityID" name="cityID">
				 						<option value=""></option>
				 					</select>
				 					<input type="hidden" id="cityName" name="cityName" >
									<span for="provinceID" class="help-block" style="color:red;display:none;" id="cityIDSpan">市必填</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="countyID"><span style="color:red">*</span>区/县:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<select id="countyID" name="countyID">
				 						<option value=""></option>
				 					</select>
				 					<input type="hidden" id="countyName" name="countyName" >
									<span for="countyID" class="help-block" style="color:red;display:none;" id="countyIDSpan">区/县必填</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="townID"><span style="color:red">*</span>乡/街道:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<select id="townID" name="townID">
				 						<option value=""></option>
				 					</select>
				 					<input type="hidden" id="townName" name="townName" >
									<span for="townID" class="help-block" style="color:red;display:none;" id="townIDSpan">乡/街道必填</span>
								</div>	
							</div>
						</div>
						<div class="space-2"></div>
						<div class="form-group">
							<label class="control-label col-xs-12 col-sm-3  no-padding-right" for="areaName"><span style="color:red">*</span>详细地址:</label>
							<div class="col-sm-9">
								<div class="clearfix">
									<input type="text" id="areaName" name="areaName"  class="col-xs-10 col-sm-3" />
									<span for="areaName" class="help-block" style="color:red;display:none;" id="areaNameSpan">详细地址!</span>
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
<script type="text/javascript" src="<%= basePath%>resources/jsSoLove/maritalAgency.js"></script>
<script type="text/javascript">
	solove.maritalAgency.init();
</script>
</body>
</html>

