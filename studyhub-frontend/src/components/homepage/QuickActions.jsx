import React, { useState } from 'react';

const EXPERIENCE_OPTIONS = [
    { value: '0-1', label: 'Dưới 1 năm' },
    { value: '1-3', label: '1 - 3 năm' },
    { value: '3-5', label: '3 - 5 năm' },
    { value: '5+', label: 'Trên 5 năm' },
];

const PRICE_OPTIONS = [
    { value: '<100', label: 'Dưới 100k/h' },
    { value: '100-200', label: '100 – 200k/h' },
    { value: '200-300', label: '200 – 300k/h' },
    { value: '300+', label: 'Trên 300k/h' },
];

const QuickActions = ({ onFindTutor }) => {
    const [expFilters, setExpFilters] = useState([]);
    const [priceFilters, setPriceFilters] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    const toggle = (list, setList, value) => {
        setList(prev =>
            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
    };

    const handleFind = () => {
        if (onFindTutor) {
            onFindTutor({ experience: expFilters, price: priceFilters });
        }
    };

    const activeCount = expFilters.length + priceFilters.length;

    return (
        <div className="w-full bg-blue-500 py-12 text-center text-white shadow-md">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                Tìm gia sư phù hợp
            </h2>

            {/* Nút chính */}
            <div className="flex items-center justify-center gap-5 mb-6">
                <button
                    onClick={() => setShowFilter(prev => !prev)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-extrabold px-8 py-3 rounded-full shadow-md transition-all text-sm transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                    Tìm gia sư
                    {activeCount > 0 && (
                        <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {activeCount}
                        </span>
                    )}
                    <svg
                        className={`w-4 h-4 transition-transform duration-200 ${showFilter ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <button className="bg-indigo-900 hover:bg-indigo-950 text-white font-extrabold px-8 py-3 rounded-full shadow-md transition-all text-sm transform hover:-translate-y-0.5">
                    Trở thành gia sư
                </button>
            </div>

            {/* Panel lọc */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${showFilter ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="max-w-2xl mx-auto bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-5 text-left space-y-5">

                    {/* Kinh nghiệm */}
                    <div>
                        <p className="text-sm font-bold text-white/90 mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Số năm kinh nghiệm
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {EXPERIENCE_OPTIONS.map(opt => {
                                const active = expFilters.includes(opt.value);
                                return (
                                    <button
                                        key={opt.value}
                                        onClick={() => toggle(expFilters, setExpFilters, opt.value)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${active
                                                ? 'bg-white text-blue-700 border-white'
                                                : 'bg-transparent text-white border-white/60 hover:border-white'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Học phí */}
                    <div>
                        <p className="text-sm font-bold text-white/90 mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Học phí (k/h)
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {PRICE_OPTIONS.map(opt => {
                                const active = priceFilters.includes(opt.value);
                                return (
                                    <button
                                        key={opt.value}
                                        onClick={() => toggle(priceFilters, setPriceFilters, opt.value)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${active
                                                ? 'bg-white text-blue-700 border-white'
                                                : 'bg-transparent text-white border-white/60 hover:border-white'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Nút tìm kiếm */}
                    <div className="flex items-center justify-between pt-1">
                        {activeCount > 0 && (
                            <button
                                onClick={() => { setExpFilters([]); setPriceFilters([]); }}
                                className="text-xs text-white/70 underline hover:text-white transition-colors"
                            >
                                Xóa bộ lọc
                            </button>
                        )}
                        <button
                            onClick={handleFind}
                            className="ml-auto bg-indigo-900 hover:bg-indigo-950 text-white font-extrabold px-8 py-2.5 rounded-full shadow-md transition-all text-sm flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Tìm ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickActions;