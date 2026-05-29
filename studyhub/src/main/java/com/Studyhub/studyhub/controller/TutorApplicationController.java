package com.Studyhub.studyhub.controller;

import com.Studyhub.studyhub.dto.request.ApplicationRequest;
import com.Studyhub.studyhub.service.ApplicationService;
import com.Studyhub.studyhub.repository.TutorProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/api/tutor/applications")
public class TutorApplicationController {

    @Autowired
    private ApplicationService applicationService;
    @Autowired
    private TutorProfileRepository tutorRepository;

    @GetMapping("/my-applications")
    public ResponseEntity<?> getMyApplications(Principal principal) {
        try {
            String email = principal.getName();
            Long tutorProfileId = tutorRepository.findByUserEmail(email).getId();
            return ResponseEntity.ok(applicationService.getApplicationsByTutorDTO(tutorProfileId));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi: " + e.getMessage());
        }
    }

    @PostMapping("/apply")
    public ResponseEntity<String> apply(@RequestBody ApplicationRequest dto) {
        return ResponseEntity.ok(applicationService.applyForRequest(dto));
    }
}