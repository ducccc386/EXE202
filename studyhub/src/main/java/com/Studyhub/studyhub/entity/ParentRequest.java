package com.Studyhub.studyhub.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Parent_Requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "parent_id", nullable = false)
    private User parent;

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 50)
    private String grade;

    private Double budget;

    @Column(length = 100)
    private String city;

    @Column(name = "address_detail", length = 255)
    private String addressDetail;

    @Enumerated(EnumType.STRING)
    @Column(name = "teaching_mode", length = 20)
    private TeachingMode teachingMode;

    @Column(name = "sessions_per_week")
    private Integer sessionsPerWeek;

    @Column(name = "schedule_info", length = 255)
    private String scheduleInfo;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Status status = Status.OPEN;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}