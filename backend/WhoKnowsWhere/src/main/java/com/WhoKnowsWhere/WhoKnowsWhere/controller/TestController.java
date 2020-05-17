package com.WhoKnowsWhere.WhoKnowsWhere.controller;

import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.WhoKnowsWhere.WhoKnowsWhere.model.Destination;

@Controller
@RequestMapping("api/test")
public class TestController {
	
	@Autowired
	private KieContainer kieContainer;
	
	@GetMapping("/{test}")
	public ResponseEntity<Destination> test(@PathVariable("test") String test) {
		System.out.println(test);
		
		
		KieSession session = kieContainer.newKieSession("WKW");
		Destination destination = new Destination(1L, test);
		session.insert(destination);
		session.fireAllRules();
		session.dispose();
		
		return new ResponseEntity<Destination>(destination, HttpStatus.OK);
	}
}
