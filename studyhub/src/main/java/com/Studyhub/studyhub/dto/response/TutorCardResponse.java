package com.Studyhub.studyhub.dto.response;

import com.Studyhub.studyhub.entity.TeachingMode;
import lombok.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutorCardResponse {
    private Long tutorProfileId;
    private String fullName;
    private String avatarUrl;
    private String education;
    private Integer experienceYears;
    private Double hourlyRate;
    private String city;
    private TeachingMode teachingMode;
    private Double averageRating;
    private Integer totalReviews;
    private Set<String> subjects; // Chỉ trả về tên các môn học (ví dụ: ["Toán học", "Tiếng Anh"])
}