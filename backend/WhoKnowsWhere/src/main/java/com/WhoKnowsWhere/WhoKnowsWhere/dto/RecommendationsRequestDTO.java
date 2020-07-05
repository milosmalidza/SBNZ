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
	private int desireableExpense;
	private int maxDistance;
	private int minDistance;
	private PointOfInterestSortingOrder poiso;
}
