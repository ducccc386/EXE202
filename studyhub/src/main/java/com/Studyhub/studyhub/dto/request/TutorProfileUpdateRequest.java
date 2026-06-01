package com.Studyhub.studyhub.dto.request;

import lombok.Data;

@Data
public class TutorProfileUpdateRequest {
    private String bio;
    private String education;
    private Integer experienceYears;
    private String teachingMethod;
    private Double hourlyRate;
    private String city;
}