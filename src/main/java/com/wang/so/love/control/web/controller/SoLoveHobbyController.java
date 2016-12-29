package com.wang.so.love.control.web.controller;

import java.util.List;
import java.util.Map;

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
import com.wang.so.love.service.param.SoLoveHobbyParam;
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
	
	/**
	 * 分页获取兴趣爱好信息
	 * 
	 * @param param 查询信息
	 * @param start 分页信息
	 * @param length 分页信息
	 * @param draw 分页信息
	 * @return
	 * 
	 * @author HeJiawang
	 * @date   2016.12.29
	 */
	@RequestMapping(value="/page",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> pageHobby( SoLoveHobbyParam param, Integer start,Integer length, Integer draw ){
		Map<String,Object> result =null;
		try {
			result = soLoveHobbyService.pageHobby(param, start, length, draw).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pageHobby方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 删除兴趣爱好
	 * @param hobbyID 兴趣爱好ID
	 * @return
	 * 
	 * @author HeJiawang
	 * @date   2016.12.29
	 */
	@RequestMapping(value="/erase",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> earseHobby( Integer hobbyID ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveHobbyService.deleteHobby(hobbyID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的earseHobby方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 新增兴趣爱好
	 * 
	 * @param hobby 兴趣爱好信息
	 * @return
	 * 
	 * @author HeJiawang
	 * @date   2016.12.29
	 */
	@RequestMapping(value="/raise",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> raiseHobby( SoLoveHobbyParam hobby ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveHobbyService.addHobby(hobby);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raiseHobby方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 修改兴趣爱好
	 * 
	 * @param hobby 兴趣爱好息
	 * @return
	 * 
	 * @author HeJiawang
	 * @date   2016.12.29
	 */
	@RequestMapping(value="/modify",method=RequestMethod.POST)
	@ResponseBody
	public ServiceResult<Void> modifyHobby( SoLoveHobbyParam hobby ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveHobbyService.modifyHobby(hobby);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyHobby方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 获取兴趣爱好树
	 * 
	 * @param id 父兴趣爱好ID
	 * @return
	 * 
	 * @author HeJiawang
	 * @date   2016.12.29
	 */
	@RequestMapping(value="/trees",method = RequestMethod.POST,produces="text/plain;charset=UTF-8")
	public @ResponseBody String getAreaTreeData(Integer id){
		StringBuffer sb = new StringBuffer();
		try {
			if(id == null){
				id=1000;
			}
			List<SoLoveHobbyParam> list = soLoveHobbyService.getHobbyTreeData(id).getResult();//areaData
			SoLoveHobbyParam hobby ;
			sb.append("[");
			for (int i = 0; i < list.size(); i++) {
				hobby = list.get(i);
				if(i==(list.size()-1)){
					if(hobby.getIsParent()>0){
							sb.append("{id:"+hobby.getHobbyID()+",name:\""+hobby.getContent()+"\",garade:\""+1+"\",isParent:true}");
					}else{
							sb.append("{id:"+hobby.getHobbyID()+",name:\""+hobby.getContent()+"\",garade:\""+1+"\"}");
					}
				}else{
					if(hobby.getIsParent()>0){
							sb.append("{id:"+hobby.getHobbyID()+",name:\""+hobby.getContent()+"\",garade:\""+1+"\",isParent:true},");
					}else{
							sb.append("{id:"+hobby.getHobbyID()+",name:\""+hobby.getContent()+"\",garade:\""+1+"\"},");
					}
				}
			}
			sb.append("]");
			logger.debug("area树JSON====="+sb.toString());
		} catch (Exception e) {
			logger.info("异常发生在"+this.getClass().getName()+"类的getAreaTreeData方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return sb.toString();
	}
	
}
