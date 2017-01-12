var soLove = soLove || {};

/**
 * 工具js
 * 
 * @author HeJiawang
 * @date   2017.01.12
 */
soLove.utils = {

	/**
	 * 上传图片
	 * 
	 * @param fileID 文件控件ID
	 * @param fileImageID 上传成功后,在image标签中显示照片
	 * @param fileResultID 上传成功后,在hidden标签中记录后台返回的文件名
	 * @param fileDir 保存文件的目录
	 */
	imageUpload	:	function( fileID, fileImageID, fileResultID, fileDir ){
		
		var fileName = $("#" + fileID).val();
		var fileType =  fileName.substring(fileName.lastIndexOf(".")+1);  
		
		if( fileName == null || fileName == '' ){
			layer.msg("请选择文件!!!");
			return;
		}
		if( fileType!="png" && fileType!="jpg" && fileType!="gif" && fileType!="jpeg" && fileType!="bmp" ){
			layer.msg("请选择正确的图片格式!!!");
			return;
		} 
		
		layer.load(0);
		$.ajaxFileUpload({
			url				:	soLove.domainUrl.baseDomain + '/upload/image',
			secureuri		:	false,            //是否启用安全提交,默认为false 
			fileElementId	:	fileID,           //文件选择框的id属性
			data			:	{ 'fileDir' : fileDir },
			dataType		:	'json',           //服务器返回的格式,可以是json或xml等
			success			:	function(data, status){	//服务器响应成功时的处理函数
				layer.closeAll();
				layer.msg(data.message);
				if( data.success ){
					$("#" + fileResultID).val(data.result);
					$("#" + fileImageID).attr("src", "" + fileDir + "/" + data.result);
				}
			},
			error:function(data, status, e){ //服务器响应失败时的处理函数
				layer.msg("图片上传失败,请重试!!!");
			}
		});
	},
	
	/**
	 * 清空图片
	 * @param fileID 文件控件ID
	 * @param fileImageID 图片显示控件
	 * @param fileResultID 图片名称控件
	 */
	imageDelete	:	function( fileID, fileImageID, fileResultID ){
		$("#" + fileID ).val("");
		$("#" + fileImageID ).attr("src", "");
		$("#" + fileResultID ).val("");
	},
};	
	