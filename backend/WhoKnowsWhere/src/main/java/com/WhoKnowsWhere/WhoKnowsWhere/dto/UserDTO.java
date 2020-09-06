package com.WhoKnowsWhere.WhoKnowsWhere.dto;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.constraints.NotEmpty;

import com.WhoKnowsWhere.WhoKnowsWhere.model.RegisteredUser;
import com.WhoKnowsWhere.WhoKnowsWhere.model.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	private Long id;
	
	@NotEmpty(message = "Provide email.")
	private String email;
	
	@NotEmpty(message = "Provide firstname.")
	private String firstname;
	
	@NotEmpty(message = "Provide lastname.")
	private String lastname;
	
	@NotEmpty(message = "Provide password.")
	private String password;

	@NotEmpty(message = "Provide user status.")
	private String userStatus;

	@NotEmpty(message = "Provide motivation.")
	private String motivation;

	private String birthDate;

	private int day;
	private int month;
	private int year;

	private LocationDTO locationDTO;
	
	private String token;
	private List<String> authorities;
	
	public UserDTO(User user) {
		this.email = user.getEmail();
		this.firstname = user.getFirstname();
		this.lastname = user.getLastname();
		this.authorities = user.getAuthorities().stream().map(auth -> auth.getAuthority()).collect(Collectors.toList());
		this.id = user.getId();
	}
}
