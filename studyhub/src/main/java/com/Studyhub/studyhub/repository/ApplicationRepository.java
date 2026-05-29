package com.Studyhub.studyhub.repository;

import com.Studyhub.studyhub.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // 1. Kiểm tra trùng lặp: Trả về true/false cực nhanh từ DB
    boolean existsByTutorProfileIdAndParentRequestId(Long tutorProfileId, Long requestId);

    // 2. Lấy đơn theo gia sư
    List<Application> findByTutorProfileId(Long tutorProfileId);

    // 3. Lấy danh sách gia sư đã ứng tuyển vào 1 lớp (Kèm JOIN FETCH để tránh Lazy
    // Load lỗi)
    @Query("SELECT a FROM Application a JOIN FETCH a.tutorProfile WHERE a.parentRequest.id = :requestId")
    List<Application> findByParentRequestId(@Param("requestId") Long requestId);

    // 4. Lấy tất cả các đơn của các lớp thuộc về parent (Dùng JOIN FETCH để lấy
    // full thông tin)
    @Query("SELECT a FROM Application a " +
            "JOIN FETCH a.parentRequest r " +
            "JOIN FETCH a.tutorProfile t " +
            "WHERE r.parent.id = :parentId")
    List<Application> findByParentId(@Param("parentId") Long parentId);

    @Query("SELECT a FROM Application a " +
            "JOIN FETCH a.tutorProfile tp " +
            "JOIN FETCH tp.user u " +
            "JOIN FETCH a.parentRequest pr " +
            "WHERE a.tutorProfile.id = :tutorProfileId")
    List<Application> findByTutorProfileIdWithDetails(@Param("tutorProfileId") Long tutorProfileId);
}