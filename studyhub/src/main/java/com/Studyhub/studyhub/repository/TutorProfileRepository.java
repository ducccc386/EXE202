package com.Studyhub.studyhub.repository;

import com.Studyhub.studyhub.entity.TutorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TutorProfileRepository extends JpaRepository<TutorProfile, Long> {

    // Sử dụng JOIN FETCH để lôi cả User và danh sách Môn học lên ngay từ đầu
    @Query("SELECT DISTINCT tp FROM TutorProfile tp LEFT JOIN FETCH tp.user LEFT JOIN FETCH tp.subjects")
    List<TutorProfile> findAllWithUserAndSubjects();

    TutorProfile findByUserEmail(String email);
}