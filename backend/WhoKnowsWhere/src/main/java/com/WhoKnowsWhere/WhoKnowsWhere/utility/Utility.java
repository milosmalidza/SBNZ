package com.WhoKnowsWhere.WhoKnowsWhere.utility;

import com.WhoKnowsWhere.WhoKnowsWhere.model.Location;

public class Utility {
	
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
	
}
