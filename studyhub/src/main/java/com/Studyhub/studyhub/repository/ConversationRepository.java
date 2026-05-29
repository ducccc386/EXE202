package com.Studyhub.studyhub.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Studyhub.studyhub.entity.Conversation;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    Optional<Conversation> findByApplicationId(Long applicationId);

    List<Conversation> findByParentIdOrTutorId(Long parentId, Long tutorId);
}
