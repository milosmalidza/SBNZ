package com.WhoKnowsWhere.WhoKnowsWhere.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.WhoKnowsWhere.WhoKnowsWhere.model.User;
import com.WhoKnowsWhere.WhoKnowsWhere.repository.UserRepository;


@Component
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepo.findByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException("Email: " + email + " not found.");
		}
		return user;
	}
}
