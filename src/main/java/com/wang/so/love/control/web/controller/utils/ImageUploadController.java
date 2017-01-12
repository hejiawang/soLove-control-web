package com.wang.so.love.control.web.controller.utils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.wang.core.ServiceResult;
import com.wang.core.util.StringUtil;

/**
 * 图片上传
 * @author HeJiawang
 * @data   2017.01.11
 */
@Controller
@RequestMapping(value = "/upload")
public class ImageUploadController {
	
	/**
	 * logger
	 */
	private static final Logger logger = LoggerFactory.getLogger(ImageUploadController.class);
	
	/**
	 * 图片上传
	 * 
	 * @param file 上传的图片file
	 * @param fileDir 将要保存的文件夹目录
	 * @param session session
	 * @param request request
	 * @param response response
	 * @return ServiceResult
	 */
	@RequestMapping(value="/image",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<String> uploadImage( @RequestParam CommonsMultipartFile file, String fileDir,
			HttpSession session, HttpServletRequest request, HttpServletResponse response){
		ServiceResult<String> result = new ServiceResult<String>();
		
		if( file == null ){	//必须选择照片
			result.setSuccess(false);
        	result.setMessage("请选择图片!!!");
        	return result;
		}
		
		if( file.getSize() > 1048576 ){	//选择文件大小不能超过1M
			result.setSuccess(false);
        	result.setMessage("选择的文件过大,不能大于1MB");
        	return result;
		}
		
		String uploadFilePath;	//文件将要保存的路径
		String httpPath = session.getServletContext().getRealPath("/");	//项目url
		if( StringUtil.isEmpty(fileDir) ){
			uploadFilePath = httpPath + File.separator + "fileUpload";
		} else {
			uploadFilePath = httpPath + File.separator + "fileUpload" + File.separator + fileDir;
		}
		
		File saveDirectory = new File(uploadFilePath);
        if (!saveDirectory.exists()){	//判断要存储的路径是否存在
        	saveDirectory.mkdirs();
        }
        
        String fileName = file.getOriginalFilename();
        String fileType = fileName.substring(fileName.indexOf(".")+1, fileName.length());
        
        if( !this.getImageTypeList().contains(fileType) ){	//验证上传的文件后缀是否满足条件
        	result.setSuccess(false);
        	result.setMessage("文件格式有误!!!");
        	return result;
        }
        	
    	String newFileName = UUID.randomUUID().toString() + "." + fileType;	//用随机数给文件命名,避免重复
    	String saveFilePath = uploadFilePath + File.separator + newFileName;
    	File saveFile = new File(saveFilePath);
    	
    	try {
			file.transferTo(saveFile);
			
			result.setSuccess(true);
			result.setMessage("上传成功");
			result.setResult(newFileName);
		} catch (IOException e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的uploadImage方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
    	return result;
	}
	
	/**
	 * 满足条件的图片后缀格式
	 * 
	 * @return
	 */
	private List<String> getImageTypeList(){
		List<String> imageTypeList = new ArrayList<String>();
		imageTypeList.add("gif");
		imageTypeList.add("jpg");
		imageTypeList.add("jpeg");
		imageTypeList.add("bmp");
		imageTypeList.add("png");
		return imageTypeList;
	}
}
