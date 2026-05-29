import React from 'react';

const QuickActions = () => {
    return (
        <div className="w-full bg-blue-500 py-12 text-center text-white shadow-md">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
                Tìm gia sư phù hợp
            </h2>
            <div className="flex items-center justify-center gap-5">
                <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-extrabold px-8 py-3 rounded-full shadow-md transition-all text-sm transform hover:-translate-y-0.5">
                    Tìm gia sư
                </button>
                <button className="bg-indigo-900 hover:bg-indigo-950 text-white font-extrabold px-8 py-3 rounded-full shadow-md transition-all text-sm transform hover:-translate-y-0.5">
                    Trở thành gia sư
                </button>
            </div>
        </div>
    );
};

export default QuickActions;