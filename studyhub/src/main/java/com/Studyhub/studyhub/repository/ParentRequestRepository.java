package com.Studyhub.studyhub.repository;

import com.Studyhub.studyhub.entity.ParentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentRequestRepository extends JpaRepository<ParentRequest, Long> {
}