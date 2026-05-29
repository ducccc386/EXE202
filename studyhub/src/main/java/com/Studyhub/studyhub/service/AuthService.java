package com.Studyhub.studyhub.service;

import com.Studyhub.studyhub.config.JwtTokenProvider;
import com.Studyhub.studyhub.dto.request.UserLoginRequest;
import com.Studyhub.studyhub.dto.request.UserRegisterRequest;
import com.Studyhub.studyhub.dto.response.AuthResponse;
import com.Studyhub.studyhub.entity.User;
import com.Studyhub.studyhub.entity.Role;
import com.Studyhub.studyhub.entity.Status;
import com.Studyhub.studyhub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    // 1. Logic Đăng ký tài khoản
    public String register(UserRegisterRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email này đã được sử dụng!");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setPasswordHash(request.getPassword());

        try {
            user.setRole(Role.valueOf(request.getRole().toUpperCase()));
        } catch (Exception e) {
            user.setRole(Role.PARENT);
        }

        user.setStatus(Status.ACTIVE);

        userRepository.save(user);
        return "Đăng ký tài khoản thành công!";
    }

    // 2. Logic Đăng nhập
    public AuthResponse login(UserLoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email hoặc mật khẩu không chính xác!"));

        if (!user.getPasswordHash().equals(request.getPassword())) {
            throw new RuntimeException("Email hoặc mật khẩu không chính xác!");
        }

        // Sinh ra JWT Token
        String realToken = tokenProvider.generateToken(user.getEmail(), String.valueOf(user.getRole()));

        // Trả về AuthResponse kèm theo tutorProfileId
        // Lưu ý: Đảm bảo class AuthResponse đã có constructor nhận 4 tham số này
        return new AuthResponse(
                realToken,
                user.getFullName(),
                String.valueOf(user.getRole()),
                user.getTutorProfileId(),
                user.getId() // Đảm bảo trong User entity có getter này
        );
    }
}