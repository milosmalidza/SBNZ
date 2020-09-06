package com.WhoKnowsWhere.WhoKnowsWhere.dto;

import com.WhoKnowsWhere.WhoKnowsWhere.model.Destination;

import com.WhoKnowsWhere.WhoKnowsWhere.model.PointOfInterest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RecommendationDTO implements Comparable<RecommendationDTO>{
	private int rank;
	private DestinationDTO destination;
	private PointOfInterestDTO poi;
	private ExpenseDTO expense;
	private boolean isTrending;
	
	public RecommendationDTO(Destination dest) {
		destination = new DestinationDTO(dest);
	}

	public RecommendationDTO(PointOfInterest poi) { this.poi = new PointOfInterestDTO(poi); }

	@Override
	public int compareTo(RecommendationDTO o) {
        return o.rank - this.rank;
	}
}
