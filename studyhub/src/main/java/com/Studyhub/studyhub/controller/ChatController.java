package com.Studyhub.studyhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Studyhub.studyhub.entity.ChatMessage;
import com.Studyhub.studyhub.repository.ChatMessageRepository;

@RestController
@RequestMapping("/api/messages")
public class ChatController {
    @Autowired
    private ChatMessageRepository messageRepository;

    // Lấy lịch sử chat của một cuộc hội thoại
    @GetMapping("/{conversationId}")
    public List<ChatMessage> getMessages(@PathVariable Long conversationId) {
        return messageRepository.findByConversationIdOrderByTimestampAsc(conversationId);
    }

    // Gửi tin nhắn mới
    @PostMapping("/send")
    public ChatMessage sendMessage(@RequestBody ChatMessage message) {
        return messageRepository.save(message);
    }
}
