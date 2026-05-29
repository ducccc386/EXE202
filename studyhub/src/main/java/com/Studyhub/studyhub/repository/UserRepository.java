package com.Studyhub.studyhub.repository;

import com.Studyhub.studyhub.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Hàm tìm kiếm user bằng email, dùng để check khi Đăng nhập hoặc Đăng ký
    Optional<User> findByEmail(String email);
}