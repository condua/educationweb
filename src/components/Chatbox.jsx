import { useState, useRef } from "react";
import { FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Hãy nhập câu hỏi bên dưới." },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContentRef = useRef(null);
  const formatBotMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bôi đậm
      .replace(/\n/g, "<br/>") // xuống dòng
      .replace(
        /(https?:\/\/[^\s<]+)/g,
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
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
            // { role: "system", content: "Bạn là một trợ lý ảo thân thiện." },
            {
              role: "system",
              content: `Bạn là một trợ lý ảo của công ty Giáo dục và Công nghệ MLPA. Dưới đây là một số thông tin bạn cần nhớ để trả lời người dùng:
              - MLPA được thành lập vào tháng 3 năm 2025
              - MLPA là nền tảng giáo dục kết hợp công nghệ AI, cung cấp khóa học kỹ năng, đánh giá năng lực, ngoại ngữ, marketing, tư duy và lập trình. 
              - MLPA đem lại các giải pháp về công nghệ như: Tư vấn xây dựng và thiết kế website, hỗ trợ marketing, quảng bá sản phẩm, hỗ trợ website SEO, tối ưu tên miền...
              - Trụ sở tại Ấp Long Thái, xã Long Khánh B, huyện Hồng Ngự, tỉnh Đồng Tháp
              - Đăng ký học qua website https://mlpa.site hoặc hotline 0399915548
              - Có khóa học online và nền tảng học trực tuyến.
              - Luôn tìm kiếm nhân sự tâm huyết, CV gửi qua phanhoangphuc0311@gmail.com
              - Fanpage của MLPA: https://www.facebook.com/profile.php?id=61574532009854
              - Fanpage Facebook cá nhân: https://www.facebook.com/phuc.phanhoang.1694
              
              Khi người dùng hỏi những gì liên quan tới MLPA, hãy ưu tiên trả lời dựa trên những thông tin trên.`,
            },
            { role: "user", content: userText },
          ],
        }),
      });

      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content || "Xin lỗi, không có phản hồi.";
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error("Lỗi:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Xin lỗi, có lỗi xảy ra." },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
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
                    __html: `<strong>Bot:</strong> ${formatBotMessage(
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
