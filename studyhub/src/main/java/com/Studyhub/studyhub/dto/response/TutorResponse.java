package com.Studyhub.studyhub.dto.response;

import com.Studyhub.studyhub.entity.TeachingMode;
import lombok.*;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutorResponse {
    // Các thông tin cơ bản giống TutorCardResponse
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
    private Set<String> subjects;

    // CÁC TRƯỜNG MỞ RỘNG CHO TRANG CHI TIẾT
    private String bio; // Giới thiệu
    private String teachingMethod; // Phương pháp dạy
    private Set<String> certificateNames; // Danh sách chứng chỉ mới tạo
    private Boolean verified; // Trạng thái đã duyệt
}