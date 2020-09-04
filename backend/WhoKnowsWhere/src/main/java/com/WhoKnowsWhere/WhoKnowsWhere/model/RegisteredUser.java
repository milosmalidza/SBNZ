package com.WhoKnowsWhere.WhoKnowsWhere.model;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("REGISTERED_USER")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisteredUser extends User {

	private static final long serialVersionUID = 1L;
	
	@Basic
	@Temporal(TemporalType.DATE)
	private Date birthDate;
	
	@Enumerated(EnumType.STRING)
	private Motivation motivation;
	
	@Enumerated(EnumType.STRING)
	private UserStatus userStatus;
	
	@OneToOne(cascade = CascadeType.ALL)
	private Location location;

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Destination> likedDestinations;

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<PointOfInterest> likedPointOfInterests;

}
