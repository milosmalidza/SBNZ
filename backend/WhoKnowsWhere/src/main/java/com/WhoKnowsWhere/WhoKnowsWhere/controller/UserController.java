package com.WhoKnowsWhere.WhoKnowsWhere.controller;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.DestinationDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.dto.PointOfInterestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.UserInfoUpdateDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.service.UserService;

import java.util.List;

@Controller
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	private UserService userService;

	@PostMapping("/update-birth-date")
	public ResponseEntity<String> updateBirthDate(@RequestBody UserInfoUpdateDTO dto) {
		return new ResponseEntity<>(userService.updateUserInfo(dto), HttpStatus.OK);
	}

	@GetMapping("/get-liked-destinations")
	public ResponseEntity<List<DestinationDTO>> getLikedDestinations() {
		return new ResponseEntity<>(userService.getLikedDestinations(), HttpStatus.OK);
	}

	@GetMapping("/get-liked-poi")
	public ResponseEntity<List<PointOfInterestDTO>> getLikedPOI() {
		return new ResponseEntity<>(userService.getLikedPOI(), HttpStatus.OK);
	}
	
}
