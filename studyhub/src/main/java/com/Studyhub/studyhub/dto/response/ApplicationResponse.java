package com.Studyhub.studyhub.dto.response;

import lombok.*;

@Data
@Builder // <--- RẤT QUAN TRỌNG
@AllArgsConstructor // <--- CẦN CÓ
@NoArgsConstructor // <--- CẦN CÓ
public class ApplicationResponse {
    private Long id;
    private String status;
    private String message;
    private String tutorName;
    private String requestTitle;
}