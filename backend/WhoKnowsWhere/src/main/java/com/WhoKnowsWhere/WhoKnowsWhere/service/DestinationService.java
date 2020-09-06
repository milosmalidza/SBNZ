package com.WhoKnowsWhere.WhoKnowsWhere.service;

import java.util.*;
import java.util.stream.Collectors;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.*;
import com.WhoKnowsWhere.WhoKnowsWhere.events.DestinationLikeEvent;
import com.WhoKnowsWhere.WhoKnowsWhere.events.PointOfInterestLikeEvent;
import com.WhoKnowsWhere.WhoKnowsWhere.model.*;
import com.WhoKnowsWhere.WhoKnowsWhere.repository.LikeDestinationRepository;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.WhoKnowsWhere.WhoKnowsWhere.repository.DestinationRepository;
import com.WhoKnowsWhere.WhoKnowsWhere.repository.UserRepository;
import com.WhoKnowsWhere.WhoKnowsWhere.utility.Constants;
import com.WhoKnowsWhere.WhoKnowsWhere.utility.Utility;


@Service
public class DestinationService {
	
	@Autowired
	private KieContainer container;
	
	@Autowired
	private DestinationRepository destinationRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private LikeDestinationRepository likeDestinationRepository;
	
	public List<RecommendationDTO> getRecommendedDestinations(RecommendationsRequestDTO rrDto) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		RegisteredUser user = (RegisteredUser) userRepository.findByEmail(currentPrincipalName);
		
		List<Destination> destinations = destinationRepository.findByIsRemovedFalse();
		
		
		KieSession session = container.newKieSession(Constants.KIE_SESSION);
		session.setGlobal("recommendationsRequestDTO", rrDto);
		session.insert(user);
		List<RecommendationDTO> recommendations = new ArrayList<>();
		List<LikeDestination> likeDestinations = likeDestinationRepository.findAll();
		for (Destination dest : destinations) {
			if (Utility.getDistance(user.getLocation(), dest.getLocation()) > rrDto.getFilterDistance())
				continue;
			RecommendationDTO r = new RecommendationDTO(dest);
			ExpenseDTO expense = new ExpenseDTO();
			expense.setDistance(Utility.getDistance(user.getLocation(), dest.getLocation()));
			expense.setTravelMethod(rrDto.getTravelMethod());
			
			r.setExpense(expense);
			
			recommendations.add(r);
			session.insert(r);
			session.insert(expense);
		}

		for (LikeDestination dest : likeDestinations) {
			session.insert(new DestinationLikeEvent(dest.getLikeTime(), dest.getDestination()));
		}
		
		session.fireAllRules();
		session.dispose();
		
		Collections.sort(recommendations);
		return recommendations;
	}
	
	public ExpenseDTO getExpense(Long destinationId, String travelMethod) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		RegisteredUser user = (RegisteredUser) userRepository.findByEmail(currentPrincipalName);
		
		Optional<Destination> optDest = destinationRepository.findById(destinationId);
		ExpenseDTO expense = new ExpenseDTO();
		expense.setDistance(Utility.getDistance(user.getLocation(), optDest.get().getLocation()));
		expense.setTravelMethod(TravelMethod.valueOf(travelMethod));
		
		KieSession session = container.newKieSession(Constants.KIE_SESSION);
		session.insert(expense);
		session.fireAllRules();
		session.dispose();
		
		return expense;
	}

	public DestinationDTO createDestination(DestinationDTO dto) {

		Destination destination = new Destination();
		destination.setName(dto.getName());
		destination.setDescription(dto.getDescription());
		Location location = new Location();
		location.setCountry(dto.getLocation().getCountry());
		location.setLatitude(dto.getLocation().getLatitude());
		location.setLongitude(dto.getLocation().getLongitude());
		destination.setLocation(location);
		destination.setType(dto.getType());

		destination = destinationRepository.save(destination);
		dto.setId(destination.getId());
		return dto;
	}

	public List<DestinationDTO> getAllDestinations() {
		List<Destination> destinations = destinationRepository.findAll();
		List<DestinationDTO> dto = destinations.stream().map(destination -> new DestinationDTO(destination)).collect(Collectors.toList());
		return dto;
	}


	public DestinationDTO removeDestination(DestinationDTO dto) {
		Destination destination = destinationRepository.findById(dto.getId()).get();
		destination.setRemoved(true);
		destinationRepository.save(destination);
		return dto;
	}

	public DestinationDTO restoreDestination(DestinationDTO dto) {
		Destination destination = destinationRepository.findById(dto.getId()).get();
		destination.setRemoved(false);
		destinationRepository.save(destination);
		return dto;
	}

	public IsLikedDTO isLiked(DestinationDTO dto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		RegisteredUser user = (RegisteredUser) userRepository.findByEmail(currentPrincipalName);
		IsLikedDTO likedDTO = new IsLikedDTO(false);

		Destination destination = destinationRepository.findById(dto.getId()).get();
		List<Destination> likedDestinations = user.getLikedDestinations();
		for (Destination likedDest : likedDestinations) {
			if (likedDest.getId() == destination.getId()) {
				likedDTO.setLiked(true);
				break;
			}
		}

		return likedDTO;
	}

	public DestinationDTO likeDestination(DestinationDTO dto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		RegisteredUser user = (RegisteredUser) userRepository.findByEmail(currentPrincipalName);

		Destination destination = destinationRepository.findById(dto.getId()).get();
		List<Destination> likedDestinations = user.getLikedDestinations();
		for (Destination likedDest : likedDestinations) {
			if (likedDest.getId() == destination.getId()) {
				return dto;
			}
		}
		LikeDestination likeDestination = new LikeDestination();
		likeDestination.setLikeTime(new Date());
		likeDestination.setRegisteredUser(user);
		likeDestination.setDestination(destination);

		user.getLikedDestinations().add(destination);
		destination.getLikedBy().add(user);

		destinationRepository.save(destination);
		userRepository.save(user);
		likeDestinationRepository.save(likeDestination);


		return dto;
	}

	public List<DestinationDTO> getTrending() {

		List<DestinationDTO> destinationDTOS = new ArrayList<>();

		KieSession session = container.newKieSession(Constants.KIE_SESSION);
		session.setGlobal("destinationDTOS", destinationDTOS);

		List<LikeDestination> likeDestinations = likeDestinationRepository.findAll();
		List<Destination> destinations = destinationRepository.findByIsRemovedFalse();

		for(Destination dest : destinations) {
			session.insert(dest);
		}

		for(LikeDestination likeDestination : likeDestinations) {
			session.insert(new DestinationLikeEvent(likeDestination.getLikeTime(), likeDestination.getDestination()));
		}


		session.fireAllRules();
		session.dispose();


		return destinationDTOS;
	}



}
