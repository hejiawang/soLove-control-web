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
import com.wang.so.love.service.param.SoLoveMaritalAgencyParam;
import com.wang.so.love.service.service.SoLoveMaritalAgencyService;

/**
 * 婚介所信息controller
 * 
 * @author HeJiawang
 * @date   2016.12.30
 */
@Controller
@RequestMapping(value = "/maritalAgency")
public class SoLoveMaritalAgencyController extends BaseController {

	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(SoLoveMaritalAgencyController.class);
	
	/**
	 * soLoveMaritalAgencyService
	 */
	@Autowired
	private SoLoveMaritalAgencyService soLoveMaritalAgencyService;
	
	/**
	 * 分页获取婚介所信息
	 * 
	 * @param param 查询信息
	 * @param start 分页信息
	 * @param length 分页信息
	 * @param draw 分页信息
	 * @return
	 * 
	 * @author HeJiawang
	 * @date   2016.12.30
	 */
	@RequestMapping(value="/page",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> pageMaritalAgency( SoLoveMaritalAgencyParam param, Integer start,Integer length, Integer draw ){
		Map<String,Object> result =null;
		try {
			result = soLoveMaritalAgencyService.pageMaritalAgency(param, start, length, draw).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pageMaritalAgency方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 删除婚介所信息
	 * @param maritalAgencyID 婚介所信息ID
	 * @return
	 * 
	 * @author HeJiawang
	 * @date   2016.12.30
	 */
	@RequestMapping(value="/erase",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> earseMaritalAgency( Integer maritalAgencyID ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveMaritalAgencyService.deleteMaritalAgency(maritalAgencyID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的earseMaritalAgency方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 新增婚介所信息
	 * 
	 * @param maritalAgency 婚介所信息
	 * @return
	 * 
	 * @author HeJiawang
	 * @date   2016.12.30
	 */
	@RequestMapping(value="/raise",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> raiseMaritalAgency( SoLoveMaritalAgencyParam maritalAgency ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveMaritalAgencyService.addMaritalAgency(maritalAgency);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raiseMaritalAgency方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 修改婚介所信息
	 * 
	 * @param maritalAgency 婚介所信息
	 * @return
	 * 
	 * @author HeJiawang
	 * @date   2016.12.30
	 */
	@RequestMapping(value="/modify",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> modifyMaritalAgency( SoLoveMaritalAgencyParam maritalAgency ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveMaritalAgencyService.updateMaritalAgency(maritalAgency);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyMaritalAgency方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
}
