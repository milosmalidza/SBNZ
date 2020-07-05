package com.WhoKnowsWhere.WhoKnowsWhere.repository;

import com.WhoKnowsWhere.WhoKnowsWhere.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Authority findByName(String name);
}