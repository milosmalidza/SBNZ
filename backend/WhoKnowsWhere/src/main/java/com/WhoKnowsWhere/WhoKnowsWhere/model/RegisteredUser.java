package com.WhoKnowsWhere.WhoKnowsWhere.model;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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
	
	@OneToOne
	private Location location;

}
