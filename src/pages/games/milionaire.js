// --- PHÂN LOẠI CÂU HỎI ---
const allQuestions = [
  // Cấp 1-5 (Dễ)
  {
    question: "Thủ đô của Việt Nam là gì?",
    options: ["Hà Nội", "Đà Nẵng", "TP. Hồ Chí Minh", "Hải Phòng"],
    answer: "Hà Nội",
  },
  {
    question: "Đâu là một loại trái cây?",
    options: ["Cà rốt", "Khoai tây", "Táo", "Bắp cải"],
    answer: "Táo",
  },
  {
    question: "Mặt trời mọc ở hướng nào?",
    options: ["Tây", "Đông", "Bắc", "Nam"],
    answer: "Đông",
  },
  {
    question: "Một năm có bao nhiêu tháng?",
    options: ["10", "11", "12", "13"],
    answer: "12",
  },
  {
    question: "Loài vật nào sau đây sống dưới nước?",
    options: ["Gà", "Chó", "Cá", "Mèo"],
    answer: "Cá",
  },
  // Cấp 6-10 (Trung bình)
  {
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
    question: "Hành tinh nào gần Mặt trời nhất?",
    options: ["Trái Đất", "Sao Hỏa", "Sao Kim", "Sao Thủy"],
    answer: "Sao Thủy",
  },
  {
    question: "Công thức hóa học của nước là gì?",
    options: ["O2", "CO2", "H2O", "N2"],
    answer: "H2O",
  },
  {
    question: "Dãy núi dài nhất thế giới là gì?",
    options: ["Himalaya", "Andes", "Rocky", "Alps"],
    answer: "Andes",
  },
  {
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
    question: "Nguyên tố nào có ký hiệu hóa học là 'Au'?",
    options: ["Bạc", "Chì", "Vàng", "Sắt"],
    answer: "Vàng",
  },
  {
    question: "Năm nào con người lần đầu tiên đặt chân lên Mặt trăng?",
    options: ["1965", "1969", "1972", "1975"],
    answer: "1969",
  },
  {
    question: "Trong thần thoại Hy Lạp, vị thần nào là vua của các vị thần?",
    options: ["Apollo", "Hades", "Poseidon", "Zeus"],
    answer: "Zeus",
  },
  {
    question: "Thành phố nào được mệnh danh là 'Thành phố vĩnh cửu'?",
    options: ["Athens", "Rome", "Jerusalem", "Cairo"],
    answer: "Rome",
  },
  {
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
    question: "Có bao nhiêu màu trong cầu vồng?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    question: "Loài chim nào không biết bay?",
    options: ["Đại bàng", "Vẹt", "Chim cánh cụt", "Bồ câu"],
    answer: "Chim cánh cụt",
  },
  {
    question: "Quốc kỳ của Nhật Bản có hình gì ở trung tâm?",
    options: ["Ngôi sao", "Mặt trăng", "Hình tròn đỏ", "Lá phong"],
    answer: "Hình tròn đỏ",
  },
  {
    question: "Tháp Eiffel nằm ở thành phố nào?",
    options: ["London", "New York", "Paris", "Berlin"],
    answer: "Paris",
  },
  {
    question: "Con người có bao nhiêu giác quan chính?",
    options: ["3", "4", "5", "6"],
    answer: "5",
  },
  {
    question: "Môn thể thao nào được gọi là 'môn thể thao vua'?",
    options: ["Bóng rổ", "Bóng đá", "Quần vợt", "Bơi lội"],
    answer: "Bóng đá",
  },
  {
    question: "Đâu là hành tinh lớn nhất trong Hệ Mặt trời?",
    options: ["Trái Đất", "Sao Thổ", "Sao Mộc", "Sao Thiên Vương"],
    answer: "Sao Mộc",
  },
  {
    question: "Tháng nào có 28 hoặc 29 ngày?",
    options: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4"],
    answer: "Tháng 2",
  },
  {
    question: "Vạn Lý Trường Thành nằm ở quốc gia nào?",
    options: ["Ấn Độ", "Nhật Bản", "Ai Cập", "Trung Quốc"],
    answer: "Trung Quốc",
  },
  {
    question: "Động vật nào sau đây là động vật có vú?",
    options: ["Cá sấu", "Rắn", "Cá voi", "Ếch"],
    answer: "Cá voi",
  },
  {
    question: "Mùa nào trong năm có tuyết rơi ở vùng ôn đới?",
    options: ["Mùa xuân", "Mùa hạ", "Mùa thu", "Mùa đông"],
    answer: "Mùa đông",
  },
  {
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
    question: "Thực vật tạo ra năng lượng thông qua quá trình nào?",
    options: ["Hô hấp", "Quang hợp", "Tiêu hóa", "Bay hơi"],
    answer: "Quang hợp",
  },
  {
    question: "Kim cương được làm từ nguyên tố nào?",
    options: ["Oxy", "Silic", "Cacbon", "Hydro"],
    answer: "Cacbon",
  },
  {
    question: "Đơn vị tiền tệ của Việt Nam là gì?",
    options: ["Yên", "Won", "Đồng", "Baht"],
    answer: "Đồng",
  },
  {
    question: "Hình dạng của một quả bóng đá tiêu chuẩn là gì?",
    options: ["Hình vuông", "Hình tam giác", "Hình cầu", "Hình lập phương"],
    answer: "Hình cầu",
  },
  {
    question: "Đâu là sa mạc lớn nhất thế giới?",
    options: ["Sahara", "Gobi", "Kalahari", "Nam Cực"],
    answer: "Nam Cực",
  },
  {
    question: "Nước đóng băng ở nhiệt độ nào (độ C)?",
    options: ["100", "50", "0", "-10"],
    answer: "0",
  },
  {
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
    question: "Trong một giờ có bao nhiêu phút?",
    options: ["30", "60", "90", "120"],
    answer: "60",
  },
  {
    question: "Đâu là châu lục đông dân nhất?",
    options: ["Châu Phi", "Châu Âu", "Châu Mỹ", "Châu Á"],
    answer: "Châu Á",
  },
  {
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
    question: "Con vật nào được mệnh danh là 'chúa sơn lâm'?",
    options: ["Sư tử", "Hổ", "Báo", "Gấu"],
    answer: "Hổ",
  },
  // Cấp độ Trung bình (25 câu)
  {
    question: "Người Ai Cập cổ đại viết bằng loại chữ gì?",
    options: ["Chữ Latin", "Chữ tượng hình", "Chữ Nôm", "Chữ rune"],
    answer: "Chữ tượng hình",
  },
  {
    question: "Ai là tác giả của vở kịch 'Romeo và Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Homer"],
    answer: "William Shakespeare",
  },
  {
    question: "Thành phần chính của khí quyển Trái Đất là gì?",
    options: ["Oxy", "Cacbon Dioxit", "Nitơ", "Argon"],
    answer: "Nitơ",
  },
  {
    question: "'Nhà máy năng lượng' của tế bào là gì?",
    options: ["Nhân tế bào", "Lưới nội chất", "Ti thể", "Ribosome"],
    answer: "Ti thể",
  },
  {
    question: "Chiến tranh thế giới thứ nhất bắt đầu vào năm nào?",
    options: ["1905", "1914", "1920", "1939"],
    answer: "1914",
  },
  {
    question: "Ký hiệu hóa học của Bạc là gì?",
    options: ["Ag", "Au", "Pb", "Fe"],
    answer: "Ag",
  },
  {
    question: "Sông dài nhất thế giới là sông nào?",
    options: ["Sông Mekong", "Sông Nile", "Sông Amazon", "Sông Dương Tử"],
    answer: "Sông Nile",
  },
  {
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
    question: "Thế vận hội Olympic hiện đại đầu tiên được tổ chức ở đâu?",
    options: ["Paris, Pháp", "London, Anh", "Athens, Hy Lạp", "Rome, Ý"],
    answer: "Athens, Hy Lạp",
  },
  {
    question: "Trong thần thoại La Mã, thần chiến tranh là ai?",
    options: ["Jupiter", "Apollo", "Mars", "Neptune"],
    answer: "Mars",
  },
  {
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
    question: "Nước nào có diện tích lớn nhất thế giới?",
    options: ["Canada", "Trung Quốc", "Hoa Kỳ", "Nga"],
    answer: "Nga",
  },
  {
    question: "Bộ phim nào đã giành giải Oscar cho Phim hay nhất đầu tiên?",
    options: ["Cuốn theo chiều gió", "Wings", "Casablanca", "Bố già"],
    answer: "Wings",
  },
  {
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
    question: "Đỉnh núi cao nhất thế giới là gì?",
    options: ["K2", "Kangchenjunga", "Lhotse", "Everest"],
    answer: "Everest",
  },
  {
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
    question: "Hệ điều hành Android được phát triển bởi công ty nào?",
    options: ["Apple", "Microsoft", "Google", "Samsung"],
    answer: "Google",
  },
  {
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
    question: "Nhạc cụ nào có 88 phím?",
    options: ["Guitar", "Violin", "Piano", "Trống"],
    answer: "Piano",
  },
  {
    question: "Thủ đô của Úc là thành phố nào?",
    options: ["Sydney", "Melbourne", "Brisbane", "Canberra"],
    answer: "Canberra",
  },
  // Cấp độ Khó (25 câu)
  {
    question: "Trận Waterloo diễn ra vào năm nào?",
    options: ["1789", "1805", "1815", "1821"],
    answer: "1815",
  },
  {
    question: "Nguyên tố hóa học nào phổ biến nhất trong vũ trụ?",
    options: ["Oxy", "Heli", "Hydro", "Cacbon"],
    answer: "Hydro",
  },
  {
    question: "Triết gia nào được coi là cha đẻ của triết học phương Tây?",
    options: ["Aristotle", "Plato", "Socrates", "Thales"],
    answer: "Thales",
  },
  {
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
    question: "Đế quốc La Mã sụp đổ vào thế kỷ thứ mấy?",
    options: ["Thế kỷ 3", "Thế kỷ 4", "Thế kỷ 5", "Thế kỷ 6"],
    answer: "Thế kỷ 5",
  },
  {
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
    question: "Trong vật lý, 'hạt của Chúa' là tên gọi khác của hạt nào?",
    options: ["Neutrino", "Quark", "Higgs boson", "Electron"],
    answer: "Higgs boson",
  },
  {
    question: "Tác phẩm điêu khắc 'David' là của nghệ sĩ nào?",
    options: ["Donatello", "Leonardo da Vinci", "Raphael", "Michelangelo"],
    answer: "Michelangelo",
  },
  {
    question:
      "Sự kiện 'Ngày thứ Ba Đen tối' năm 1929 liên quan đến lĩnh vực gì?",
    options: ["Chính trị", "Quân sự", "Thị trường chứng khoán", "Khoa học"],
    answer: "Thị trường chứng khoán",
  },
  {
    question: "Ký hiệu 'e' trong toán học đại diện cho hằng số nào?",
    options: ["Hằng số Pythagoras", "Hằng số Euler", "Số Pi", "Tỉ lệ vàng"],
    answer: "Hằng số Euler",
  },
  {
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
    question:
      "Vị pharaoh nào của Ai Cập được cho là đã xây dựng Đại kim tự tháp Giza?",
    options: ["Tutankhamun", "Ramesses II", "Cleopatra", "Khufu"],
    answer: "Khufu",
  },
  {
    question: "'Lục địa đen' là tên gọi khác của châu lục nào?",
    options: ["Châu Á", "Châu Phi", "Châu Nam Cực", "Châu Úc"],
    answer: "Châu Phi",
  },
  {
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
    question:
      "Năm 1953, James Watson và Francis Crick đã khám phá ra cấu trúc của phân tử nào?",
    options: ["Protein", "ARN", "ADN", "Tế bào"],
    answer: "ADN",
  },
  {
    question: "Ai là người sáng lập ra Đế quốc Mông Cổ?",
    options: ["Oa Khoát Đài", "Hốt Tất Liệt", "Thành Cát Tư Hãn", " Đà Lôi"],
    answer: "Thành Cát Tư Hãn",
  },
  {
    question: "Thành phố cổ Machu Picchu thuộc nền văn minh nào?",
    options: ["Aztec", "Maya", "Inca", "Olmec"],
    answer: "Inca",
  },
  {
    question: "Kênh đào Suez nối Biển Đỏ với vùng biển nào?",
    options: ["Biển Đen", "Biển Địa Trung Hải", "Vịnh Ba Tư", "Biển Ả Rập"],
    answer: "Biển Địa Trung Hải",
  },
  {
    question: "Trong vật lý hạt, phản hạt của electron được gọi là gì?",
    options: ["Proton", "Neutron", "Positron", "Photon"],
    answer: "Positron",
  },
  {
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
    question: "Phong trào Phục hưng bắt nguồn từ quốc gia nào?",
    options: ["Pháp", "Tây Ban Nha", "Anh", "Ý"],
    answer: "Ý",
  },
  {
    question:
      "Ngôn ngữ lập trình nào được tạo ra bởi James Gosling tại Sun Microsystems?",
    options: ["Python", "C++", "Java", "JavaScript"],
    answer: "Java",
  },
  {
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
    question:
      "Triều đại nào của Việt Nam cho xây dựng Văn Miếu - Quốc Tử Giám?",
    options: ["Nhà Lý", "Nhà Trần", "Nhà Lê sơ", "Nhà Nguyễn"],
    answer: "Nhà Lý",
  },
  {
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
    question: "Siêu lục địa tồn tại khoảng 300 triệu năm trước có tên là gì?",
    options: ["Gondwana", "Laurasia", "Rodinia", "Pangaea"],
    answer: "Pangaea",
  },
  {
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
    question:
      "Trong triết học, khái niệm 'tabula rasa' (tấm bảng trống) do ai đề xướng?",
    options: ["Plato", "René Descartes", "John Locke", "Immanuel Kant"],
    answer: "John Locke",
  },
  {
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
    question:
      "Thành phố Timbuktu, một trung tâm học thuật Hồi giáo thời trung cổ, nằm ở quốc gia hiện đại nào?",
    options: ["Maroc", "Ai Cập", "Mali", "Nigeria"],
    answer: "Mali",
  },
  {
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
    question: "Ai là tác giả của 'Binh pháp Tôn Tử'?",
    options: ["Khổng Tử", "Lão Tử", "Tôn Vũ", "Hàn Phi Tử"],
    answer: "Tôn Vũ",
  },
  {
    question:
      "Trong vật lý thiên văn, 'Chân trời sự kiện' là một đặc điểm của đối tượng nào?",
    options: ["Sao neutron", "Sao lùn trắng", "Lỗ đen", "Pulsar"],
    answer: "Lỗ đen",
  },
  {
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
    question:
      "Trong lịch sử, 'Con đường Tơ lụa' chủ yếu kết nối châu Âu với khu vực nào?",
    options: ["Châu Phi", "Châu Mỹ", "Trung Quốc", "Úc"],
    answer: "Trung Quốc",
  },
  {
    question:
      "Thủ đô của Đế quốc Ottoman là gì trước khi bị chinh phục vào năm 1453?",
    options: ["Baghdad", "Damascus", "Adrianople (Edirne)", "Cairo"],
    answer: "Adrianople (Edirne)",
  },
  {
    question: "Tác phẩm 'Utopia' (Không tưởng) được viết bởi ai?",
    options: ["Niccolò Machiavelli", "Thomas More", "Erasmus", "Francis Bacon"],
    answer: "Thomas More",
  },
  {
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
  {
    question: "Nguyên tố hóa học nào có điểm nóng chảy cao nhất?",
    options: ["Carbon", "Wolfram (Tungsten)", "Osmium", "Tantalum"],
    answer: "Wolfram (Tungsten)",
  },
  {
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
    question: "Ai là nhà toán học đặt nền móng cho lý thuyết tập hợp hiện đại?",
    options: ["Georg Cantor", "David Hilbert", "Kurt Gödel", "Henri Poincaré"],
    answer: "Georg Cantor",
  },
  {
    question: "Ngôn ngữ lập trình nào được coi là ngôn ngữ cấp cao đầu tiên?",
    options: ["Fortran", "COBOL", "Assembly", "ALGOL"],
    answer: "Fortran",
  },
  {
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
    question: "Tác phẩm 'The Republic' (Cộng hòa) là của triết gia nào?",
    options: ["Aristotle", "Plato", "Socrates", "Cicero"],
    answer: "Plato",
  },
  {
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
    question: "Hệ điều hành UNIX ban đầu được phát triển tại đâu?",
    options: ["MIT", "Bell Labs", "IBM", "Stanford University"],
    answer: "Bell Labs",
  },
  {
    question: "Trong hóa học, số Avogadro xấp xỉ bằng bao nhiêu?",
    options: ["6,022 × 10²³", "3,14 × 10⁸", "9,81 × 10⁶", "1,6 × 10⁻¹⁹"],
    answer: "6,022 × 10²³",
  },
  {
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
    question:
      "Trong lịch sử Nhật Bản, thời kỳ 'Edo' kéo dài từ năm nào đến năm nào?",
    options: ["1603–1868", "1467–1600", "1868–1912", "794–1185"],
    answer: "1603–1868",
  },
  {
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
    question: "Ai là tác giả của 'Divine Comedy' (Thần khúc)?",
    options: ["Dante Alighieri", "Geoffrey Chaucer", "John Milton", "Homer"],
    answer: "Dante Alighieri",
  },
  {
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
    question:
      "Vị hoàng đế nào của La Mã đã ra sắc lệnh Công giáo trở thành tôn giáo chính thức?",
    options: ["Constantine I", "Theodosius I", "Augustus", "Nero"],
    answer: "Theodosius I",
  },
  {
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
    question:
      "Trong sinh học, bộ phận nào của tế bào chịu trách nhiệm sản xuất ATP?",
    options: ["Nhân", "Ti thể", "Lục lạp", "Lysosome"],
    answer: "Ti thể",
  },
  {
    question: "Nguyên tố nào là kim loại kiềm thổ?",
    options: ["Sodium", "Calcium", "Potassium", "Lithium"],
    answer: "Calcium",
  },
  {
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
  [
    {
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
      question:
        "Ai được lịch sử công nhận là lập trình viên máy tính đầu tiên trên thế giới?",
      options: [
        "Alan Turing",
        "Ada Lovelace",
        "Charles Babbage",
        "Grace Hopper",
      ],
      answer: "Ada Lovelace",
    },
    {
      question:
        "Trường phái phân tâm học (Psychoanalysis) trong tâm lý học do ai sáng lập?",
      options: ["Carl Jung", "B.F. Skinner", "Sigmund Freud", "Ivan Pavlov"],
      answer: "Sigmund Freud",
    },
    {
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
      question:
        "Vệ tinh nhân tạo đầu tiên được phóng lên quỹ đạo Trái Đất có tên là gì?",
      options: ["Sputnik 1", "Explorer 1", "Vostok 1", "Apollo 11"],
      answer: "Sputnik 1",
    },
    {
      question:
        "Ngọn núi lửa cao nhất trong Hệ Mặt Trời (Olympus Mons) nằm trên hành tinh nào?",
      options: ["Sao Kim", "Sao Mộc", "Sao Hỏa", "Sao Thổ"],
      answer: "Sao Hỏa",
    },
    {
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
      question:
        "Nữ hoàng Cleopatra, vị pharaoh cuối cùng của Ai Cập cổ đại, có nguồn gốc từ dân tộc nào?",
      options: ["Ai Cập", "La Mã", "Hy Lạp (Ptolemaic)", "Ba Tư"],
      answer: "Hy Lạp (Ptolemaic)",
    },
    {
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
      question:
        "Thể loại âm nhạc Jazz có nguồn gốc phát triển từ thành phố nào của nước Mỹ?",
      options: ["Chicago", "New York", "New Orleans", "Memphis"],
      answer: "New Orleans",
    },
    {
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
      question: "Thiên hà chứa Hệ Mặt Trời của chúng ta có tên gọi là gì?",
      options: ["Andromeda", "Milky Way (Ngân Hà)", "Triangulum", "Sombrero"],
      answer: "Milky Way (Ngân Hà)",
    },
    {
      question:
        "Trong sinh học tế bào, chu trình Krebs (chu trình axit citric) diễn ra ở bào quan nào?",
      options: ["Nhân tế bào", "Lục lạp", "Ti thể", "Bộ máy Golgi"],
      answer: "Ti thể",
    },
    {
      question:
        "Nguyên tố kim loại nào tồn tại ở trạng thái lỏng trong điều kiện nhiệt độ và áp suất tiêu chuẩn?",
      options: ["Gallium", "Francium", "Bromine", "Thủy ngân (Mercury)"],
      answer: "Thủy ngân (Mercury)",
    },
    {
      question:
        "Triết gia vĩ đại nào của Hy Lạp cổ đại là người đã dạy dỗ Alexander Đại đế?",
      options: ["Socrates", "Plato", "Aristotle", "Pythagoras"],
      answer: "Aristotle",
    },
    {
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
      question:
        "Nhà toán học người Hy Lạp nào được mệnh danh là 'Cha đẻ của Hình học'?",
      options: ["Archimedes", "Pythagoras", "Euclid", "Thales"],
      answer: "Euclid",
    },
    {
      question:
        "Giải thưởng danh giá nhất trong lĩnh vực Toán học, thường được ví như 'Giải Nobel Toán học', là gì?",
      options: [
        "Giải Turing",
        "Huy chương Fields",
        "Giải Abel",
        "Giải Pulitzer",
      ],
      answer: "Huy chương Fields",
    },
    {
      question:
        "Trong hóa học, nguyên tố nào phổ biến nhất trong toàn bộ vũ trụ?",
      options: ["Oxy (Oxygen)", "Carbon", "Hydro (Hydrogen)", "Heli (Helium)"],
      answer: "Hydro (Hydrogen)",
    },
    {
      question:
        "Đơn vị thiên văn (AU) được định nghĩa dựa trên khoảng cách nào?",
      options: [
        "Khoảng cách ánh sáng đi được trong 1 năm",
        "Khoảng cách trung bình từ Trái Đất đến Mặt Trăng",
        "Khoảng cách trung bình từ Trái Đất đến Mặt Trời",
        "Đường kính của Hệ Mặt Trời",
      ],
      answer: "Khoảng cách trung bình từ Trái Đất đến Mặt Trời",
    },
    {
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
      question:
        "Hồ nước mặn nào có độ mặn cao đến mức con người có thể nổi tự nhiên trên mặt nước?",
      options: [
        "Hồ Baikal",
        "Biển Caspi",
        "Biển Chết (Dead Sea)",
        "Hồ Victoria",
      ],
      answer: "Biển Chết (Dead Sea)",
    },
    {
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
      question:
        "Vương triều nào có thời gian trị vì lâu nhất trong lịch sử phong kiến Trung Quốc?",
      options: ["Nhà Hán", "Nhà Đường", "Nhà Chu", "Nhà Thanh"],
      answer: "Nhà Chu",
    },
    {
      question:
        "Thuyết Tương đối Hẹp (Special Relativity) với phương trình E=mc² được Albert Einstein công bố vào năm nào?",
      options: ["1895", "1905", "1915", "1925"],
      answer: "1905",
    },
    {
      question:
        "Mạng máy tính nào do Bộ Quốc phòng Mỹ tài trợ được coi là tiền thân của Internet hiện đại?",
      options: ["NSFNET", "ARPANET", "Ethernet", "MILNET"],
      answer: "ARPANET",
    },
    {
      question:
        "Trong tế bào nhân thực, bào quan nào đóng vai trò chính trong quá trình tổng hợp protein?",
      options: ["Ribosome", "Lysosome", "Mạng lưới nội chất trơn", "Ti thể"],
      answer: "Ribosome",
    },
    {
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
      question:
        "Bảng chữ cái Cyrillic (Kirin) hiện nay được sử dụng làm cơ sở cho ngôn ngữ của quốc gia nào sau đây?",
      options: ["Đức", "Nga", "Hy Lạp", "Thổ Nhĩ Kỳ"],
      answer: "Nga",
    },
    {
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
      question: "Trong thiên văn học, 'Lỗ đen' (Black hole) là gì?",
      options: [
        "Một vùng không gian không có vật chất",
        "Nơi mà lực hấp dẫn mạnh đến mức ánh sáng cũng không thể thoát ra",
        "Một ngôi sao đang bốc cháy ở giai đoạn cuối",
        "Vùng tối trên bề mặt của Mặt Trời",
      ],
      answer:
        "Nơi mà lực hấp dẫn mạnh đến mức ánh sáng cũng không thể thoát ra",
    },
    {
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
  ],
];
export default allQuestions;
