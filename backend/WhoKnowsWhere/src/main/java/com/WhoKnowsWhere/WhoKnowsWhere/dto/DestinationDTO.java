package com.WhoKnowsWhere.WhoKnowsWhere.dto;

import com.WhoKnowsWhere.WhoKnowsWhere.model.Destination;
import com.WhoKnowsWhere.WhoKnowsWhere.model.DestinationType;
import com.WhoKnowsWhere.WhoKnowsWhere.model.Location;

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
	private LocationDTO location;
	
	public DestinationDTO(Destination dest) {
		id = dest.getId();
		name = dest.getName();
		type = dest.getType();
		location = new LocationDTO(dest.getLocation());
	}
	
}
