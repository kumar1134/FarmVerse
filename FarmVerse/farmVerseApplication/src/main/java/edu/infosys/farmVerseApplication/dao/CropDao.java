package edu.infosys.farmVerseApplication.dao;

import java.util.List;

import edu.infosys.farmVerseApplication.bean.Crop;

public interface CropDao {
    public void addCrop(Crop crop);
    public List<Crop> getCropsByUsername(String username);
      Integer getMaxCropId();
     public void deleteCropById(String id);
	 public Crop getCropById(String id);
	public List<Crop> getCropsByFarmId(Long farmId);
	
	
	
}