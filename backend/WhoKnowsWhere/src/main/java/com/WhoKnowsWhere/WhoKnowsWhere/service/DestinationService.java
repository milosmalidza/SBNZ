package com.WhoKnowsWhere.WhoKnowsWhere.service;

import java.util.Optional;

import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.ExpenseDTO;
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
	
}