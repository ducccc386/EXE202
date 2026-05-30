package com.Studyhub.studyhub.service;

import com.Studyhub.studyhub.dto.request.BookingCreateRequest;
import com.Studyhub.studyhub.dto.response.BookingResponse;
import com.Studyhub.studyhub.entity.ParentRequest;
import com.Studyhub.studyhub.entity.Subject;
import com.Studyhub.studyhub.entity.User;
import com.Studyhub.studyhub.repository.ParentRequestRepository;
import com.Studyhub.studyhub.repository.SubjectRepository;
import com.Studyhub.studyhub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private ParentRequestRepository parentRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Transactional
    public void createBooking(BookingCreateRequest request) {
        // 1. Lấy email từ token của người đang đăng nhập
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        // 2. Tìm User trong DB
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản: " + email));

        // LOG DEBUG: Kiểm tra xem ID có đúng là 3 không
        System.out.println(
                ">>> Đang tạo bài đăng cho User: " + currentUser.getFullName() + " | ID: " + currentUser.getId());

        ParentRequest parentRequest = new ParentRequest();

        // 3. GÁN ĐÚNG USER ĐANG LOGIN
        parentRequest.setParent(currentUser);

        // 4. Gán Môn học
        Subject subject = subjectRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy môn học hợp lệ!"));
        parentRequest.setSubject(subject);

        // 5. Gán thông tin từ DTO
        parentRequest.setTitle("Tìm gia sư môn " + request.getSubject() + " " + request.getGrade());
        parentRequest.setGrade(request.getGrade());
        parentRequest.setBudget(request.getPrice() != null ? request.getPrice().doubleValue() : 0.0);
        parentRequest.setSessionsPerWeek(request.getSlotsPerWeek());
        parentRequest.setDescription(request.getDescription());

        // Hình thức học
        try {
            parentRequest.setTeachingMode(
                    com.Studyhub.studyhub.entity.TeachingMode.valueOf(request.getTeachingMode().toUpperCase()));
        } catch (Exception e) {
            parentRequest.setTeachingMode(com.Studyhub.studyhub.entity.TeachingMode.ONLINE);
        }

        // Địa chỉ và Lịch
        parentRequest.setCity(request.getCity());
        parentRequest.setAddressDetail(request.getAddressDetail());
        parentRequest.setScheduleInfo(request.getScheduleInfo());

        // Thông tin hệ thống
        parentRequest.setCreatedAt(LocalDateTime.now());
        parentRequest.setStatus(com.Studyhub.studyhub.entity.Status.OPEN);

        // 6. LƯU
        parentRequestRepository.save(parentRequest);
        // Ép cứng bằng tay trước khi lưu để kiểm chứng
        System.out.println(">>> TRƯỚC KHI SAVE: " + parentRequest.getParent().getId());
        parentRequestRepository.saveAndFlush(parentRequest); // Dùng saveAndFlush để đẩy ngay xuống DB
    }

    public List<BookingResponse> getAllOpenRequests() {
        return parentRequestRepository.findAll().stream()
                .filter(request -> request.getStatus() == com.Studyhub.studyhub.entity.Status.OPEN)
                .map(request -> new BookingResponse(
                        request.getId(),
                        request.getParent() != null ? request.getParent().getFullName() : "Phụ huynh",
                        request.getSubject() != null ? request.getSubject().getName() : "Chưa rõ",
                        request.getTitle(),
                        request.getDescription(),
                        request.getGrade(),
                        request.getBudget(),
                        request.getCity(),
                        request.getAddressDetail(),
                        request.getTeachingMode() != null ? request.getTeachingMode().name() : "ONLINE",
                        request.getSessionsPerWeek(),
                        request.getScheduleInfo(),
                        request.getCreatedAt()))
                .collect(Collectors.toList());
    }
}