package com.Studyhub.studyhub.controller;

import com.Studyhub.studyhub.repository.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    @Autowired
    private ConversationRepository conversationRepository;

    @GetMapping("/by-application/{appId}")
    public ResponseEntity<?> getConversationByApp(@PathVariable Long appId) {
        return conversationRepository.findByApplicationId(appId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}