package edu.infosys.farmVerseApplication.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.farmVerseApplication.bean.Crop;
import edu.infosys.farmVerseApplication.dao.CropDao;
import edu.infosys.farmVerseApplication.service.CropService;
import edu.infosys.farmVerseApplication.service.FarmUserService;


@RestController
@RequestMapping("/farmverse/")
@CrossOrigin(origins = "http://localhost:3636", allowCredentials = "true")
public class CropController {

	@Autowired
	private CropDao cropDao;
	
	@Autowired
	private CropService service;
	
	@Autowired
	private FarmUserService userService;
	
	@PostMapping("/crop")
	public void addCrop(@RequestBody Crop crop) {
       crop.setCropId(service.generateCropId());
       Crop newcrop = service.setUsername(crop);
       cropDao.addCrop(newcrop);
	}

	@PutMapping("/crop")
	public void updateCrop(@RequestBody Crop crop) {
	    Crop newcrop = service.setUsername(crop);
	    cropDao.addCrop(newcrop);
	}
 
	@GetMapping("/crop/{id}")
	public Crop getCropById(@PathVariable String id) {
		// TODO Auto-generated method stub
		return cropDao.getCropById(id);
	}
 
	@GetMapping("/crop")
	public List<Crop> getCropsByUsername() {
		String username=userService.getUserId();
		return cropDao.getCropsByUsername(username);
	}
 
	@DeleteMapping("/crop/{id}")
	public void deleteCropById(@PathVariable String id) {
	    cropDao.deleteCropById(id);
	}

	@GetMapping("/crop-id")
	public String generateCropId() {
	    return service.generateCropId();
	}
}