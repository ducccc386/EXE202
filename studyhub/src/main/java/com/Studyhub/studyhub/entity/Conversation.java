package com.Studyhub.studyhub.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder // Đảm bảo đã có @Builder để dùng conversationRepository.save() mượt mà
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Application application;

    @ManyToOne
    private TutorProfile tutor;

    // Đã khớp 100% với file User.java bạn vừa gửi
    @ManyToOne
    @JoinColumn(name = "parent_id")
    private User parent;
}