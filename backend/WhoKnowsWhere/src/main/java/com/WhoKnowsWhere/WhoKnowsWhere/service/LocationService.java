package com.WhoKnowsWhere.WhoKnowsWhere.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.WhoKnowsWhere.WhoKnowsWhere.dto.LocationDTO;
import com.WhoKnowsWhere.WhoKnowsWhere.dto.geocode.GeocodeResult;
import com.WhoKnowsWhere.WhoKnowsWhere.repository.LocationRepository;
import com.WhoKnowsWhere.WhoKnowsWhere.utility.Utility;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class LocationService {
	
	@Autowired
	private LocationRepository locationRep;
	
	public String createLocation(LocationDTO dto) {
		
		RestTemplate restTemplate = new RestTemplate();
		String api = String.format(Utility.GEOCODE_API, dto.getLatitude(), dto.getLongitude(), Utility.GEOCODE_API_KEY);
		System.out.println(api);
		ResponseEntity<String> result = restTemplate.getForEntity(
				api,
				String.class);
		
		System.out.println(result.getBody());
		
		ObjectMapper mapper = new ObjectMapper();
		GeocodeResult gresult = null;
		try {
			gresult = mapper.readValue(result.getBody(), GeocodeResult.class);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		System.out.println(gresult.results.get(0).components.country);
		System.out.println(gresult.results.get(0).components.politicalunion);
		
		return null;
	}

	public GeocodeResult retreiveLocationInfo(LocationDTO dto) {

		RestTemplate restTemplate = new RestTemplate();
		String api = String.format(Utility.GEOCODE_API, dto.getLatitude(), dto.getLongitude(), Utility.GEOCODE_API_KEY);
		System.out.println(api);
		ResponseEntity<String> result = restTemplate.getForEntity(
				api,
				String.class);

		System.out.println(result.getBody());

		ObjectMapper mapper = new ObjectMapper();
		GeocodeResult gresult = null;
		try {
			gresult = mapper.readValue(result.getBody(), GeocodeResult.class);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		System.out.println(gresult.results.get(0).components.country);
		System.out.println(gresult.results.get(0).components.politicalunion);

		return gresult;
	}
	
}
