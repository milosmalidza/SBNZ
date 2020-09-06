package com.WhoKnowsWhere.WhoKnowsWhere.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LikePointOfInterest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date likeTime;

    @OneToOne(cascade = CascadeType.ALL)
    private RegisteredUser registeredUser;

    @OneToOne(cascade = CascadeType.ALL)
    private PointOfInterest pointOfInterest;
}
