package com.Studyhub.studyhub.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation; // Thuộc về hội thoại nào

    private Long senderId; // ID của người gửi (có thể là User.id)

    @Column(columnDefinition = "TEXT")
    private String content; // Nội dung tin nhắn

    private LocalDateTime timestamp = LocalDateTime.now();
}