package com.WhoKnowsWhere.WhoKnowsWhere.utility;

import java.util.Date;
import java.util.concurrent.TimeUnit;

import com.WhoKnowsWhere.WhoKnowsWhere.model.Location;

public class Utility {
	
	public static final String GEOCODE_API_KEY = "5cb8bfab486049d0b3656f556ea278f4";
	public static final String GEOCODE_API = "https://api.opencagedata.com/geocode/v1/json?q=%s+%s&key=%s&no_annotations=1";
	
	/**
	 * Returns distance in km between two geo coordinates
	 */
	public static double getDistance(Location a, Location b) {
		double earthRadius = 6371;
		
		double dLat = Math.toRadians(b.getLatitude() - a.getLatitude());
		double dLon = Math.toRadians(b.getLongitude() - a.getLongitude());
		
		double lat1 = Math.toRadians(a.getLatitude());
		double lat2 = Math.toRadians(b.getLatitude());
		
		double retval = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
		retval = 2 * Math.atan2(Math.sqrt(retval), Math.sqrt(1-retval));
		
		return earthRadius * retval;
	}
	
	/**
	 * Returns difference between two dates in years
	 */
	public static long getYears(Date date) {
		long diffInMillies = Math.abs(new Date().getTime() - date.getTime());
	    long diff = (long) (TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS) / 365.25);
	    return diff;
	}
	
}
