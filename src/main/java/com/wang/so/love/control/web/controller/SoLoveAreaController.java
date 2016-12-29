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
import org.springframework.web.bind.annotation.ResponseBody;

import com.wang.core.ServiceResult;
import com.wang.so.love.service.entity.SoLoveAreaEntity;
import com.wang.so.love.service.param.SoLoveAreaParam;
import com.wang.so.love.service.service.SoLoveAreaService;

/**
 * 地区controller
 * 
 * @author HeJiawang
 * @date   2016.12.08
 */
@Controller
@RequestMapping(value = "/area")
public class SoLoveAreaController extends BaseController {

	/**
	 * logger
	 */
	private static final Logger logger = LoggerFactory.getLogger(SoLoveAreaController.class);
	
	/**
	 * soLoveAreaService
	 */
	@Autowired
	private SoLoveAreaService soLoveAreaService;
	
	/**
	 * 根据父级地址获取子地址集合
	 * 
	 * @param parentID 地址父ID
	 * @return 地址信息集合
	 */
	@RequestMapping(value = "/list", method = {RequestMethod.GET})
	@ResponseBody
	public ServiceResult<List<SoLoveAreaEntity>> getAreaListByParentID( HttpServletRequest request, Integer parentID ){
		ServiceResult<List<SoLoveAreaEntity>> result = new ServiceResult<List<SoLoveAreaEntity>>();
		try{
			if( parentID == null ) parentID = 1001;
			result = soLoveAreaService.getAreaListByParentID(parentID);
		}catch( Exception e ){
			logger.error("异常发生在"+this.getClass().getName()+"类的getAreaListByParentID方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 分页获取地区信息
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
	public Map<String,Object> pageArea( SoLoveAreaParam param, Integer start,Integer length, Integer draw ){
		Map<String,Object> result =null;
		try {
			result = soLoveAreaService.pageAera(param, start, length, draw).getResult();
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的pageArea方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 删除地区
	 * @param areaID 地区ID
	 * @return
	 * 
	 * @author HeJiawang
	 * @date   2016.12.29
	 */
	@RequestMapping(value="/erase",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Void> earseArea( Integer areaID ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveAreaService.deleteArea(areaID);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的earseArea方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 新增地区
	 * 
	 * @param area 地区信息
	 * @return
	 * 
	 * @author HeJiawang
	 * @date   2016.12.29
	 */
	@RequestMapping(value="/raise",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Void> raiseArea( SoLoveAreaParam area ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveAreaService.raiseArea(area);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的raiseArea方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 修改地区
	 * 
	 * @param area 地区信息
	 * @return
	 * 
	 * @author HeJiawang
	 * @date   2016.12.29
	 */
	@RequestMapping(value="/modify",method=RequestMethod.GET)
	@ResponseBody
	public ServiceResult<Void> modifyArea( SoLoveAreaParam area ){
		ServiceResult<Void> result = new ServiceResult<Void>();
		try {
			result = soLoveAreaService.modifyArea(area);
		} catch (Exception e) {
			logger.error("异常发生在"+this.getClass().getName()+"类的modifyArea方法，异常原因是："+e.getMessage(), e.fillInStackTrace());
		}
		return result;
	}
	
	/**
	 * 获取地区树
	 * 
	 * @param id 父地区ID
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
			List<SoLoveAreaParam> list = soLoveAreaService.getAreaTreeData(id).getResult();//areaData
			SoLoveAreaParam area ;
			sb.append("[");
			for (int i = 0; i < list.size(); i++) {
				area = list.get(i);
				if(i==(list.size()-1)){
					if(area.getIsParent()>0){
							sb.append("{id:"+area.getAreaID()+",name:\""+area.getShortName()+"\",garade:\""+area.getAreaLevel()+"\",isParent:true}");
					}else{
							sb.append("{id:"+area.getAreaID()+",name:\""+area.getShortName()+"\",garade:\""+area.getAreaLevel()+"\"}");
					}
				}else{
					if(area.getIsParent()>0){
							sb.append("{id:"+area.getAreaID()+",name:\""+area.getShortName()+"\",garade:\""+area.getAreaLevel()+"\",isParent:true},");
					}else{
							sb.append("{id:"+area.getAreaID()+",name:\""+area.getShortName()+"\",garade:\""+area.getAreaLevel()+"\"},");
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
