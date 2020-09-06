package com.WhoKnowsWhere.WhoKnowsWhere.dto;

import com.WhoKnowsWhere.WhoKnowsWhere.model.PointOfInterestSortingOrder;
import com.WhoKnowsWhere.WhoKnowsWhere.model.TravelMethod;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RecommendationsRequestDTO {
	private TravelMethod travelMethod;
	private double desireableExpense;
	private double maxDistance;
	private double minDistance;
	private double filterDistance;
	private DestinationDTO destination;
	private PointOfInterestSortingOrder poiso;
}
