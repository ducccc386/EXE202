package com.Studyhub.studyhub.service;

import com.Studyhub.studyhub.dto.response.TutorCardResponse;
import com.Studyhub.studyhub.dto.response.TutorResponse;
import com.Studyhub.studyhub.entity.Subject;
import com.Studyhub.studyhub.entity.TutorCertificate;
import com.Studyhub.studyhub.entity.TutorProfile;
import com.Studyhub.studyhub.repository.TutorProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TutorService {

    @Autowired
    private TutorProfileRepository tutorProfileRepository;

    public List<TutorCardResponse> getTutorsForHomepage() {
        // Gọi hàm đã tối ưu hóa JOIN FETCH để lấy trọn gói dữ liệu
        List<TutorProfile> profiles = tutorProfileRepository.findAllWithUserAndSubjects();

        return profiles.stream().map(profile -> {
            TutorCardResponse response = new TutorCardResponse();
            response.setTutorProfileId(profile.getId());

            if (profile.getUser() != null) {
                response.setFullName(profile.getUser().getFullName());
                response.setAvatarUrl(profile.getUser().getAvatarUrl());
            }

            response.setEducation(profile.getEducation());
            response.setExperienceYears(profile.getExperienceYears() != null ? profile.getExperienceYears() : 0);
            response.setHourlyRate(profile.getHourlyRate());
            response.setCity(profile.getCity());
            response.setTeachingMode(profile.getTeachingMode());
            response.setAverageRating(profile.getAverageRating() != null ? profile.getAverageRating() : 0.0);
            response.setTotalReviews(profile.getTotalReviews() != null ? profile.getTotalReviews() : 0);

            if (profile.getSubjects() != null) {
                Set<String> subjectNames = profile.getSubjects().stream()
                        .map(Subject::getName)
                        .collect(Collectors.toSet());
                response.setSubjects(subjectNames);
            } else {
                response.setSubjects(Collections.emptySet());
            }

            return response;
        }).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TutorResponse getTutorById(Long tutorId) {
        TutorProfile profile = tutorProfileRepository.findByIdWithDetails(tutorId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy gia sư"));

        TutorResponse res = new TutorResponse();

        // 1. Map các trường cơ bản (tương tự như cách bạn làm với TutorCardResponse)
        res.setTutorProfileId(profile.getId());
        res.setFullName(profile.getUser().getFullName());
        res.setAvatarUrl(profile.getUser().getAvatarUrl());
        res.setBio(profile.getBio());
        res.setTeachingMethod(profile.getTeachingMethod());
        res.setHourlyRate(profile.getHourlyRate());
        res.setVerified(profile.getVerified());

        // 2. Map chứng chỉ (từ bảng TutorCertificate bạn mới tạo)
        if (profile.getCertificates() != null) {
            res.setCertificateNames(profile.getCertificates().stream()
                    .map(TutorCertificate::getCertificateName)
                    .collect(Collectors.toSet()));
        }

        return res;
    }
}