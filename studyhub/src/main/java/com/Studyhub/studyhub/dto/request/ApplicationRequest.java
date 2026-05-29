package com.Studyhub.studyhub.dto.request;

import lombok.Data;

@Data
public class ApplicationRequest {
    private Long tutorId;
    private Long requestId;
    private String message;
}