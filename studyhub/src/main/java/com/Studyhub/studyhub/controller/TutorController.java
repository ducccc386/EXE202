package com.Studyhub.studyhub.controller;

import com.Studyhub.studyhub.dto.response.TutorCardResponse;
import com.Studyhub.studyhub.dto.response.TutorResponse;
import com.Studyhub.studyhub.service.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tutors")
@CrossOrigin(origins = "*")
public class TutorController {

    @Autowired
    private TutorService tutorService;

    @GetMapping("/homepage")
    public ResponseEntity<List<TutorCardResponse>> getTutorsForHomepage() {
        List<TutorCardResponse> tutors = tutorService.getTutorsForHomepage();
        return ResponseEntity.ok(tutors);
    }

    @GetMapping("/{tutorId}")
    public ResponseEntity<TutorResponse> getTutorById(@PathVariable Long tutorId) {
        return ResponseEntity.ok(tutorService.getTutorById(tutorId));
    }
}