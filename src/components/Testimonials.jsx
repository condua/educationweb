import React from "react";

const Testimonials = () => {
  const testimonialsData = [
    {
      name: "Nguyễn Văn A",
      content:
        "Khóa học tuyệt vời, tôi đã tiết kiệm rất nhiều thời gian và chi phí. Giáo viên hỗ trợ tận tình.",
      role: "Học viên luyện thi đánh giá năng lực",
    },
    {
      name: "Nguyễn Thị B",
      content:
        "Giao diện thân thiện, tính năng phong phú. Rất đáng để đăng ký.",
      role: "Học viên luyện đánh giá năng lực",
    },
  ];

  return (
    <section id="testimonials" className="bg-teal-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Khách hàng nói gì?
          </h2>
          <p className="text-gray-600 mt-2">
            Một vài chia sẻ từ khách hàng đã sử dụng dịch vụ
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((testi, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded shadow hover:shadow-md transition-shadow"
            >
              <p className="text-gray-700 italic mb-4">"{testi.content}"</p>
              <div className="text-right">
                <h4 className="text-teal-600 font-semibold">{testi.name}</h4>
                <span className="text-sm text-gray-500">{testi.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
