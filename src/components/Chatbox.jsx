import { useState, useRef, useEffect } from "react";
import {
  FaPaperPlane,
  FaRobot,
  FaTimes,
  FaMinus,
  FaUser,
  FaEyeSlash,
} from "react-icons/fa";
import { useSelector } from "react-redux";

// --- Helper Functions giữ nguyên ---
function getGreetingByVietnamTime() {
  const now = new Date();
  const vietnamTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
  );
  const hour = vietnamTime.getHours();

  if (hour >= 5 && hour < 12) return "Chào buổi sáng!";
  if (hour >= 12 && hour < 18) return "Chào buổi chiều!";
  return "Chào buổi tối!";
}

const formatBotMessage = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>")
    .replace(
      /(https?:\/\/[^\s<)]+)/g,
      '<a href="$1" class="text-sky-400 underline hover:text-sky-300" target="_blank" rel="noopener noreferrer">$1</a>',
    )
    .replace(
      /([\w.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
      '<a href="mailto:$1" class="text-sky-400 underline hover:text-sky-300">$1</a>',
    )
    .replace(
      /(\b\d{9,11}\b)/g,
      '<a href="tel:$1" class="text-sky-400 underline hover:text-sky-300">$1</a>',
    );
};

export default function Chatbot() {
  // --- STATE QUẢN LÝ HIỂN THỊ ---

  // 1. Kiểm tra localStorage xem người dùng đã ẩn vĩnh viễn chưa
  const [isVisible, setIsVisible] = useState(() => {
    const savedState = localStorage.getItem("mlpa_chatbot_hidden");
    return savedState !== "true";
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);

  // --- STATE DỮ LIỆU ---
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `${getGreetingByVietnamTime()} Mình là trợ lý ảo MLPA. Bạn cần hỗ trợ thông tin gì về khóa học hay công ty không?`,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const chatContentRef = useRef(null);
  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTo({
        top: chatContentRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading, isOpen]);

  // Hàm mở/đóng chat
  const handleToggle = () => {
    if (isOpen) {
      setIsMinimizing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsMinimizing(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  // Hàm ẨN VĨNH VIỄN (Tính năng mới)
  const handleHideForever = (e) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
    const confirmHide = window.confirm(
      "Bạn có chắc muốn ẩn Chatbot? Bạn sẽ không thấy nó lại cho đến khi xóa dữ liệu duyệt web.",
    );
    if (confirmHide) {
      setIsVisible(false);
      setIsOpen(false);
      localStorage.setItem("mlpa_chatbot_hidden", "true");
    }
  };

  // Hàm khôi phục (nếu cần test) - Reset localStorage
  const handleRestore = () => {
    setIsVisible(true);
    localStorage.removeItem("mlpa_chatbot_hidden");
  };

  const handleSend = async () => {
    const userText = inputValue.trim();
    if (!userText) return;

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const today = new Date();
      const vietnamTimeStr = today.toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
      });

      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://mlpa.edu.vn",
          "X-Title": "MLPA Chatbot",
        },
        body: JSON.stringify({
          model: "tngtech/deepseek-r1t2-chimera:free",
          stream: false,
          messages: [
            {
              role: "system",
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
                    - Đăng ký học qua website https://mlpa.edu.vn hoặc hotline 0399915548
                    - Có khóa học online và nền tảng học trực tuyến.
                    - Luôn tìm kiếm nhân sự tâm huyết, CV gửi qua phanhoangphuc0311@gmail.com
                    - Fanpage của MLPA: https://www.facebook.com/profile.php?id=61574532009854
                    - Fanpage Facebook cá nhân: https://www.facebook.com/phuc.phanhoang.1694
                    
                    Khi người dùng hỏi những gì liên quan tới MLPA, hãy ưu tiên trả lời dựa trên những thông tin trên.
                
                    Đối với các câu hỏi khác không thuộc phạm vi MLPA, hãy tự động tìm kiếm và tổng hợp thông tin mới nhất từ search engine để trả lời chính xác và cập nhật cho người dùng.
                    
                    Thông tin các khóa học của MLPA: ${courses.map((item) => {
                      return `Tên khóa học: ${item.title}, Mô tả: ${item.description}, Giá: ${item.price}, Phân loại khóa học: ${item.category}, Giảng viên: ${item?.mentor?.name}, Link đăng ký: https://mlpa.site/course/${item._id}`;
                    })}

                    Hôm nay là ${vietnamTimeStr}
                    `,
            },
            ...messages.map((m) => ({
              role: m.sender === "bot" ? "assistant" : "user",
              content: m.text,
            })),
            { role: "user", content: userText },
          ],
        }),
      });

      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content ||
        "Xin lỗi, mình đang gặp chút trục trặc.";
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Lỗi kết nối." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // Nếu người dùng đã ẩn vĩnh viễn, render ra một nút nhỏ xíu hoặc null
  if (!isVisible) {
    return (
      <div
        onClick={handleRestore}
        className="fixed bottom-2 right-2 text-[10px] text-gray-400 hover:text-gray-600 cursor-pointer z-10 opacity-50 hover:opacity-100 transition"
        title="Nhấn để hiện lại Chatbot"
      >
        Khôi phục hỗ trợ
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      {/* --- CỬA SỔ CHAT --- */}
      <div
        className={`
          w-[320px] h-[450px] sm:w-[360px] sm:h-[500px] bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right
          ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10 pointer-events-none absolute bottom-0 right-0"}
        `}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-4 flex justify-between items-center shadow-md shrink-0">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-white/20 p-1.5 rounded-full">
              <FaRobot className="text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-sm">MLPA Support</h3>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] opacity-90">Trực tuyến</span>
              </div>
            </div>
          </div>

          {/* Cụm nút điều khiển Header */}
          <div className="flex items-center gap-3 text-white/80">
            {/* Nút Ẩn vĩnh viễn */}
            <button
              onClick={handleHideForever}
              className="hover:text-red-300 transition group relative"
              title="Tắt và không hiện lại"
            >
              <FaEyeSlash size={14} />
            </button>

            {/* Nút Thu nhỏ */}
            <button
              onClick={handleToggle}
              className="hover:text-white transition"
              title="Thu nhỏ"
            >
              <FaMinus size={14} />
            </button>
          </div>
        </div>

        {/* Nội dung chat (Giữ nguyên) */}
        <div
          ref={chatContentRef}
          className="flex-1 p-4 overflow-y-auto bg-neutral-800/50 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-transparent"
        >
          {messages.map((msg, idx) => {
            const isBot = msg.sender === "bot";
            return (
              <div
                key={idx}
                className={`flex w-full ${isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`flex max-w-[85%] gap-2 ${isBot ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isBot ? "bg-sky-600" : "bg-neutral-600"}`}
                  >
                    {isBot ? (
                      <FaRobot className="text-white text-xs" />
                    ) : (
                      <FaUser className="text-white text-xs" />
                    )}
                  </div>
                  <div
                    className={`p-3 text-sm leading-relaxed shadow-sm break-words ${isBot ? "bg-neutral-700 text-gray-100 rounded-2xl rounded-tl-none" : "bg-sky-600 text-white rounded-2xl rounded-tr-none"}`}
                  >
                    {isBot ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: formatBotMessage(msg.text),
                        }}
                      />
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="flex w-full justify-start">
              <div className="flex max-w-[85%] gap-2">
                <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center shrink-0">
                  <FaRobot className="text-white text-xs" />
                </div>
                <div className="bg-neutral-700 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center h-10">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area (Giữ nguyên) */}
        <div className="p-3 bg-neutral-900 border-t border-neutral-700 shrink-0">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Nhập câu hỏi..."
              disabled={isLoading}
              className="w-full bg-neutral-800 text-white pl-4 pr-12 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition shadow-inner"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-2 p-2 bg-sky-500 hover:bg-sky-600 disabled:bg-neutral-600 text-white rounded-full transition shadow-md flex items-center justify-center w-8 h-8"
            >
              <FaPaperPlane size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* --- NÚT BẬT/TẮT (Floating Action Button) --- */}
      <div className="relative group">
        {/* Nút X nhỏ bên ngoài để tắt nhanh mà không cần mở chat */}
        {!isOpen && (
          <button
            onClick={handleHideForever}
            className="absolute -top-2 -right-1 bg-neutral-700 text-white rounded-full p-1 shadow-md hover:bg-red-500 transition z-10 w-6 h-6 flex items-center justify-center"
            title="Tắt chatbot"
          >
            <FaTimes size={10} />
          </button>
        )}

        <button
          onClick={handleToggle}
          className={`
            w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white text-2xl transition-all duration-300 transform hover:scale-110
            ${isOpen ? "bg-red-500 rotate-90" : "bg-gradient-to-r from-sky-500 to-blue-600"}
            `}
        >
          {isOpen ? <FaTimes /> : <FaRobot />}
        </button>
      </div>
    </div>
  );
}
