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
    private Conversation conversation;

    // CHỈNH SỬA ĐOẠN NÀY:
    // Thêm insertable = false, updatable = false để tránh lỗi DuplicateMapping
    @Column(name = "conversation_id", insertable = false, updatable = false)
    private Long conversationId;

    private Long senderId;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime timestamp = LocalDateTime.now();
}