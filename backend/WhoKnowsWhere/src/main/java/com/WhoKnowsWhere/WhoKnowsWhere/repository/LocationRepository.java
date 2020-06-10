package com.WhoKnowsWhere.WhoKnowsWhere.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.WhoKnowsWhere.WhoKnowsWhere.model.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

}
