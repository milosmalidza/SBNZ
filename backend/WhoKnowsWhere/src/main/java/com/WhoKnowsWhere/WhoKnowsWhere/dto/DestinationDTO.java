package com.WhoKnowsWhere.WhoKnowsWhere.dto;

import com.WhoKnowsWhere.WhoKnowsWhere.model.Destination;
import com.WhoKnowsWhere.WhoKnowsWhere.model.DestinationType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DestinationDTO {
	private Long id;
	private String name;
	private DestinationType type;
	
	public DestinationDTO(Destination dest) {
		id = dest.getId();
		name = dest.getName();
		type = dest.getType();
	}
	
}
