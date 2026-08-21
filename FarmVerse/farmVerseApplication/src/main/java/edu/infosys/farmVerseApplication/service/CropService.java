package edu.infosys.farmVerseApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.farmVerseApplication.bean.Crop;
import edu.infosys.farmVerseApplication.bean.Farm;
import edu.infosys.farmVerseApplication.bean.FarmCrop;
import edu.infosys.farmVerseApplication.dao.CropDao;
import edu.infosys.farmVerseApplication.dao.FarmDao;

@Service
public class CropService {

    @Autowired
    private CropDao cropDao;

    @Autowired
    private FarmDao farmDao;

    @Autowired
    private FarmUserService service;

    public String generateCropId() {

        Integer value = cropDao.getMaxCropId();

        if (value == null)
            value = 50001;
        else
            value = value + 1;

        String newId = "C" + value;

        return newId;
    }

    public Crop setUsername(Crop crop) {
        String username = service.getUserId();
        crop.setUsername(username);
        return crop;
    }

    public FarmCrop setFarmCrop(Crop crop) {
        Farm farm = farmDao.getFarmById(crop.getFarmId());
        return new FarmCrop(farm, crop);
    }

    public boolean validateCropArea(Crop crop) {

        Farm farm = farmDao.getFarmById(crop.getFarmId());

        if (farm == null) {
            return false;
        }

        double usedArea = 0;

        for (Crop c : cropDao.getCropsByFarmId(crop.getFarmId())) {
            usedArea += c.getCropArea();
        }

        return (usedArea + crop.getCropArea()) <= farm.getArea();
    }
}