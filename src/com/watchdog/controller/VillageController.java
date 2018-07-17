package com.watchdog.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.watchdog.model.Managers;
import com.watchdog.service.CountyService;
import com.watchdog.service.UserService;
import com.watchdog.service.VillageService;

import net.sf.json.JSONObject;
@Controller
@RequestMapping("/village")
public class VillageController {
	@Resource
	private UserService userService;
	
	@Resource
	private VillageService villageService;
/***
 * 
 * @param city ������
 * @param province ʡ��
 * @param request
 * @param model
 * @return
 */
	@RequestMapping("/village")
	public String GoToCountyPage(@RequestParam(value="village") String village, @RequestParam(value="county") String county,@RequestParam(value="city") String city,@RequestParam(value="province") String province,HttpServletRequest request,ModelMap model) {
		HttpSession session=request.getSession();
		//sessionʧЧ���˵���½ҳ��
		if(session.getAttribute("currentUser")==null){;
			return "redirect:/login.jsp";
		}
		
		Managers manager= (Managers) session.getAttribute("currentUser");
		StringBuilder url = new StringBuilder("index/");
		JSONObject jsStr = null;
			
		Map<String,Object> data = new HashMap<String,Object>();
		data.put("data1",manager);//data1�����û���Ϣ

		url.append("page_village");//ת��ҳ��index/page_village.jsp
		Map<String,Integer> villageIndexInfo = villageService.GetIndexLogoInfo(province, city,county,village);//��ø��������������Ϣ
		data.put("data2",villageIndexInfo);
		Map<String,Object> villageMap = villageService.GetVillageMap(province,city,county,village);//��ø����¸������д����ϸ������Ϣ
		data.put("data3", villageMap);
		Map<String,Object> data4 = villageService.GetDistrictcode(province,city,county,village);//��ø�����������
		data.put("data4", data4);
		
		jsStr = JSONObject.fromObject(data);//����תΪjson��ʽ
		model.addAttribute("model",jsStr.toString());	 
		return url.toString();
	
	}
}