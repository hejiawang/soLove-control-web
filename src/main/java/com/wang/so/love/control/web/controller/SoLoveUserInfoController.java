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
import com.wang.so.love.service.param.SoLoveUserInfoParam;
import com.wang.so.love.service.service.SoLoveUserInfoService;

/**
 * 用户基本信息controller
 * 
 * @author HeJiawang
 * @date   2016.12.27
 */
@Controller
@RequestMapping(value = "/userInfo/baseInfo")
public class SoLoveUserInfoController extends BaseController {
	
	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(SoLoveUserInfoController.class);
	
	/**
	 * soLoveUserInfoService
	 */
	@Autowired
	private SoLoveUserInfoService soLoveUserInfoService;
	
	/**
	 * 个人基本信息修改
	 * 
	 * @param request request
	 * @param userDetailInfo 用户详细信息
	 * @return ServiceResult
	 */
	@RequestMapping(value = "/modify", method = {RequestMethod.POST})
	@ResponseBody
	public ServiceResult<Void> modifyUserInfo( HttpServletRequest request, SoLoveUserInfoParam userInfo ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try{
			result = soLoveUserInfoService.updateUserInfo(userInfo);
		}catch(Exception e){
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyUserInfo方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
}
