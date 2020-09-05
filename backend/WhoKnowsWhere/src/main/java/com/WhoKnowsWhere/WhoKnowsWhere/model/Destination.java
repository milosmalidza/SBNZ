package com.WhoKnowsWhere.WhoKnowsWhere.model;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Destination {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique = true, nullable = false)
	private String name;

	@Column(length = 100000)
	private String description;

	private boolean isRemoved = false;

	@ElementCollection(fetch = FetchType.EAGER)
	@Enumerated(EnumType.STRING)
	private List<DestinationType> type;
	
	@OneToOne(cascade = CascadeType.ALL)
	private Location location;

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<RegisteredUser> likedBy;
	

}
