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
import com.wang.so.love.service.param.SoLoveMessageParam;
import com.wang.so.love.service.service.SoLoveMessageService;

/**
 * 消息controller
 * 
 * @author HeJiawang
 * @date   2017.01.10
 */
@Controller
@RequestMapping(value = "/message")
public class SoLoveMessageController extends BaseController {
	
	/**
	 * logger
	 */
	private static final Logger logger = LoggerFactory.getLogger(SoLoveMessageController.class);
	
	/**
	 * soLoveMessageService
	 */
	@Autowired
	private SoLoveMessageService soLoveMessageService;
	
	/**
	 * 分页获取消息列表
	 * @param param 查询参数
	 * @param start 分页——
	 * @param length 分页——
	 * @param draw 分页——
	 * @return
	 */
	@RequestMapping(value="/page",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> pageMessage( SoLoveMessageParam param, Integer start,Integer length, Integer draw ){
		Map<String,Object> result =null;
		try {
			result = soLoveMessageService.pageMessage(param, start, length, draw).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pageMessage方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 删除消息
	 * @param messageID 消息ID
	 * @return
	 */
	@RequestMapping(value="/erase",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> earseMessage( Integer messageID ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveMessageService.deleteMessage(messageID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的earseMessage方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 新增消息
	 * 
	 * @param activity 消息信息
	 * @return
	 */
	@RequestMapping(value="/raise",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> raiseMessage( SoLoveMessageParam param ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveMessageService.addMessage(param);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raiseMessage方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 修改消息
	 * 
	 * @param message 消息信息
	 * @return
	 */
	@RequestMapping(value="/modify",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> modifyMessage( SoLoveMessageParam param ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveMessageService.updateMessage(param);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyMessage方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 审核消息
	 * @param messageID 消息ID
	 * @param isAudit 审核状态,yes——通过,no——未通过,
	 * @return
	 */
	@RequestMapping(value="/audit",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> auditMessage(Integer messageID, String isAudit){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveMessageService.setMessageAudit(messageID, isAudit);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的auditMessage方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
}
