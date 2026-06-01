package com.Studyhub.studyhub.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "Tutor_Profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(length = 255)
    private String education;

    @Column(name = "experience_years")
    private Integer experienceYears = 0;

    @Column(name = "teaching_method", columnDefinition = "TEXT")
    private String teachingMethod;

    @Column(name = "hourly_rate")
    private Double hourlyRate;

    @Column(length = 100)
    private String city;

    @Enumerated(EnumType.STRING)
    @Column(name = "teaching_mode", length = 20)
    private TeachingMode teachingMode;

    @Column(nullable = false)
    private Boolean verified = false;

    @Column(name = "average_rating")
    private Double averageRating = 0.0;

    @Column(name = "total_reviews")
    private Integer totalReviews = 0;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToMany
    @JoinTable(name = "Tutor_Subjects", joinColumns = @JoinColumn(name = "tutor_profile_id"), inverseJoinColumns = @JoinColumn(name = "subject_id"))
    private Set<Subject> subjects;

    // Thêm vào trong class TutorProfile
    @OneToMany(mappedBy = "tutorProfile", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<TutorCertificate> certificates;
}