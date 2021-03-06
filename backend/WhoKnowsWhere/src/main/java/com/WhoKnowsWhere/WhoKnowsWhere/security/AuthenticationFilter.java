package com.WhoKnowsWhere.WhoKnowsWhere.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.WhoKnowsWhere.WhoKnowsWhere.repository.UserRepository;

@Component
public class AuthenticationFilter extends OncePerRequestFilter{
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String token = jwtUtils.getToken(request);
		if (token != null) {
			String username = jwtUtils.getUsername(token);
			if (username != null) {
				UserDetails u = userRepository.findByEmail(username);
				if (u != null) {
					UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(u, "", u.getAuthorities());
					SecurityContextHolder.getContext().setAuthentication(auth);
				}
			}
		}
		
		filterChain.doFilter(request, response);
		
	}
}
