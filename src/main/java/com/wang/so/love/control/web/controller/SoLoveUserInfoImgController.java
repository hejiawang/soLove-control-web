package com.wang.so.love.control.web.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wang.core.ServiceResult;
import com.wang.so.love.service.param.SoLoveUserInfoImgParam;
import com.wang.so.love.service.service.SoLoveUserInfoImgService;

/**
 * 用户照片信息controller
 * 
 * @author HeJiawang
 * @date   2016.12.27
 */
@Controller
@RequestMapping(value = "/userInfo/image")
public class SoLoveUserInfoImgController extends BaseController {

	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(SoLoveUserInfoImgController.class);
	
	/**
	 * soLoveUserInfoImgService
	 */
	@Autowired
	private SoLoveUserInfoImgService soLoveUserInfoImgService;
	
	/**
	 * 用户照片维护
	 * 
	 * @param userInfoImg 用户照片信息
	 * @return
	 */
	@RequestMapping(value = "/modify", method = {RequestMethod.POST})
	@ResponseBody
	public ServiceResult<Void> modifyUserInfoImg( HttpServletRequest request, SoLoveUserInfoImgParam userInfoImg){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try{
			result = soLoveUserInfoImgService.updateUserInfoImg(userInfoImg);
		}catch(Exception e){
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyUserInfoImg方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
}
