package com.WhoKnowsWhere.WhoKnowsWhere.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PointOfInterest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column(length = 100000)
    private String description;

    @OneToOne
    private Location location;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private List<POIType> poiTypes;

    @ManyToMany(cascade = CascadeType.ALL ,fetch = FetchType.LAZY)
    private List<RegisteredUser> likedBy;
}
