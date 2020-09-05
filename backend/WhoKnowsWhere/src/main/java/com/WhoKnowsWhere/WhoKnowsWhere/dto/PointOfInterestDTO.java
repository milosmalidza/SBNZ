package com.WhoKnowsWhere.WhoKnowsWhere.dto;

import com.WhoKnowsWhere.WhoKnowsWhere.model.Destination;
import com.WhoKnowsWhere.WhoKnowsWhere.model.DestinationType;
import com.WhoKnowsWhere.WhoKnowsWhere.model.POIType;
import com.WhoKnowsWhere.WhoKnowsWhere.model.PointOfInterest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PointOfInterestDTO {
    private Long id;
    private String name;
    private String description;
    private POIType type;
    private LocationDTO location;
    private boolean isRemoved;

    public PointOfInterestDTO(PointOfInterest poi) {
        id = poi.getId();
        name = poi.getName();
        type = poi.getPoiType();
        location = new LocationDTO(poi.getLocation());
        description = poi.getDescription();
        isRemoved = poi.isRemoved();
    }
}
