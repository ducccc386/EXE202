package com.Studyhub.studyhub.service;

import com.Studyhub.studyhub.dto.request.ApplicationRequest; // Import cụ thể thay vì dấu *
import com.Studyhub.studyhub.entity.*;
import com.Studyhub.studyhub.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.Studyhub.studyhub.dto.response.ApplicationResponse;
import java.util.stream.Collectors;
import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository appRepository;

    @Autowired
    private TutorProfileRepository tutorRepository;

    @Autowired
    private ParentRequestRepository requestRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @Transactional
    public String applyForRequest(ApplicationRequest dto) {
        // 1. Kiểm tra sự tồn tại (Dùng orElseThrow để có thông báo lỗi rõ ràng)
        System.out
                .println("DEBUG: DTO nhận được - TutorId: " + dto.getTutorId() + ", RequestId: " + dto.getRequestId());
        TutorProfile tutor = tutorRepository.findById(dto.getTutorId())
                .orElseThrow(() -> new RuntimeException("Gia sư không tồn tại trong hệ thống."));

        ParentRequest request = requestRepository.findById(dto.getRequestId())
                .orElseThrow(() -> new RuntimeException("Lớp học không tồn tại."));

        // 2. KIỂM TRA TRẠNG THÁI: Chỉ ứng tuyển khi lớp đang OPEN
        if (request.getStatus() != Status.OPEN) {
            throw new RuntimeException("Rất tiếc, lớp học này đã đóng hoặc không còn khả dụng.");
        }

        // 3. KIỂM TRA QUYỀN: Gia sư đã được xác thực (Verified) mới được nhận lớp
        if (!Boolean.TRUE.equals(tutor.getVerified())) {
            throw new RuntimeException("Tài khoản gia sư chưa được xác thực, không thể nhận lớp.");
        }

        // 4. KIỂM TRA TRÙNG LẶP: Giữ logic cũ của bạn
        boolean alreadyApplied = appRepository.findByTutorProfileId(dto.getTutorId()).stream()
                .anyMatch(a -> a.getParentRequest().getId().equals(dto.getRequestId()));

        if (alreadyApplied) {
            throw new RuntimeException("Bạn đã gửi đơn ứng tuyển cho lớp này rồi!");
        }

        // 5. Lưu đơn ứng tuyển
        Application app = Application.builder()
                .tutorProfile(tutor)
                .parentRequest(request)
                .message(dto.getMessage())
                .status(ApplicationStatus.PENDING)
                .build();

        appRepository.save(app);
        return "Ứng tuyển thành công! Phụ huynh sẽ sớm liên hệ với bạn.";
    }

    public List<Application> getApplicationsByParent(Long parentId) {
        return appRepository.findByParentId(parentId);
    }

    public List<Application> getApplicationsByRequest(Long requestId) {
        return appRepository.findByParentRequestId(requestId);
    }

    @Transactional
    public void updateApplicationStatus(Long applicationId, String status) {
        Application app = appRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn."));

        ApplicationStatus newStatus = ApplicationStatus.valueOf(status.toUpperCase());
        app.setStatus(newStatus);

        // Logic duyệt đơn: Đóng lớp và Mở Chat
        if (newStatus == ApplicationStatus.ACCEPTED) {
            ParentRequest request = app.getParentRequest();
            request.setStatus(Status.CLOSED); // Đóng lớp
            requestRepository.save(request);

            // Tự động tạo conversation để chat
            if (conversationRepository.findByApplicationId(app.getId()).isEmpty()) {
                Conversation conversation = Conversation.builder()
                        .application(app)
                        .tutor(app.getTutorProfile())
                        .parent(app.getParentRequest().getParent())
                        .build();
                conversationRepository.save(conversation);
            }
        }
        appRepository.save(app);
    }

    // --- HÀM MỚI (TRẢ VỀ DTO 'ApplicationResponse') ---

    public List<ApplicationResponse> getApplicationsByParentDTO(Long parentId) {
        return appRepository.findByParentId(parentId).stream()
                .map(app -> ApplicationResponse.builder()
                        .id(app.getId())
                        .status(app.getStatus().name())
                        .message(app.getMessage())
                        .tutorName(app.getTutorProfile().getUser().getFullName())
                        .requestTitle(app.getParentRequest().getTitle())
                        .build())
                .collect(Collectors.toList());
    }

    // Trong ApplicationService.java
    public List<Application> getApplicationsByTutor(Long tutorId) {
        return appRepository.findByTutorProfileId(tutorId);
    }

    // --- HÀM NÀY ĐÃ ĐƯỢC FIX LỖI NULL POINTER ---
    public List<ApplicationResponse> getApplicationsByTutorDTO(Long tutorProfileId) {
        // Gọi hàm mới có Join Fetch
        return appRepository.findByTutorProfileIdWithDetails(tutorProfileId).stream()
                .map(app -> {
                    return ApplicationResponse.builder()
                            .id(app.getId())
                            .status(app.getStatus() != null ? app.getStatus().name() : "PENDING")
                            .message(app.getMessage())
                            .tutorName(app.getTutorProfile().getUser().getFullName()) // Bây giờ nó đã được tải sẵn!
                            .requestTitle(app.getParentRequest().getTitle())
                            .build();
                })
                .collect(Collectors.toList());
    }

}