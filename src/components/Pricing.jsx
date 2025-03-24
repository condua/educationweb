import React from "react";

const Pricing = () => {
  const pricingPlans = [
    {
      title: "Gói Cơ Bản",
      price: "Miễn phí",
      features: ["Tính năng A", "Tính năng B", "Hỗ trợ cơ bản"],
    },
    {
      title: "Gói Nâng Cao",
      price: "299k / tháng",
      features: ["Tất cả trong gói Cơ Bản", "Tính năng C", "Hỗ trợ 24/7"],
    },
    {
      title: "Gói Chuyên Nghiệp",
      price: "499k / tháng",
      features: ["Tất cả trong gói Nâng Cao", "Tính năng D", "Bảo mật cao"],
    },
  ];

  return (
    <section id="pricing" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Bảng giá</h2>
          <p className="text-gray-600 mt-2">
            Lựa chọn gói phù hợp với nhu cầu của bạn
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="p-6 border rounded text-center hover:shadow-md transition-shadow"
            >
              <h3 className="text-2xl font-semibold mb-4 text-teal-600">
                {plan.title}
              </h3>
              <p className="text-3xl font-bold mb-4 text-gray-800">
                {plan.price}
              </p>
              <ul className="mb-6 text-gray-600">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="mb-2">
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
                Chọn gói
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
