// --- PHÂN LOẠI CÂU HỎI ---
const allQuestions = [
  // Cấp 1-5 (Dễ)
  {
    id: 1,
    level: "Dễ",
    question: "Thủ đô của Việt Nam là gì?",
    options: ["Hà Nội", "Đà Nẵng", "TP. Hồ Chí Minh", "Hải Phòng"],
    answer: "Hà Nội",
  },
  {
    id: 2,
    level: "Dễ",
    question: "Đâu là một loại trái cây?",
    options: ["Cà rốt", "Khoai tây", "Táo", "Bắp cải"],
    answer: "Táo",
  },
  {
    id: 3,
    level: "Dễ",
    question: "Mặt trời mọc ở hướng nào?",
    options: ["Tây", "Đông", "Bắc", "Nam"],
    answer: "Đông",
  },
  {
    id: 4,
    level: "Dễ",
    question: "Một năm có bao nhiêu tháng?",
    options: ["10", "11", "12", "13"],
    answer: "12",
  },
  {
    id: 5,
    level: "Dễ",
    question: "Loài vật nào sau đây sống dưới nước?",
    options: ["Gà", "Chó", "Cá", "Mèo"],
    answer: "Cá",
  },

  // Cấp 6-10 (Trung bình)
  {
    id: 6,
    level: "Trung bình",
    question: "Ai là người viết 'Truyện Kiều'?",
    options: [
      "Hồ Xuân Hương",
      "Nguyễn Du",
      "Nguyễn Trãi",
      "Bà Huyện Thanh Quan",
    ],
    answer: "Nguyễn Du",
  },
  {
    id: 7,
    level: "Trung bình",
    question: "Hành tinh nào gần Mặt trời nhất?",
    options: ["Trái Đất", "Sao Hỏa", "Sao Kim", "Sao Thủy"],
    answer: "Sao Thủy",
  },
  {
    id: 8,
    level: "Trung bình",
    question: "Công thức hóa học của nước là gì?",
    options: ["O2", "CO2", "H2O", "N2"],
    answer: "H2O",
  },
  {
    id: 9,
    level: "Trung bình",
    question: "Dãy núi dài nhất thế giới là gì?",
    options: ["Himalaya", "Andes", "Rocky", "Alps"],
    answer: "Andes",
  },
  {
    id: 10,
    level: "Trung bình",
    question: "Tác phẩm 'Mona Lisa' được vẽ bởi ai?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Claude Monet",
    ],
    answer: "Leonardo da Vinci",
  },

  // Cấp 11-15 (Khó)
  {
    id: 11,
    level: "Khó",
    question: "Nguyên tố nào có ký hiệu hóa học là 'Au'?",
    options: ["Bạc", "Chì", "Vàng", "Sắt"],
    answer: "Vàng",
  },
  {
    id: 12,
    level: "Khó",
    question: "Năm nào con người lần đầu tiên đặt chân lên Mặt trăng?",
    options: ["1965", "1969", "1972", "1975"],
    answer: "1969",
  },
  {
    id: 13,
    level: "Khó",
    question: "Trong thần thoại Hy Lạp, vị thần nào là vua của các vị thần?",
    options: ["Apollo", "Hades", "Poseidon", "Zeus"],
    answer: "Zeus",
  },
  {
    id: 14,
    level: "Khó",
    question: "Thành phố nào được mệnh danh là 'Thành phố vĩnh cửu'?",
    options: ["Athens", "Rome", "Jerusalem", "Cairo"],
    answer: "Rome",
  },
  {
    id: 15,
    level: "Khó",
    question: "Lý thuyết tương đối được phát triển bởi nhà khoa học nào?",
    options: [
      "Isaac Newton",
      "Galileo Galilei",
      "Nikola Tesla",
      "Albert Einstein",
    ],
    answer: "Albert Einstein",
  },

  // --- 100 CÂU HỎI MỚI ---
  // Cấp độ Dễ (25 câu)
  {
    id: 16,
    level: "Dễ",
    question: "Đại dương lớn nhất trên Trái Đất là gì?",
    options: [
      "Thái Bình Dương",
      "Đại Tây Dương",
      "Ấn Độ Dương",
      "Bắc Băng Dương",
    ],
    answer: "Thái Bình Dương",
  },
  {
    id: 17,
    level: "Dễ",
    question: "Có bao nhiêu màu trong cầu vồng?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    id: 18,
    level: "Dễ",
    question: "Loài chim nào không biết bay?",
    options: ["Đại bàng", "Vẹt", "Chim cánh cụt", "Bồ câu"],
    answer: "Chim cánh cụt",
  },
  {
    id: 19,
    level: "Dễ",
    question: "Quốc kỳ của Nhật Bản có hình gì ở trung tâm?",
    options: ["Ngôi sao", "Mặt trăng", "Hình tròn đỏ", "Lá phong"],
    answer: "Hình tròn đỏ",
  },
  {
    id: 20,
    level: "Dễ",
    question: "Tháp Eiffel nằm ở thành phố nào?",
    options: ["London", "New York", "Paris", "Berlin"],
    answer: "Paris",
  },
  {
    id: 21,
    level: "Dễ",
    question: "Con người có bao nhiêu giác quan chính?",
    options: ["3", "4", "5", "6"],
    answer: "5",
  },
  {
    id: 22,
    level: "Dễ",
    question: "Môn thể thao nào được gọi là 'môn thể thao vua'?",
    options: ["Bóng rổ", "Bóng đá", "Quần vợt", "Bơi lội"],
    answer: "Bóng đá",
  },
  {
    id: 23,
    level: "Dễ",
    question: "Đâu là hành tinh lớn nhất trong Hệ Mặt trời?",
    options: ["Trái Đất", "Sao Thổ", "Sao Mộc", "Sao Thiên Vương"],
    answer: "Sao Mộc",
  },
  {
    id: 24,
    level: "Dễ",
    question: "Tháng nào có 28 hoặc 29 ngày?",
    options: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4"],
    answer: "Tháng 2",
  },
  {
    id: 25,
    level: "Dễ",
    question: "Vạn Lý Trường Thành nằm ở quốc gia nào?",
    options: ["Ấn Độ", "Nhật Bản", "Ai Cập", "Trung Quốc"],
    answer: "Trung Quốc",
  },
  {
    id: 26,
    level: "Dễ",
    question: "Động vật nào sau đây là động vật có vú?",
    options: ["Cá sấu", "Rắn", "Cá voi", "Ếch"],
    answer: "Cá voi",
  },
  {
    id: 27,
    level: "Dễ",
    question: "Mùa nào trong năm có tuyết rơi ở vùng ôn đới?",
    options: ["Mùa xuân", "Mùa hạ", "Mùa thu", "Mùa đông"],
    answer: "Mùa đông",
  },
  {
    id: 28,
    level: "Dễ",
    question: "Ngôn ngữ chính thức của Brazil là gì?",
    options: [
      "Tiếng Tây Ban Nha",
      "Tiếng Anh",
      "Tiếng Bồ Đào Nha",
      "Tiếng Pháp",
    ],
    answer: "Tiếng Bồ Đào Nha",
  },
  {
    id: 29,
    level: "Dễ",
    question: "Ai là tổng thống đầu tiên của Hoa Kỳ?",
    options: [
      "Abraham Lincoln",
      "Thomas Jefferson",
      "George Washington",
      "John Adams",
    ],
    answer: "George Washington",
  },
  {
    id: 30,
    level: "Dễ",
    question: "Thực vật tạo ra năng lượng thông qua quá trình nào?",
    options: ["Hô hấp", "Quang hợp", "Tiêu hóa", "Bay hơi"],
    answer: "Quang hợp",
  },
  {
    id: 31,
    level: "Dễ",
    question: "Kim cương được làm từ nguyên tố nào?",
    options: ["Oxy", "Silic", "Cacbon", "Hydro"],
    answer: "Cacbon",
  },
  {
    id: 32,
    level: "Dễ",
    question: "Đơn vị tiền tệ của Việt Nam là gì?",
    options: ["Yên", "Won", "Đồng", "Baht"],
    answer: "Đồng",
  },
  {
    id: 33,
    level: "Dễ",
    question: "Hình dạng của một quả bóng đá tiêu chuẩn là gì?",
    options: ["Hình vuông", "Hình tam giác", "Hình cầu", "Hình lập phương"],
    answer: "Hình cầu",
  },
  {
    id: 34,
    level: "Dễ",
    question: "Đâu là sa mạc lớn nhất thế giới?",
    options: ["Sahara", "Gobi", "Kalahari", "Nam Cực"],
    answer: "Nam Cực",
  },
  {
    id: 35,
    level: "Dễ",
    question: "Nước đóng băng ở nhiệt độ nào (độ C)?",
    options: ["100", "50", "0", "-10"],
    answer: "0",
  },
  {
    id: 36,
    level: "Dễ",
    question: "Tác giả của bộ truyện 'Harry Potter' là ai?",
    options: [
      "J.R.R. Tolkien",
      "George R.R. Martin",
      "J.K. Rowling",
      "Stephen King",
    ],
    answer: "J.K. Rowling",
  },
  {
    id: 37,
    level: "Dễ",
    question: "Trong một giờ có bao nhiêu phút?",
    options: ["30", "60", "90", "120"],
    answer: "60",
  },
  {
    id: 38,
    level: "Dễ",
    question: "Đâu là châu lục đông dân nhất?",
    options: ["Châu Phi", "Châu Âu", "Châu Mỹ", "Châu Á"],
    answer: "Châu Á",
  },
  {
    id: 39,
    level: "Dễ",
    question: "Bác Hồ đọc Tuyên ngôn Độc lập tại đâu?",
    options: [
      "Nhà hát Lớn Hà Nội",
      "Quảng trường Ba Đình",
      "Phủ Chủ tịch",
      "Văn Miếu",
    ],
    answer: "Quảng trường Ba Đình",
  },
  {
    id: 40,
    level: "Dễ",
    question: "Con vật nào được mệnh danh là 'chúa sơn lâm'?",
    options: ["Sư tử", "Hổ", "Báo", "Gấu"],
    answer: "Hổ",
  },

  // Cấp độ Trung bình (25 câu)
  {
    id: 41,
    level: "Trung bình",
    question: "Người Ai Cập cổ đại viết bằng loại chữ gì?",
    options: ["Chữ Latin", "Chữ tượng hình", "Chữ Nôm", "Chữ rune"],
    answer: "Chữ tượng hình",
  },
  {
    id: 42,
    level: "Trung bình",
    question: "Ai là tác giả của vở kịch 'Romeo và Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Homer"],
    answer: "William Shakespeare",
  },
  {
    id: 43,
    level: "Trung bình",
    question: "Thành phần chính của khí quyển Trái Đất là gì?",
    options: ["Oxy", "Cacbon Dioxit", "Nitơ", "Argon"],
    answer: "Nitơ",
  },
  {
    id: 44,
    level: "Trung bình",
    question: "'Nhà máy năng lượng' của tế bào là gì?",
    options: ["Nhân tế bào", "Lưới nội chất", "Ti thể", "Ribosome"],
    answer: "Ti thể",
  },
  {
    id: 45,
    level: "Trung bình",
    question: "Chiến tranh thế giới thứ nhất bắt đầu vào năm nào?",
    options: ["1905", "1914", "1920", "1939"],
    answer: "1914",
  },
  {
    id: 46,
    level: "Trung bình",
    question: "Ký hiệu hóa học của Bạc là gì?",
    options: ["Ag", "Au", "Pb", "Fe"],
    answer: "Ag",
  },
  {
    id: 47,
    level: "Trung bình",
    question: "Sông dài nhất thế giới là sông nào?",
    options: ["Sông Mekong", "Sông Nile", "Sông Amazon", "Sông Dương Tử"],
    answer: "Sông Nile",
  },
  {
    id: 48,
    level: "Trung bình",
    question: "Ai đã phát minh ra bóng đèn điện?",
    options: [
      "Nikola Tesla",
      "Alexander Graham Bell",
      "Thomas Edison",
      "Benjamin Franklin",
    ],
    answer: "Thomas Edison",
  },
  {
    id: 49,
    level: "Trung bình",
    question: "Thế vận hội Olympic hiện đại đầu tiên được tổ chức ở đâu?",
    options: ["Paris, Pháp", "London, Anh", "Athens, Hy Lạp", "Rome, Ý"],
    answer: "Athens, Hy Lạp",
  },
  {
    id: 50,
    level: "Trung bình",
    question: "Trong thần thoại La Mã, thần chiến tranh là ai?",
    options: ["Jupiter", "Apollo", "Mars", "Neptune"],
    answer: "Mars",
  },
  {
    id: 51,
    level: "Trung bình",
    question: "Hệ thống chữ nổi cho người mù được đặt theo tên ai?",
    options: [
      "Alexander Graham Bell",
      "Louis Braille",
      "Helen Keller",
      "Marie Curie",
    ],
    answer: "Louis Braille",
  },
  {
    id: 52,
    level: "Trung bình",
    question: "Nước nào có diện tích lớn nhất thế giới?",
    options: ["Canada", "Trung Quốc", "Hoa Kỳ", "Nga"],
    answer: "Nga",
  },
  {
    id: 53,
    level: "Trung bình",
    question: "Bộ phim nào đã giành giải Oscar cho Phim hay nhất đầu tiên?",
    options: ["Cuốn theo chiều gió", "Wings", "Casablanca", "Bố già"],
    answer: "Wings",
  },
  {
    id: 54,
    level: "Trung bình",
    question: "Bức tranh 'Đêm đầy sao' là của họa sĩ nào?",
    options: [
      "Claude Monet",
      "Pablo Picasso",
      "Vincent van Gogh",
      "Salvador Dalí",
    ],
    answer: "Vincent van Gogh",
  },
  {
    id: 55,
    level: "Trung bình",
    question: "Đỉnh núi cao nhất thế giới là gì?",
    options: ["K2", "Kangchenjunga", "Lhotse", "Everest"],
    answer: "Everest",
  },
  {
    id: 56,
    level: "Trung bình",
    question: "Định luật vạn vật hấp dẫn được phát biểu bởi ai?",
    options: [
      "Galileo Galilei",
      "Isaac Newton",
      "Johannes Kepler",
      "Copernicus",
    ],
    answer: "Isaac Newton",
  },
  {
    id: 57,
    level: "Trung bình",
    question: "Thành Cổ Loa gắn với truyền thuyết nào của Việt Nam?",
    options: [
      "Sơn Tinh, Thủy Tinh",
      "Thánh Gióng",
      "An Dương Vương và Mị Châu, Trọng Thủy",
      "Sự tích trầu cau",
    ],
    answer: "An Dương Vương và Mị Châu, Trọng Thủy",
  },
  {
    id: 58,
    level: "Trung bình",
    question: "ADN là viết tắt của từ gì?",
    options: [
      "Axit diribonucleic",
      "Axit aminonucleic",
      "Axit ribonucleic",
      "Axit deoxyribonucleic",
    ],
    answer: "Axit deoxyribonucleic",
  },
  {
    id: 59,
    level: "Trung bình",
    question: "Ai là người phụ nữ đầu tiên bay vào vũ trụ?",
    options: [
      "Sally Ride",
      "Valentina Tereshkova",
      "Svetlana Savitskaya",
      "Mae Jemison",
    ],
    answer: "Valentina Tereshkova",
  },
  {
    id: 60,
    level: "Trung bình",
    question: "Tác phẩm 'Chiến tranh và Hòa bình' được viết bởi tác giả nào?",
    options: [
      "Fyodor Dostoevsky",
      "Anton Chekhov",
      "Leo Tolstoy",
      "Alexander Pushkin",
    ],
    answer: "Leo Tolstoy",
  },
  {
    id: 61,
    level: "Trung bình",
    question: "Hệ điều hành Android được phát triển bởi công ty nào?",
    options: ["Apple", "Microsoft", "Google", "Samsung"],
    answer: "Google",
  },
  {
    id: 62,
    level: "Trung bình",
    question: "Eo biển nào nối liền Đại Tây Dương và Thái Bình Dương?",
    options: [
      "Eo biển Bering",
      "Kênh đào Suez",
      "Kênh đào Panama",
      "Eo biển Malacca",
    ],
    answer: "Kênh đào Panama",
  },
  {
    id: 63,
    level: "Trung bình",
    question:
      "Vị vua nào của nhà Trần đã 3 lần lãnh đạo quân dân đánh thắng quân Nguyên - Mông?",
    options: [
      "Trần Thái Tông",
      "Trần Thánh Tông",
      "Trần Nhân Tông",
      "Trần Anh Tông",
    ],
    answer: "Trần Nhân Tông",
  },
  {
    id: 64,
    level: "Trung bình",
    question: "Nhạc cụ nào có 88 phím?",
    options: ["Guitar", "Violin", "Piano", "Trống"],
    answer: "Piano",
  },
  {
    id: 65,
    level: "Trung bình",
    question: "Thủ đô của Úc là thành phố nào?",
    options: ["Sydney", "Melbourne", "Brisbane", "Canberra"],
    answer: "Canberra",
  },

  // Cấp độ Khó (25 câu)
  {
    id: 66,
    level: "Khó",
    question: "Trận Waterloo diễn ra vào năm nào?",
    options: ["1789", "1805", "1815", "1821"],
    answer: "1815",
  },
  {
    id: 67,
    level: "Khó",
    question: "Nguyên tố hóa học nào phổ biến nhất trong vũ trụ?",
    options: ["Oxy", "Heli", "Hydro", "Cacbon"],
    answer: "Hydro",
  },
  {
    id: 68,
    level: "Khó",
    question: "Triết gia nào được coi là cha đẻ của triết học phương Tây?",
    options: ["Aristotle", "Plato", "Socrates", "Thales"],
    answer: "Thales",
  },
  {
    id: 69,
    level: "Khó",
    question: "Ai đã viết 'Nguồn gốc các loài'?",
    options: [
      "Gregor Mendel",
      "Alfred Russel Wallace",
      "Charles Darwin",
      "Jean-Baptiste Lamarck",
    ],
    answer: "Charles Darwin",
  },
  {
    id: 70,
    level: "Khó",
    question: "Đế quốc La Mã sụp đổ vào thế kỷ thứ mấy?",
    options: ["Thế kỷ 3", "Thế kỷ 4", "Thế kỷ 5", "Thế kỷ 6"],
    answer: "Thế kỷ 5",
  },
  {
    id: 71,
    level: "Khó",
    question: "Bán đảo Scandinavia bao gồm những quốc gia nào?",
    options: [
      "Phần Lan, Iceland, Greenland",
      "Na Uy, Thụy Điển, Đan Mạch",
      "Anh, Ireland, Scotland",
      "Tây Ban Nha, Bồ Đào Nha",
    ],
    answer: "Na Uy, Thụy Điển, Đan Mạch",
  },
  {
    id: 72,
    level: "Khó",
    question: "Trong vật lý, 'hạt của Chúa' là tên gọi khác của hạt nào?",
    options: ["Neutrino", "Quark", "Higgs boson", "Electron"],
    answer: "Higgs boson",
  },
  {
    id: 73,
    level: "Khó",
    question: "Tác phẩm điêu khắc 'David' là của nghệ sĩ nào?",
    options: ["Donatello", "Leonardo da Vinci", "Raphael", "Michelangelo"],
    answer: "Michelangelo",
  },
  {
    id: 74,
    level: "Khó",
    question:
      "Sự kiện 'Ngày thứ Ba Đen tối' năm 1929 liên quan đến lĩnh vực gì?",
    options: ["Chính trị", "Quân sự", "Thị trường chứng khoán", "Khoa học"],
    answer: "Thị trường chứng khoán",
  },
  {
    id: 75,
    level: "Khó",
    question: "Ký hiệu 'e' trong toán học đại diện cho hằng số nào?",
    options: ["Hằng số Pythagoras", "Hằng số Euler", "Số Pi", "Tỉ lệ vàng"],
    answer: "Hằng số Euler",
  },
  {
    id: 76,
    level: "Khó",
    question: "Ai là tác giả của tác phẩm 'Don Quixote'?",
    options: [
      "Gabriel Garcia Marquez",
      "Jorge Luis Borges",
      "Miguel de Cervantes",
      "Pablo Neruda",
    ],
    answer: "Miguel de Cervantes",
  },
  {
    id: 77,
    level: "Khó",
    question:
      "Vị pharaoh nào của Ai Cập được cho là đã xây dựng Đại kim tự tháp Giza?",
    options: ["Tutankhamun", "Ramesses II", "Cleopatra", "Khufu"],
    answer: "Khufu",
  },
  {
    id: 78,
    level: "Khó",
    question: "'Lục địa đen' là tên gọi khác của châu lục nào?",
    options: ["Châu Á", "Châu Phi", "Châu Nam Cực", "Châu Úc"],
    answer: "Châu Phi",
  },
  {
    id: 79,
    level: "Khó",
    question:
      "Bản giao hưởng số 5 của Beethoven còn được biết đến với tên gọi nào?",
    options: [
      "Giao hưởng Anh hùng",
      "Giao hưởng Định mệnh",
      "Giao hưởng Đồng quê",
      "Giao hưởng Niềm vui",
    ],
    answer: "Giao hưởng Định mệnh",
  },
  {
    id: 80,
    level: "Khó",
    question:
      "Năm 1953, James Watson và Francis Crick đã khám phá ra cấu trúc của phân tử nào?",
    options: ["Protein", "ARN", "ADN", "Tế bào"],
    answer: "ADN",
  },
  {
    id: 81,
    level: "Khó",
    question: "Ai là người sáng lập ra Đế quốc Mông Cổ?",
    options: ["Oa Khoát Đài", "Hốt Tất Liệt", "Thành Cát Tư Hãn", " Đà Lôi"],
    answer: "Thành Cát Tư Hãn",
  },
  {
    id: 82,
    level: "Khó",
    question: "Thành phố cổ Machu Picchu thuộc nền văn minh nào?",
    options: ["Aztec", "Maya", "Inca", "Olmec"],
    answer: "Inca",
  },
  {
    id: 83,
    level: "Khó",
    question: "Kênh đào Suez nối Biển Đỏ với vùng biển nào?",
    options: ["Biển Đen", "Biển Địa Trung Hải", "Vịnh Ba Tư", "Biển Ả Rập"],
    answer: "Biển Địa Trung Hải",
  },
  {
    id: 84,
    level: "Khó",
    question: "Trong vật lý hạt, phản hạt của electron được gọi là gì?",
    options: ["Proton", "Neutron", "Positron", "Photon"],
    answer: "Positron",
  },
  {
    id: 85,
    level: "Khó",
    question: "Nhà văn nào đã viết tác phẩm 'Trăm năm cô đơn'?",
    options: [
      "Mario Vargas Llosa",
      "Gabriel Garcia Marquez",
      "Julio Cortázar",
      "Isabel Allende",
    ],
    answer: "Gabriel Garcia Marquez",
  },
  {
    id: 86,
    level: "Khó",
    question: "Phong trào Phục hưng bắt nguồn từ quốc gia nào?",
    options: ["Pháp", "Tây Ban Nha", "Anh", "Ý"],
    answer: "Ý",
  },
  {
    id: 87,
    level: "Khó",
    question:
      "Ngôn ngữ lập trình nào được tạo ra bởi James Gosling tại Sun Microsystems?",
    options: ["Python", "C++", "Java", "JavaScript"],
    answer: "Java",
  },
  {
    id: 88,
    level: "Khó",
    question:
      "Nhà thám hiểm nào là người châu Âu đầu tiên đi thuyền vòng quanh châu Phi để đến Ấn Độ?",
    options: [
      "Christopher Columbus",
      "Ferdinand Magellan",
      "Vasco da Gama",
      "James Cook",
    ],
    answer: "Vasco da Gama",
  },
  {
    id: 89,
    level: "Khó",
    question:
      "Triều đại nào của Việt Nam cho xây dựng Văn Miếu - Quốc Tử Giám?",
    options: ["Nhà Lý", "Nhà Trần", "Nhà Lê sơ", "Nhà Nguyễn"],
    answer: "Nhà Lý",
  },
  {
    id: 90,
    level: "Khó",
    question:
      "Học thuyết 'Bàn tay vô hình' trong kinh tế học được đề xuất bởi ai?",
    options: [
      "John Maynard Keynes",
      "Karl Marx",
      "Adam Smith",
      "Milton Friedman",
    ],
    answer: "Adam Smith",
  },

  // Cấp độ Rất khó (25 câu)
  {
    id: 91,
    level: "Rất khó",
    question:
      "Phương trình nào của Maxwell mô tả định luật Gauss cho từ trường?",
    options: [
      "∇ ⋅ E = ρ/ε₀",
      "∇ ⋅ B = 0",
      "∇ × E = -∂B/∂t",
      "∇ × B = μ₀(J + ε₀∂E/∂t)",
    ],
    answer: "∇ ⋅ B = 0",
  },
  {
    id: 92,
    level: "Rất khó",
    question: "Ai là hoàng đế cuối cùng của Đế quốc Byzantine?",
    options: [
      "Justinian I",
      "Heraclius",
      "Constantine XI Palaiologos",
      "Alexios I Komnenos",
    ],
    answer: "Constantine XI Palaiologos",
  },
  {
    id: 93,
    level: "Rất khó",
    question:
      "Trong lý thuyết trò chơi, 'Thế lưỡng nan của người tù' minh họa cho khái niệm nào?",
    options: [
      "Cân bằng Nash",
      "Trò chơi có tổng bằng không",
      "Chiến lược tối ưu",
      "Hợp tác và phản bội",
    ],
    answer: "Hợp tác và phản bội",
  },
  {
    id: 94,
    level: "Rất khó",
    question:
      "Cuốn tiểu thuyết nào mở đầu bằng câu: 'Đó là thời đại tốt đẹp nhất, đó là thời đại tồi tệ nhất'?",
    options: [
      "Moby Dick",
      "Kiêu hãnh và định kiến",
      "Câu chuyện hai thành phố",
      "Ulysses",
    ],
    answer: "Câu chuyện hai thành phố",
  },
  {
    id: 95,
    level: "Rất khó",
    question: "Siêu lục địa tồn tại khoảng 300 triệu năm trước có tên là gì?",
    options: ["Gondwana", "Laurasia", "Rodinia", "Pangaea"],
    answer: "Pangaea",
  },
  {
    id: 96,
    level: "Rất khó",
    question: "Định lý cuối cùng của Fermat đã được ai chứng minh?",
    options: [
      "Leonhard Euler",
      "Carl Friedrich Gauss",
      "Andrew Wiles",
      "David Hilbert",
    ],
    answer: "Andrew Wiles",
  },
  {
    id: 97,
    level: "Rất khó",
    question:
      "Nguyên nhân chính gây ra sự kiện tuyệt chủng kỷ Phấn Trắng – Cổ Cận (K-Pg) là gì?",
    options: [
      "Hoạt động núi lửa lớn",
      "Biến đổi khí hậu",
      "Va chạm của tiểu hành tinh",
      "Dịch bệnh toàn cầu",
    ],
    answer: "Va chạm của tiểu hành tinh",
  },
  {
    id: 98,
    level: "Rất khó",
    question:
      "Hệ thống chữ viết cổ nào của vùng Lưỡng Hà được coi là một trong những hệ thống chữ viết sớm nhất?",
    options: [
      "Chữ tượng hình",
      "Chữ hình nêm (cuneiform)",
      "Bảng chữ cái Phoenicia",
      "Chữ rune",
    ],
    answer: "Chữ hình nêm (cuneiform)",
  },
  {
    id: 99,
    level: "Rất khó",
    question:
      "Trong triết học, khái niệm 'tabula rasa' (tấm bảng trống) do ai đề xướng?",
    options: ["Plato", "René Descartes", "John Locke", "Immanuel Kant"],
    answer: "John Locke",
  },
  {
    id: 100,
    level: "Rất khó",
    question:
      "'Vụ nổ Cambri' là thuật ngữ dùng để chỉ sự kiện nào trong lịch sử Trái Đất?",
    options: [
      "Sự hình thành Mặt trăng",
      "Sự xuất hiện đột ngột của các ngành động vật chính",
      "Sự tuyệt chủng hàng loạt đầu tiên",
      "Sự hình thành các lục địa",
    ],
    answer: "Sự xuất hiện đột ngột của các ngành động vật chính",
  },
  {
    id: 101,
    level: "Rất khó",
    question:
      "Ký hiệu 'aleph-null' (ℵ₀) trong toán học dùng để chỉ lực lượng của tập hợp nào?",
    options: [
      "Tập hợp số thực",
      "Tập hợp số hữu tỉ",
      "Tập hợp các số tự nhiên",
      "Tập hợp rỗng",
    ],
    answer: "Tập hợp các số tự nhiên",
  },
  {
    id: 102,
    level: "Rất khó",
    question:
      "Thành phố Timbuktu, một trung tâm học thuật Hồi giáo thời trung cổ, nằm ở quốc gia hiện đại nào?",
    options: ["Maroc", "Ai Cập", "Mali", "Nigeria"],
    answer: "Mali",
  },
  {
    id: 103,
    level: "Rất khó",
    question: "Cuộc chiến tranh Trăm năm diễn ra giữa hai vương quốc nào?",
    options: [
      "Anh và Pháp",
      "Tây Ban Nha và Bồ Đào Nha",
      "La Mã và Ba Tư",
      "Phổ và Áo",
    ],
    answer: "Anh và Pháp",
  },
  {
    id: 104,
    level: "Rất khó",
    question:
      "Nhà soạn nhạc nào đã bị điếc hoàn toàn trong những năm cuối đời nhưng vẫn sáng tác những tác phẩm vĩ đại?",
    options: [
      "Wolfgang Amadeus Mozart",
      "Johann Sebastian Bach",
      "Ludwig van Beethoven",
      "Franz Schubert",
    ],
    answer: "Ludwig van Beethoven",
  },
  {
    id: 105,
    level: "Rất khó",
    question:
      "Phép thử Turing được thiết kế để đánh giá khả năng gì của một cỗ máy?",
    options: [
      "Tốc độ tính toán",
      "Trí thông minh",
      "Sức mạnh vật lý",
      "Hiệu quả năng lượng",
    ],
    answer: "Trí thông minh",
  },
  {
    id: 106,
    level: "Rất khó",
    question: "Ai là tác giả của 'Binh pháp Tôn Tử'?",
    options: ["Khổng Tử", "Lão Tử", "Tôn Vũ", "Hàn Phi Tử"],
    answer: "Tôn Vũ",
  },
  {
    id: 107,
    level: "Rất khó",
    question:
      "Trong vật lý thiên văn, 'Chân trời sự kiện' là một đặc điểm của đối tượng nào?",
    options: ["Sao neutron", "Sao lùn trắng", "Lỗ đen", "Pulsar"],
    answer: "Lỗ đen",
  },
  {
    id: 108,
    level: "Rất khó",
    question: "Vị vua nào của nhà Mạc đã cho đúc tiền 'Thông Bảo'?",
    options: [
      "Mạc Đăng Dung",
      "Mạc Đăng Doanh",
      "Mạc Kính Điển",
      "Mạc Mậu Hợp",
    ],
    answer: "Mạc Đăng Dung",
  },
  {
    id: 109,
    level: "Rất khó",
    question:
      "Thuật ngữ 'Realpolitik' trong quan hệ quốc tế gắn liền với chính trị gia nào của thế kỷ 19?",
    options: [
      "Napoléon Bonaparte",
      "Otto von Bismarck",
      "Klemens von Metternich",
      "Winston Churchill",
    ],
    answer: "Otto von Bismarck",
  },
  {
    id: 110,
    level: "Rất khó",
    question:
      "Đá Rosetta có vai trò quan trọng trong việc giải mã loại chữ nào?",
    options: [
      "Chữ Maya",
      "Chữ hình nêm",
      "Chữ tượng hình Ai Cập",
      "Chữ Linear B",
    ],
    answer: "Chữ tượng hình Ai Cập",
  },
  {
    id: 111,
    level: "Rất khó",
    question: "Nguyên lý bất định của Heisenberg phát biểu điều gì?",
    options: [
      "Năng lượng và khối lượng là tương đương",
      "Không thể biết chính xác đồng thời vị trí và động lượng của một hạt",
      "Không gian và thời gian là tương đối",
      "Entropy của một hệ cô lập luôn tăng",
    ],
    answer:
      "Không thể biết chính xác đồng thời vị trí và động lượng của một hạt",
  },
  {
    id: 112,
    level: "Rất khó",
    question:
      "Trong lịch sử, 'Con đường Tơ lụa' chủ yếu kết nối châu Âu với khu vực nào?",
    options: ["Châu Phi", "Châu Mỹ", "Trung Quốc", "Úc"],
    answer: "Trung Quốc",
  },
  {
    id: 113,
    level: "Rất khó",
    question:
      "Thủ đô của Đế quốc Ottoman là gì trước khi bị chinh phục vào năm 1453?",
    options: ["Baghdad", "Damascus", "Adrianople (Edirne)", "Cairo"],
    answer: "Adrianople (Edirne)",
  },
  {
    id: 114,
    level: "Rất khó",
    question: "Tác phẩm 'Utopia' (Không tưởng) được viết bởi ai?",
    options: ["Niccolò Machiavelli", "Thomas More", "Erasmus", "Francis Bacon"],
    answer: "Thomas More",
  },
  {
    id: 115,
    level: "Rất khó",
    question:
      "Lý thuyết về 'màng' (Brane theory) là một phần của lý thuyết vật lý nào?",
    options: [
      "Lý thuyết tương đối rộng",
      "Cơ học lượng tử",
      "Lý thuyết dây",
      "Mô hình chuẩn",
    ],
    answer: "Lý thuyết dây",
  },

  // Các câu dưới đây (trước nằm trong mảng con) được hợp nhất và đưa vào Cấp độ Rất Khó
  {
    id: 116,
    level: "Rất khó",
    question: "Nguyên tố hóa học nào có điểm nóng chảy cao nhất?",
    options: ["Carbon", "Wolfram (Tungsten)", "Osmium", "Tantalum"],
    answer: "Wolfram (Tungsten)",
  },
  {
    id: 117,
    level: "Rất khó",
    question: "Trong thuyết tương đối hẹp, công thức E = mc² biểu thị điều gì?",
    options: [
      "Khối lượng và năng lượng là tương đương",
      "Năng lượng phụ thuộc vào vận tốc",
      "Khối lượng phụ thuộc vào nhiệt độ",
      "Không gian và thời gian là bất biến",
    ],
    answer: "Khối lượng và năng lượng là tương đương",
  },
  {
    id: 118,
    level: "Rất khó",
    question: "Ai là nhà toán học đặt nền móng cho lý thuyết tập hợp hiện đại?",
    options: ["Georg Cantor", "David Hilbert", "Kurt Gödel", "Henri Poincaré"],
    answer: "Georg Cantor",
  },
  {
    id: 119,
    level: "Rất khó",
    question: "Ngôn ngữ lập trình nào được coi là ngôn ngữ cấp cao đầu tiên?",
    options: ["Fortran", "COBOL", "Assembly", "ALGOL"],
    answer: "Fortran",
  },
  {
    id: 120,
    level: "Rất khó",
    question: "Trong sinh học, 'apoptosis' chỉ hiện tượng gì?",
    options: [
      "Tế bào phân chia nhanh chóng",
      "Tế bào chết theo chương trình",
      "Tế bào đột biến gen",
      "Tế bào biến đổi hình dạng",
    ],
    answer: "Tế bào chết theo chương trình",
  },
  {
    id: 121,
    level: "Rất khó",
    question: "Tác phẩm 'The Republic' (Cộng hòa) là của triết gia nào?",
    options: ["Aristotle", "Plato", "Socrates", "Cicero"],
    answer: "Plato",
  },
  {
    id: 122,
    level: "Rất khó",
    question: "Hiện tượng 'Siêu dẫn' xảy ra ở điều kiện nào?",
    options: [
      "Nhiệt độ rất cao",
      "Nhiệt độ cực thấp",
      "Áp suất cao",
      "Từ trường mạnh",
    ],
    answer: "Nhiệt độ cực thấp",
  },
  {
    id: 123,
    level: "Rất khó",
    question: "Hệ điều hành UNIX ban đầu được phát triển tại đâu?",
    options: ["MIT", "Bell Labs", "IBM", "Stanford University"],
    answer: "Bell Labs",
  },
  {
    id: 124,
    level: "Rất khó",
    question: "Trong hóa học, số Avogadro xấp xỉ bằng bao nhiêu?",
    options: ["6,022 × 10²³", "3,14 × 10⁸", "9,81 × 10⁶", "1,6 × 10⁻¹⁹"],
    answer: "6,022 × 10²³",
  },
  {
    id: 125,
    level: "Rất khó",
    question: "Ai là nhà khoa học phát hiện ra hiện tượng phóng xạ?",
    options: [
      "Marie Curie",
      "Henri Becquerel",
      "Pierre Curie",
      "Ernest Rutherford",
    ],
    answer: "Henri Becquerel",
  },
  {
    id: 126,
    level: "Rất khó",
    question:
      "Trong lịch sử Nhật Bản, thời kỳ 'Edo' kéo dài từ năm nào đến năm nào?",
    options: ["1603–1868", "1467–1600", "1868–1912", "794–1185"],
    answer: "1603–1868",
  },
  {
    id: 127,
    level: "Rất khó",
    question: "Nguyên tắc Pauli trong vật lý lượng tử nói về điều gì?",
    options: [
      "Hạt không thể vượt tốc độ ánh sáng",
      "Hai fermion không thể chiếm cùng trạng thái lượng tử",
      "Năng lượng không thể tạo ra hoặc mất đi",
      "Tần số và bước sóng tỷ lệ nghịch",
    ],
    answer: "Hai fermion không thể chiếm cùng trạng thái lượng tử",
  },
  {
    id: 128,
    level: "Rất khó",
    question: "Ai là tác giả của 'Divine Comedy' (Thần khúc)?",
    options: ["Dante Alighieri", "Geoffrey Chaucer", "John Milton", "Homer"],
    answer: "Dante Alighieri",
  },
  {
    id: 129,
    level: "Rất khó",
    question:
      "Hiện tượng 'đỏ dịch chuyển' (redshift) trong thiên văn học chỉ điều gì?",
    options: [
      "Sao trở nên nóng hơn",
      "Vũ trụ đang giãn nở",
      "Sao di chuyển về phía Trái Đất",
      "Bức xạ bị hấp thụ",
    ],
    answer: "Vũ trụ đang giãn nở",
  },
  {
    id: 130,
    level: "Rất khó",
    question: "Trong y học, 'placebo effect' là gì?",
    options: [
      "Tác dụng phụ của thuốc",
      "Tác dụng giả dược do niềm tin",
      "Hiệu ứng tăng liều",
      "Phản ứng dị ứng",
    ],
    answer: "Tác dụng giả dược do niềm tin",
  },
  {
    id: 131,
    level: "Rất khó",
    question:
      "Vị hoàng đế nào của La Mã đã ra sắc lệnh Công giáo trở thành tôn giáo chính thức?",
    options: ["Constantine I", "Theodosius I", "Augustus", "Nero"],
    answer: "Theodosius I",
  },
  {
    id: 132,
    level: "Rất khó",
    question:
      "Trong kinh tế học, 'lạm phát đình trệ' (stagflation) mô tả tình trạng gì?",
    options: [
      "Kinh tế tăng trưởng nhanh và lạm phát cao",
      "Tăng trưởng chậm nhưng lạm phát cao",
      "Lạm phát giảm mạnh",
      "Giảm phát và thất nghiệp thấp",
    ],
    answer: "Tăng trưởng chậm nhưng lạm phát cao",
  },
  {
    id: 133,
    level: "Rất khó",
    question: "Khái niệm 'Deep Learning' là một nhánh của lĩnh vực nào?",
    options: [
      "Thị giác máy tính",
      "Học máy (Machine Learning)",
      "Khoa học dữ liệu",
      "Trí tuệ nhân tạo",
    ],
    answer: "Học máy (Machine Learning)",
  },
  {
    id: 134,
    level: "Rất khó",
    question: "Ai là người đầu tiên đi bộ trên Mặt Trăng?",
    options: [
      "Buzz Aldrin",
      "Neil Armstrong",
      "Yuri Gagarin",
      "Michael Collins",
    ],
    answer: "Neil Armstrong",
  },
  {
    id: 135,
    level: "Rất khó",
    question: "Phần mềm 'Mosaic' nổi tiếng vì điều gì?",
    options: [
      "Trình duyệt web đầu tiên phổ biến rộng rãi",
      "Hệ điều hành mã nguồn mở",
      "Phần mềm xử lý ảnh đầu tiên",
      "Chương trình email đầu tiên",
    ],
    answer: "Trình duyệt web đầu tiên phổ biến rộng rãi",
  },
  {
    id: 136,
    level: "Rất khó",
    question:
      "Trong sinh học, bộ phận nào của tế bào chịu trách nhiệm sản xuất ATP?",
    options: ["Nhân", "Ti thể", "Lục lạp", "Lysosome"],
    answer: "Ti thể",
  },
  {
    id: 137,
    level: "Rất khó",
    question: "Nguyên tố nào là kim loại kiềm thổ?",
    options: ["Sodium", "Calcium", "Potassium", "Lithium"],
    answer: "Calcium",
  },
  {
    id: 138,
    level: "Rất khó",
    question: "Ai là người đã phát minh ra máy in vào thế kỷ 15?",
    options: [
      "Johannes Gutenberg",
      "Leonardo da Vinci",
      "Isaac Newton",
      "Galileo Galilei",
    ],
    answer: "Johannes Gutenberg",
  },
  {
    id: 139,
    level: "Rất khó",
    question: "Hằng số Planck có giá trị xấp xỉ bao nhiêu?",
    options: [
      "6,626 × 10⁻³⁴ J·s",
      "3,00 × 10⁸ m/s",
      "1,60 × 10⁻¹⁹ C",
      "9,81 m/s²",
    ],
    answer: "6,626 × 10⁻³⁴ J·s",
  },
  {
    id: 140,
    level: "Rất khó",
    question:
      "Tác phẩm 'War and Peace' (Chiến tranh và Hòa bình) là của nhà văn nào?",
    options: [
      "Fyodor Dostoevsky",
      "Leo Tolstoy",
      "Anton Chekhov",
      "Alexander Pushkin",
    ],
    answer: "Leo Tolstoy",
  },
  {
    id: 141,
    level: "Rất khó",
    question:
      "Nguyên lý bất định Heisenberg trong cơ học lượng tử khẳng định điều gì?",
    options: [
      "Vận tốc ánh sáng là giới hạn tuyệt đối",
      "Không thể xác định đồng thời chính xác cả vị trí và động lượng của một hạt",
      "Năng lượng và khối lượng có thể chuyển hóa lẫn nhau",
      "Mọi hạt đều có phản hạt tương ứng",
    ],
    answer:
      "Không thể xác định đồng thời chính xác cả vị trí và động lượng của một hạt",
  },
  {
    id: 142,
    level: "Rất khó",
    question:
      "Nhà toán học nào đã chứng minh thành công Định lý lớn Fermat vào năm 1994?",
    options: [
      "Andrew Wiles",
      "Grigori Perelman",
      "Terence Tao",
      "Leonhard Euler",
    ],
    answer: "Andrew Wiles",
  },
  {
    id: 143,
    level: "Rất khó",
    question:
      "Ai là người phát hiện ra Penicillin, loại kháng sinh đầu tiên trên thế giới?",
    options: [
      "Louis Pasteur",
      "Robert Koch",
      "Alexander Fleming",
      "Joseph Lister",
    ],
    answer: "Alexander Fleming",
  },
  {
    id: 144,
    level: "Rất khó",
    question:
      "Trong kinh tế học, khái niệm 'Bàn tay vô hình' (Invisible hand) được đưa ra bởi ai?",
    options: [
      "John Maynard Keynes",
      "Karl Marx",
      "David Ricardo",
      "Adam Smith",
    ],
    answer: "Adam Smith",
  },
  {
    id: 145,
    level: "Rất khó",
    question:
      "Ai được lịch sử công nhận là lập trình viên máy tính đầu tiên trên thế giới?",
    options: ["Alan Turing", "Ada Lovelace", "Charles Babbage", "Grace Hopper"],
    answer: "Ada Lovelace",
  },
  {
    id: 146,
    level: "Rất khó",
    question:
      "Trường phái phân tâm học (Psychoanalysis) trong tâm lý học do ai sáng lập?",
    options: ["Carl Jung", "B.F. Skinner", "Sigmund Freud", "Ivan Pavlov"],
    answer: "Sigmund Freud",
  },
  {
    id: 147,
    level: "Rất khó",
    question:
      "Tác phẩm 'Don Quixote' (Đôn Ki-hô-tê), một trong những tiểu thuyết vĩ đại nhất của văn học phương Tây, là của tác giả nào?",
    options: [
      "Gabriel García Márquez",
      "Miguel de Cervantes",
      "Jorge Luis Borges",
      "Pablo Neruda",
    ],
    answer: "Miguel de Cervantes",
  },
  {
    id: 148,
    level: "Rất khó",
    question:
      "Bức tranh 'Guernica', mô tả sự tàn khốc của chiến tranh, là tuyệt tác của họa sĩ nào?",
    options: [
      "Salvador Dalí",
      "Vincent van Gogh",
      "Pablo Picasso",
      "Claude Monet",
    ],
    answer: "Pablo Picasso",
  },
  {
    id: 149,
    level: "Rất khó",
    question:
      "Vệ tinh nhân tạo đầu tiên được phóng lên quỹ đạo Trái Đất có tên là gì?",
    options: ["Sputnik 1", "Explorer 1", "Vostok 1", "Apollo 11"],
    answer: "Sputnik 1",
  },
  {
    id: 150,
    level: "Rất khó",
    question:
      "Ngọn núi lửa cao nhất trong Hệ Mặt Trời (Olympus Mons) nằm trên hành tinh nào?",
    options: ["Sao Kim", "Sao Mộc", "Sao Hỏa", "Sao Thổ"],
    answer: "Sao Hỏa",
  },
  {
    id: 151,
    level: "Rất khó",
    question:
      "Ai được coi là cha đẻ của hóa học hiện đại và đã phát biểu định luật bảo toàn khối lượng?",
    options: [
      "Robert Boyle",
      "Antoine Lavoisier",
      "Dmitri Mendeleev",
      "John Dalton",
    ],
    answer: "Antoine Lavoisier",
  },
  {
    id: 152,
    level: "Rất khó",
    question:
      "Nữ hoàng Cleopatra, vị pharaoh cuối cùng của Ai Cập cổ đại, có nguồn gốc từ dân tộc nào?",
    options: ["Ai Cập", "La Mã", "Hy Lạp (Ptolemaic)", "Ba Tư"],
    answer: "Hy Lạp (Ptolemaic)",
  },
  {
    id: 153,
    level: "Rất khó",
    question:
      "Cho đến nay, ai là vị Tổng thống Hoa Kỳ duy nhất từng từ chức khi đang đương nhiệm?",
    options: [
      "Richard Nixon",
      "Bill Clinton",
      "Andrew Johnson",
      "Donald Trump",
    ],
    answer: "Richard Nixon",
  },
  {
    id: 154,
    level: "Rất khó",
    question:
      "Thể loại âm nhạc Jazz có nguồn gốc phát triển từ thành phố nào của nước Mỹ?",
    options: ["Chicago", "New York", "New Orleans", "Memphis"],
    answer: "New Orleans",
  },
  {
    id: 155,
    level: "Rất khó",
    question:
      "'Hội chứng Stockholm' trong tâm lý học dùng để chỉ hiện tượng gì?",
    options: [
      "Chứng mất trí nhớ tạm thời sau chấn thương",
      "Con tin nảy sinh sự đồng cảm hoặc tình cảm với kẻ bắt cóc",
      "Nỗi sợ hãi những không gian chật hẹp",
      "Sự ám ảnh cưỡng chế với việc rửa tay",
    ],
    answer: "Con tin nảy sinh sự đồng cảm hoặc tình cảm với kẻ bắt cóc",
  },
  {
    id: 156,
    level: "Rất khó",
    question:
      "Tác giả của tiểu thuyết 'Ông già và biển cả' (The Old Man and the Sea) là ai?",
    options: [
      "F. Scott Fitzgerald",
      "Ernest Hemingway",
      "John Steinbeck",
      "Mark Twain",
    ],
    answer: "Ernest Hemingway",
  },
  {
    id: 157,
    level: "Rất khó",
    question:
      "Trong kinh tế học vi mô, 'Chi phí cơ hội' (Opportunity cost) nghĩa là gì?",
    options: [
      "Chi phí bằng tiền để mua một món hàng",
      "Giá trị của lựa chọn tốt nhất bị bỏ lỡ khi đưa ra quyết định",
      "Chi phí phát sinh thêm khi sản xuất thêm một đơn vị",
      "Chi phí không thể thu hồi lại được",
    ],
    answer: "Giá trị của lựa chọn tốt nhất bị bỏ lỡ khi đưa ra quyết định",
  },
  {
    id: 158,
    level: "Rất khó",
    question:
      "Nhà thám hiểm nào đã dẫn đầu chuyến đi vòng quanh thế giới đầu tiên trong lịch sử?",
    options: [
      "Christopher Columbus",
      "Vasco da Gama",
      "Ferdinand Magellan",
      "James Cook",
    ],
    answer: "Ferdinand Magellan",
  },
  {
    id: 159,
    level: "Rất khó",
    question:
      "Triết gia Jean-Paul Sartre là người đại diện tiêu biểu cho trào lưu triết học nào?",
    options: [
      "Chủ nghĩa khắc kỷ",
      "Chủ nghĩa hiện sinh",
      "Chủ nghĩa kinh nghiệm",
      "Chủ nghĩa hư vô",
    ],
    answer: "Chủ nghĩa hiện sinh",
  },
  {
    id: 160,
    level: "Rất khó",
    question:
      "Hiệp ước Versailles (1919) được ký kết nhằm đánh dấu sự kết thúc của sự kiện nào?",
    options: [
      "Chiến tranh thế giới thứ nhất",
      "Chiến tranh thế giới thứ hai",
      "Chiến tranh lạnh",
      "Chiến tranh Napoleon",
    ],
    answer: "Chiến tranh thế giới thứ nhất",
  },
  {
    id: 161,
    level: "Rất khó",
    question: "Thiên hà chứa Hệ Mặt Trời của chúng ta có tên gọi là gì?",
    options: ["Andromeda", "Milky Way (Ngân Hà)", "Triangulum", "Sombrero"],
    answer: "Milky Way (Ngân Hà)",
  },
  {
    id: 162,
    level: "Rất khó",
    question:
      "Trong sinh học tế bào, chu trình Krebs (chu trình axit citric) diễn ra ở bào quan nào?",
    options: ["Nhân tế bào", "Lục lạp", "Ti thể", "Bộ máy Golgi"],
    answer: "Ti thể",
  },
  {
    id: 163,
    level: "Rất khó",
    question:
      "Nguyên tố kim loại nào tồn tại ở trạng thái lỏng trong điều kiện nhiệt độ và áp suất tiêu chuẩn?",
    options: ["Gallium", "Francium", "Bromine", "Thủy ngân (Mercury)"],
    answer: "Thủy ngân (Mercury)",
  },
  {
    id: 164,
    level: "Rất khó",
    question:
      "Triết gia vĩ đại nào của Hy Lạp cổ đại là người đã dạy dỗ Alexander Đại đế?",
    options: ["Socrates", "Plato", "Aristotle", "Pythagoras"],
    answer: "Aristotle",
  },
  {
    id: 165,
    level: "Rất khó",
    question:
      "Nhà toán học Alan Turing đóng vai trò then chốt trong việc gì vào Thế chiến II?",
    options: [
      "Chế tạo bom nguyên tử",
      "Giải mã cỗ máy Enigma của Đức Quốc xã",
      "Phát minh ra radar",
      "Thiết kế máy bay tiêm kích",
    ],
    answer: "Giải mã cỗ máy Enigma của Đức Quốc xã",
  },
  {
    id: 166,
    level: "Rất khó",
    question:
      "Tác phẩm 'Tội ác và hình phạt' (Crime and Punishment) là của nhà văn người Nga nào?",
    options: [
      "Anton Chekhov",
      "Leo Tolstoy",
      "Ivan Turgenev",
      "Fyodor Dostoevsky",
    ],
    answer: "Fyodor Dostoevsky",
  },
  {
    id: 167,
    level: "Rất khó",
    question:
      "Nhà toán học người Hy Lạp nào được mệnh danh là 'Cha đẻ của Hình học'?",
    options: ["Archimedes", "Pythagoras", "Euclid", "Thales"],
    answer: "Euclid",
  },
  {
    id: 168,
    level: "Rất khó",
    question:
      "Giải thưởng danh giá nhất trong lĩnh vực Toán học, thường được ví như 'Giải Nobel Toán học', là gì?",
    options: ["Giải Turing", "Huy chương Fields", "Giải Abel", "Giải Pulitzer"],
    answer: "Huy chương Fields",
  },
  {
    id: 169,
    level: "Rất khó",
    question:
      "Trong hóa học, nguyên tố nào phổ biến nhất trong toàn bộ vũ trụ?",
    options: ["Oxy (Oxygen)", "Carbon", "Hydro (Hydrogen)", "Heli (Helium)"],
    answer: "Hydro (Hydrogen)",
  },
  {
    id: 170,
    level: "Rất khó",
    question: "Đơn vị thiên văn (AU) được định nghĩa dựa trên khoảng cách nào?",
    options: [
      "Khoảng cách ánh sáng đi được trong 1 năm",
      "Khoảng cách trung bình từ Trái Đất đến Mặt Trăng",
      "Khoảng cách trung bình từ Trái Đất đến Mặt Trời",
      "Đường kính của Hệ Mặt Trời",
    ],
    answer: "Khoảng cách trung bình từ Trái Đất đến Mặt Trời",
  },
  {
    id: 171,
    level: "Rất khó",
    question:
      "Ai là người đã chế tạo ra quả pin điện đầu tiên (Pin Volta) vào năm 1800?",
    options: [
      "Thomas Edison",
      "Nikola Tesla",
      "Alessandro Volta",
      "Michael Faraday",
    ],
    answer: "Alessandro Volta",
  },
  {
    id: 172,
    level: "Rất khó",
    question:
      "Cuốn sách 'Nguồn gốc các loài' (On the Origin of Species) là công trình của nhà khoa học nào?",
    options: [
      "Gregor Mendel",
      "Charles Darwin",
      "Louis Pasteur",
      "Jean-Baptiste Lamarck",
    ],
    answer: "Charles Darwin",
  },
  {
    id: 173,
    level: "Rất khó",
    question:
      "Hồ nước mặn nào có độ mặn cao đến mức con người có thể nổi tự nhiên trên mặt nước?",
    options: ["Hồ Baikal", "Biển Caspi", "Biển Chết (Dead Sea)", "Hồ Victoria"],
    answer: "Biển Chết (Dead Sea)",
  },
  {
    id: 174,
    level: "Rất khó",
    question:
      "Trong vật lý nhiệt động lực học, khái niệm 'Entropy' dùng để đo lường điều gì?",
    options: [
      "Tổng năng lượng của một hệ",
      "Mức độ hỗn loạn (trạng thái vi mô) của một hệ",
      "Khả năng sinh công của một hệ",
      "Tốc độ truyền nhiệt giữa các vật",
    ],
    answer: "Mức độ hỗn loạn (trạng thái vi mô) của một hệ",
  },
  {
    id: 175,
    level: "Rất khó",
    question:
      "Vương triều nào có thời gian trị vì lâu nhất trong lịch sử phong kiến Trung Quốc?",
    options: ["Nhà Hán", "Nhà Đường", "Nhà Chu", "Nhà Thanh"],
    answer: "Nhà Chu",
  },
  {
    id: 176,
    level: "Rất khó",
    question:
      "Thuyết Tương đối Hẹp (Special Relativity) với phương trình E=mc² được Albert Einstein công bố vào năm nào?",
    options: ["1895", "1905", "1915", "1925"],
    answer: "1905",
  },
  {
    id: 177,
    level: "Rất khó",
    question:
      "Mạng máy tính nào do Bộ Quốc phòng Mỹ tài trợ được coi là tiền thân của Internet hiện đại?",
    options: ["NSFNET", "ARPANET", "Ethernet", "MILNET"],
    answer: "ARPANET",
  },
  {
    id: 178,
    level: "Rất khó",
    question:
      "Trong tế bào nhân thực, bào quan nào đóng vai trò chính trong quá trình tổng hợp protein?",
    options: ["Ribosome", "Lysosome", "Mạng lưới nội chất trơn", "Ti thể"],
    answer: "Ribosome",
  },
  {
    id: 179,
    level: "Rất khó",
    question:
      "Ai là tác giả của kiệt tác văn học Pháp 'Những người khốn khổ' (Les Misérables)?",
    options: [
      "Alexandre Dumas",
      "Albert Camus",
      "Victor Hugo",
      "Gustave Flaubert",
    ],
    answer: "Victor Hugo",
  },
  {
    id: 180,
    level: "Rất khó",
    question:
      "Nền văn minh Lưỡng Hà (Mesopotamia) cổ đại phát triển ở vùng đồng bằng giữa hai con sông nào?",
    options: [
      "Sông Nile và sông Jordan",
      "Sông Hằng và sông Ấn",
      "Sông Tigris và sông Euphrates",
      "Sông Hoàng Hà và sông Dương Tử",
    ],
    answer: "Sông Tigris và sông Euphrates",
  },
  {
    id: 181,
    level: "Rất khó",
    question:
      "Bảng chữ cái Cyrillic (Kirin) hiện nay được sử dụng làm cơ sở cho ngôn ngữ của quốc gia nào sau đây?",
    options: ["Đức", "Nga", "Hy Lạp", "Thổ Nhĩ Kỳ"],
    answer: "Nga",
  },
  {
    id: 182,
    level: "Rất khó",
    question:
      "Ai là người thiết lập nên hệ thống phân loại tuần hoàn các nguyên tố hóa học (Bảng tuần hoàn)?",
    options: [
      "Dmitri Mendeleev",
      "Niels Bohr",
      "Marie Curie",
      "Ernest Rutherford",
    ],
    answer: "Dmitri Mendeleev",
  },
  {
    id: 183,
    level: "Rất khó",
    question:
      "Bức tranh nổi tiếng 'Đêm đầy sao' (The Starry Night) được vẽ bởi danh họa nào?",
    options: [
      "Claude Monet",
      "Edvard Munch",
      "Vincent van Gogh",
      "Paul Cézanne",
    ],
    answer: "Vincent van Gogh",
  },
  {
    id: 184,
    level: "Rất khó",
    question: "Trong thiên văn học, 'Lỗ đen' (Black hole) là gì?",
    options: [
      "Một vùng không gian không có vật chất",
      "Nơi mà lực hấp dẫn mạnh đến mức ánh sáng cũng không thể thoát ra",
      "Một ngôi sao đang bốc cháy ở giai đoạn cuối",
      "Vùng tối trên bề mặt của Mặt Trời",
    ],
    answer: "Nơi mà lực hấp dẫn mạnh đến mức ánh sáng cũng không thể thoát ra",
  },
  {
    id: 185,
    level: "Rất khó",
    question:
      "Tên gọi 'Chiến tranh lạnh' (Cold War) dùng để chỉ cuộc đối đầu địa chính trị chủ yếu giữa hai siêu cường nào?",
    options: [
      "Mỹ và Trung Quốc",
      "Anh và Pháp",
      "Mỹ và Liên Xô",
      "Đức và Liên Xô",
    ],
    answer: "Mỹ và Liên Xô",
  },
  {
    id: 186,
    level: "Rất khó",
    question:
      "Cấu trúc chuỗi xoắn kép của phân tử DNA được công bố lần đầu tiên bởi hai nhà khoa học nào?",
    options: [
      "Rosalind Franklin & Maurice Wilkins",
      "James Watson & Francis Crick",
      "Louis Pasteur & Robert Koch",
      "Charles Darwin & Gregor Mendel",
    ],
    answer: "James Watson & Francis Crick",
  },
  {
    id: 187,
    level: "Rất khó",
    question:
      "Khái niệm 'Quyền lực mềm' (Soft power) trong quan hệ quốc tế ám chỉ điều gì?",
    options: [
      "Sử dụng quân đội để đe dọa",
      "Áp đặt trừng phạt kinh tế",
      "Sử dụng sức hấp dẫn về văn hóa, giá trị và chính sách để ảnh hưởng",
      "Mua chuộc lãnh đạo quốc gia khác",
    ],
    answer:
      "Sử dụng sức hấp dẫn về văn hóa, giá trị và chính sách để ảnh hưởng",
  },
  {
    id: 188,
    level: "Rất khó",
    question: "Trong lịch sử máy tính, định luật Moore dự đoán điều gì?",
    options: [
      "Giá của máy tính sẽ giảm một nửa mỗi năm",
      "Số lượng transistor trên một vi mạch sẽ tăng gấp đôi sau khoảng 18-24 tháng",
      "Tốc độ mạng internet sẽ tăng gấp đôi mỗi năm",
      "Năng lượng tiêu thụ của máy tính sẽ tỷ lệ nghịch với tốc độ",
    ],
    answer:
      "Số lượng transistor trên một vi mạch sẽ tăng gấp đôi sau khoảng 18-24 tháng",
  },
  {
    id: 189,
    level: "Rất khó",
    question:
      "Nhà tâm lý học nào đã đoạt giải Nobel Kinh tế năm 2002 nhờ việc ứng dụng tâm lý học vào nghiên cứu kinh tế (Kinh tế học hành vi)?",
    options: [
      "Daniel Kahneman",
      "Milton Friedman",
      "Paul Krugman",
      "John Nash",
    ],
    answer: "Daniel Kahneman",
  },
  {
    id: 190,
    level: "Rất khó",
    question:
      "Dạng hình học kiến trúc nào chịu lực tốt nhất và được ứng dụng rộng rãi để xây dựng các mái vòm cổ đại như đền Pantheon?",
    options: [
      "Hình chóp",
      "Hình lập phương",
      "Vòm bán cầu (Arch/Dome)",
      "Hình hộp chữ nhật",
    ],
    answer: "Vòm bán cầu (Arch/Dome)",
  },
  {
    id: 191,
    level: "Dễ",
    question: "Tác giả bài thơ 'Nam quốc sơn hà' được tương truyền là ai?",
    options: ["Nguyễn Trãi", "Lý Thường Kiệt", "Trần Hưng Đạo", "Ngô Quyền"],
    answer: "Lý Thường Kiệt",
  },
  {
    id: 192,
    level: "Dễ",
    question: "Màu nào sau đây KHÔNG có trong đèn tín hiệu giao thông?",
    options: ["Đỏ", "Vàng", "Xanh lá cây", "Xanh dương"],
    answer: "Xanh dương",
  },
  {
    id: 193,
    level: "Dễ",
    question: "Động vật nào sau đây thường phát ra tiếng kêu 'meo meo'?",
    options: ["Chó", "Mèo", "Lợn", "Gà"],
    answer: "Mèo",
  },
  {
    id: 194,
    level: "Dễ",
    question: "'Cầu thủ' là từ thường dùng để gọi người chơi môn thể thao nào?",
    options: ["Bóng đá", "Cờ vua", "Bơi lội", "Điền kinh"],
    answer: "Bóng đá",
  },
  {
    id: 195,
    level: "Dễ",
    question: "Bánh chưng truyền thống của Việt Nam có hình gì?",
    options: ["Hình tròn", "Hình vuông", "Hình tam giác", "Hình chữ nhật"],
    answer: "Hình vuông",
  },
  {
    id: 196,
    level: "Dễ",
    question: "Quốc gia nào giáp biên giới phía Bắc của Việt Nam?",
    options: ["Lào", "Campuchia", "Trung Quốc", "Thái Lan"],
    answer: "Trung Quốc",
  },
  {
    id: 197,
    level: "Dễ",
    question: "Bảng chữ cái tiếng Việt chuẩn có bao nhiêu chữ cái?",
    options: ["24", "26", "29", "31"],
    answer: "29",
  },
  {
    id: 198,
    level: "Dễ",
    question: "Loài chim nào thường được chọn làm biểu tượng cho hòa bình?",
    options: ["Đại bàng", "Chim sẻ", "Chim cánh cụt", "Bồ câu"],
    answer: "Bồ câu",
  },
  {
    id: 199,
    level: "Dễ",
    question: "Loài hoa nào được xem là Quốc hoa của Việt Nam?",
    options: ["Hoa hồng", "Hoa sen", "Hoa mai", "Hoa cúc"],
    answer: "Hoa sen",
  },
  {
    id: 200,
    level: "Dễ",
    question: "Cơ quan nào trên cơ thể người đảm nhận khứu giác (ngửi)?",
    options: ["Mắt", "Mũi", "Tai", "Miệng"],
    answer: "Mũi",
  },
  {
    id: 201,
    level: "Dễ",
    question: "Mặt Trăng là vệ tinh tự nhiên quay xung quanh hành tinh nào?",
    options: ["Sao Kim", "Trái Đất", "Sao Hỏa", "Sao Thổ"],
    answer: "Trái Đất",
  },
  {
    id: 202,
    level: "Dễ",
    question: "Một ngày có bao nhiêu giờ?",
    options: ["12", "20", "24", "48"],
    answer: "24",
  },
  {
    id: 203,
    level: "Dễ",
    question:
      "Trong truyện cổ tích, cô bé mang thức ăn cho bà ngoại đội chiếc khăn màu gì?",
    options: ["Xanh", "Vàng", "Đỏ", "Tím"],
    answer: "Đỏ",
  },
  {
    id: 204,
    level: "Dễ",
    question: "Biển Đông nằm ở hướng nào của đất liền Việt Nam?",
    options: ["Đông", "Tây", "Nam", "Bắc"],
    answer: "Đông",
  },
  {
    id: 205,
    level: "Dễ",
    question: "Động vật nào nổi tiếng với chiếc cổ rất dài?",
    options: ["Đà điểu", "Hươu cao cổ", "Lạc đà", "Voi"],
    answer: "Hươu cao cổ",
  },
  {
    id: 206,
    level: "Dễ",
    question: "Ngày Quốc tế Lao động là ngày nào?",
    options: ["1/5", "2/9", "8/3", "20/11"],
    answer: "1/5",
  },
  {
    id: 207,
    level: "Dễ",
    question: "Một hình tam giác có bao nhiêu cạnh?",
    options: ["2", "3", "4", "5"],
    answer: "3",
  },
  {
    id: 208,
    level: "Dễ",
    question: "Phương tiện giao thông nào di chuyển trên đường ray?",
    options: ["Máy bay", "Tàu hỏa", "Xe buýt", "Thuyền"],
    answer: "Tàu hỏa",
  },
  {
    id: 209,
    level: "Dễ",
    question:
      "Loại quả nào khi chín thường có màu đỏ, dùng làm nước sốt hoặc tương?",
    options: ["Cà chua", "Cà rốt", "Dưa chuột", "Khoai tây"],
    answer: "Cà chua",
  },
  {
    id: 210,
    level: "Dễ",
    question: "Tết Trung thu rơi vào rằm tháng mấy Âm lịch?",
    options: ["Tháng Giêng", "Tháng 3", "Tháng 7", "Tháng 8"],
    answer: "Tháng 8",
  },
  {
    id: 211,
    level: "Dễ",
    question: "Con giáp đứng đầu tiên trong 12 con giáp là con gì?",
    options: ["Sửu (Trâu)", "Dần (Hổ)", "Tý (Chuột)", "Mão (Mèo)"],
    answer: "Tý (Chuột)",
  },
  {
    id: 212,
    level: "Dễ",
    question:
      "Ở ngã tư, đèn giao thông màu gì yêu cầu các phương tiện phải dừng lại?",
    options: ["Xanh", "Đỏ", "Vàng", "Trắng"],
    answer: "Đỏ",
  },
  {
    id: 213,
    level: "Dễ",
    question: "Truyền thuyết 'Thánh Gióng' nhổ cây gì để đánh giặc Ân?",
    options: ["Cây đa", "Cây tre", "Cây chuối", "Cây tùng"],
    answer: "Cây tre",
  },
  {
    id: 214,
    level: "Dễ",
    question: "Tháng 12 Dương lịch có bao nhiêu ngày?",
    options: ["28", "29", "30", "31"],
    answer: "31",
  },
  {
    id: 215,
    level: "Dễ",
    question: "Người ta thường dùng lá gì để gói bánh chưng?",
    options: ["Lá chuối", "Lá dong", "Lá dừa", "Lá sen"],
    answer: "Lá dong",
  },

  // --- CẤP ĐỘ TRUNG BÌNH (25 câu: ID 216 - 240) ---
  {
    id: 216,
    level: "Trung bình",
    question:
      "Đại thi hào Nguyễn Du, tác giả Truyện Kiều, quê quán ở tỉnh nào?",
    options: ["Nghệ An", "Hà Tĩnh", "Quảng Bình", "Thanh Hóa"],
    answer: "Hà Tĩnh",
  },
  {
    id: 217,
    level: "Trung bình",
    question: "Châu lục nào lạnh nhất và có nhiều băng nhất thế giới?",
    options: ["Châu Âu", "Châu Bắc Cực", "Châu Nam Cực", "Châu Mỹ"],
    answer: "Châu Nam Cực",
  },
  {
    id: 218,
    level: "Trung bình",
    question: "Dụng cụ dùng để đo nhiệt độ cơ thể được gọi là gì?",
    options: ["Huyết áp kế", "Nhiệt kế", "Ống nghe", "Cân sức khỏe"],
    answer: "Nhiệt kế",
  },
  {
    id: 219,
    level: "Trung bình",
    question:
      "Ai được công nhận là người phát minh ra chiếc điện thoại thực tiễn đầu tiên?",
    options: [
      "Thomas Edison",
      "Nikola Tesla",
      "Alexander Graham Bell",
      "Albert Einstein",
    ],
    answer: "Alexander Graham Bell",
  },
  {
    id: 220,
    level: "Trung bình",
    question: "Tác phẩm 'Dế Mèn phiêu lưu ký' là của nhà văn nào?",
    options: ["Nam Cao", "Vũ Trọng Phụng", "Tô Hoài", "Nguyễn Nhật Ánh"],
    answer: "Tô Hoài",
  },
  {
    id: 221,
    level: "Trung bình",
    question:
      "Quốc gia nào trên thế giới thường được mệnh danh là 'Xứ sở hoa anh đào'?",
    options: ["Hàn Quốc", "Nhật Bản", "Trung Quốc", "Ấn Độ"],
    answer: "Nhật Bản",
  },
  {
    id: 222,
    level: "Trung bình",
    question:
      "Bộ xương của một người trưởng thành bình thường có bao nhiêu chiếc xương?",
    options: ["196", "206", "216", "226"],
    answer: "206",
  },
  {
    id: 223,
    level: "Trung bình",
    question: "Thủ đô của vương quốc Thái Lan là gì?",
    options: ["Jakarta", "Manila", "Kuala Lumpur", "Bangkok"],
    answer: "Bangkok",
  },
  {
    id: 224,
    level: "Trung bình",
    question: "Chiến dịch Điện Biên Phủ kết thúc thắng lợi vào năm nào?",
    options: ["1945", "1954", "1968", "1975"],
    answer: "1954",
  },
  {
    id: 225,
    level: "Trung bình",
    question: "Bức bích họa 'Bữa ăn tối cuối cùng' là sáng tác của họa sĩ nào?",
    options: [
      "Michelangelo",
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Pablo Picasso",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    id: 226,
    level: "Trung bình",
    question:
      "Loại khí nào trong không khí đóng vai trò thiết yếu để duy trì sự cháy?",
    options: ["Nitơ", "Oxy", "Carbon dioxide", "Hydro"],
    answer: "Oxy",
  },
  {
    id: 227,
    level: "Trung bình",
    question: "Đội tuyển bóng đá quốc gia nào vô địch FIFA World Cup 2022?",
    options: ["Pháp", "Brazil", "Argentina", "Croatia"],
    answer: "Argentina",
  },
  {
    id: 228,
    level: "Trung bình",
    question: "Hồ nước ngọt tự nhiên lớn nhất Việt Nam là hồ nào?",
    options: ["Hồ Tơ Nưng", "Hồ Ba Bể", "Hồ Trị An", "Hồ Dầu Tiếng"],
    answer: "Hồ Ba Bể",
  },
  {
    id: 229,
    level: "Trung bình",
    question: "Thành phố nào hiện có dân số đông nhất tại Việt Nam?",
    options: ["Hà Nội", "Hải Phòng", "Đà Nẵng", "TP. Hồ Chí Minh"],
    answer: "TP. Hồ Chí Minh",
  },
  {
    id: 230,
    level: "Trung bình",
    question:
      "Ai là người sáng tác bài hát 'Tiến quân ca' - Quốc ca của Việt Nam?",
    options: ["Lưu Hữu Phước", "Văn Cao", "Trịnh Công Sơn", "Phạm Duy"],
    answer: "Văn Cao",
  },
  {
    id: 231,
    level: "Trung bình",
    question:
      "Đơn vị đo cường độ dòng điện trong hệ đo lường quốc tế (SI) là gì?",
    options: ["Vôn (Volt)", "Ôm (Ohm)", "Oát (Watt)", "Ampe (Ampere)"],
    answer: "Ampe (Ampere)",
  },
  {
    id: 232,
    level: "Trung bình",
    question: "Vị vua nào đã đặt niên hiệu nước ta là Vạn Xuân?",
    options: ["Lý Bí (Lý Nam Đế)", "Ngô Quyền", "Lê Lợi", "Trần Nhân Tông"],
    answer: "Lý Bí (Lý Nam Đế)",
  },
  {
    id: 233,
    level: "Trung bình",
    question:
      "Dãy núi nào được coi là ranh giới tự nhiên chia cắt châu Á và châu Âu?",
    options: ["Alps", "Himalaya", "Ural", "Kavkaz"],
    answer: "Ural",
  },
  {
    id: 234,
    level: "Trung bình",
    question:
      "Hành tinh nào được mệnh danh là 'Hành tinh Đỏ' trong Hệ Mặt trời?",
    options: ["Sao Kim", "Sao Mộc", "Sao Hỏa", "Sao Thổ"],
    answer: "Sao Hỏa",
  },
  {
    id: 235,
    level: "Trung bình",
    question:
      "Vitamin nào khi kết hợp với ánh sáng mặt trời giúp cơ thể hấp thụ canxi tốt nhất?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    answer: "Vitamin D",
  },
  {
    id: 236,
    level: "Trung bình",
    question: "Động vật có vú nào sống trên cạn lớn nhất thế giới hiện nay?",
    options: ["Tê giác trắng", "Hà mã", "Voi châu Phi", "Gấu trắng"],
    answer: "Voi châu Phi",
  },
  {
    id: 237,
    level: "Trung bình",
    question: "Sân bay quốc tế Nội Bài nằm ở thành phố nào của Việt Nam?",
    options: ["Hải Phòng", "Hà Nội", "Bắc Ninh", "Đà Nẵng"],
    answer: "Hà Nội",
  },
  {
    id: 238,
    level: "Trung bình",
    question: "Ai là nữ tướng đầu tiên của Quân đội Nhân dân Việt Nam?",
    options: [
      "Nguyễn Thị Minh Khai",
      "Võ Thị Sáu",
      "Nguyễn Thị Định",
      "Bà Triệu",
    ],
    answer: "Nguyễn Thị Định",
  },
  {
    id: 239,
    level: "Trung bình",
    question: "Tượng Nữ thần Tự do là món quà do quốc gia nào tặng cho Hoa Kỳ?",
    options: ["Anh", "Pháp", "Tây Ban Nha", "Ý"],
    answer: "Pháp",
  },
  {
    id: 240,
    level: "Trung bình",
    question: "Đỉnh Phan Xi Păng (Fansipan) nằm ở dãy núi nào?",
    options: [
      "Dãy Trường Sơn",
      "Dãy Hoàng Liên Sơn",
      "Dãy Tam Đảo",
      "Dãy Bạch Mã",
    ],
    answer: "Dãy Hoàng Liên Sơn",
  },

  // --- CẤP ĐỘ KHÓ (25 câu: ID 241 - 265) ---
  {
    id: 241,
    level: "Khó",
    question:
      "Quốc gia nào trên thế giới có số lượng hòn đảo nhiều nhất (khoảng hơn 260.000 đảo)?",
    options: ["Indonesia", "Philippines", "Thụy Điển", "Canada"],
    answer: "Thụy Điển",
  },
  {
    id: 242,
    level: "Khó",
    question:
      "Tác giả của bộ truyện trinh thám nổi tiếng 'Sherlock Holmes' là ai?",
    options: [
      "Agatha Christie",
      "Arthur Conan Doyle",
      "Edgar Allan Poe",
      "Stephen King",
    ],
    answer: "Arthur Conan Doyle",
  },
  {
    id: 243,
    level: "Khó",
    question: "Nghệ sĩ nào được thế giới tôn vinh là 'Ông vua nhạc Pop'?",
    options: ["Elvis Presley", "Prince", "Michael Jackson", "Freddie Mercury"],
    answer: "Michael Jackson",
  },
  {
    id: 244,
    level: "Khó",
    question:
      "Khí nhà kính nào sau đây đóng vai trò chính gây ra hiện tượng nóng lên toàn cầu?",
    options: [
      "Ozon (O3)",
      "Nitơ dioxit (NO2)",
      "Carbon dioxide (CO2)",
      "Lưu huỳnh dioxit (SO2)",
    ],
    answer: "Carbon dioxide (CO2)",
  },
  {
    id: 245,
    level: "Khó",
    question:
      "Dòng sông nổi tiếng nào chảy xuyên qua thủ đô London của Vương quốc Anh?",
    options: ["Sông Seine", "Sông Rhine", "Sông Thames", "Sông Danube"],
    answer: "Sông Thames",
  },
  {
    id: 246,
    level: "Khó",
    question: "Nữ sĩ nào của Việt Nam được mệnh danh là 'Bà chúa thơ Nôm'?",
    options: [
      "Đoàn Thị Điểm",
      "Bà Huyện Thanh Quan",
      "Hồ Xuân Hương",
      "Lê Ngọc Hân",
    ],
    answer: "Hồ Xuân Hương",
  },
  {
    id: 247,
    level: "Khó",
    question: "Đồng Rupee là đơn vị tiền tệ chính thức của quốc gia nào?",
    options: ["Ai Cập", "Ấn Độ", "Thổ Nhĩ Kỳ", "Brazil"],
    answer: "Ấn Độ",
  },
  {
    id: 248,
    level: "Khó",
    question:
      "Vị vua nào của triều Nguyễn có thời gian ngồi trên ngai vàng ngắn nhất (chỉ 3 ngày)?",
    options: ["Dục Đức", "Hiệp Hòa", "Kiến Phúc", "Hàm Nghi"],
    answer: "Dục Đức",
  },
  {
    id: 249,
    level: "Khó",
    question:
      "Trận hải chiến lớn nhất trong Chiến tranh thế giới thứ nhất diễn ra tại đâu?",
    options: [
      "Trận Midway",
      "Trận Jutland",
      "Trận Trafalgar",
      "Trận Trân Châu Cảng",
    ],
    answer: "Trận Jutland",
  },
  {
    id: 250,
    level: "Khó",
    question: "Hạt nhân nguyên tử được cấu tạo bởi các loại hạt cơ bản nào?",
    options: [
      "Electron và Proton",
      "Electron và Neutron",
      "Proton và Neutron",
      "Chỉ có Proton",
    ],
    answer: "Proton và Neutron",
  },
  {
    id: 251,
    level: "Khó",
    question:
      "Vận tốc âm thanh truyền trong không khí ở điều kiện thường (20 độ C) xấp xỉ là bao nhiêu?",
    options: ["300.000 km/s", "343 m/s", "1.500 m/s", "34 m/s"],
    answer: "343 m/s",
  },
  {
    id: 252,
    level: "Khó",
    question:
      "Cúp Jules Rimet là tên gọi cũ của giải đấu thể thao danh giá nào?",
    options: [
      "Olympic",
      "UEFA Champions League",
      "FIFA World Cup",
      "Cúp Davis",
    ],
    answer: "FIFA World Cup",
  },
  {
    id: 253,
    level: "Khó",
    question:
      "Tại vòng loại World Cup 2002, Đội tuyển Úc đã lập kỷ lục thế giới khi thắng một đội bóng với tỷ số không tưởng 31-0. Đó là đội nào?",
    options: ["Samoa thuộc Mỹ (American Samoa)", "Tonga", "Fiji", "Vanuatu"],
    answer: "Samoa thuộc Mỹ (American Samoa)",
  },
  {
    id: 254,
    level: "Khó",
    question:
      "Nhà khoa học vĩ đại nào là người đã phát minh ra thuốc nổ Dynamite?",
    options: ["Marie Curie", "Alfred Nobel", "Thomas Edison", "Louis Pasteur"],
    answer: "Alfred Nobel",
  },
  {
    id: 255,
    level: "Khó",
    question: "Quốc gia nào có diện tích tự nhiên nhỏ nhất thế giới hiện nay?",
    options: ["Monaco", "Nauru", "Tuvalu", "Thành quốc Vatican"],
    answer: "Thành quốc Vatican",
  },
  {
    id: 256,
    level: "Khó",
    question:
      "Quần đảo Galapagos - nơi truyền cảm hứng cho Thuyết Tiến Hóa của Darwin - thuộc chủ quyền quốc gia nào?",
    options: ["Chile", "Ecuador", "Peru", "Argentina"],
    answer: "Ecuador",
  },
  {
    id: 257,
    level: "Khó",
    question:
      "Hiện tượng 'Mặt trời nửa đêm' (Mặt trời không lặn vào mùa hè) thường được quan sát rõ nhất ở quốc gia nào?",
    options: ["Na Uy", "Nhật Bản", "Australia", "New Zealand"],
    answer: "Na Uy",
  },
  {
    id: 258,
    level: "Khó",
    question:
      "Bản 'Tuyên ngôn Nhân quyền và Dân quyền' lịch sử năm 1789 ra đời trong cuộc cách mạng ở nước nào?",
    options: ["Mỹ", "Pháp", "Nga", "Anh"],
    answer: "Pháp",
  },
  {
    id: 259,
    level: "Khó",
    question:
      "Cuốn tiểu thuyết 'Bức tranh Dorian Gray' (The Picture of Dorian Gray) là tác phẩm duy nhất của nhà văn nào?",
    options: ["Charles Dickens", "Mark Twain", "Oscar Wilde", "Victor Hugo"],
    answer: "Oscar Wilde",
  },
  {
    id: 260,
    level: "Khó",
    question: "Ký hiệu hóa học của nguyên tố Natri (Sodium) là gì?",
    options: ["Ni", "Na", "Nd", "Ne"],
    answer: "Na",
  },
  {
    id: 261,
    level: "Khó",
    question:
      "Cuộc Cách mạng Công nghiệp lần thứ nhất bắt nguồn từ quốc gia nào vào cuối thế kỷ 18?",
    options: ["Đức", "Hoa Kỳ", "Anh", "Pháp"],
    answer: "Anh",
  },
  {
    id: 262,
    level: "Khó",
    question:
      "Chòm sao có tên tiếng Anh là 'Ursa Major' được người Việt gọi là gì?",
    options: [
      "Chòm sao Gấu Lớn (Đại Hùng)",
      "Chòm sao Bọ Cạp (Thiên Yết)",
      "Chòm sao Thợ Săn (Lạp Hộ)",
      "Chòm sao Thiên Xứng",
    ],
    answer: "Chòm sao Gấu Lớn (Đại Hùng)",
  },
  {
    id: 263,
    level: "Khó",
    question:
      "Trong máu con người, loại tế bào nào chịu trách nhiệm vận chuyển Oxy đi khắp cơ thể?",
    options: ["Bạch cầu", "Hồng cầu", "Tiểu cầu", "Huyết tương"],
    answer: "Hồng cầu",
  },
  {
    id: 264,
    level: "Khó",
    question:
      "Giải đấu quần vợt Wimbledon được tổ chức hàng năm trên mặt sân loại gì?",
    options: ["Sân đất nện", "Sân cỏ", "Sân cứng", "Sân thảm"],
    answer: "Sân cỏ",
  },
  {
    id: 265,
    level: "Khó",
    question: "Tháp nghiêng Pisa nổi tiếng của nước Ý nằm ở vùng nào?",
    options: ["Lombardy", "Sicily", "Tuscany", "Campania"],
    answer: "Tuscany",
  },

  // --- CẤP ĐỘ RẤT KHÓ (25 câu: ID 266 - 290) ---
  {
    id: 266,
    level: "Rất khó",
    question:
      "Hình thức nhà nước đầu tiên trong lịch sử dân tộc Việt Nam có tên là gì?",
    options: ["Vạn Xuân", "Âu Lạc", "Văn Lang", "Đại Cồ Việt"],
    answer: "Văn Lang",
  },
  {
    id: 267,
    level: "Rất khó",
    question:
      "Vệ tinh tự nhiên lớn nhất của Hệ Mặt Trời (lớn hơn cả Sao Thủy) tên là gì?",
    options: ["Titan", "Europa", "Callisto", "Ganymede"],
    answer: "Ganymede",
  },
  {
    id: 268,
    level: "Rất khó",
    question:
      "Theo định nghĩa của vật lý quang học, chỉ số khúc xạ của môi trường chân không bằng bao nhiêu?",
    options: ["0", "1", "3.14", "Vô cực"],
    answer: "1",
  },
  {
    id: 269,
    level: "Rất khó",
    question:
      "Bức họa mang chủ đề hiện sinh 'Tiếng thét' (The Scream) là kiệt tác của danh họa nào?",
    options: ["Edvard Munch", "Salvador Dalí", "Gustav Klimt", "René Magritte"],
    answer: "Edvard Munch",
  },
  {
    id: 270,
    level: "Rất khó",
    question:
      "Triều đại phong kiến nào ở Việt Nam nổi tiếng với câu nói lịch sử '9 chúa, 13 vua'?",
    options: ["Nhà Lê sơ", "Nhà Mạc", "Nhà Trịnh", "Nhà Nguyễn"],
    answer: "Nhà Nguyễn",
  },
  {
    id: 271,
    level: "Rất khó",
    question:
      "Hằng số cấu trúc tinh tế (ký hiệu là α) trong vật lý có giá trị xấp xỉ bằng bao nhiêu?",
    options: ["1/137", "3.1415", "1.618", "6.626"],
    answer: "1/137",
  },
  {
    id: 272,
    level: "Rất khó",
    question:
      "Triết gia người Đức Friedrich Nietzsche nổi tiếng nhất với tuyên bố triết học nào?",
    options: [
      "Tôi tư duy, nên tôi tồn tại",
      "Thượng đế đã chết",
      "Kiến thức là sức mạnh",
      "Con người sinh ra tự do",
    ],
    answer: "Thượng đế đã chết",
  },
  {
    id: 273,
    level: "Rất khó",
    question:
      "Cuốn tiểu thuyết phản địa đàng '1984' của nhà văn George Orwell mô tả loại hình nhà nước nào?",
    options: [
      "Dân chủ",
      "Cộng hòa",
      "Quân chủ lập hiến",
      "Toàn trị (Chuyên chế)",
    ],
    answer: "Toàn trị (Chuyên chế)",
  },
  {
    id: 274,
    level: "Rất khó",
    question:
      "'Hiệu ứng cánh bướm' (Butterfly effect) là một khái niệm ẩn dụ thuộc nhánh lý thuyết khoa học nào?",
    options: [
      "Lý thuyết trò chơi",
      "Lý thuyết hỗn loạn (Chaos theory)",
      "Cơ học lượng tử",
      "Thuyết tương đối",
    ],
    answer: "Lý thuyết hỗn loạn (Chaos theory)",
  },
  {
    id: 275,
    level: "Rất khó",
    question:
      "Lỗ hổng lớn nhất của tầng Ozone được các nhà khoa học phát hiện chủ yếu nằm ở khu vực nào của Trái Đất?",
    options: ["Bắc Cực", "Xích đạo", "Nam Cực", "Châu Úc"],
    answer: "Nam Cực",
  },
  {
    id: 276,
    level: "Rất khó",
    question:
      "Nhà khoa học máy tính nào là người đã phát minh ra ngôn ngữ lập trình C và đồng sáng tạo hệ điều hành Unix?",
    options: [
      "Alan Turing",
      "Dennis Ritchie",
      "Linus Torvalds",
      "Tim Berners-Lee",
    ],
    answer: "Dennis Ritchie",
  },
  {
    id: 277,
    level: "Rất khó",
    question:
      "Trận chiến Cannae (216 TCN), một kiệt tác về nghệ thuật bao vây tiêu diệt, là chiến thắng lẫy lừng của vị danh tướng nào?",
    options: [
      "Alexander Đại đế",
      "Julius Caesar",
      "Hannibal",
      "Thành Cát Tư Hãn",
    ],
    answer: "Hannibal",
  },
  {
    id: 278,
    level: "Rất khó",
    question:
      "Theo Mô hình Chuẩn của vật lý hạt, loại hạt sơ cấp nào đóng vai trò truyền tương tác mạnh (giữ các quark lại với nhau)?",
    options: ["Photon", "Gluon", "Boson W", "Graviton"],
    answer: "Gluon",
  },
  {
    id: 279,
    level: "Rất khó",
    question:
      "Giải Nobel Hóa học năm 2020 được trao cho Emmanuelle Charpentier và Jennifer Doudna nhờ phát triển công nghệ gì?",
    options: [
      "Pin Lithium-ion",
      "Xúc tác phân tử",
      "Công nghệ chỉnh sửa gen CRISPR-Cas9",
      "Tinh thể lượng tử",
    ],
    answer: "Công nghệ chỉnh sửa gen CRISPR-Cas9",
  },
  {
    id: 280,
    level: "Rất khó",
    question:
      "Tác phẩm 'Đợi chờ Godot' (Waiting for Godot) của Samuel Beckett là vở kịch tiêu biểu nhất thuộc trào lưu nghệ thuật nào?",
    options: [
      "Kịch hiện thực",
      "Kịch lãng mạn",
      "Kịch phi lý (Absurdism)",
      "Kịch cổ điển",
    ],
    answer: "Kịch phi lý (Absurdism)",
  },
  {
    id: 281,
    level: "Rất khó",
    question:
      "Mặc dù sông Nile dài nhất, nhưng con sông nào mới có lưu lượng nước đổ ra đại dương lớn nhất thế giới?",
    options: ["Sông Mississippi", "Sông Amazon", "Sông Dương Tử", "Sông Congo"],
    answer: "Sông Amazon",
  },
  {
    id: 282,
    level: "Rất khó",
    question:
      "Thuật ngữ chính trị 'Bức màn sắt' (Iron Curtain) do ai sử dụng đầu tiên để chỉ sự chia cắt ý thức hệ tại Châu Âu thời Chiến tranh Lạnh?",
    options: [
      "Harry S. Truman",
      "Joseph Stalin",
      "Winston Churchill",
      "Franklin D. Roosevelt",
    ],
    answer: "Winston Churchill",
  },
  {
    id: 283,
    level: "Rất khó",
    question:
      "Trong thiên văn học, 1 đơn vị Parsec (pc) tương đương với khoảng bao nhiêu năm ánh sáng?",
    options: ["1.61", "3.26", "8.31", "10.00"],
    answer: "3.26",
  },
  {
    id: 284,
    level: "Rất khó",
    question:
      "Nhà vật lý lượng tử nổi tiếng Erwin Schrödinger - tác giả của nghịch lý 'Con mèo của Schrödinger' - là người gốc nước nào?",
    options: ["Đức", "Áo", "Thụy Sĩ", "Đan Mạch"],
    answer: "Áo",
  },
  {
    id: 285,
    level: "Rất khó",
    question:
      "Ngôn ngữ nào được bác sĩ L. L. Zamenhof tạo ra năm 1887 và được coi là ngôn ngữ nhân tạo quốc tế phổ biến nhất hiện nay?",
    options: ["Ido", "Interlingua", "Volapük", "Esperanto (Quốc tế ngữ)"],
    answer: "Esperanto (Quốc tế ngữ)",
  },
  {
    id: 286,
    level: "Rất khó",
    question:
      "Sự kiện được coi là đưa thế giới đến bờ vực chiến tranh hạt nhân gần nhất - Cuộc khủng hoảng tên lửa Cuba - xảy ra vào năm nào?",
    options: ["1959", "1962", "1965", "1968"],
    answer: "1962",
  },
  {
    id: 287,
    level: "Rất khó",
    question:
      "Loại enzyme tiêu hóa nào có mặt ngay trong tuyến nước bọt của con người để bắt đầu quá trình phân giải tinh bột?",
    options: ["Pepsin", "Lipase", "Amylase", "Protease"],
    answer: "Amylase",
  },
  {
    id: 288,
    level: "Rất khó",
    question:
      "Trong hóa học hữu cơ, hợp chất nào có vòng lục giác đều và công thức phân tử là C6H6?",
    options: ["Benzen", "Phenol", "Toluen", "Hexan"],
    answer: "Benzen",
  },
  {
    id: 289,
    level: "Rất khó",
    question:
      "Thành phố nào của Châu Âu là nơi diễn ra lễ ký kết Hiệp định hòa bình chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam năm 1973?",
    options: ["Geneva", "Paris", "London", "Berlin"],
    answer: "Paris",
  },
  {
    id: 290,
    level: "Rất khó",
    question:
      "Nhà toán học kiệt xuất John von Neumann có đóng góp mang tính nền tảng cho việc thiết kế hệ thống của lĩnh vực nào sau đây?",
    options: [
      "Máy bay phản lực",
      "Kiến trúc máy tính (Kiến trúc von Neumann)",
      "Kính viễn vọng vô tuyến",
      "Máy tạo nhịp tim",
    ],
    answer: "Kiến trúc máy tính (Kiến trúc von Neumann)",
  },
  {
    id: 291,
    level: "Dễ",
    question: "Đâu là tên một loại nhạc cụ gõ?",
    options: ["Đàn ghi-ta", "Trống", "Sáo", "Đàn piano"],
    answer: "Trống",
  },
  {
    id: 292,
    level: "Dễ",
    question: "Một tuần lễ có bao nhiêu ngày?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    id: 293,
    level: "Dễ",
    question:
      "Con vật nào thường được người nông dân dùng để cày ruộng ngày xưa?",
    options: ["Con bò", "Con trâu", "Con ngựa", "Con chó"],
    answer: "Con trâu",
  },
  {
    id: 294,
    level: "Dễ",
    question: "Màu nào sau đây pha với màu đỏ sẽ tạo thành màu cam?",
    options: ["Xanh dương", "Vàng", "Trắng", "Đen"],
    answer: "Vàng",
  },
  {
    id: 295,
    level: "Dễ",
    question: "Văn Miếu - Quốc Tử Giám nằm ở thành phố nào của nước ta?",
    options: ["Hà Nội", "Huế", "Đà Nẵng", "TP. Hồ Chí Minh"],
    answer: "Hà Nội",
  },
  {
    id: 296,
    level: "Dễ",
    question: "Loài vật nào sau đây có khả năng đổi màu để ngụy trang?",
    options: ["Tắc kè hoa", "Chim ưng", "Cá mập", "Chó sói"],
    answer: "Tắc kè hoa",
  },
  {
    id: 297,
    level: "Dễ",
    question: "Bánh trôi, bánh chay thường được ăn vào dịp tết nào ở Việt Nam?",
    options: [
      "Tết Nguyên Đán",
      "Tết Hàn Thực",
      "Tết Trung Thu",
      "Tết Đoan Ngọ",
    ],
    answer: "Tết Hàn Thực",
  },
  {
    id: 298,
    level: "Dễ",
    question: "Lá cờ Tổ quốc Việt Nam có ngôi sao mấy cánh?",
    options: ["4 cánh", "5 cánh", "6 cánh", "8 cánh"],
    answer: "5 cánh",
  },
  {
    id: 299,
    level: "Dễ",
    question: "Hành tinh chúng ta đang sống có tên là gì?",
    options: ["Sao Mộc", "Trái Đất", "Sao Kim", "Sao Hỏa"],
    answer: "Trái Đất",
  },
  {
    id: 300,
    level: "Dễ",
    question: "Mạng nhện do con vật nào tạo ra?",
    options: ["Ong", "Bướm", "Nhện", "Kiến"],
    answer: "Nhện",
  },
  {
    id: 301,
    level: "Dễ",
    question: "Nước nào sau đây có diện tích lớn nhất thế giới?",
    options: ["Mỹ", "Trung Quốc", "Nga", "Canada"],
    answer: "Nga",
  },
  {
    id: 302,
    level: "Dễ",
    question: "Ai là tác giả của bài thơ 'Lượm'?",
    options: ["Tố Hữu", "Trần Đăng Khoa", "Xuân Diệu", "Chế Lan Viên"],
    answer: "Tố Hữu",
  },
  {
    id: 303,
    level: "Dễ",
    question: "Thức uống nào sau đây chứa nhiều canxi, tốt cho xương?",
    options: ["Nước ngọt có gas", "Cà phê", "Sữa", "Trà đá"],
    answer: "Sữa",
  },
  {
    id: 304,
    level: "Dễ",
    question: "Trong truyện Tấm Cám, Tấm đã nuôi con vật gì dưới giếng?",
    options: ["Cá chép", "Cá bống", "Cá rô", "Cá quả"],
    answer: "Cá bống",
  },
  {
    id: 305,
    level: "Dễ",
    question: "Nghề gõ đầu trẻ là cách gọi dân gian của nghề nào?",
    options: ["Nghề y", "Nghề giáo viên", "Nghề thợ mộc", "Nghề cắt tóc"],
    answer: "Nghề giáo viên",
  },
  {
    id: 306,
    level: "Dễ",
    question:
      "Côn trùng nào sau đây hút máu người và lây truyền bệnh sốt xuất huyết?",
    options: ["Ruồi", "Kiến", "Muỗi vằn", "Gián"],
    answer: "Muỗi vằn",
  },
  {
    id: 307,
    level: "Dễ",
    question: "Dãy núi dài nhất thế giới Andes nằm ở châu lục nào?",
    options: ["Châu Á", "Châu Phi", "Châu Nam Mỹ", "Châu Âu"],
    answer: "Châu Nam Mỹ",
  },
  {
    id: 308,
    level: "Dễ",
    question: "Môn thể thao nào sử dụng quả cầu có gắn lông vũ?",
    options: ["Bóng bàn", "Cầu lông", "Quần vợt", "Bóng chuyền"],
    answer: "Cầu lông",
  },
  {
    id: 309,
    level: "Dễ",
    question: "Con sông nào chảy qua thủ đô Hà Nội?",
    options: ["Sông Hương", "Sông Hồng", "Sông Sài Gòn", "Sông Lam"],
    answer: "Sông Hồng",
  },
  {
    id: 310,
    level: "Dễ",
    question: "Ngày Nhà giáo Việt Nam là ngày nào?",
    options: ["20/10", "20/11", "22/12", "27/7"],
    answer: "20/11",
  },
  {
    id: 311,
    level: "Dễ",
    question: "Kim loại nào có tính từ, có thể bị nam châm hút?",
    options: ["Nhôm", "Đồng", "Sắt", "Vàng"],
    answer: "Sắt",
  },
  {
    id: 312,
    level: "Dễ",
    question:
      "Bức tranh dân gian Đông Hồ 'Đám cưới chuột' thuộc tỉnh nào ngày nay?",
    options: ["Hải Dương", "Bắc Ninh", "Hưng Yên", "Hà Nam"],
    answer: "Bắc Ninh",
  },
  {
    id: 313,
    level: "Dễ",
    question:
      "Trong máy tính, thiết bị nào dùng để di chuyển con trỏ trên màn hình?",
    options: ["Bàn phím", "Màn hình", "Chuột", "Loa"],
    answer: "Chuột",
  },
  {
    id: 314,
    level: "Dễ",
    question:
      "Quả gì có vỏ màu xanh, ruột màu đỏ và nhiều hạt đen, thường ăn vào mùa hè?",
    options: ["Dưa hấu", "Dưa lưới", "Quả mâm xôi", "Quả lựu"],
    answer: "Dưa hấu",
  },
  {
    id: 315,
    level: "Dễ",
    question: "Tiếng sủa 'gâu gâu' là của con vật nào?",
    options: ["Mèo", "Chó", "Ngựa", "Lợn"],
    answer: "Chó",
  },
  {
    id: 316,
    level: "Dễ",
    question:
      "Bộ phận nào của cây làm nhiệm vụ hút nước và chất dinh dưỡng từ đất?",
    options: ["Lá", "Thân", "Rễ", "Hoa"],
    answer: "Rễ",
  },
  {
    id: 317,
    level: "Dễ",
    question: "Ông già Noel thường cưỡi cỗ xe do con vật nào kéo?",
    options: ["Ngựa vằn", "Tuần lộc", "Gấu tuyết", "Chó sói"],
    answer: "Tuần lộc",
  },
  {
    id: 318,
    level: "Dễ",
    question: "Trong trò chơi oẳn tù tì, cái búa sẽ thắng được cái gì?",
    options: ["Cái kéo", "Cái bao", "Cái búa", "Không thắng cái nào"],
    answer: "Cái kéo",
  },
  {
    id: 319,
    level: "Dễ",
    question: "Tôn Ngộ Không sử dụng vũ khí gì?",
    options: ["Đinh ba", "Thiền trượng", "Gậy Như Ý", "Vòng càn khôn"],
    answer: "Gậy Như Ý",
  },
  {
    id: 320,
    level: "Dễ",
    question:
      "Đâu là một loại hình nghệ thuật múa rối truyền thống của Việt Nam?",
    options: ["Múa rối bóng", "Múa rối nước", "Múa rối dây", "Múa rối que"],
    answer: "Múa rối nước",
  },
  {
    id: 321,
    level: "Dễ",
    question: "Ai là người mẹ của Sơn Tinh trong truyền thuyết?",
    options: ["Không được đề cập", "Mẫu Liễu Hạnh", "Bà Nữ Oa", "Mẹ Âu Cơ"],
    answer: "Không được đề cập",
  },
  {
    id: 322,
    level: "Dễ",
    question: "Nước biển có vị gì?",
    options: ["Ngọt", "Mặn", "Chua", "Đắng"],
    answer: "Mặn",
  },
  {
    id: 323,
    level: "Dễ",
    question: "Số tiếp theo trong dãy số 2, 4, 6, 8... là số nào?",
    options: ["9", "10", "11", "12"],
    answer: "10",
  },
  {
    id: 324,
    level: "Dễ",
    question:
      "Truyện cổ tích 'Sọ Dừa' nhân vật chính có ngoại hình giống cái gì?",
    options: ["Quả dưa", "Sọ dừa", "Hạt thóc", "Bông hoa"],
    answer: "Sọ dừa",
  },
  {
    id: 325,
    level: "Dễ",
    question: "Môn Toán học sử dụng các ký hiệu nào nhiều nhất?",
    options: ["Chữ cái", "Nốt nhạc", "Con số", "Hình ảnh động"],
    answer: "Con số",
  },
  {
    id: 326,
    level: "Dễ",
    question: "Phương tiện nào di chuyển chủ yếu trên bầu trời?",
    options: ["Xe lửa", "Xe đạp", "Máy bay", "Tàu thủy"],
    answer: "Máy bay",
  },
  {
    id: 327,
    level: "Dễ",
    question:
      "Trò chơi dân gian nào sử dụng những hòn sỏi hoặc đá nhỏ để tung và bắt?",
    options: [
      "Ô ăn quan",
      "Kéo co",
      "Bịt mắt bắt dê",
      "Chơi chuyền (banh đũa)",
    ],
    answer: "Chơi chuyền (banh đũa)",
  },
  {
    id: 328,
    level: "Dễ",
    question: "Thủ đô của nước Pháp là thành phố nào?",
    options: ["Rome", "Berlin", "Paris", "London"],
    answer: "Paris",
  },
  {
    id: 329,
    level: "Dễ",
    question: "Con vật nào được mệnh danh là 'Chúa tể rừng xanh'?",
    options: ["Voi", "Sư tử", "Hổ", "Báo"],
    answer: "Sư tử",
  },
  {
    id: 330,
    level: "Dễ",
    question: "Một năm nhuận có bao nhiêu ngày?",
    options: ["364", "365", "366", "367"],
    answer: "366",
  },
  {
    id: 331,
    level: "Dễ",
    question: "Ngôi sao trung tâm của Hệ Mặt Trời tên là gì?",
    options: ["Mặt Trăng", "Mặt Trời", "Sao Mộc", "Sao Kim"],
    answer: "Mặt Trời",
  },
  {
    id: 332,
    level: "Dễ",
    question: "Ai là tác giả của Quốc ca Việt Nam (Tiến quân ca)?",
    options: ["Phạm Tuyên", "Trịnh Công Sơn", "Văn Cao", "Lưu Hữu Phước"],
    answer: "Văn Cao",
  },
  {
    id: 333,
    level: "Dễ",
    question: "Người ta thường dùng gì để đánh răng?",
    options: ["Bàn chải", "Lược", "Dao cạo", "Khăn mặt"],
    answer: "Bàn chải",
  },
  {
    id: 334,
    level: "Dễ",
    question:
      "Nàng tiên cá trong truyện cổ tích của Andersen đã đánh đổi giọng hát để lấy thứ gì?",
    options: ["Đôi cánh", "Đôi chân", "Sự bất tử", "Sắc đẹp"],
    answer: "Đôi chân",
  },
  {
    id: 335,
    level: "Dễ",
    question: "Loại đèn nào phát sáng chủ yếu vào dịp Tết Trung Thu?",
    options: ["Đèn pin", "Đèn huỳnh quang", "Đèn ông sao", "Đèn giao thông"],
    answer: "Đèn ông sao",
  },
  {
    id: 336,
    level: "Dễ",
    question: "Từ nào chỉ hành động đưa thức ăn vào miệng và nhai nuốt?",
    options: ["Uống", "Ăn", "Ngủ", "Thở"],
    answer: "Ăn",
  },
  {
    id: 337,
    level: "Dễ",
    question: "Hình chữ nhật có bao nhiêu góc vuông?",
    options: ["2", "3", "4", "5"],
    answer: "4",
  },
  {
    id: 338,
    level: "Dễ",
    question: "Màu nào không thuộc nhóm 7 màu cầu vồng cơ bản?",
    options: ["Cam", "Trắng", "Lục", "Tím"],
    answer: "Trắng",
  },
  {
    id: 339,
    level: "Dễ",
    question: "Mùa nào trong năm bắt đầu sau mùa Đông?",
    options: ["Mùa Xuân", "Mùa Hạ", "Mùa Thu", "Mùa Mưa"],
    answer: "Mùa Xuân",
  },
  {
    id: 340,
    level: "Dễ",
    question: "Người đứng đầu một trường học thường được gọi là gì?",
    options: ["Giáo viên", "Lớp trưởng", "Hiệu trưởng", "Bảo vệ"],
    answer: "Hiệu trưởng",
  },

  // ==============================================
  // --- CẤP ĐỘ TRUNG BÌNH (50 câu: ID 341 - 390) ---
  // ==============================================
  {
    id: 341,
    level: "Trung bình",
    question: "Nhà Trần đã 3 lần đánh bại quân xâm lược nào?",
    options: ["Quân Tống", "Quân Thanh", "Quân Nguyên Mông", "Quân Minh"],
    answer: "Quân Nguyên Mông",
  },
  {
    id: 342,
    level: "Trung bình",
    question: "Thành phần nào chiếm thể tích lớn nhất trong không khí?",
    options: ["Khí Oxy", "Khí Carbonic", "Khí Nitơ", "Hơi nước"],
    answer: "Khí Nitơ",
  },
  {
    id: 343,
    level: "Trung bình",
    question: "Tượng nhân sư lớn (Great Sphinx) nằm ở quốc gia nào?",
    options: ["Hy Lạp", "Ý", "Iraq", "Ai Cập"],
    answer: "Ai Cập",
  },
  {
    id: 344,
    level: "Trung bình",
    question: "Cơ quan nội tạng lớn nhất của cơ thể con người là gì?",
    options: ["Phổi", "Gan", "Dạ dày", "Tim"],
    answer: "Gan",
  },
  {
    id: 345,
    level: "Trung bình",
    question: "Tên gọi của đơn vị tiền tệ chung Châu Âu là gì?",
    options: ["Đô la", "Bảng Anh", "Euro", "Franc"],
    answer: "Euro",
  },
  {
    id: 346,
    level: "Trung bình",
    question:
      "Lễ hội đua bò Bảy Núi là lễ hội đặc trưng của tỉnh nào ở miền Tây Nam Bộ?",
    options: ["An Giang", "Kiên Giang", "Sóc Trăng", "Trà Vinh"],
    answer: "An Giang",
  },
  {
    id: 347,
    level: "Trung bình",
    question: "Nhà văn nào sáng tác tiểu thuyết 'Số đỏ'?",
    options: ["Vũ Trọng Phụng", "Nam Cao", "Ngô Tất Tố", "Thạch Lam"],
    answer: "Vũ Trọng Phụng",
  },
  {
    id: 348,
    level: "Trung bình",
    question: "Châu lục nào nhỏ nhất thế giới về diện tích?",
    options: ["Châu Âu", "Châu Nam Cực", "Châu Đại Dương", "Châu Nam Mỹ"],
    answer: "Châu Đại Dương",
  },
  {
    id: 349,
    level: "Trung bình",
    question:
      "Phép toán nào được ưu tiên thực hiện trước trong một biểu thức không có dấu ngoặc?",
    options: ["Cộng", "Trừ", "Nhân và Chia", "Từ phải sang trái"],
    answer: "Nhân và Chia",
  },
  {
    id: 350,
    level: "Trung bình",
    question: "Đội tuyển bóng đá nào vô địch Euro 2024?",
    options: ["Tây Ban Nha", "Anh", "Đức", "Pháp"],
    answer: "Tây Ban Nha",
  },
  {
    id: 351,
    level: "Trung bình",
    question:
      "Bộ phim hoạt hình 3D đầu tiên trên thế giới của hãng Pixar là phim nào?",
    options: [
      "Shrek",
      "Câu chuyện đồ chơi (Toy Story)",
      "Vua Sư Tử",
      "Đi tìm Nemo",
    ],
    answer: "Câu chuyện đồ chơi (Toy Story)",
  },
  {
    id: 352,
    level: "Trung bình",
    question: "Theo thần thoại Hy Lạp, vị thần nào cai quản địa ngục?",
    options: ["Zeus", "Poseidon", "Hades", "Ares"],
    answer: "Hades",
  },
  {
    id: 353,
    level: "Trung bình",
    question:
      "Ngôn ngữ nào có nhiều người sử dụng như tiếng mẹ đẻ nhất thế giới?",
    options: [
      "Tiếng Anh",
      "Tiếng Tây Ban Nha",
      "Tiếng Quan Thoại (Trung Quốc)",
      "Tiếng Hindi",
    ],
    answer: "Tiếng Quan Thoại (Trung Quốc)",
  },
  {
    id: 354,
    level: "Trung bình",
    question: "Tên thật của Hồ Chí Minh thuở thiếu thời là gì?",
    options: [
      "Nguyễn Sinh Cung",
      "Nguyễn Tất Thành",
      "Nguyễn Ái Quốc",
      "Lý Thụy",
    ],
    answer: "Nguyễn Sinh Cung",
  },
  {
    id: 355,
    level: "Trung bình",
    question: "Chất nào mang lại màu xanh cho lá cây?",
    options: ["Carotene", "Diệp lục (Chlorophyll)", "Xanthophyll", "Melanin"],
    answer: "Diệp lục (Chlorophyll)",
  },
  {
    id: 356,
    level: "Trung bình",
    question: "Tác phẩm 'Bình Ngô đại cáo' do ai chắp bút?",
    options: ["Lê Lợi", "Nguyễn Trãi", "Trần Hưng Đạo", "Lý Thường Kiệt"],
    answer: "Nguyễn Trãi",
  },
  {
    id: 357,
    level: "Trung bình",
    question: "Thành phố nào được coi là 'Thủ phủ cà phê' của Việt Nam?",
    options: ["Đà Lạt", "Buôn Ma Thuột", "Pleiku", "Kon Tum"],
    answer: "Buôn Ma Thuột",
  },
  {
    id: 358,
    level: "Trung bình",
    question: "Ngôi đền Angkor Wat nổi tiếng nằm ở quốc gia nào?",
    options: ["Thái Lan", "Lào", "Campuchia", "Myanmar"],
    answer: "Campuchia",
  },
  {
    id: 359,
    level: "Trung bình",
    question: "Tên gọi của phím dài nhất trên bàn phím máy tính là gì?",
    options: ["Enter", "Shift", "Spacebar (Dấu cách)", "Backspace"],
    answer: "Spacebar (Dấu cách)",
  },
  {
    id: 360,
    level: "Trung bình",
    question:
      "Trận Bạch Đằng năm 938 là cuộc kháng chiến chống quân xâm lược nào?",
    options: ["Quân Nam Hán", "Quân Tống", "Quân Nguyên", "Quân Minh"],
    answer: "Quân Nam Hán",
  },
  {
    id: 361,
    level: "Trung bình",
    question: "Sông Amazon chảy chủ yếu qua quốc gia nào ở Nam Mỹ?",
    options: ["Argentina", "Chile", "Brazil", "Peru"],
    answer: "Brazil",
  },
  {
    id: 362,
    level: "Trung bình",
    question: "Đơn vị đo độ dài 'Inch' bằng khoảng bao nhiêu centimet?",
    options: ["1.54 cm", "2.54 cm", "3.14 cm", "5.08 cm"],
    answer: "2.54 cm",
  },
  {
    id: 363,
    level: "Trung bình",
    question:
      "Vitamin nào có nhiều nhất trong các loại quả có múi như cam, chanh?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin K"],
    answer: "Vitamin C",
  },
  {
    id: 364,
    level: "Trung bình",
    question: "Tác giả của bài thơ 'Tây Tiến' là nhà thơ nào?",
    options: ["Quang Dũng", "Hữu Thỉnh", "Tố Hữu", "Hàn Mặc Tử"],
    answer: "Quang Dũng",
  },
  {
    id: 365,
    level: "Trung bình",
    question: "Thủ đô của Hàn Quốc là gì?",
    options: ["Busan", "Incheon", "Jeju", "Seoul"],
    answer: "Seoul",
  },
  {
    id: 366,
    level: "Trung bình",
    question: "Trạng nguyên trẻ tuổi nhất lịch sử khoa bảng Việt Nam là ai?",
    options: [
      "Nguyễn Bỉnh Khiêm",
      "Nguyễn Hiền",
      "Lương Thế Vinh",
      "Mạc Đĩnh Chi",
    ],
    answer: "Nguyễn Hiền",
  },
  {
    id: 367,
    level: "Trung bình",
    question: "Người phát minh ra máy bay là ai?",
    options: [
      "Anh em nhà Wright",
      "Thomas Edison",
      "Henry Ford",
      "Alexander Graham Bell",
    ],
    answer: "Anh em nhà Wright",
  },
  {
    id: 368,
    level: "Trung bình",
    question: "Công cụ tìm kiếm phổ biến nhất trên Internet hiện nay là gì?",
    options: ["Bing", "Yahoo", "Google", "Baidu"],
    answer: "Google",
  },
  {
    id: 369,
    level: "Trung bình",
    question:
      "Đội tuyển bóng đá nam quốc gia Việt Nam lần đầu tiên vô địch AFF Cup vào năm nào?",
    options: ["1998", "2008", "2018", "2020"],
    answer: "2008",
  },
  {
    id: 370,
    level: "Trung bình",
    question:
      "Bệnh tiểu đường liên quan đến sự rối loạn chuyển hóa của hoóc-môn nào?",
    options: ["Adrenaline", "Thyroxine", "Insulin", "Testosterone"],
    answer: "Insulin",
  },
  {
    id: 371,
    level: "Trung bình",
    question: "Phố cổ Hội An thuộc tỉnh nào của Việt Nam?",
    options: ["Thừa Thiên Huế", "Đà Nẵng", "Quảng Nam", "Quảng Ngãi"],
    answer: "Quảng Nam",
  },
  {
    id: 372,
    level: "Trung bình",
    question:
      "Nhạc sĩ thiên tài Wolfgang Amadeus Mozart sinh ra ở quốc gia nào?",
    options: ["Đức", "Áo", "Pháp", "Ý"],
    answer: "Áo",
  },
  {
    id: 373,
    level: "Trung bình",
    question: "Đại dương nào nhỏ nhất trên Trái Đất?",
    options: [
      "Ấn Độ Dương",
      "Bắc Băng Dương",
      "Đại Tây Dương",
      "Nam Đại Dương",
    ],
    answer: "Bắc Băng Dương",
  },
  {
    id: 374,
    level: "Trung bình",
    question: "Cuốn sách 'Doraemon' là sáng tác của tác giả người nước nào?",
    options: ["Hàn Quốc", "Nhật Bản", "Trung Quốc", "Thái Lan"],
    answer: "Nhật Bản",
  },
  {
    id: 375,
    level: "Trung bình",
    question: "Quốc gia nào được gọi là 'Xứ sở chuột túi'?",
    options: ["New Zealand", "Mỹ", "Úc (Australia)", "Nam Phi"],
    answer: "Úc (Australia)",
  },
  {
    id: 376,
    level: "Trung bình",
    question:
      "Trong truyện Kiều, nhân vật nào đã lừa bán Thúy Kiều vào lầu xanh?",
    options: ["Tú Bà", "Sở Khanh", "Mã Giám Sinh", "Hồ Tôn Hiến"],
    answer: "Mã Giám Sinh",
  },
  {
    id: 377,
    level: "Trung bình",
    question: "Loại đường nào có nhiều trong trái cây và mật ong?",
    options: ["Fructose", "Glucose", "Sucrose", "Lactose"],
    answer: "Fructose",
  },
  {
    id: 378,
    level: "Trung bình",
    question: "Cột cờ Lũng Cú, điểm cực Bắc của Tổ quốc nằm ở tỉnh nào?",
    options: ["Cao Bằng", "Lào Cai", "Hà Giang", "Lai Châu"],
    answer: "Hà Giang",
  },
  {
    id: 379,
    level: "Trung bình",
    question: "Trong bóng rổ, một quả ném phạt thành công được tính mấy điểm?",
    options: ["1 điểm", "2 điểm", "3 điểm", "4 điểm"],
    answer: "1 điểm",
  },
  {
    id: 380,
    level: "Trung bình",
    question:
      "Ai là người thiết kế Dinh Độc Lập (Dinh Thống Nhất) hiện nay tại TP.HCM?",
    options: [
      "Ngô Viết Thụ",
      "Huỳnh Tấn Phát",
      "Hoàng Thúc Hào",
      "Võ Trọng Nghĩa",
    ],
    answer: "Ngô Viết Thụ",
  },
  {
    id: 381,
    level: "Trung bình",
    question:
      "Công viên quốc gia Yellowstone, công viên quốc gia đầu tiên trên thế giới nằm ở nước nào?",
    options: ["Canada", "Hoa Kỳ", "Úc", "Brazil"],
    answer: "Hoa Kỳ",
  },
  {
    id: 382,
    level: "Trung bình",
    question:
      "Màu nào sau đây không thuộc hệ màu cơ bản (RGB) trên màn hình điện tử?",
    options: [
      "Đỏ (Red)",
      "Xanh lục (Green)",
      "Xanh lam (Blue)",
      "Vàng (Yellow)",
    ],
    answer: "Vàng (Yellow)",
  },
  {
    id: 383,
    level: "Trung bình",
    question: "Ngày Giải phóng miền Nam, thống nhất đất nước là ngày nào?",
    options: ["30/4/1975", "2/9/1945", "7/5/1954", "27/7/1947"],
    answer: "30/4/1975",
  },
  {
    id: 384,
    level: "Trung bình",
    question: "Trái tim con người bình thường có bao nhiêu ngăn?",
    options: ["2", "3", "4", "5"],
    answer: "4",
  },
  {
    id: 385,
    level: "Trung bình",
    question: "Thủ đô của nước Nga là thành phố nào?",
    options: ["St. Petersburg", "Kazan", "Sochi", "Moscow (Mát-xcơ-va)"],
    answer: "Moscow (Mát-xcơ-va)",
  },
  {
    id: 386,
    level: "Trung bình",
    question:
      "Bộ phim nào có doanh thu phòng vé toàn cầu cao nhất mọi thời đại (tính đến đầu năm 2024)?",
    options: [
      "Titanic",
      "Avengers: Endgame",
      "Avatar",
      "Star Wars: The Force Awakens",
    ],
    answer: "Avatar",
  },
  {
    id: 387,
    level: "Trung bình",
    question: "Tổ chức Y tế Thế giới có tên viết tắt tiếng Anh là gì?",
    options: ["WTO", "WHO", "UNICEF", "UNESCO"],
    answer: "WHO",
  },
  {
    id: 388,
    level: "Trung bình",
    question:
      "Nhiệt độ sôi của nước tinh khiết ở áp suất tiêu chuẩn là bao nhiêu độ C?",
    options: ["90", "95", "100", "105"],
    answer: "100",
  },
  {
    id: 389,
    level: "Trung bình",
    question: "Họa sĩ Pablo Picasso là người nước nào?",
    options: ["Pháp", "Ý", "Tây Ban Nha", "Bồ Đào Nha"],
    answer: "Tây Ban Nha",
  },
  {
    id: 390,
    level: "Trung bình",
    question: "Eo biển nào tách rời giữa châu Á và châu Mỹ?",
    options: [
      "Eo biển Magellan",
      "Eo biển Bering",
      "Eo biển Malacca",
      "Eo biển Gibraltar",
    ],
    answer: "Eo biển Bering",
  },

  // =======================================
  // --- CẤP ĐỘ KHÓ (50 câu: ID 391 - 440) ---
  // =======================================
  {
    id: 391,
    level: "Khó",
    question:
      "Theo thuyết tiến hóa, tổ tiên loài người xuất hiện đầu tiên ở châu lục nào?",
    options: ["Châu Á", "Châu Âu", "Châu Phi", "Châu Mỹ"],
    answer: "Châu Phi",
  },
  {
    id: 392,
    level: "Khó",
    question: "Hoàng đế La Mã Julius Caesar bị ám sát vào ngày nào?",
    options: [
      "15 tháng 3 (Ides of March)",
      "4 tháng 7",
      "31 tháng 10",
      "25 tháng 12",
    ],
    answer: "15 tháng 3 (Ides of March)",
  },
  {
    id: 393,
    level: "Khó",
    question:
      "Thành phần chính của cát (cát thạch anh) là hợp chất hóa học nào?",
    options: [
      "Canxi cacbonat",
      "Silic dioxit (SiO2)",
      "Sắt oxit",
      "Natri clorua",
    ],
    answer: "Silic dioxit (SiO2)",
  },
  {
    id: 394,
    level: "Khó",
    question:
      "Nhà văn Viktor Frankl đã viết cuốn sách nổi tiếng nào sau khi sống sót khỏi trại tập trung Holocaust?",
    options: [
      "Nhật ký Anne Frank",
      "Đi tìm lẽ sống",
      "Kẻ trộm sách",
      "Chú bé mang bồ các sọc",
    ],
    answer: "Đi tìm lẽ sống",
  },
  {
    id: 395,
    level: "Khó",
    question: "Bán đảo Iberia hiện nay bao gồm chủ yếu hai quốc gia nào?",
    options: [
      "Anh và Ireland",
      "Ý và Hy Lạp",
      "Tây Ban Nha và Bồ Đào Nha",
      "Na Uy và Thụy Điển",
    ],
    answer: "Tây Ban Nha và Bồ Đào Nha",
  },
  {
    id: 396,
    level: "Khó",
    question:
      "Chiến tranh Lạnh chính thức kết thúc vào năm nào sau sự sụp đổ của Liên Xô?",
    options: ["1989", "1990", "1991", "1992"],
    answer: "1991",
  },
  {
    id: 397,
    level: "Khó",
    question:
      "Ai là đạo diễn của bộ phim kinh điển 'Bố Già' (The Godfather - 1972)?",
    options: [
      "Steven Spielberg",
      "Martin Scorsese",
      "Francis Ford Coppola",
      "Stanley Kubrick",
    ],
    answer: "Francis Ford Coppola",
  },
  {
    id: 398,
    level: "Khó",
    question: "Ký hiệu hóa học của nguyên tố Chì là gì?",
    options: ["Pb", "Pt", "Pd", "Pr"],
    answer: "Pb",
  },
  {
    id: 399,
    level: "Khó",
    question:
      "Nước nào là quốc gia đầu tiên trên thế giới trao quyền bầu cử cho phụ nữ (năm 1893)?",
    options: ["Anh", "Hoa Kỳ", "New Zealand", "Pháp"],
    answer: "New Zealand",
  },
  {
    id: 400,
    level: "Khó",
    question:
      "Đường kính của Trái Đất (tại xích đạo) xấp xỉ bao nhiêu kilomet?",
    options: ["6.371 km", "12.742 km", "24.901 km", "40.075 km"],
    answer: "12.742 km",
  },
  {
    id: 401,
    level: "Khó",
    question:
      "Trong thần thoại Bắc Âu, cây thế giới kết nối chín thế giới có tên là gì?",
    options: ["Yggdrasil", "Valhalla", "Asgard", "Ragnarok"],
    answer: "Yggdrasil",
  },
  {
    id: 402,
    level: "Khó",
    question: "Nhạc sĩ thiên tài Beethoven là người nước nào?",
    options: ["Áo", "Đức", "Pháp", "Nga"],
    answer: "Đức",
  },
  {
    id: 403,
    level: "Khó",
    question: "Hồ Baikal, hồ nước ngọt sâu nhất thế giới nằm ở đâu?",
    options: ["Canada", "Hoa Kỳ", "Nga", "Tanzania"],
    answer: "Nga",
  },
  {
    id: 404,
    level: "Khó",
    question:
      "Nobel Văn học năm 1913 được trao cho Rabindranath Tagore, ông là người nước nào?",
    options: ["Nhật Bản", "Ấn Độ", "Trung Quốc", "Ai Cập"],
    answer: "Ấn Độ",
  },
  {
    id: 405,
    level: "Khó",
    question:
      "Bức tranh 'Sự ra đời của sao Kim' (The Birth of Venus) là tác phẩm của họa sĩ Phục hưng nào?",
    options: [
      "Sandro Botticelli",
      "Leonardo da Vinci",
      "Raphael",
      "Michelangelo",
    ],
    answer: "Sandro Botticelli",
  },
  {
    id: 406,
    level: "Khó",
    question:
      "Cơ quan nội tạng nào của con người có khả năng tự tái tạo (mọc lại) một phần khi bị cắt bỏ?",
    options: ["Tim", "Thận", "Gan", "Phổi"],
    answer: "Gan",
  },
  {
    id: 407,
    level: "Khó",
    question: "Ai là vị vua sáng lập ra vương triều nhà Nguyễn ở Việt Nam?",
    options: [
      "Nguyễn Huệ (Quang Trung)",
      "Nguyễn Phúc Ánh (Gia Long)",
      "Nguyễn Phúc Đảm (Minh Mạng)",
      "Nguyễn Kim",
    ],
    answer: "Nguyễn Phúc Ánh (Gia Long)",
  },
  {
    id: 408,
    level: "Khó",
    question: "Ngôn ngữ nào là ngôn ngữ chính thức tại đất nước Argentina?",
    options: ["Tiếng Bồ Đào Nha", "Tiếng Tây Ban Nha", "Tiếng Anh", "Tiếng Ý"],
    answer: "Tiếng Tây Ban Nha",
  },
  {
    id: 409,
    level: "Khó",
    question:
      "Hiệu ứng nhà kính lần đầu tiên được định lượng và mô tả bởi nhà khoa học nào vào năm 1896?",
    options: [
      "Svante Arrhenius",
      "Isaac Newton",
      "Albert Einstein",
      "Nikola Tesla",
    ],
    answer: "Svante Arrhenius",
  },
  {
    id: 410,
    level: "Khó",
    question:
      "Trong cờ vua, quân cờ nào có giá trị chiến thuật được đánh giá tương đương khoảng 3 điểm?",
    options: ["Quân Tốt", "Quân Xe", "Quân Tượng", "Quân Hậu"],
    answer: "Quân Tượng",
  },
  {
    id: 411,
    level: "Khó",
    question:
      "Tên thật của nhà văn Mark Twain (tác giả Những cuộc phiêu lưu của Tom Sawyer) là gì?",
    options: [
      "Eric Arthur Blair",
      "Samuel Langhorne Clemens",
      "Charles Lutwidge Dodgson",
      "Mary Ann Evans",
    ],
    answer: "Samuel Langhorne Clemens",
  },
  {
    id: 412,
    level: "Khó",
    question:
      "Cuộc thi Marathon hiện đại có cự ly tiêu chuẩn xác định tại Olympic 1908 dài chính xác bao nhiêu kilomet?",
    options: ["40.00 km", "42.195 km", "42.00 km", "45.195 km"],
    answer: "42.195 km",
  },
  {
    id: 413,
    level: "Khó",
    question:
      "Tôn giáo nào sau đây không có khái niệm về một vị thần sáng tạo tối cao (Thượng Đế)?",
    options: ["Hồi giáo", "Cơ đốc giáo", "Phật giáo", "Do Thái giáo"],
    answer: "Phật giáo",
  },
  {
    id: 414,
    level: "Khó",
    question:
      "Theo Hiến pháp Hoa Kỳ, nhiệm kỳ tối đa của một Tổng thống là bao nhiêu năm?",
    options: ["4 năm", "8 năm", "10 năm", "Không giới hạn"],
    answer: "10 năm",
  },
  {
    id: 415,
    level: "Khó",
    question: "Phần mềm Photoshop được phát hành lần đầu tiên vào năm nào?",
    options: ["1985", "1990", "1995", "2000"],
    answer: "1990",
  },
  {
    id: 416,
    level: "Khó",
    question:
      "Kênh đào Panama được hoàn thành và chính thức mở cửa vào năm nào?",
    options: ["1869", "1899", "1914", "1939"],
    answer: "1914",
  },
  {
    id: 417,
    level: "Khó",
    question: "Ai là nữ tác giả châu Á đầu tiên giành giải Nobel Văn học?",
    options: [
      "Mạc Ngôn",
      "Kenzaburo Oe",
      "Han Kang",
      "Ngọc Trai (Pearl S. Buck - không tính vì bà là người Mỹ)",
    ],
    answer: "Han Kang",
  },
  {
    id: 418,
    level: "Khó",
    question:
      "Bức tượng Chúa Cứu Thế (Christ the Redeemer) nằm ở thành phố nào của Brazil?",
    options: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"],
    answer: "Rio de Janeiro",
  },
  {
    id: 419,
    level: "Khó",
    question:
      "Vệ tinh nhân tạo Sputnik 1 do quốc gia nào phóng lên vũ trụ đầu tiên?",
    options: ["Hoa Kỳ", "Liên Xô", "Trung Quốc", "Pháp"],
    answer: "Liên Xô",
  },
  {
    id: 420,
    level: "Khó",
    question:
      "Trong lịch sử triết học Trung Hoa, ai là người sáng lập ra Đạo giáo?",
    options: ["Khổng Tử", "Mạnh Tử", "Lão Tử", "Trang Tử"],
    answer: "Lão Tử",
  },
  {
    id: 421,
    level: "Khó",
    question: "Quốc gia duy nhất ở Đông Nam Á không giáp biển là nước nào?",
    options: ["Campuchia", "Lào", "Thái Lan", "Myanmar"],
    answer: "Lào",
  },
  {
    id: 422,
    level: "Khó",
    question:
      "Bức họa 'Cô gái đeo hoa tai ngọc trai' là tác phẩm của họa sĩ người nước nào?",
    options: ["Pháp", "Ý", "Hà Lan (Johannes Vermeer)", "Tây Ban Nha"],
    answer: "Hà Lan (Johannes Vermeer)",
  },
  {
    id: 423,
    level: "Khó",
    question:
      "Cơ hoành (diaphragm) đóng vai trò chính trong hệ thống cơ quan nào của con người?",
    options: ["Hệ tiêu hóa", "Hệ tuần hoàn", "Hệ hô hấp", "Hệ thần kinh"],
    answer: "Hệ hô hấp",
  },
  {
    id: 424,
    level: "Khó",
    question:
      "Hành tinh nào trong Hệ Mặt Trời có trục tự quay nghiêng gần ngang so với mặt phẳng quỹ đạo (lăn trên quỹ đạo)?",
    options: ["Sao Kim", "Sao Thiên Vương", "Sao Hải Vương", "Sao Thổ"],
    answer: "Sao Thiên Vương",
  },
  {
    id: 425,
    level: "Khó",
    question: "Triều đại nào ở Việt Nam đã đổi tên nước thành Đại Ngu?",
    options: ["Nhà Lý", "Nhà Trần", "Nhà Hồ", "Nhà Lê sơ"],
    answer: "Nhà Hồ",
  },
  {
    id: 426,
    level: "Khó",
    question:
      "Nước nào đã giành chức vô địch World Cup nam đầu tiên được tổ chức vào năm 1930?",
    options: ["Brazil", "Argentina", "Uruguay", "Đức"],
    answer: "Uruguay",
  },
  {
    id: 427,
    level: "Khó",
    question: "Hợp kim đồng thau (brass) là hỗn hợp của đồng và kim loại nào?",
    options: ["Kẽm (Zinc)", "Thiếc (Tin)", "Chì (Lead)", "Niken (Nickel)"],
    answer: "Kẽm (Zinc)",
  },
  {
    id: 428,
    level: "Khó",
    question:
      "Tên gọi của hiện tượng ánh sáng bị lệch hướng khi đi qua ranh giới giữa hai môi trường trong suốt khác nhau là gì?",
    options: ["Phản xạ", "Nhiễu xạ", "Khúc xạ", "Tán sắc"],
    answer: "Khúc xạ",
  },
  {
    id: 429,
    level: "Khó",
    question:
      "Quốc kỳ của nước nào có hình dạng không phải là tứ giác (chữ nhật hoặc vuông)?",
    options: ["Thụy Sĩ", "Nepal", "Qatar", "Vatican"],
    answer: "Nepal",
  },
  {
    id: 430,
    level: "Khó",
    question:
      "Tổ chức Hiệp ước Bắc Đại Tây Dương (NATO) được thành lập vào năm nào?",
    options: ["1945", "1949", "1955", "1991"],
    answer: "1949",
  },
  {
    id: 431,
    level: "Khó",
    question:
      "Khái niệm 'Vô thức tập thể' trong tâm lý học được đưa ra bởi nhà tâm lý học nào?",
    options: ["Sigmund Freud", "Carl Jung", "Ivan Pavlov", "Jean Piaget"],
    answer: "Carl Jung",
  },
  {
    id: 432,
    level: "Khó",
    question: "Ai là vị hoàng đế đầu tiên thống nhất Trung Hoa?",
    options: ["Hán Cao Tổ", "Tần Thủy Hoàng", "Đường Thái Tông", "Hán Vũ Đế"],
    answer: "Tần Thủy Hoàng",
  },
  {
    id: 433,
    level: "Khó",
    question: "Nhà toán học Pythagoras là người của nền văn minh cổ đại nào?",
    options: ["Ai Cập", "Lưỡng Hà", "Hy Lạp", "La Mã"],
    answer: "Hy Lạp",
  },
  {
    id: 434,
    level: "Khó",
    question:
      "Thung lũng Silicon, trung tâm công nghệ thế giới, nằm ở tiểu bang nào của Mỹ?",
    options: ["New York", "Texas", "California", "Washington"],
    answer: "California",
  },
  {
    id: 435,
    level: "Khó",
    question:
      "Loại kháng thể (Immunoglobulin) nào chiếm tỷ lệ cao nhất trong huyết thanh người?",
    options: ["IgA", "IgM", "IgE", "IgG"],
    answer: "IgG",
  },
  {
    id: 436,
    level: "Khó",
    question:
      "Bức tranh 'Sự kiên trì của ký ức' (The Persistence of Memory) nổi tiếng với những chiếc đồng hồ mềm chảy là của ai?",
    options: ["Salvador Dalí", "Pablo Picasso", "Joan Miró", "Rene Magritte"],
    answer: "Salvador Dalí",
  },
  {
    id: 437,
    level: "Khó",
    question: "Eo biển Gibraltar ngăn cách lục địa Châu Âu với lục địa nào?",
    options: ["Châu Á", "Châu Mỹ", "Châu Phi", "Châu Nam Cực"],
    answer: "Châu Phi",
  },
  {
    id: 438,
    level: "Khó",
    question:
      "Bảng tuần hoàn các nguyên tố hóa học hiện tại có bao nhiêu chu kỳ?",
    options: ["6", "7", "8", "9"],
    answer: "7",
  },
  {
    id: 439,
    level: "Khó",
    question: "Bài thơ 'Đồng chí' là tác phẩm nổi tiếng của nhà thơ nào?",
    options: ["Chính Hữu", "Tố Hữu", "Phạm Tiến Duật", "Nguyễn Đình Thi"],
    answer: "Chính Hữu",
  },
  {
    id: 440,
    level: "Khó",
    question:
      "Bộ phim nào đã giành được trọn vẹn 11 giải Oscar tại lễ trao giải năm 2004?",
    options: [
      "Ben-Hur",
      "Titanic",
      "Chúa tể những chiếc nhẫn: Sự trở về của nhà vua",
      "La La Land",
    ],
    answer: "Chúa tể những chiếc nhẫn: Sự trở về của nhà vua",
  },

  // ============================================
  // --- CẤP ĐỘ RẤT KHÓ (50 câu: ID 441 - 490) ---
  // ============================================
  {
    id: 441,
    level: "Rất khó",
    question:
      "Khái niệm 'Mã hóa lượng tử' (Quantum cryptography) chủ yếu dựa trên nguyên lý nào của cơ học lượng tử?",
    options: [
      "Nguyên lý loại trừ Pauli",
      "Nguyên lý bất định Heisenberg",
      "Hiệu ứng quang điện",
      "Bước nhảy lượng tử",
    ],
    answer: "Nguyên lý bất định Heisenberg",
  },
  {
    id: 442,
    level: "Rất khó",
    question:
      "Trong sinh học phân tử, cấu trúc 'Zinc finger' (Ngón tay kẽm) thường được tìm thấy ở loại đại phân tử nào?",
    options: ["Carbohydrate", "Lipid", "DNA", "Protein (yếu tố phiên mã)"],
    answer: "Protein (yếu tố phiên mã)",
  },
  {
    id: 443,
    level: "Rất khó",
    question:
      "Đại hội Hiệp hành (Council of Trent) của Giáo hội Công giáo, phản ứng lại cuộc Cải cách Tin Lành, bắt đầu vào năm nào?",
    options: ["1517", "1545", "1618", "1648"],
    answer: "1545",
  },
  {
    id: 444,
    level: "Rất khó",
    question:
      "Cuốn sách 'Tư bản luận' (Das Kapital) của Karl Marx xuất bản tập đầu tiên vào năm nào?",
    options: ["1848", "1867", "1883", "1894"],
    answer: "1867",
  },
  {
    id: 445,
    level: "Rất khó",
    question:
      "Triết gia Immanuel Kant đã trình bày thuyết 'Mệnh lệnh nhất quyết' (Categorical Imperative) trong tác phẩm nào?",
    options: [
      "Phê phán lý tính thuần túy",
      "Phê phán lý tính thực hành",
      "Cơ sở của siêu hình học đạo đức",
      "Phê phán năng lực phán đoán",
    ],
    answer: "Cơ sở của siêu hình học đạo đức",
  },
  {
    id: 446,
    level: "Rất khó",
    question:
      "Hội chứng DiGeorge ở người là do sự vi mất đoạn (microdeletion) ở nhiễm sắc thể số mấy?",
    options: ["NST 15", "NST 21", "NST 22", "NST X"],
    answer: "NST 22",
  },
  {
    id: 447,
    level: "Rất khó",
    question: "Hành tinh lùn Makemake nằm ở khu vực nào của Hệ Mặt Trời?",
    options: [
      "Vành đai tiểu hành tinh chính",
      "Đám mây Oort",
      "Vành đai Kuiper",
      "Khu vực Troia của Sao Mộc",
    ],
    answer: "Vành đai Kuiper",
  },
  {
    id: 448,
    level: "Rất khó",
    question:
      "Trong ngôn ngữ học, thuật ngữ 'hapax legomenon' dùng để chỉ điều gì?",
    options: [
      "Một từ chỉ xuất hiện duy nhất một lần trong toàn bộ một văn bản hoặc kho ngữ liệu",
      "Một từ mượn từ tiếng nước ngoài",
      "Một từ đồng âm khác nghĩa",
      "Một từ đã hoàn toàn tuyệt chủng",
    ],
    answer:
      "Một từ chỉ xuất hiện duy nhất một lần trong toàn bộ một văn bản hoặc kho ngữ liệu",
  },
  {
    id: 449,
    level: "Rất khó",
    question:
      "Ai là Thủ tướng Anh nắm quyền trong thời gian diễn ra cuộc Khủng hoảng kênh đào Suez năm 1956?",
    options: [
      "Winston Churchill",
      "Clement Attlee",
      "Anthony Eden",
      "Harold Macmillan",
    ],
    answer: "Anthony Eden",
  },
  {
    id: 450,
    level: "Rất khó",
    question:
      "Trong lý thuyết số, một 'Số hoàn thiện' (Perfect number) là số nguyên dương có tính chất gì?",
    options: [
      "Bằng tổng các ước thực sự của nó",
      "Là tích của 3 số nguyên tố liên tiếp",
      "Có tổng các chữ số bằng chính nó",
      "Không chia hết cho bất kỳ bình phương số nguyên nào",
    ],
    answer: "Bằng tổng các ước thực sự của nó",
  },
  {
    id: 451,
    level: "Rất khó",
    question:
      "Hiệp ước Tordesillas năm 1494 chia thế giới mới giữa hai đế quốc nào?",
    options: [
      "Anh và Pháp",
      "Tây Ban Nha và Bồ Đào Nha",
      "Hà Lan và Anh",
      "Tây Ban Nha và Hà Lan",
    ],
    answer: "Tây Ban Nha và Bồ Đào Nha",
  },
  {
    id: 452,
    level: "Rất khó",
    question:
      "Trong nghệ thuật Phục Hưng, 'Sfumato' là kỹ thuật vẽ được hoàn thiện bởi danh họa nào?",
    options: ["Michelangelo", "Titian", "Raphael", "Leonardo da Vinci"],
    answer: "Leonardo da Vinci",
  },
  {
    id: 453,
    level: "Rất khó",
    question:
      "Chu kỳ Milankovitch giải thích sự biến đổi khí hậu Trái Đất dài hạn thông qua sự thay đổi của yếu tố nào?",
    options: [
      "Hoạt động vết đen Mặt Trời",
      "Các thông số quỹ đạo của Trái Đất",
      "Hoạt động núi lửa toàn cầu",
      "Sự di chuyển của các mảng kiến tạo",
    ],
    answer: "Các thông số quỹ đạo của Trái Đất",
  },
  {
    id: 454,
    level: "Rất khó",
    question:
      "Bức thư Zimmermann nổi tiếng trong Thế chiến I là thông điệp mật của Đức gửi cho quốc gia nào?",
    options: ["Nhật Bản", "Mexico", "Tây Ban Nha", "Thổ Nhĩ Kỳ"],
    answer: "Mexico",
  },
  {
    id: 455,
    level: "Rất khó",
    question:
      "Định lý Bất toàn (Incompleteness Theorems) làm thay đổi nền tảng toán học logic được công bố bởi ai?",
    options: ["Bertrand Russell", "Kurt Gödel", "Alan Turing", "David Hilbert"],
    answer: "Kurt Gödel",
  },
  {
    id: 456,
    level: "Rất khó",
    question:
      "Nhiệt độ thấp nhất từng được ghi nhận trực tiếp trên bề mặt Trái Đất là tại Trạm Vostok (Nam Cực) vào năm 1983. Mức nhiệt độ đó là bao nhiêu?",
    options: ["-79.2 °C", "-89.2 °C", "-98.6 °C", "-102.4 °C"],
    answer: "-89.2 °C",
  },
  {
    id: 457,
    level: "Rất khó",
    question:
      "Loài Hominin cổ đại nào được phát hiện hóa thạch nguyên vẹn 'Lucy' (mẫu vật AL 288-1)?",
    options: [
      "Homo habilis",
      "Australopithecus afarensis",
      "Homo erectus",
      "Ardipithecus ramidus",
    ],
    answer: "Australopithecus afarensis",
  },
  {
    id: 458,
    level: "Rất khó",
    question:
      "Tác phẩm sử thi 'Gilgamesh', một trong những tác phẩm văn học lâu đời nhất, thuộc nền văn minh nào?",
    options: [
      "Ai Cập cổ đại",
      "Thung lũng sông Ấn",
      "Sumer (Lưỡng Hà)",
      "Ba Tư",
    ],
    answer: "Sumer (Lưỡng Hà)",
  },
  {
    id: 459,
    level: "Rất khó",
    question:
      "Thành phần hóa học nào là nguyên nhân chính gây ra mùi đặc trưng của cơn mưa sau thời gian dài khô hạn (Petrichor)?",
    options: ["Ozone", "Geosmin", "Lưu huỳnh dioxit", "Khí Metan"],
    answer: "Geosmin",
  },
  {
    id: 460,
    level: "Rất khó",
    question:
      "Bản Sonata Ánh trăng (Moonlight Sonata) của Beethoven ban đầu được ông đặt tiêu đề tiếng Ý là gì?",
    options: [
      "Sonata quasi una fantasia",
      "Sonata pathétique",
      "Appassionata",
      "Waldstein",
    ],
    answer: "Sonata quasi una fantasia",
  },
  {
    id: 461,
    level: "Rất khó",
    question:
      "Trong hóa sinh, chu trình Calvin-Benson diễn ra ở vị trí nào của lục lạp?",
    options: [
      "Màng Thylakoid",
      "Chất nền (Stroma)",
      "Khoang Thylakoid",
      "Màng ngoài lục lạp",
    ],
    answer: "Chất nền (Stroma)",
  },
  {
    id: 462,
    level: "Rất khó",
    question:
      "Đế quốc Khazar, một đế chế hùng mạnh thời Trung cổ ở khu vực Kavkaz, nổi tiếng vì tầng lớp tinh hoa của họ đã cải đạo sang tôn giáo nào?",
    options: [
      "Hồi giáo",
      "Cơ đốc giáo Chính thống",
      "Do Thái giáo",
      "Phật giáo",
    ],
    answer: "Do Thái giáo",
  },
  {
    id: 463,
    level: "Rất khó",
    question:
      "Thuật ngữ 'Agoraphobia' trong tâm lý học chỉ hội chứng sợ hãi điều gì?",
    options: [
      "Sợ nhện",
      "Sợ không gian hẹp",
      "Sợ đám đông và không gian mở",
      "Sợ độ cao",
    ],
    answer: "Sợ đám đông và không gian mở",
  },
  {
    id: 464,
    level: "Rất khó",
    question:
      "Nguyên tố Osmium (Os), nguyên tố nặng nhất (có khối lượng riêng lớn nhất) trong bảng tuần hoàn, thuộc nhóm nào?",
    options: ["Kim loại kiềm", "Khí hiếm", "Kim loại chuyển tiếp", "Actinide"],
    answer: "Kim loại chuyển tiếp",
  },
  {
    id: 465,
    level: "Rất khó",
    question:
      "Chiến dịch Barbarossa, cuộc xâm lược Liên Xô của Đức Quốc Xã, bắt đầu vào ngày tháng năm nào?",
    options: [
      "1 tháng 9, 1939",
      "22 tháng 6, 1941",
      "7 tháng 12, 1941",
      "6 tháng 6, 1944",
    ],
    answer: "22 tháng 6, 1941",
  },
  {
    id: 466,
    level: "Rất khó",
    question:
      "Khái niệm 'Dòng ý thức' (Stream of consciousness) trong văn học thường được gắn liền với nhà văn nào sáng tác tiểu thuyết 'Ulysses'?",
    options: [
      "Marcel Proust",
      "James Joyce",
      "Virginia Woolf",
      "William Faulkner",
    ],
    answer: "James Joyce",
  },
  {
    id: 467,
    level: "Rất khó",
    question:
      "Tia vũ trụ (Cosmic rays) chủ yếu bao gồm hạt nào có năng lượng cực cao?",
    options: ["Photon", "Neutrino", "Proton", "Electron"],
    answer: "Proton",
  },
  {
    id: 468,
    level: "Rất khó",
    question:
      "Ai là người đã chứng minh rằng có vô hạn các số nguyên tố, trong cuốn 'Cơ sở' (Elements) của mình?",
    options: ["Pythagoras", "Archimedes", "Euclid", "Diophantus"],
    answer: "Euclid",
  },
  {
    id: 469,
    level: "Rất khó",
    question:
      "Theo Hiệp ước Nam Cực ký năm 1959, Nam Cực được quy định như thế nào?",
    options: [
      "Thuộc quyền quản lý của Liên Hợp Quốc",
      "Chia cho 7 quốc gia tuyên bố chủ quyền",
      "Khu vực bảo tồn khoa học, cấm hoạt động quân sự",
      "Khu vực tự do khai thác khoáng sản thương mại",
    ],
    answer: "Khu vực bảo tồn khoa học, cấm hoạt động quân sự",
  },
  {
    id: 470,
    level: "Rất khó",
    question:
      "Hiệu ứng Casimir trong vật lý lượng tử dự đoán sự tồn tại của lực hút giữa hai tấm kim loại đặt cực sát nhau trong môi trường nào?",
    options: [
      "Chân không lượng tử",
      "Điện trường mạnh",
      "Từ trường siêu dẫn",
      "Khí trơ",
    ],
    answer: "Chân không lượng tử",
  },
  {
    id: 471,
    level: "Rất khó",
    question: "Sự cố hạt nhân Chernobyl xảy ra tại lò phản ứng số mấy?",
    options: ["Lò số 1", "Lò số 2", "Lò số 3", "Lò số 4"],
    answer: "Lò số 4",
  },
  {
    id: 472,
    level: "Rất khó",
    question:
      "Vị vua Frank nào đã được Giáo hoàng Leo III phong làm Hoàng đế của người La Mã vào Giáng sinh năm 800?",
    options: [
      "Clovis I",
      "Charles Martel",
      "Pepin Lùn",
      "Charlemagne (Carl Đại đế)",
    ],
    answer: "Charlemagne (Carl Đại đế)",
  },
  {
    id: 473,
    level: "Rất khó",
    question:
      "Trong tài chính, mô hình định giá quyền chọn Black-Scholes được xuất bản lần đầu vào năm nào?",
    options: ["1952", "1964", "1973", "1987"],
    answer: "1973",
  },
  {
    id: 474,
    level: "Rất khó",
    question:
      "Kính viễn vọng không gian James Webb (JWST) quan sát vũ trụ chủ yếu trong dải bước sóng nào?",
    options: ["Tia X", "Tia cực tím", "Ánh sáng khả kiến", "Hồng ngoại"],
    answer: "Hồng ngoại",
  },
  {
    id: 475,
    level: "Rất khó",
    question:
      "Cơ chế 'Quản lý bộ nhớ ảo' (Virtual Memory) trong hệ điều hành thường sử dụng kỹ thuật phân trang. Kích thước trang (Page size) phổ biến nhất ở kiến trúc x86 là bao nhiêu?",
    options: [
      "512 Bytes",
      "4 Kilobytes (4KB)",
      "64 Kilobytes (64KB)",
      "1 Megabyte (1MB)",
    ],
    answer: "4 Kilobytes (4KB)",
  },
  {
    id: 476,
    level: "Rất khó",
    question:
      "Nhà thực vật học người Thụy Điển Carl Linnaeus nổi tiếng vì hệ thống gì?",
    options: [
      "Thuyết tiến hóa",
      "Hệ thống danh pháp nhị thức phân loại sinh vật",
      "Khám phá quá trình quang hợp",
      "Phát hiện ra cấu trúc tế bào",
    ],
    answer: "Hệ thống danh pháp nhị thức phân loại sinh vật",
  },
  {
    id: 477,
    level: "Rất khó",
    question:
      "Nước cộng hòa nào được thành lập sau cuộc Cách mạng Tân Hợi năm 1911 ở Trung Quốc do Tôn Trung Sơn lãnh đạo?",
    options: [
      "Cộng hòa Nhân dân Trung Hoa",
      "Trung Hoa Dân Quốc",
      "Đế quốc Trung Hoa",
      "Cộng hòa Xô viết Trung Hoa",
    ],
    answer: "Trung Hoa Dân Quốc",
  },
  {
    id: 478,
    level: "Rất khó",
    question:
      "Lý thuyết 'Trò chơi có tổng bằng không' (Zero-sum game) là khái niệm trung tâm trong nghiên cứu của nhà toán học nào đoạt giải Nobel?",
    options: [
      "John von Neumann",
      "John Nash",
      "Kenneth Arrow",
      "Paul Samuelson",
    ],
    answer: "John von Neumann",
  },
  {
    id: 479,
    level: "Rất khó",
    question:
      "Trong nghệ thuật kiến trúc Gothic, đặc trưng nổi bật nào giúp chuyển bớt trọng lượng của mái vòm ra bên ngoài để tường có thể làm mỏng và lắp kính màu lớn?",
    options: [
      "Mái vòm củ hành",
      "Hệ thống cột Ionic",
      "Cung chống (Flying buttress)",
      "Vòm cung tròn (Roman arch)",
    ],
    answer: "Cung chống (Flying buttress)",
  },
  {
    id: 480,
    level: "Rất khó",
    question:
      "Enzyme Telomerase đóng vai trò gì trong quá trình phân chia tế bào?",
    options: [
      "Cắt bỏ các đoạn DNA hỏng",
      "Gắn kết các đoạn Okazaki",
      "Kéo dài đầu mút nhiễm sắc thể (Telomere)",
      "Mở xoắn chuỗi DNA",
    ],
    answer: "Kéo dài đầu mút nhiễm sắc thể (Telomere)",
  },
  {
    id: 481,
    level: "Rất khó",
    question:
      "Hội nghị Yalta năm 1945, quyết định tương lai của châu Âu sau thế chiến, có sự tham gia của 'Big Three' (Tam Cường) gồm Mỹ, Liên Xô và quốc gia nào?",
    options: ["Pháp", "Đức", "Anh", "Trung Quốc"],
    answer: "Anh",
  },
  {
    id: 482,
    level: "Rất khó",
    question:
      "Dạng hình thù (allotrope) nào của Carbon có cấu trúc dạng quả bóng đá khép kín gồm 60 nguyên tử carbon (C60)?",
    options: [
      "Kim cương",
      "Graphite",
      "Graphene",
      "Buckminsterfullerene (Buckyball)",
    ],
    answer: "Buckminsterfullerene (Buckyball)",
  },
  {
    id: 483,
    level: "Rất khó",
    question:
      "Nhà văn người Colombia Gabriel García Márquez được coi là bậc thầy của trào lưu văn học nào?",
    options: [
      "Chủ nghĩa hiện thực huyền ảo",
      "Chủ nghĩa siêu thực",
      "Chủ nghĩa lãng mạn",
      "Chủ nghĩa tự nhiên",
    ],
    answer: "Chủ nghĩa hiện thực huyền ảo",
  },
  {
    id: 484,
    level: "Rất khó",
    question:
      "Thuyết 'Cấu trúc của các cuộc cách mạng khoa học' đề xuất khái niệm 'Sự chuyển đổi hệ hình' (Paradigm shift) là của triết gia khoa học nào?",
    options: ["Karl Popper", "Thomas Kuhn", "Paul Feyerabend", "Imre Lakatos"],
    answer: "Thomas Kuhn",
  },
  {
    id: 485,
    level: "Rất khó",
    question:
      "Vị vua duy nhất của nước Anh bị kết án tử hình và bị chặt đầu là ai?",
    options: ["Henry VIII", "Richard III", "Charles I", "James II"],
    answer: "Charles I",
  },
  {
    id: 486,
    level: "Rất khó",
    question:
      "Theo định luật thứ hai của Nhiệt động lực học, đại lượng nào của một hệ cô lập luôn có xu hướng tăng theo thời gian?",
    options: ["Enthalpy", "Entropy", "Năng lượng tự do Gibbs", "Động năng"],
    answer: "Entropy",
  },
  {
    id: 487,
    level: "Rất khó",
    question:
      "Hiệp ước Westphalia năm 1648 đánh dấu sự kết thúc của cuộc chiến tranh nào ở châu Âu?",
    options: [
      "Chiến tranh Trăm Năm",
      "Chiến tranh Hoa Hồng",
      "Chiến tranh Ba Mươi Năm",
      "Chiến tranh Bảy Năm",
    ],
    answer: "Chiến tranh Ba Mươi Năm",
  },
  {
    id: 488,
    level: "Rất khó",
    question:
      "Cấu trúc não bộ nào đóng vai trò cốt lõi trong việc hình thành ký ức không gian và chuyển trí nhớ ngắn hạn thành dài hạn?",
    options: [
      "Tiểu não (Cerebellum)",
      "Hạch hạnh nhân (Amygdala)",
      "Đồi thị (Thalamus)",
      "Hồi hải mã (Hippocampus)",
    ],
    answer: "Hồi hải mã (Hippocampus)",
  },
  {
    id: 489,
    level: "Rất khó",
    question:
      "Nước cộng hòa San Marino, một trong những quốc gia nhỏ nhất và lâu đời nhất thế giới, nằm hoàn toàn bên trong lãnh thổ của nước nào?",
    options: ["Pháp", "Tây Ban Nha", "Ý", "Áo"],
    answer: "Ý",
  },
  {
    id: 490,
    level: "Rất khó",
    question:
      "Trong lý thuyết độ phức tạp tính toán, lớp bài toán NP-đầy đủ (NP-complete) được chính thức định nghĩa lần đầu bởi nhà khoa học máy tính nào vào năm 1971?",
    options: ["Stephen Cook", "Alan Turing", "Donald Knuth", "Edgar F. Codd"],
    answer: "Stephen Cook",
  },
];
export default allQuestions;
