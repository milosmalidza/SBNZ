package com.WhoKnowsWhere.WhoKnowsWhere.repository;

import com.WhoKnowsWhere.WhoKnowsWhere.model.LikeDestination;
import com.WhoKnowsWhere.WhoKnowsWhere.model.LikePointOfInterest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikePointOfInterestRepository extends JpaRepository<LikePointOfInterest, Long> {
}
