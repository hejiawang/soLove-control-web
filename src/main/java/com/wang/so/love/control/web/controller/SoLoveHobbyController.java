package com.wang.so.love.control.web.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wang.core.ServiceResult;
import com.wang.so.love.service.entity.SoLoveHobbyEntity;
import com.wang.so.love.service.service.SoLoveHobbyService;

/**
 * 用户性却爱好信息controller
 * 
 * @author HeJiawang
 * @date   2016.12.27
 */
@Controller
@RequestMapping(value = "/userInfo/hobby")
public class SoLoveHobbyController extends BaseController {
	
	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(SoLoveHobbyController.class);
	
	/**
	 * soLoveHobbyService
	 */
	@Autowired
	private SoLoveHobbyService soLoveHobbyService;
	
	/**
	 * 用户兴趣爱好维护
	 * @param request
	 * @param hobbyIDs 兴趣爱好ID集合
	 * @param userID 用户ID
	 * @return
	 */
	@RequestMapping(value = "/modify", method = {RequestMethod.POST})
	@ResponseBody
	public ServiceResult<Void> modifyUserHobby( HttpServletRequest request, 
			@RequestParam("hobbyID[]")List<Integer> hobbyIDs, Integer userID){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try{
			result = soLoveHobbyService.modifyUserHobby(userID, hobbyIDs);
		}catch(Exception e){
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyUserHobby方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 获取所有兴趣爱好信息
	 * 
	 * @return 所有兴趣爱好信息
	 */
	@RequestMapping(value = "/allHobby", method = {RequestMethod.GET})
	@ResponseBody
	public ServiceResult<List<SoLoveHobbyEntity>> getAllHobby(HttpServletRequest request){
		ServiceResult<List<SoLoveHobbyEntity>> result = new ServiceResult<List<SoLoveHobbyEntity>>();
		try{
			result = soLoveHobbyService.getAllHobby();
		}catch(Exception e){
			logger.error("异常发生在"+this.getClass().getName()+"类的getAllHobby方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
}
