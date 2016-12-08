package com.wang.so.love.control.web.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wang.core.ServiceResult;
import com.wang.so.love.service.param.SoLoveUserDetailInfoParam;
import com.wang.so.love.service.param.SoLoveUserInfoParam;
import com.wang.so.love.service.service.SoLoveUserInfoService;

/**
 * 用户管理
 * 
 * @author HeJiawang
 * @date   2016.12.08
 */
@Controller
@RequestMapping(value = "/userManage")
public class SoLoveUserManageController extends BaseController {

	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(SoLoveUserManageController.class);
	
	/**
	 * soLoveUserInfoService
	 */
	@Autowired
	private SoLoveUserInfoService soLoveUserInfoService;
	
	/**
	 * 分页获取用户信息
	 * 
	 * @param param 搜索条件
	 * @param start 分页——起始条数
	 * @param length 分页——条数
	 * @return
	 */
	@RequestMapping(value="/page",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> pageUserInfo( SoLoveUserDetailInfoParam param, Integer start,Integer length, Integer draw ){
		Map<String,Object> result =null;
		try {
			result = soLoveUserInfoService.pageUserInfo(param, start, length, draw).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pageUserInfo方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 新增用户
	 * 
	 * @param userInfo 用户信息——loginName, passWord
	 * @return
	 */
	@RequestMapping(value="/raise",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> raiseUserInfo( SoLoveUserInfoParam userInfo ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			userInfo.setRegisterType("web");
			result = soLoveUserInfoService.addUserInfo(userInfo);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raiseUserInfo方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 删除用户
	 * 
	 * @param userID 用户ID
	 * @return
	 */
	@RequestMapping(value="/erase",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Void> eraseUserInfo( Integer userID ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveUserInfoService.deleteUserInfo(userID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的eraseUserInfo方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 根据用户ID查看用户的信息——详细信息、照片、爱好、子女父母等所有信息 
	 * 
	 * @param userID 用户ID
	 * @return 
	 * 		用户信息Map</br>
	 * 		<li>key:userInfo——用户基本信息</li>
	 * 		<li>key:userDetail——用户详细信息</li>
	 * 		<li>key:userImg——用户照片信息</li>
	 * 		<li>key:userHobby——用户兴趣爱好信息</li>
	 * 		<li>key:userParent——用户父母信息</li>
	 * 		<li>key:userChildren——用户子女信息</li>
	 * 		<li>key:userMate——用户择偶信息</li>
	 *  
	 * @author HeJiawang
	 * @date 2016.12.08
	 */
	@RequestMapping(value="/view",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Map<String, Object>> viewUserInfo( Integer userID ){
		ServiceResult<Map<String, Object>> result = new ServiceResult<Map<String, Object>>();
		try {
			result = soLoveUserInfoService.viewUserInfo(userID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的viewUserInfo方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
}
