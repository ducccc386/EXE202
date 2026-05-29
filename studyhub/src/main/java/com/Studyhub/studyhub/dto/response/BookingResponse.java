package com.Studyhub.studyhub.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private Long id;
    private String parentName; // Tên phụ huynh để hiển thị
    private String subjectName; // Tên môn học hiển thị (ví dụ: Toán học)
    private String title;
    private String description;
    private String grade;
    private Double budget;
    private String city;
    private String addressDetail;
    private String teachingMode;
    private Integer sessionsPerWeek;
    private String scheduleInfo;
    private LocalDateTime createdAt;
}