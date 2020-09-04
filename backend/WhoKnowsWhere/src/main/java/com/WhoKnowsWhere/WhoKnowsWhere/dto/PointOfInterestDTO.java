package com.WhoKnowsWhere.WhoKnowsWhere.dto;

import com.WhoKnowsWhere.WhoKnowsWhere.model.Destination;
import com.WhoKnowsWhere.WhoKnowsWhere.model.DestinationType;
import com.WhoKnowsWhere.WhoKnowsWhere.model.POIType;
import com.WhoKnowsWhere.WhoKnowsWhere.model.PointOfInterest;

import java.util.List;

public class PointOfInterestDTO {
    private Long id;
    private String name;
    private String description;
    private List<POIType> types;
    private LocationDTO location;

    public PointOfInterestDTO(PointOfInterest poi) {
        id = poi.getId();
        name = poi.getName();
        types = poi.getPoiTypes();
        location = new LocationDTO(poi.getLocation());
        description = poi.getDescription();
    }
}
