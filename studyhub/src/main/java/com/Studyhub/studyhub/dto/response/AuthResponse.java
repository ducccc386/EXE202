package com.Studyhub.studyhub.dto.response;

public class AuthResponse {
    private String token;
    private String fullName;
    private String role;
    private Long tutorProfileId; // Thêm trường này
    private Long userId;
    // Constructor đầy đủ tham số

    public AuthResponse(String token, String fullName, String role, Long tutorProfileId, Long userId) {
        this.token = token;
        this.fullName = fullName;
        this.role = role;
        this.tutorProfileId = tutorProfileId;
        this.userId = userId;
    }

    // Các hàm Getter / Setter (Hoặc bạn dùng @Data nếu có Lombok)
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getTutorProfileId() {
        return tutorProfileId;
    }

    public void setTutorProfileId(Long tutorProfileId) {
        this.tutorProfileId = tutorProfileId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}