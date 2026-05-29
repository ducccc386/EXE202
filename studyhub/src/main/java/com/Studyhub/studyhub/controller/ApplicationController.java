package com.Studyhub.studyhub.controller;

import com.Studyhub.studyhub.entity.Application;
import com.Studyhub.studyhub.dto.response.ApplicationResponse;
import com.Studyhub.studyhub.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // --- CÁC TÍNH NĂNG CŨ CỦA PHỤ HUYNH (GIỮ NGUYÊN) ---

    @GetMapping("/parent/{parentId}")
    public ResponseEntity<List<Application>> getByParent(@PathVariable Long parentId) {
        return ResponseEntity.ok(applicationService.getApplicationsByParent(parentId));
    }

    @GetMapping("/request/{requestId}")
    public ResponseEntity<List<Application>> getApplicationsByRequest(@PathVariable Long requestId) {
        return ResponseEntity.ok(applicationService.getApplicationsByRequest(requestId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(@PathVariable Long id, @RequestParam String status) {
        applicationService.updateApplicationStatus(id, status);
        return ResponseEntity.ok("Trạng thái đơn đã được cập nhật thành công.");
    }

    @GetMapping("/parent/{parentId}/dto")
    public ResponseEntity<List<ApplicationResponse>> getByParentDTO(@PathVariable Long parentId) {
        return ResponseEntity.ok(applicationService.getApplicationsByParentDTO(parentId));
    }
}