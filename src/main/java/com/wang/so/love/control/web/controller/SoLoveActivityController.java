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
import com.wang.so.love.service.param.SoLoveActivityParam;
import com.wang.so.love.service.service.SoLoveActivityService;

/**
 * 活动controller
 * 
 * @author HeJiawang
 * @date   2017.01.10
 */
@Controller
@RequestMapping(value = "/activity")
public class SoLoveActivityController extends BaseController {
	
	/**
	 * logger
	 */
	private static final Logger logger = LoggerFactory.getLogger(SoLoveActivityController.class);
	
	/**
	 * soLoveActivityService
	 */
	@Autowired
	private SoLoveActivityService soLoveActivityService;
	
	/**
	 * 分页获取活动列表
	 * @param param 查询参数
	 * @param start 分页——
	 * @param length 分页——
	 * @param draw 分页——
	 * @return
	 */
	@RequestMapping(value="/page",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> pageActivity( SoLoveActivityParam param, Integer start,Integer length, Integer draw ){
		Map<String,Object> result =null;
		try {
			result = soLoveActivityService.pageActivity(param, start, length, draw).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pageActivity方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 删除活动
	 * @param activityID 活动ID
	 * @return
	 */
	@RequestMapping(value="/erase",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> earseActivity( Integer activityID ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveActivityService.deleteActivity(activityID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的earseActivity方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 新增活动
	 * 
	 * @param activity 活动信息
	 * @return
	 */
	@RequestMapping(value="/raise",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> raiseActivity( SoLoveActivityParam param ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveActivityService.addActivity(param);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raiseActivity方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 修改活动
	 * 
	 * @param activity 活动信息
	 * @return
	 */
	@RequestMapping(value="/modify",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> modifyActivity( SoLoveActivityParam param ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveActivityService.updateActivity(param);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyActivity方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
}
