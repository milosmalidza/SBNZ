package com.WhoKnowsWhere.WhoKnowsWhere.controller;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.geocode.GeocodeResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.LocationDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.service.LocationService;

@Controller
@RequestMapping("/api/location")
public class LocationController {
	
	@Autowired
	private LocationService locationService;
	
	@PostMapping("/create")
	public ResponseEntity<String> createLocation(@RequestBody LocationDTO dto) {
		return new ResponseEntity<String>(locationService.createLocation(dto), HttpStatus.OK);
	}

	@PostMapping("/retreive-info")
	public ResponseEntity<GeocodeResult> retreiveLocationInfo(@RequestBody LocationDTO dto) {
		return new ResponseEntity<GeocodeResult>(locationService.retreiveLocationInfo(dto), HttpStatus.OK);
	}
	
}
