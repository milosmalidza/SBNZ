package com.WhoKnowsWhere.WhoKnowsWhere.service;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.DestinationDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.dto.PointOfInterestDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.model.Destination;
import com.WhoKnowsWhere.WhoKnowsWhere.model.Location;
import com.WhoKnowsWhere.WhoKnowsWhere.model.PointOfInterest;
import com.WhoKnowsWhere.WhoKnowsWhere.repository.DestinationRepository;
import com.WhoKnowsWhere.WhoKnowsWhere.repository.PointOfInterestRepository;
import com.WhoKnowsWhere.WhoKnowsWhere.repository.UserRepository;
import org.kie.api.runtime.KieContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PointOfInterestService {

    @Autowired
    private KieContainer container;

    @Autowired
    private PointOfInterestRepository pointOfInterestRepository;

    @Autowired
    private UserRepository userRepository;

    public PointOfInterestDTO createPointOfInterest(PointOfInterestDTO dto) {
        PointOfInterest poi = new PointOfInterest();
        poi.setName(dto.getName());
        poi.setDescription(dto.getDescription());
        poi.setPoiType(dto.getType());
        Location location = new Location();
        location.setLongitude(dto.getLocation().getLongitude());
        location.setLatitude(dto.getLocation().getLatitude());
        location.setCountry(dto.getLocation().getCountry());
        poi.setLocation(location);
        poi = pointOfInterestRepository.save(poi);
        dto.setId(poi.getId());
        return dto;
    }

    public List<PointOfInterestDTO> getAllPOI() {
        List<PointOfInterest> pois = pointOfInterestRepository.findAll();
        List<PointOfInterestDTO> dto = pois.stream().map(poi -> new PointOfInterestDTO(poi)).collect(Collectors.toList());
        return dto;
    }


    public PointOfInterestDTO removePOI(PointOfInterestDTO dto) {
        PointOfInterest poi = pointOfInterestRepository.findById(dto.getId()).get();
        poi.setRemoved(true);
        pointOfInterestRepository.save(poi);
        return dto;
    }

    public PointOfInterestDTO restorePOI(PointOfInterestDTO dto) {
        PointOfInterest poi = pointOfInterestRepository.findById(dto.getId()).get();
        poi.setRemoved(false);
        pointOfInterestRepository.save(poi);
        return dto;
    }

}
