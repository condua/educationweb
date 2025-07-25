// src/data/chatMockData.js

export const users = [
  {
    id: "user1",
    name: "Minh Anh (Bạn)",
    avatarUrl: "https://placehold.co/100x100/A8D8B9/333333?text=MA",
  },
  {
    id: "user2",
    name: "Bảo Long",
    avatarUrl: "https://placehold.co/100x100/F3D5B5/333333?text=BL",
  },
  {
    id: "user3",
    name: "Gia Hân",
    avatarUrl: "https://placehold.co/100x100/C0D6E8/333333?text=GH",
  },
  {
    id: "user4",
    name: "Hoài An",
    avatarUrl: "https://placehold.co/100x100/E8C0C0/333333?text=HA",
  },
  // --- Thêm người dùng mới ---
  {
    id: "user5",
    name: "An Nhiên",
    avatarUrl: "https://placehold.co/100x100/FADADD/333333?text=AN",
  },
  {
    id: "user6",
    name: "Đăng Khoa",
    avatarUrl: "https://placehold.co/100x100/B8E0D2/333333?text=DK",
  },
  {
    id: "user7",
    name: "Tuệ Minh",
    avatarUrl: "https://placehold.co/100x100/FFDAB9/333333?text=TM",
  },
  {
    id: "user8",
    name: "Đức Huy",
    avatarUrl: "https://placehold.co/100x100/C7CEEA/333333?text=DH",
  },
  {
    id: "user9",
    name: "Ngọc Diệp",
    avatarUrl: "https://placehold.co/100x100/E6E6FA/333333?text=ND",
  },
  {
    id: "user10",
    name: "Thiên Ân",
    avatarUrl: "https://placehold.co/100x100/D4A5A5/333333?text=TA",
  },
  {
    id: "user11",
    name: "Phương Thảo",
    avatarUrl: "https://placehold.co/100x100/A2D2FF/333333?text=PT",
  },
  {
    id: "user12",
    name: "Mạnh Dũng",
    avatarUrl: "https://placehold.co/100x100/FEE440/333333?text=MD",
  },
  {
    id: "user13",
    name: "Khánh Linh",
    avatarUrl: "https://placehold.co/100x100/F1C0B9/333333?text=KL",
  },
  {
    id: "user14",
    name: "Tấn Phát",
    avatarUrl: "https://placehold.co/100x100/BDE0FE/333333?text=TP",
  },
  {
    id: "user15",
    name: "Thùy Dương",
    avatarUrl: "https://placehold.co/100x100/FFC8DD/333333?text=TD",
  },
  {
    id: "user16",
    name: "Quang Khải",
    avatarUrl: "https://placehold.co/100x100/CDDAFD/333333?text=QK",
  },
  {
    id: "user17",
    name: "Anh Thư",
    avatarUrl: "https://placehold.co/100x100/CDB4DB/333333?text=AT",
  },
  {
    id: "user18",
    name: "Minh Khang",
    avatarUrl: "https://placehold.co/100x100/FFCDB2/333333?text=MK",
  },
  {
    id: "user19",
    name: "Bảo Châu",
    avatarUrl: "https://placehold.co/100x100/B9FBC0/333333?text=BC",
  },
  {
    id: "user20",
    name: "Gia Bảo",
    avatarUrl: "https://placehold.co/100x100/98F5E1/333333?text=GB",
  },
  {
    id: "user21",
    name: "Cẩm Tú",
    avatarUrl: "https://placehold.co/100x100/FBF8CC/333333?text=CT",
  },
  {
    id: "user22",
    name: "Hoàng Phúc",
    avatarUrl: "https://placehold.co/100x100/D0F4DE/333333?text=HP",
  },
  {
    id: "user23",
    name: "Mai Lan",
    avatarUrl: "https://placehold.co/100x100/FDE2E4/333333?text=ML",
  },
  {
    id: "user24",
    name: "Thanh Tùng",
    avatarUrl: "https://placehold.co/100x100/E2ECE9/333333?text=TT",
  },
];

export const conversations = [
  // --- Dữ liệu gốc ---
  {
    id: "convo1",
    type: "private",
    memberIds: ["user1", "user2"],
    themeColor: "#1f2937",
    messages: [
      {
        id: "msg1",
        type: "text",
        senderId: "user2",
        content: "Chào Minh Anh, bạn khỏe không?",
        timestamp: "2025-07-21T10:30:00Z",
      },
      {
        id: "msg1-img",
        type: "image",
        senderId: "user2",
        content: {
          url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
          name: "laptop-desk.jpg",
        },
        timestamp: "2025-07-21T10:30:15Z",
      },
      {
        id: "msg2",
        type: "text",
        senderId: "user1",
        content: "Chào Long, mình khỏe. Cảm ơn bạn!",
        timestamp: "2025-07-21T10:30:30Z",
      },
      {
        id: "msg3",
        type: "text",
        senderId: "user2",
        content: "Dự án tuần này thế nào rồi?",
        timestamp: "2025-07-21T10:31:00Z",
      },
      {
        id: "msg3-file",
        type: "file",
        senderId: "user1",
        content: { url: "#", name: "BaoCaoTuan_T7.pdf", size: 128000 },
        timestamp: "2025-07-21T10:32:00Z",
      },
    ],
  },
  {
    id: "convo2",
    type: "group",
    name: "React Developers Team",
    avatarUrl: "https://placehold.co/100x100/7C83FD/FFFFFF?text=RDT",
    themeColor: "#1e3a8a",
    memberIds: ["user1", "user3", "user4"],
    messages: [
      {
        id: "msg4",
        type: "text",
        senderId: "user3",
        content: "Chào mọi người, chúng ta họp nhanh về component mới nhé.",
        timestamp: "2025-07-21T09:00:00Z",
      },
      {
        id: "msg4-img",
        type: "image",
        senderId: "user4",
        content: {
          url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
          name: "react-code.jpg",
        },
        timestamp: "2025-07-21T09:00:15Z",
      },
      {
        id: "msg5",
        type: "text",
        senderId: "user4",
        content: "Ok, mình sẵn sàng.",
        timestamp: "2025-07-21T09:00:20Z",
      },
      {
        id: "msg6",
        type: "text",
        senderId: "user1",
        content: "Mình cũng vậy, bắt đầu thôi! 🎉",
        timestamp: "2025-07-21T09:01:00Z",
      },
    ],
  },
  // --- Thêm cuộc trò chuyện mới ---
  {
    id: "convo3",
    type: "private",
    memberIds: ["user1", "user5"],
    themeColor: "#4a1d54",
    messages: [
      {
        id: "msg7",
        type: "text",
        senderId: "user5",
        content: "Chào Minh Anh, cuối tuần này rảnh không?",
        timestamp: "2025-07-22T08:00:00Z",
      },
      {
        id: "msg8",
        type: "text",
        senderId: "user1",
        content: "Chào An Nhiên, mình rảnh. Có chuyện gì không? 😊",
        timestamp: "2025-07-22T08:00:30Z",
      },
    ],
  },
  {
    id: "convo4",
    type: "group",
    name: "Dự án Zalo Clone",
    avatarUrl: "https://placehold.co/100x100/8E94F2/FFFFFF?text=ZC",
    themeColor: "#2563eb",
    memberIds: ["user1", "user2", "user6", "user7", "user8"],
    messages: [
      {
        id: "msg9",
        type: "text",
        senderId: "user6",
        content:
          "Mọi người ơi, task #123 đã xong, mình vừa push lên branch `feature/chat-ui` nhé.",
        timestamp: "2025-07-22T11:00:00Z",
      },
      {
        id: "msg10",
        type: "text",
        senderId: "user1",
        content: "Ok Đăng Khoa, để mình review.",
        timestamp: "2025-07-22T11:01:00Z",
      },
      {
        id: "msg10-file",
        type: "file",
        senderId: "user7",
        content: { url: "#", name: "API_Endpoints_v2.docx", size: 256000 },
        timestamp: "2025-07-22T11:05:00Z",
      },
      {
        id: "msg11",
        type: "text",
        senderId: "user7",
        content: "Mình gửi tài liệu API mới cập nhật nhé cả nhà.",
        timestamp: "2025-07-22T11:05:10Z",
      },
    ],
  },
  {
    id: "convo5",
    type: "group",
    name: "Hội bạn thân 🤟",
    avatarUrl: "https://placehold.co/100x100/F7A6B4/FFFFFF?text=HBT",
    themeColor: "#be185d",
    memberIds: ["user3", "user4", "user9", "user11"],
    messages: [
      {
        id: "msg12",
        type: "text",
        senderId: "user9",
        content: "Cuối tuần đi xem phim không mọi người ơi?",
        timestamp: "2025-07-22T14:20:00Z",
      },
      {
        id: "msg13",
        type: "text",
        senderId: "user3",
        content: "Đi chứ! Đang có phim hay đó.",
        timestamp: "2025-07-22T14:21:00Z",
      },
      {
        id: "msg14",
        type: "image",
        senderId: "user11",
        content: {
          url: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=500",
          name: "popcorn-cinema.jpg",
        },
        timestamp: "2025-07-22T14:22:00Z",
      },
    ],
  },
  {
    id: "convo6",
    type: "private",
    memberIds: ["user10", "user12"],
    themeColor: "#0f766e",
    messages: [
      {
        id: "msg15",
        type: "text",
        senderId: "user10",
        content:
          "Anh Dũng ơi, phần state management này em chưa hiểu lắm, anh giúp em được không ạ?",
        timestamp: "2025-07-22T15:00:00Z",
      },
    ],
  },
  {
    id: "convo7",
    type: "group",
    name: "Gia đình ❤️",
    avatarUrl: "https://placehold.co/100x100/EF4444/FFFFFF?text=GD",
    themeColor: "#dc2626",
    memberIds: ["user1", "user13", "user14", "user15"],
    messages: [
      {
        id: "msg16",
        type: "text",
        senderId: "user13",
        content: "Tối chủ nhật này cả nhà ăn cơm đông đủ nhé!",
        timestamp: "2025-07-21T19:00:00Z",
      },
      {
        id: "msg17",
        type: "text",
        senderId: "user1",
        content: "Dạ vâng ạ. Con sẽ về sớm.",
        timestamp: "2025-07-21T19:01:30Z",
      },
    ],
  },
  {
    id: "convo8",
    type: "private",
    memberIds: ["user1", "user18"],
    themeColor: "#ca8a04",
    messages: [
      {
        id: "msg18",
        type: "text",
        senderId: "user18",
        content: "Nhớ deadline báo cáo tuần này nha Minh Anh.",
        timestamp: "2025-07-22T13:45:00Z",
      },
      {
        id: "msg19",
        type: "text",
        senderId: "user1",
        content: "Ok Minh Khang, tôi nhớ rồi.",
        timestamp: "2025-07-22T13:45:20Z",
      },
    ],
  },
  {
    id: "convo9",
    type: "group",
    name: "CLB Cầu Lông",
    avatarUrl: "https://placehold.co/100x100/16A34A/FFFFFF?text=CLB",
    themeColor: "#15803d",
    memberIds: ["user1", "user22", "user23", "user24"],
    messages: [
      {
        id: "msg20",
        type: "text",
        senderId: "user24",
        content: "Chiều mai 5h sân số 3 như thường lệ nhé mọi người.",
        timestamp: "2025-07-22T16:00:00Z",
      },
      {
        id: "msg21",
        type: "text",
        senderId: "user1",
        content: "Ok Tùng!",
        timestamp: "2025-07-22T16:01:00Z",
      },
      {
        id: "msg22",
        type: "text",
        senderId: "user23",
        content: "Mai mình bận mất rồi, chúc mọi người chơi vui vẻ :(",
        timestamp: "2025-07-22T16:02:15Z",
      },
    ],
  },
  {
    id: "convo10",
    type: "group",
    name: "CLB Bóng Đá",
    avatarUrl: "https://placehold.co/100x100/16A34A/FFFFFF?text=CLB",
    themeColor: "#15803d",
    memberIds: ["user1", "user22", "user23", "user24"],
    messages: [
      {
        id: "msg23",
        type: "text",
        senderId: "user24",
        content: "Chiều mai 6h sân số 3 như thường lệ nhé mọi người.",
        timestamp: "2025-07-22T16:00:00Z",
      },
      {
        id: "msg24",
        type: "text",
        senderId: "user1",
        content: "Ok Tùng!",
        timestamp: "2025-07-22T16:01:00Z",
      },
      {
        id: "msg25",
        type: "text",
        senderId: "user23",
        content: "Mai mình bận mất rồi, chúc mọi người chơi vui vẻ :(",
        timestamp: "2025-07-22T16:02:15Z",
      },
    ],
  },
  {
    id: "convo11",
    type: "group",
    name: "Nhóm học thêm",
    avatarUrl: "https://placehold.co/100x100/16A34A/FFFFFF?text=NHT",
    themeColor: "#15803d",
    memberIds: ["user1", "user22", "user23", "user24"],
    messages: [
      {
        id: "msg26",
        type: "text",
        senderId: "user24",
        content: "Chiều mai 5h sân số 3 như thường lệ nhé mọi người.",
        timestamp: "2025-07-22T16:00:00Z",
      },
      {
        id: "msg27",
        type: "text",
        senderId: "user1",
        content: "Ok Tùng!",
        timestamp: "2025-07-22T16:01:00Z",
      },
      {
        id: "msg28",
        type: "text",
        senderId: "user23",
        content: "Mai mình bận mất rồi, chúc mọi người chơi vui vẻ :(",
        timestamp: "2025-07-22T16:02:15Z",
      },
    ],
  },
];
