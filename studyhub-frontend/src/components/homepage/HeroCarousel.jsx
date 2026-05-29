import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = () => {
    const slides = [
        {
            title: "StudyHub – Kết nối tri thức",
            description: "Kết nối tri thức, xây dựng niềm tin giữa phụ huynh và gia sư.",
            gradient: "from-blue-600 via-indigo-500 to-orange-500"
        },
        {
            title: "Tìm Gia Sư Chất Lượng Cao",
            description: "Hàng ngàn gia sư giỏi từ các trường Đại học danh tiếng sẵn sàng hỗ trợ.",
            gradient: "from-purple-600 via-pink-500 to-red-500"
        },
        {
            title: "Hệ Thống Xác Thực Đột Phá",
            description: "Tích hợp công nghệ eKYC đảm bảo hồ sơ gia sư minh bạch 100%.",
            gradient: "from-teal-600 via-emerald-500 to-blue-500"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 4000);
        return () => clearInterval(slideInterval);
    }, [currentSlide]);

    return (
        <div className={`relative w-full h-[360px] md:h-[420px] bg-gradient-to-r ${slides[currentSlide].gradient} flex items-center overflow-hidden shadow-inner transition-all duration-700 ease-in-out`}>

            <button onClick={prevSlide} className="absolute left-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all">
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button onClick={nextSlide} className="absolute right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all">
                <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-7xl mx-auto w-full px-8 md:px-12 text-white">
                <div className="max-w-2xl space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
                        {slides[currentSlide].title}
                    </h1>
                    <p className="text-lg text-white/90 font-medium drop-shadow-sm">
                        {slides[currentSlide].description}
                    </p>
                    <div className="flex items-center gap-4 pt-3">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-full shadow-md transition-all transform hover:scale-105 text-sm">
                            Tìm hiểu ngay
                        </button>
                        <button className="bg-white hover:bg-gray-50 text-indigo-600 font-bold px-6 py-2.5 rounded-full shadow-md transition-all transform hover:scale-105 text-sm">
                            Xem lớp học
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 left-8 flex items-center gap-2">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`cursor-pointer transition-all rounded-full ${index === currentSlide ? 'w-6 h-3 bg-white' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
                            }`}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;