package com.Studyhub.studyhub.controller;

import com.Studyhub.studyhub.dto.request.UserLoginRequest;
import com.Studyhub.studyhub.dto.request.UserRegisterRequest;
import com.Studyhub.studyhub.dto.response.AuthResponse; // Import Object phản hồi mới
import com.Studyhub.studyhub.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    // 1. API Đăng ký
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserRegisterRequest request) {
        try {
            String message = authService.register(request);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 2. API Đăng nhập
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest request) {
        try {
            // Nhận về Object AuthResponse từ AuthService
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response); // Hết sạch lỗi gạch đỏ!
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}