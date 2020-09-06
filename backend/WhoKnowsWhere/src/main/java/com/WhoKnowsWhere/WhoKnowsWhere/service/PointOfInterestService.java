package com.WhoKnowsWhere.WhoKnowsWhere.service;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.*;
import com.WhoKnowsWhere.WhoKnowsWhere.events.DestinationLikeEvent;
import com.WhoKnowsWhere.WhoKnowsWhere.events.PointOfInterestLikeEvent;
import com.WhoKnowsWhere.WhoKnowsWhere.model.*;
import com.WhoKnowsWhere.WhoKnowsWhere.repository.DestinationRepository;
import com.WhoKnowsWhere.WhoKnowsWhere.repository.LikePointOfInterestRepository;
import com.WhoKnowsWhere.WhoKnowsWhere.repository.PointOfInterestRepository;
import com.WhoKnowsWhere.WhoKnowsWhere.repository.UserRepository;
import com.WhoKnowsWhere.WhoKnowsWhere.utility.Constants;
import com.WhoKnowsWhere.WhoKnowsWhere.utility.Utility;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
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

    @Autowired
    private LikePointOfInterestRepository likePointOfInterestRepository;

    public List<RecommendationDTO> getRecommendedPOI(RecommendationsRequestDTO rrDto) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        RegisteredUser user = (RegisteredUser) userRepository.findByEmail(currentPrincipalName);

        KieSession session = container.newKieSession(Constants.KIE_SESSION);
        session.setGlobal("recommendationsRequestDTO", rrDto);
        session.insert(user);

        List<PointOfInterest> pois = pointOfInterestRepository.findByIsRemovedFalse();
        List<RecommendationDTO> recommendations = new ArrayList<>();
        List<LikePointOfInterest> likePointOfInterests = likePointOfInterestRepository.findAll();
        for (PointOfInterest poi : pois) {
            Location poiLocation = new Location();
            poiLocation.setLongitude(rrDto.getDestination().getLocation().getLongitude());
            poiLocation.setLatitude(rrDto.getDestination().getLocation().getLatitude());
            if (Utility.getDistance(poiLocation, poi.getLocation()) > rrDto.getFilterDistance())
                continue;

            RecommendationDTO r = new RecommendationDTO(poi);
            ExpenseDTO expense = new ExpenseDTO();
            expense.setDistance(Utility.getDistance(poiLocation, poi.getLocation()));

            r.setExpense(expense);

            recommendations.add(r);
            session.insert(r);
        }

        for (LikePointOfInterest poi : likePointOfInterests) {
            session.insert(new PointOfInterestLikeEvent(poi.getLikeTime(), poi.getPointOfInterest()));
        }

        session.fireAllRules();
        session.dispose();

        Collections.sort(recommendations);
        return recommendations;
    }

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



    public PointOfInterestDTO likePOI(PointOfInterestDTO dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        RegisteredUser user = (RegisteredUser) userRepository.findByEmail(currentPrincipalName);

        PointOfInterest poi = pointOfInterestRepository.findById(dto.getId()).get();
        List<PointOfInterest> likedDestinations = user.getLikedPointOfInterests();
        for (PointOfInterest likedPOI : likedDestinations) {
            if (likedPOI.getId() == poi.getId()) {
                return dto;
            }
        }

        LikePointOfInterest likePOI = new LikePointOfInterest();
        likePOI.setLikeTime(new Date());
        likePOI.setRegisteredUser(user);
        likePOI.setPointOfInterest(poi);

        user.getLikedPointOfInterests().add(poi);
        poi.getLikedBy().add(user);

        pointOfInterestRepository.save(poi);
        userRepository.save(user);
        likePointOfInterestRepository.save(likePOI);


        return dto;
    }

    public IsLikedDTO isLiked(PointOfInterestDTO dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        RegisteredUser user = (RegisteredUser) userRepository.findByEmail(currentPrincipalName);
        IsLikedDTO likedDTO = new IsLikedDTO(false);

        PointOfInterest poi = pointOfInterestRepository.findById(dto.getId()).get();
        List<PointOfInterest> likedPOIs = user.getLikedPointOfInterests();
        for (PointOfInterest likedPOI : likedPOIs) {
            if (likedPOI.getId() == poi.getId()) {
                likedDTO.setLiked(true);
                break;
            }
        }

        return likedDTO;
    }

    public List<PointOfInterestDTO> getTrending() {

        List<PointOfInterestDTO> pointOfInterestDTOS = new ArrayList<>();

        KieSession session = container.newKieSession(Constants.KIE_SESSION);
        session.setGlobal("pointOfInterestDTOS", pointOfInterestDTOS);

        List<LikePointOfInterest> likePointOfInterests = likePointOfInterestRepository.findAll();
        List<PointOfInterest> pointOfInterests = pointOfInterestRepository.findByIsRemovedFalse();

        for(PointOfInterest poi : pointOfInterests) {
            session.insert(poi);
        }

        for(LikePointOfInterest likePointOfInterest : likePointOfInterests) {
            session.insert(new PointOfInterestLikeEvent(likePointOfInterest.getLikeTime(), likePointOfInterest.getPointOfInterest()));
        }


        session.fireAllRules();
        session.dispose();


        return pointOfInterestDTOS;
    }
}
