package com.WhoKnowsWhere.WhoKnowsWhere.controller;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.*;
import com.WhoKnowsWhere.WhoKnowsWhere.model.PointOfInterest;
import com.WhoKnowsWhere.WhoKnowsWhere.service.PointOfInterestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("api/poi")
public class PointOfInterestController {

    @Autowired
    private PointOfInterestService pointOfInterestService;

    @Secured({"ROLE_USER"})
    @PostMapping("/recommendation")
    public ResponseEntity<List<RecommendationDTO>> getRecommendation(@RequestBody RecommendationsRequestDTO rrDTO) {
        return new ResponseEntity<>(pointOfInterestService.getRecommendedPOI(rrDTO), HttpStatus.OK);
    }

    @Secured({"ROLE_ADMIN"})
    @GetMapping("/trending")
    public ResponseEntity<List<PointOfInterestDTO>> getTrending() {
        return new ResponseEntity<>(pointOfInterestService.getTrending(), HttpStatus.OK);
    }

    @Secured({"ROLE_USER"})
    @PostMapping("/is-liked")
    public ResponseEntity<IsLikedDTO> isLiked(@RequestBody PointOfInterestDTO dto) {
        return new ResponseEntity<>(pointOfInterestService.isLiked(dto), HttpStatus.OK);
    }

    @Secured({"ROLE_USER"})
    @PostMapping("/like")
    public ResponseEntity<PointOfInterestDTO> likePOI(@RequestBody PointOfInterestDTO dto) {
        return new ResponseEntity<>(pointOfInterestService.likePOI(dto), HttpStatus.OK);
    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping("create-poi")
    public ResponseEntity<PointOfInterestDTO> createPointOfInterest(@RequestBody PointOfInterestDTO dto) {
        return new ResponseEntity<>(pointOfInterestService.createPointOfInterest(dto), HttpStatus.OK);
    }

    @Secured({"ROLE_ADMIN"})
    @GetMapping("/all")
    public ResponseEntity<List<PointOfInterestDTO>> getAllPOI() {
        return new ResponseEntity<>(pointOfInterestService.getAllPOI(), HttpStatus.OK);
    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping("/delete")
    public ResponseEntity<PointOfInterestDTO> deletePOI(@RequestBody PointOfInterestDTO dto) {
        return new ResponseEntity<>(pointOfInterestService.removePOI(dto), HttpStatus.OK);
    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping("/restore")
    public ResponseEntity<PointOfInterestDTO> restorePOI(@RequestBody PointOfInterestDTO dto) {
        return new ResponseEntity<>(pointOfInterestService.restorePOI(dto), HttpStatus.OK);
    }

}
