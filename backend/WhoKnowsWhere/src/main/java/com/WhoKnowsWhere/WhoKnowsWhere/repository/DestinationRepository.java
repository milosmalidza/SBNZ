package com.WhoKnowsWhere.WhoKnowsWhere.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.WhoKnowsWhere.WhoKnowsWhere.model.Destination;

import java.util.List;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {
    List<Destination> findByIsRemovedFalse();
}
