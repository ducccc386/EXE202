package com.Studyhub.studyhub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Studyhub.studyhub.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByConversationIdOrderByTimestampAsc(Long conversationId);
}
