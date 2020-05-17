package com.WhoKnowsWhere.WhoKnowsWhere.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.UserDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.repository.UserRepository;
import com.WhoKnowsWhere.WhoKnowsWhere.security.JwtUtils;


@Service
@Transactional(propagation = Propagation.REQUIRED)
public class AuthenticationService {
	
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private AuthenticationManager authManager;

	@Autowired
	private JwtUtils jwtUtils;


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
		UserDTO user = new UserDTO(userRepo.findByEmail(auth.getName()));
		user.setToken(token);
		return user;
	}
}
