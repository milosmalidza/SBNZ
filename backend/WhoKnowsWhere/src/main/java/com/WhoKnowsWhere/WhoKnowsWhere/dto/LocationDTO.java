package com.WhoKnowsWhere.WhoKnowsWhere.dto;

import com.WhoKnowsWhere.WhoKnowsWhere.model.Location;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LocationDTO {
	private double longitude;
	private double latitude;
	private String country;
	
	public LocationDTO(Location location) {
		longitude = location.getLongitude();
		latitude = location.getLatitude();
		country = location.getCountry();
	}
}
