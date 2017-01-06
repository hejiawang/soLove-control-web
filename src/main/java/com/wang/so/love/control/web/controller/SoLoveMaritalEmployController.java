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
import com.wang.so.love.service.param.SoLoveMaritalEmployParam;
import com.wang.so.love.service.service.SoLoveMaritalEmployService;

/**
 * 婚介所老师controller
 * 
 * @author HeJiawang
 * @date   2017.01.06
 */
@Controller
@RequestMapping(value = "/maritalEmploy")
public class SoLoveMaritalEmployController extends BaseController {

	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(SoLoveMaritalEmployController.class);
	
	/**
	 * soLoveMaritalEmployService
	 */
	@Autowired
	private SoLoveMaritalEmployService soLoveMaritalEmployService;
	
	/**
	 * 分页获取婚介所老师信息
	 * @param param 查询信息
	 * @param start 分页——
	 * @param length 分页——
	 * @param draw 分页——
	 * @return 分页信息
	 */
	@RequestMapping(value="/page",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> pageMaritalEmploy( SoLoveMaritalEmployParam param, Integer start,Integer length, Integer draw ){
		Map<String,Object> result =null;
		try {
			result = soLoveMaritalEmployService.pageMaritalEmploy(param, start, length, draw).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pageMaritalEmploy方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 删除婚介所老师
	 * @param maritalEmployID 婚介所老师ID
	 * @return ServiceResult
	 */
	@RequestMapping(value="/erase",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> earseMaritalEmploy( Integer maritalEmployID ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveMaritalEmployService.deleteMaritalEmploy(maritalEmployID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的earseMaritalEmploy方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 新增婚介所老师信息
	 * @param maritalEmploy 婚介所老师信息
	 * @return ServiceResult
	 */
	@RequestMapping(value="/raise",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> raiseMaritalEmploy( SoLoveMaritalEmployParam maritalEmploy ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveMaritalEmployService.addMaritalEmploy(maritalEmploy);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raiseMaritalEmploy方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 修改婚介所老师信息
	 * @param maritalEmploy 婚介所老师信息
	 * @return ServiceResult
	 */
	@RequestMapping(value="/modify",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> modifyMaritalEmploy( SoLoveMaritalEmployParam maritalEmploy ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveMaritalEmployService.updateMaritalEmploy(maritalEmploy);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyMaritalEmploy方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
}
