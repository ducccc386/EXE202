package com.Studyhub.studyhub.dto.request;

import lombok.*;

@Data // Tự động sinh Getter, Setter, toString...
@NoArgsConstructor
@AllArgsConstructor
public class BookingCreateRequest {
    private String subject;
    private String grade;
    private Integer price;
    private Integer slotsPerWeek;
    private String teachingMode;
    private String description;

    // 🔥 ĐẢM BẢO 3 TRƯỜNG NÀY PHẢI CÓ MẶT VÀ ĐÚNG CHỮ CÁI HOA/THƯỜNG
    private String city;
    private String addressDetail;
    private String scheduleInfo;
}