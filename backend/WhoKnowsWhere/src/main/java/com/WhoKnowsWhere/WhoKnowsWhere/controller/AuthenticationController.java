package com.WhoKnowsWhere.WhoKnowsWhere.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.LoginRequestDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.dto.UserDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.service.AuthenticationService;

import javax.validation.Valid;


@Controller
@RequestMapping("/api/auth")
public class AuthenticationController {
	@Autowired
	private AuthenticationService authService;
	
	@PostMapping("/login")
	public ResponseEntity<UserDTO> login(@RequestBody LoginRequestDTO loginRequest) {
		return new ResponseEntity<>(authService.login(loginRequest.getEmail(), loginRequest.getPassword()),
				HttpStatus.OK);
	}

	@PostMapping("/register")
	public ResponseEntity<UserDTO> register(@Valid @RequestBody UserDTO userDTO) {
		return new ResponseEntity<>(authService.register(userDTO), HttpStatus.OK);
	}


}
