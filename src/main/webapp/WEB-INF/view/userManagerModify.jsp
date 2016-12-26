<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html lang="zh">
<head>
	<base href="<%=basePath%>">
 	<title>权限管理系统</title>
	<meta name="keywords" content="权限管理" />
  	<meta name="description" content="权限管理" />
	<%@include file="resource/resource.jsp"%>
	<style type="text/css">
			  .dataTables_length {
                   width: 160px !important;
                   height: 25px;
                   float: right;
                   margin-top:13px;                 
              }
              
              .dataTables_length label{
                   height: 25px;
                   
                   text-align: left;
              }              
              .dataTables_info{
                   position: relative;
                   float: left;
                   top: 13px;
              }
             .dataTables_paginate .pagination{
                  position:relative;
                  float: right;
                  right: 20px;
                  top:10px; 
              }
		      .validation-form table tr td{
		          width: 50%;
		          padding-bottom: 10px;
		      }

		      .validation-form table select{
		          height:33px;
		      }
	
		      .validation-form table tr td label{
		          width: 130px;
		          height: 34px;
		          text-align: right;
		          line-height: 34px;     
		      }
		      
 		      .validation-form table tr td{
		          width: 50%; 
		      }		      
 		      .validation-form table tr td input,select,textarea{
		          width: 55%;
		          height: 34px;
		          text-align: left;
		          line-height: 34px;
		          border-radius: 5px !important;     
		      }
		      .content{
		          position: relative;
		          width: 980px;
		          height: auto;
		          margin: 0 auto;
		      }
		      .clearfix input[type=text],input[type=email],input[type=password]{
                  width: 75% !important;
              }			    
              .clearfix textarea{
                  width: 75% !important;
              }

              .ui-front{
               	z-index: 9999 !important;
              }  
              .help-block{
                 color:#a94442 !important;
             	 margin: 0 !important;
             	 width: 100% !important;
             	 height: 15px !important;
             	 line-height: 15px !important;
             	 overflow: hidden !important;
             	 margin-left: 140px !important;
             }
	         .tools {
	             list-style:none;
	         }
	         .tools li{float:right;}
		     .onMouseOver{ border:2px solid #333; }   
		     
		     .name-right{
			     position : absolute !important;
			     margin-top : -35px !important;
			     margin-left : 490px !important;
		     }		
	</style>	
	<script type="text/javascript">
		
	</script>	
</head>

<body class="no-skin">
	<!-- top start -->
	<%@include file="resource/top.jsp"%>
	<!-- top end -->
	<div class="main-container" id="main-container">
		<script type="text/javascript">
			try{ace.settings.check('main-container' , 'fixed');}catch(e){}
		</script>

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
					<li class="active">测试页</li>
				</ul><!-- /.breadcrumb -->

				<!-- search start -->
				<%@include file="resource/search.jsp"%>
				<!-- search end -->
			</div>

			<div class="page-content">

				<button id="userModifySubmit" onclick="soLove.userManager.userModify.userModifySubmit();" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px;" >确定</button>
				<button id="userModifyClose" onclick="soLove.userManager.userModify.userModifyClose();" class="btn btn-success btn-next" data-last="Finish" style="margin-bottom:15px; margin-left:15px;" >取消</button>

				<div class="tabbable tabs-left ">
					<ul class="nav nav-tabs" style="padding-top: 0px">
						<li class="tab-pane active" style="text-align: center"><a href="#infoPage" data-toggle="tab">基<br>本<br>信<br>息 </a></li>
						<li style="text-align: center"><a href="#detailPage" data-toggle="tab">详<br>细<br>信<br>息  </a></li>
						<li style="text-align: center"><a href="#imgPage" data-toggle="tab">照<br>片<br>信<br>息  </a></li>
						<li style="text-align: center"><a href="#parentPage" data-toggle="tab">父<br>母<br>信<br>息  </a></li>
						<li style="text-align: center"><a href="#childrenPage" data-toggle="tab">子<br>女<br>信<br>息  </a></li>
						<li style="text-align: center"><a href="#hobbyPage" data-toggle="tab">兴<br>趣<br>爱<br>好  </a></li>
						<li style="text-align: center"><a href="#matePage" data-toggle="tab">择<br>偶<br>信<br>息  </a></li>
					</ul>
					<div class="tab-content">
					
					
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
<script type="text/javascript" src="<%= basePath%>resources/jsSoLove/userManager.js"></script>
<script type="text/javascript">
	solove.userManager.userModify.init();
</script>
</body>
</html>

