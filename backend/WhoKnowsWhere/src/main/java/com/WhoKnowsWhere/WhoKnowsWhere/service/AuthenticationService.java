package com.WhoKnowsWhere.WhoKnowsWhere.service;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.LocationDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.exception.ApiException;
import com.WhoKnowsWhere.WhoKnowsWhere.model.Motivation;
import com.WhoKnowsWhere.WhoKnowsWhere.model.RegisteredUser;
import com.WhoKnowsWhere.WhoKnowsWhere.model.User;
import com.WhoKnowsWhere.WhoKnowsWhere.model.UserStatus;
import com.WhoKnowsWhere.WhoKnowsWhere.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.UserDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.repository.UserRepository;
import com.WhoKnowsWhere.WhoKnowsWhere.security.JwtUtils;

import java.util.Random;


@Service
@Transactional(propagation = Propagation.REQUIRED)
public class AuthenticationService {
	
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private AuthenticationManager authManager;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AuthorityRepository authorityRepository;

	@Autowired
	private LocationService locationService;


	public UserDTO login(String email, String password) {
		UsernamePasswordAuthenticationToken loginToken = new UsernamePasswordAuthenticationToken(email, password);

		Authentication auth = null;
		try {
			auth = authManager.authenticate(loginToken);
		} catch (BadCredentialsException ex) {
			ex.printStackTrace();
		}

		String token = jwtUtils.generateToken(auth.getName());
		SecurityContextHolder.getContext().setAuthentication(auth);
		User ur = userRepo.findByEmail(auth.getName());
		UserDTO user = new UserDTO(ur);
		if (ur instanceof RegisteredUser) {
			LocationDTO locDTO = new LocationDTO(((RegisteredUser) ur).getLocation());
			locDTO.setGResult(locationService.retreiveLocationInfo(locDTO));
			user.setLocationDTO(locDTO);
		}
		user.setToken(token);
		return user;
	}

	public UserDTO register(UserDTO userDTO) {
		if (userRepo.findByEmail(userDTO.getEmail()) == null) {
			RegisteredUser user = new RegisteredUser();
			user.setEmail(userDTO.getEmail());
			user.setFirstname(userDTO.getFirstname());
			user.setLastname(userDTO.getLastname());
			user.setMotivation(Motivation.valueOf(userDTO.getMotivation()));
			user.setUserStatus(UserStatus.valueOf(userDTO.getUserStatus()));
			user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
			user.getCollectionOfAuthorities().add(authorityRepository.findByName("ROLE_USER"));
			user = userRepo.save(user);
			return new UserDTO(user);
		} else {
			throw new ApiException("Email is reserved.", HttpStatus.BAD_REQUEST);
		}
	}


}
