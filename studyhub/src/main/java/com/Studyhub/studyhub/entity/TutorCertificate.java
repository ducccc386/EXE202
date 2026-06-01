package com.Studyhub.studyhub.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tutor_certificate") // Tên bảng trong MySQL
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TutorCertificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String certificateName; // Tên chứng chỉ (ví dụ: IELTS, TOEIC,...)

    private String issueDate; // Ngày cấp

    @Column(columnDefinition = "TEXT")
    private String imageUrl; // Đường dẫn ảnh chứng chỉ (nếu có)

    // Mối quan hệ N-1: Nhiều chứng chỉ thuộc về 1 Hồ sơ gia sư
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutor_profile_id", nullable = false)
    private TutorProfile tutorProfile;
}