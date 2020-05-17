package com.WhoKnowsWhere.WhoKnowsWhere.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

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
public class RegisteredUser extends User{

	private static final long serialVersionUID = 1L;
	
	@Column(unique = false, nullable = true)
	private Date birthDate;

}
