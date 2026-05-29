package com.Studyhub.studyhub.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterRequest {
    private String email;
    private String password;
    private String fullName;
    private String phone;
    private String role; // STUDENT hoặc TUTOR
}