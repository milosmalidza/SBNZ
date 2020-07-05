package com.WhoKnowsWhere.WhoKnowsWhere.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.ExpenseDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.dto.RecommendationDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.dto.RecommendationsRequestDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.dto.RecommendationsResponseDTO;
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
	
	@Secured({"ROLE_USER"})
	@PostMapping("/recommendation")
	public ResponseEntity<List<RecommendationDTO>> getRecommendation(@RequestBody RecommendationsRequestDTO rrDTO) {
		return new ResponseEntity<>(destinationService.getRecommendedDestinations(rrDTO), HttpStatus.OK);
	}
}
