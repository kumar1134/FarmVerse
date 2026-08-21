package edu.infosys.farmVerseApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Crop {

    @Id
    private String cropId;
    private Long farmId;
    private String cropName;
    private Double cropArea;
    private String sownMonthYear;
    private String harvestMonthYear;
    private Double yield;
    private String username;

    public Crop() {
        super();
    }

    public Crop(String cropId, Long farmId, String cropName, Double cropArea,
            String sownMonthYear, String harvestMonthYear,
            Double yield, String username) {
        super();
        this.cropId = cropId;
        this.farmId = farmId;
        this.cropName = cropName;
        this.cropArea = cropArea;
        this.sownMonthYear = sownMonthYear;
        this.harvestMonthYear = harvestMonthYear;
        this.yield = yield;
        this.username = username;
    }

    public String getCropId() {
        return cropId;
    }

    public String getDisplayCropId() {
        return "C" + cropId;
    }
    
    public void setCropId(String cropId) {
        this.cropId = cropId;
    }

    public Long getFarmId() {
        return farmId;
    }

    public void setFarmId(Long farmId) {
        this.farmId = farmId;
    }

    public String getCropName() {
        return cropName;
    }

    public void setCropName(String cropName) {
        this.cropName = cropName;
    }

    public Double getCropArea() {
        return cropArea;
    }

    public void setCropArea(Double cropArea) {
        this.cropArea = cropArea;
    }

    public String getSownMonthYear() {
        return sownMonthYear;
    }

    public void setSownMonthYear(String sownMonthYear) {
        this.sownMonthYear = sownMonthYear;
    }

    public String getHarvestMonthYear() {
        return harvestMonthYear;
    }

    public void setHarvestMonthYear(String harvestMonthYear) {
        this.harvestMonthYear = harvestMonthYear;
    }

    public Double getYield() {
        return yield;
    }

    public void setYield(Double yield) {
        this.yield = yield;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}