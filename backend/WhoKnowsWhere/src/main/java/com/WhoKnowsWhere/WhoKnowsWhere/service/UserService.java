package com.WhoKnowsWhere.WhoKnowsWhere.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.DestinationDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.dto.PointOfInterestDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.model.Destination;
import com.WhoKnowsWhere.WhoKnowsWhere.model.PointOfInterest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.UserInfoUpdateDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.model.RegisteredUser;
import com.WhoKnowsWhere.WhoKnowsWhere.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;

	public String updateUserInfo(UserInfoUpdateDTO dto) {
		SimpleDateFormat dateFormatter = new SimpleDateFormat("dd-MM-yyyy");
		Date birthDate = null;
		try {
			birthDate = dateFormatter.parse(dto.getBirthDate());
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		RegisteredUser user = (RegisteredUser) userRepository.findByEmail(currentPrincipalName);
		
		user.setBirthDate(birthDate);
		
		long diffInMillies = Math.abs(new Date().getTime() - birthDate.getTime());
	    long diff = (long) (TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS) / 365.25);
	    
	    System.out.println(diff);
		
		userRepository.save(user);
		
		return null;
	}

	public List<DestinationDTO> getLikedDestinations() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		RegisteredUser user = (RegisteredUser) userRepository.findByEmail(currentPrincipalName);
		List<Destination> likedDestinations = user.getLikedDestinations();
		List<DestinationDTO> likedDestinationsDTO = new ArrayList<>();
		for (Destination dest : likedDestinations) {
			likedDestinationsDTO.add(new DestinationDTO(dest));
		}

		return likedDestinationsDTO;
	}

	public List<PointOfInterestDTO> getLikedPOI() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentPrincipalName = authentication.getName();
		RegisteredUser user = (RegisteredUser) userRepository.findByEmail(currentPrincipalName);
		List<PointOfInterest> likedPOI = user.getLikedPointOfInterests();
		List<PointOfInterestDTO> likedPointOfInterestDTO = new ArrayList<>();
		for (PointOfInterest poi : likedPOI) {
			likedPointOfInterestDTO.add(new PointOfInterestDTO(poi));
		}

		return likedPointOfInterestDTO;
	}

}
