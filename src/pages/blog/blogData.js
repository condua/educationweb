// data/blogs.js
export const blogs = [
  {
    id: "1",
    title: "Xây dựng ứng dụng React đầu tiên của bạn",
    date: "2025-04-12",
    content: `
      React là một thư viện JavaScript mạnh mẽ để xây dựng giao diện người dùng, được phát triển và duy trì bởi Facebook. Nếu bạn mới bắt đầu, việc xây dựng ứng dụng React đầu tiên có thể khiến bạn cảm thấy choáng ngợp — nhưng thực ra mọi thứ sẽ đơn giản hơn nhiều khi được chia thành từng bước cụ thể.
      
      Trong hướng dẫn này, chúng ta sẽ cùng nhau tạo một ứng dụng React đơn giản từ đầu. Bạn sẽ học cách thiết lập dự án, hiểu cấu trúc component, quản lý state, và triển khai điều hướng với React Router.
      
      ## Bước 1: Thiết lập dự án
      
      Trước tiên, hãy đảm bảo rằng bạn đã cài đặt Node.js và npm. Sau đó, sử dụng \`create-react-app\` để tạo khung dự án:
      
      \`\`\`bash
      npx create-react-app my-first-app
      cd my-first-app
      npm start
      \`\`\`
      
      Lệnh trên sẽ khởi chạy server phát triển và mở ứng dụng trong trình duyệt.
      
      ## Bước 2: Tìm hiểu về Components
      
      Ứng dụng React được xây dựng từ các phần tái sử dụng được gọi là **components**. Mỗi component trả về một phần giao diện người dùng. Ví dụ:
      
      \`\`\`jsx
      function Welcome() {
        return <h1>Xin chào, chào mừng bạn đến với ứng dụng React đầu tiên của tôi!</h1>;
      }
      \`\`\`
      
      Bạn có thể lồng các component vào nhau và truyền dữ liệu giữa chúng thông qua **props**.
      
      ## Bước 3: Quản lý State
      
      React sử dụng hook \`useState\` để quản lý state cục bộ trong component. Ví dụ:
      
      \`\`\`jsx
      import { useState } from 'react';
      
      function Counter() {
        const [count, setCount] = useState(0);
      
        return (
          <div>
            <p>Bạn đã nhấn {count} lần</p>
            <button onClick={() => setCount(count + 1)}>Nhấn tôi</button>
          </div>
        );
      }
      \`\`\`
      
      ## Bước 4: Thêm điều hướng (Routing)
      
      Bạn có thể tạo nhiều trang bằng cách sử dụng thư viện \`react-router-dom\`. Ví dụ:
      
      \`\`\`jsx
      import { BrowserRouter, Routes, Route } from 'react-router-dom';
      
      function App() {
        return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </BrowserRouter>
        );
      }
      \`\`\`
      
      ## Lời kết
      
      Việc học React sẽ mở ra cánh cửa để bạn xây dựng các ứng dụng web hiện đại một cách hiệu quả và linh hoạt. Khi bạn đã nắm vững các kiến thức cơ bản, hãy tiếp tục khám phá các chủ đề nâng cao như quản lý state toàn cục (Redux, Zustand), tích hợp backend, xác thực người dùng, và tối ưu hiệu năng.
      
      Ứng dụng React đầu tiên của bạn có thể nhỏ, nhưng đó là một bước nền tảng quan trọng trong hành trình trở thành một lập trình viên frontend giỏi.
        `,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSulrr24IUrWkFnA5aSZ3rxQxC6_YPPC_jrJQ&s",
  },

  {
    id: "2",
    title: "Understanding Tailwind CSS",
    date: "2025-04-10",
    content: "This is the full content of blog post 2...",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQGVV8fOc_D2_vxf1_MrxRuPeF3Y1EFAJrxg&s",
  },
];
