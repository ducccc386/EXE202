package com.Studyhub.studyhub.repository;

import com.Studyhub.studyhub.entity.TutorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

@Repository
public interface TutorProfileRepository extends JpaRepository<TutorProfile, Long> {

    // Sử dụng JOIN FETCH để lôi cả User và danh sách Môn học lên ngay từ đầu
    @Query("SELECT DISTINCT tp FROM TutorProfile tp LEFT JOIN FETCH tp.user LEFT JOIN FETCH tp.subjects")
    List<TutorProfile> findAllWithUserAndSubjects();

    @Query("SELECT DISTINCT tp FROM TutorProfile tp LEFT JOIN FETCH tp.user LEFT JOIN FETCH tp.subjects LEFT JOIN FETCH tp.certificates WHERE tp.id = :id")
    Optional<TutorProfile> findByIdWithDetails(@Param("id") Long id);

    TutorProfile findByUserEmail(String email);

    Optional<TutorProfile> findByUserId(Long userId);
}