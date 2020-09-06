package com.WhoKnowsWhere.WhoKnowsWhere.controller;

import java.util.List;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.*;
import com.WhoKnowsWhere.WhoKnowsWhere.model.Destination;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.WhoKnowsWhere.WhoKnowsWhere.service.DestinationService;

@Controller
@RequestMapping("api/dest")
public class DestinationController {
	
	@Autowired
	private DestinationService destinationService;
	
	@Secured({"ROLE_USER"})
	@GetMapping("/expense/{id}/{travelMethod}")
	public ResponseEntity<ExpenseDTO> getExpense(@PathVariable("id") Long destinationId, @PathVariable("travelMethod") String travelMethod) {
		return new ResponseEntity<>(destinationService.getExpense(destinationId, travelMethod), HttpStatus.OK);
	}

	@Secured({"ROLE_ADMIN"})
	@GetMapping("/trending")
	public ResponseEntity<List<DestinationDTO>> getTrending() {
		return new ResponseEntity<>(destinationService.getTrending(), HttpStatus.OK);
	}

	@Secured({"ROLE_USER"})
	@PostMapping("/is-liked")
	public ResponseEntity<IsLikedDTO> isLiked(@RequestBody DestinationDTO dto) {
		return new ResponseEntity<>(destinationService.isLiked(dto), HttpStatus.OK);
	}

	@Secured({"ROLE_USER"})
	@PostMapping("/like")
	public ResponseEntity<DestinationDTO> likeDestination(@RequestBody DestinationDTO dto) {
		return new ResponseEntity<>(destinationService.likeDestination(dto), HttpStatus.OK);
	}
	
	@Secured({"ROLE_USER"})
	@PostMapping("/recommendation")
	public ResponseEntity<List<RecommendationDTO>> getRecommendation(@RequestBody RecommendationsRequestDTO rrDTO) {
		return new ResponseEntity<>(destinationService.getRecommendedDestinations(rrDTO), HttpStatus.OK);
	}

	@Secured({"ROLE_ADMIN"})
	@PostMapping("/create-destination")
	public ResponseEntity<DestinationDTO> createDestination(@RequestBody DestinationDTO dto) {
		return new ResponseEntity<>(destinationService.createDestination(dto), HttpStatus.OK);
	}

	@Secured({"ROLE_ADMIN"})
	@GetMapping("/all")
	public ResponseEntity<List<DestinationDTO>> getAllDestinations() {
		return new ResponseEntity<>(destinationService.getAllDestinations(), HttpStatus.OK);
	}

	@Secured({"ROLE_ADMIN"})
	@PostMapping("/delete")
	public ResponseEntity<DestinationDTO> deleteDestination(@RequestBody DestinationDTO dto) {
		return new ResponseEntity<>(destinationService.removeDestination(dto), HttpStatus.OK);
	}

	@Secured({"ROLE_ADMIN"})
	@PostMapping("/restore")
	public ResponseEntity<DestinationDTO> restoreDestination(@RequestBody DestinationDTO dto) {
		return new ResponseEntity<>(destinationService.restoreDestination(dto), HttpStatus.OK);
	}


}
