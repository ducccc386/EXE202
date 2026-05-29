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
import org.springframework.stereotype.Service;

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

    public void createBooking(BookingCreateRequest request) {
        ParentRequest parentRequest = new ParentRequest();

        // 1. Gán Phụ huynh và Môn học mẫu (Lấy tạm ID = 1L để kiểm thử thông luồng kết
        // nối)
        User dummyParent = userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản Phụ huynh hợp lệ!"));
        parentRequest.setParent(dummyParent);

        Subject dummySubject = subjectRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy môn học hợp lệ!"));
        parentRequest.setSubject(dummySubject);

        // 2. Gán các thông tin cơ bản lấy từ DTO (Frontend gửi lên)
        parentRequest.setTitle("Tìm gia sư môn " + request.getSubject() + " " + request.getGrade());
        parentRequest.setGrade(request.getGrade());

        if (request.getPrice() != null) {
            parentRequest.setBudget(request.getPrice().doubleValue());
        }

        parentRequest.setSessionsPerWeek(request.getSlotsPerWeek());
        parentRequest.setDescription(request.getDescription());

        // Khớp kiểu dữ liệu Enum hình thức học (ONLINE / OFFLINE)
        try {
            parentRequest.setTeachingMode(
                    com.Studyhub.studyhub.entity.TeachingMode.valueOf(request.getTeachingMode().toUpperCase()));
        } catch (Exception e) {
            parentRequest.setTeachingMode(com.Studyhub.studyhub.entity.TeachingMode.ONLINE);
        }

        // 3. Gán các trường thông tin địa chỉ và lịch học động từ Frontend sang
        parentRequest.setCity(request.getCity());
        parentRequest.setAddressDetail(request.getAddressDetail());
        parentRequest.setScheduleInfo(request.getScheduleInfo());

        // 4. Khởi tạo các thông tin hệ thống (Khớp chính xác từng thuộc tính với Entity
        // của bạn)
        parentRequest.setCreatedAt(LocalDateTime.now());
        parentRequest.setStatus(com.Studyhub.studyhub.entity.Status.OPEN); // Gọi chuẩn Enum Status.OPEN
        System.out.println(">>> DỮ LIỆU TỪ POSTMAN GỬI LÊN: " + request.getCity() + " | " + request.getAddressDetail());
        // 5. Ghi dữ liệu xuống bảng Parent_Requests dưới MySQL
        parentRequestRepository.save(parentRequest);
    }

    public List<BookingResponse> getAllOpenRequests() {
        // Lấy tất cả bài đăng có trạng thái là OPEN từ database
        return parentRequestRepository.findAll().stream()
                .filter(request -> request.getStatus() == com.Studyhub.studyhub.entity.Status.OPEN)
                .map(request -> new BookingResponse(
                        request.getId(),
                        request.getParent() != null ? request.getParent().getFullName() : "Phụ huynh", // Giả định
                                                                                                       // Entity User có
                                                                                                       // hàm
                                                                                                       // getFullName()
                                                                                                       // hoặc getName()
                        request.getSubject() != null ? request.getSubject().getName() : "Chưa rõ", // Giả định Entity
                                                                                                   // Subject có hàm
                                                                                                   // getName()
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