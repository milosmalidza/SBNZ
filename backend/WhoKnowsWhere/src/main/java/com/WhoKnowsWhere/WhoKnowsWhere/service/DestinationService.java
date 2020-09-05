package com.WhoKnowsWhere.WhoKnowsWhere.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.DestinationDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.model.Location;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.ExpenseDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.dto.RecommendationDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.dto.RecommendationsRequestDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.model.Destination;
import com.WhoKnowsWhere.WhoKnowsWhere.model.RegisteredUser;
import com.WhoKnowsWhere.WhoKnowsWhere.model.TravelMethod;
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
	
	public List<RecommendationDTO> getRecommendedDestinations(RecommendationsRequestDTO rrDto) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		RegisteredUser user = (RegisteredUser) userRepository.findByEmail(currentPrincipalName);
		
		List<Destination> destinations = destinationRepository.findAll();
		
		
		KieSession session = container.newKieSession(Constants.KIE_SESSION);
		session.setGlobal("recommendationsRequestDTO", rrDto);
		session.insert(user);
		List<RecommendationDTO> recommendations = new ArrayList<>();
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
}
