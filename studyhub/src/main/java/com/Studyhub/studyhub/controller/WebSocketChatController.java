package com.Studyhub.studyhub.controller;

import com.Studyhub.studyhub.entity.ChatMessage;
import com.Studyhub.studyhub.entity.Conversation;
import com.Studyhub.studyhub.repository.ChatMessageRepository;
import com.Studyhub.studyhub.repository.ConversationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketChatController {

    @Autowired
    private ChatMessageRepository messageRepository;

    @Autowired
    private ConversationRepository conversationRepository; // Bạn cần repository này

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/messages/{conversationId}")
    public ChatMessage sendMessage(@Payload ChatMessage message) {
        // 1. Tìm object Conversation từ ID
        Conversation conv = conversationRepository.findById(message.getConversationId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hội thoại"));

        // 2. Gán object vào Entity để JPA lưu được vào DB
        message.setConversation(conv);

        // 3. Lưu vào DB
        return messageRepository.save(message);
    }
}