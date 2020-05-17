package com.WhoKnowsWhere.WhoKnowsWhere.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api/test")
public class TestController {
	
	@GetMapping
	public ResponseEntity<String> test() {
		return new ResponseEntity<String>("test", HttpStatus.OK);
	}
}
