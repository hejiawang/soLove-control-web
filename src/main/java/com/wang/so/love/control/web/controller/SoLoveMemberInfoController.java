package com.wang.so.love.control.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wang.core.ServiceResult;
import com.wang.so.love.service.entity.SoLoveMemberInfoEntity;
import com.wang.so.love.service.param.SoLoveMemberInfoParam;
import com.wang.so.love.service.service.SoLoveMemberInfoService;

/**
 * 用户会员管理
 * 
 * @author HeJiawang
 * @date   2016.12.28
 */
@Controller
@RequestMapping(value = "/userInfo/member")
public class SoLoveMemberInfoController {
	
	/**
	 * log
	 */
	private static final Logger logger = LoggerFactory.getLogger(SoLoveMemberInfoController.class);
	
	
	/**
	 * soLoveMemberInfoService
	 */
	@Autowired
	private SoLoveMemberInfoService soLoveMemberInfoService;
	
	/**
	 * 新开通会员
	 * @param memberInfo 会员信息
	 * @return
	 * 
	 * @author HeJiawang
	 * @date   2016.12.28
	 */
	@RequestMapping(value="/raise",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> openMemberForUser( SoLoveMemberInfoParam memberInfo ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveMemberInfoService.openMemberForUser(memberInfo);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的openMemberForUser方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 会员信息查看
	 * 
	 * @param userID 用户ID
	 * @return 会员信息
	 */
	@RequestMapping(value="/viewMember",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<SoLoveMemberInfoEntity> viewMemberInfo( Integer userID ){
		ServiceResult<SoLoveMemberInfoEntity> result = new ServiceResult<SoLoveMemberInfoEntity>();
		try {
			result = soLoveMemberInfoService.getMemberInfoByUserID(userID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的viewMemberInfo方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
}
