package com.Studyhub.studyhub.controller;

import com.Studyhub.studyhub.dto.request.BookingCreateRequest;
import com.Studyhub.studyhub.dto.response.BookingResponse;
import com.Studyhub.studyhub.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*") // Đảm bảo mở cổng nhận kết nối trực tiếp từ Frontend
public class BookingController {

    @Autowired
    private BookingService bookingService;

    /**
     * 1. API Đăng tin tìm gia sư
     * URL: POST http://localhost:8080/api/requests/create
     * Quyền hạn: ROLE_PARENT (Yêu cầu Token JWT)
     */
    @PostMapping("/create")
    public ResponseEntity<String> createBooking(@RequestBody BookingCreateRequest request) {
        try {
            System.out.println(">>> ĐÃ VÀO ĐẾN CONTROLLER, DỮ LIỆU: " + request.toString()); // Log tại đây
            bookingService.createBooking(request);
            return ResponseEntity.ok("Thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Có lỗi xảy ra: " + e.getMessage());
        }
    }

    /**
     * 2. API Lấy danh sách bài đăng công khai hiển thị lên trang chủ
     * URL: GET http://localhost:8080/api/requests/homepage
     * Quyền hạn: Mở tự do hoàn toàn (PermitAll / Anonymous)
     */
    @GetMapping("/homepage")
    public ResponseEntity<List<BookingResponse>> getHomepageRequests() {
        try {
            List<BookingResponse> list = bookingService.getAllOpenRequests();
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}