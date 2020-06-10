package com.WhoKnowsWhere.WhoKnowsWhere.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RecommendationsResponseDTO {
	private List<RecommendationDTO> recommendations;
}
