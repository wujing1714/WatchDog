package com.watchdog.service;

import java.util.Map;

import com.watchdog.model.Managers;

public interface ProvinceService {

	public Map<String, Integer> GetIndexLogoInfo(Managers manager,String provincename);
    public Map<String, Integer> GetArmyIndexLogo(Managers manager,String provincename);
    public Map<String, Object> GetProvinceMap(String provincename);
    public Map<String, Object> GetArmyProvinceMap(String provincename);
	public String GovToEchartsAreaName(String provincename);	
	public Map<String, Object> GetDistrictcode(String provincename);
}
