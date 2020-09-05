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

    @OneToOne(cascade = CascadeType.ALL)
    private Location location;

    @Enumerated(EnumType.STRING)
    private POIType poiType;

    private boolean isRemoved = false;

    @ManyToMany(cascade = CascadeType.ALL ,fetch = FetchType.LAZY)
    private List<RegisteredUser> likedBy;
}
