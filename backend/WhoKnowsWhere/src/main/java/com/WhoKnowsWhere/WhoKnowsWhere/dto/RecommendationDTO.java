package com.WhoKnowsWhere.WhoKnowsWhere.dto;

import com.WhoKnowsWhere.WhoKnowsWhere.model.Destination;

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
	private ExpenseDTO expense;
	
	public RecommendationDTO(Destination dest) {
		destination = new DestinationDTO(dest);
	}

	@Override
	public int compareTo(RecommendationDTO o) {
        return o.rank - this.rank;
	}
}
