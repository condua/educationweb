import { useState, useRef } from "react";
import { FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

function getGreetingByVietnamTime() {
  const now = new Date();
  // Giờ Việt Nam = UTC+7
  const vietnamTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );
  const hour = vietnamTime.getHours();

  if (hour >= 5 && hour < 12) {
    return "Chào buổi sáng, tình yêu.";
  } else if (hour >= 12 && hour < 18) {
    return "Chào buổi chiều, tình yêu.";
  } else {
    return "Chào buổi tối, tình yêu.";
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        getGreetingByVietnamTime() +
        " Bạn đang quan tâm đến điều gì? Mình có thể giúp bạn tìm hiểu thêm.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContentRef = useRef(null);
  const { courses } = useSelector((state) => state.courses);

  const formatBotMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bôi đậm
      .replace(/\n/g, "<br/>") // xuống dòng
      .replace(
        /(https?:\/\/[^\s<)]+)/g,
        '<a href="$1" class="text-sky-400 underline" target="_blank" rel="noopener noreferrer">$1</a>'
      ) // link
      .replace(
        /([\w.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
        '<a href="mailto:$1" class="text-sky-400 underline">$1</a>'
      ) // email
      .replace(
        /(\b\d{9,11}\b)/g,
        '<a href="tel:$1" class="text-sky-400 underline">$1</a>'
      ); // số điện thoại
  };
  const today = new Date();
  const vietnamTime = today.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  const handleSend = async () => {
    const userText = inputValue.trim();
    if (!userText) return;

    // Hiển thị tin nhắn người dùng
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://mlpa.edu.vn",
          // Thay thế bằng tên website/dự án của bạn
          "X-Title": "MLPA Chatbot",
        },

        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          stream: false, // <-- Thêm dòng này vào đây

          messages: [
            { role: "system", content: "Bạn là một trợ lý ảo thân thiện." },
            {
              role: "user",
              content: `Bạn là một trợ lý ảo của công ty Giáo dục và Công nghệ MLPA. Dưới đây là một số thông tin bạn cần nhớ để trả lời người dùng:
                    - MLPA được thành lập vào tháng 3 năm 2025 bởi Phan Hoàng Phúc, cựu sinh viên trường Đại học Bách Khoa Thành phố Hồ Chí Minh
                    - MLPA là nền tảng giáo dục kết hợp công nghệ AI, cung cấp khóa học kỹ năng, đánh giá năng lực vào các trường đại học hàng đầu Việt Nam như Đại học Bách Khoa Thành phố Hồ Chí Minh, 
                    Đại học Khoa học tự nhiên, Đại học Công nghệ thông tin, Đại học Khoa học xã hội và nhân văn, ngoại ngữ, marketing, tư duy và lập trình. 
                    - MLPA giảng dạy đánh giá năng lực Đại học Quốc gia thành phố Hồ Chí Minh với các nội dung sau:
                    Toán học:

                      Các dạng bài tập về logic, đại số, hình học và xác suất thống kê để kiểm tra tư duy logic và khả năng giải quyết vấn đề.

                      Bài tập có thể không chỉ tập trung vào các công thức quen thuộc mà còn yêu cầu thí sinh vận dụng toán học vào việc phân tích các tình huống thực tế.

                      Ngôn ngữ và kỹ năng đọc hiểu (thường là Tiếng Việt hoặc Tiếng Anh):

                      Phân tích, đánh giá và trích dẫn thông tin từ các văn bản, bài báo, tài liệu học thuật.

                      Kiểm tra khả năng biểu đạt ý tưởng một cách mạch lạc, nhất quán và thuyết phục thông qua các bài viết tự luận.

                      Kiến thức xã hội – nhân văn và khoa học tự nhiên:

                      Xã hội – nhân văn: Kiến thức nền tảng về lịch sử, văn hoá, triết học và các hiện tượng xã hội, nhằm đánh giá khả năng liên hệ giữa lý thuyết và thực tiễn.

                      Khoa học tự nhiên: Các nguyên lý cơ bản, phương pháp khoa học và khả năng phân tích các vấn đề liên quan đến vật lý, hóa học hoặc sinh học, tuỳ thuộc vào hướng đào tạo của thí sinh.
                    - MLPA đem lại các giải pháp về công nghệ như: Tư vấn xây dựng và thiết kế website, hỗ trợ marketing, quảng bá sản phẩm, hỗ trợ website SEO, tối ưu tên miền...
                    - Trụ sở tại Ấp Long Thái, xã Long Khánh B, huyện Hồng Ngự, tỉnh Đồng Tháp
                    - Đăng ký học qua website https://mlpa.site hoặc hotline 0399915548
                    - Có khóa học online và nền tảng học trực tuyến.
                    - Luôn tìm kiếm nhân sự tâm huyết, CV gửi qua phanhoangphuc0311@gmail.com
                    - Fanpage của MLPA: https://www.facebook.com/profile.php?id=61574532009854
                    - Fanpage Facebook cá nhân: https://www.facebook.com/phuc.phanhoang.1694
                    
                    Khi người dùng hỏi những gì liên quan tới MLPA, hãy ưu tiên trả lời dựa trên những thông tin trên.
                
                    Đối với các câu hỏi khác không thuộc phạm vi MLPA, hãy tự động tìm kiếm và tổng hợp thông tin mới nhất từ search engine để trả lời chính xác và cập nhật cho người dùng.
                    
                    Thông tin các khóa học của MLPA: ${courses.map((item) => {
                      return `Tên khóa học: ${item.title}, Mô tả: ${item.description}, Giá: ${item.price}, Phân loại khóa học: ${item.category}, Giảng viên: ${item?.mentor?.name}, Link đăng ký: https://mlpa.site/course/${item._id}`;
                    })}

                    Hôm nay là ${vietnamTime}
                    `,
            },
            { role: "user", content: userText },
          ],
        }),
      });

      // ---- ĐOẠN MÃ GỠ RỐI ----
      // Kiểm tra xem phản hồi có thành công không (status code 200-299)
      if (!res.ok) {
        // Nếu không, đọc nội dung lỗi dưới dạng text và báo lỗi
        const errorText = await res.text();
        console.error("API Error Response:", errorText);
        throw new Error(
          `API call failed with status ${res.status}: ${errorText}`
        );
      }
      // ---- KẾT THÚC ĐOẠN MÃ GỠ RỐI ----
      console.log("API Response Status:", res);
      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content || "Xin lỗi, không có phản hồi.";
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      // Lỗi sẽ được log chi tiết hơn ở đây
      console.error("Lỗi trong hàm handleSend:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Xin lỗi, có lỗi xảy ra khi kết nối tới AI." },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        if (chatContentRef.current) {
          chatContentRef.current.scrollTop =
            chatContentRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* Nút mở chatbot */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-sky-500 hover:bg-sky-600 text-white text-2xl w-14 h-14 rounded-full shadow-lg z-[1000] flex items-center justify-center"
      >
        <FaRobot />
      </button>

      {/* Khung Chatbot */}
      {isOpen && (
        <div className="fixed bottom-[100px] right-6 w-80 bg-neutral-900 text-white rounded-xl shadow-2xl z-[999] flex flex-col animate-slideUp">
          {/* Header */}
          <div className="bg-sky-500 px-4 py-3 font-bold flex justify-between items-center rounded-t-xl">
            🤖 Chatbot AI
            <FaTimes
              className="cursor-pointer text-lg"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Nội dung chat */}
          <div
            ref={chatContentRef}
            className="p-4 max-h-72 overflow-y-auto overflow-x-auto scrollbar-hide space-y-2 text-sm"
          >
            {messages.map((msg, idx) =>
              msg.sender === "bot" ? (
                <div
                  key={idx}
                  className="text-white"
                  dangerouslySetInnerHTML={{
                    __html: `<strong>MLPA Bot:</strong> ${formatBotMessage(
                      msg.text
                    )}`,
                  }}
                />
              ) : (
                <p key={idx}>
                  <strong>Bạn:</strong> {msg.text}
                </p>
              )
            )}

            {isLoading && (
              <p>
                <em>Đang trả lời...</em>
              </p>
            )}
          </div>

          {/* Input */}
          <div className="flex border-t border-neutral-700">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Nhập câu hỏi..."
              className="flex-1 px-4 py-2 bg-neutral-800 text-white border-none focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
