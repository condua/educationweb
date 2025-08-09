import React, { useState, useEffect } from "react";

// --- Dữ liệu câu hỏi cho trò chơi ---
// Trong một ứng dụng thực tế, bạn sẽ tải dữ liệu này từ server
const initialQuestions = [
  // 5 câu hỏi gốc
  {
    image: "https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?w=800",
    options: ["Banana", "Apple", "Orange", "Grape"],
    correctAnswer: "Apple",
  },
  {
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
    options: ["Bicycle", "Bus", "Car", "Motorbike"],
    correctAnswer: "Car",
  },
  {
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800",
    options: ["Cat", "Dog", "Lion", "Tiger"],
    correctAnswer: "Dog",
  },
  {
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800",
    options: ["Newspaper", "Magazine", "Book", "Notebook"],
    correctAnswer: "Book",
  },
  {
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
    options: ["Pizza", "Burger", "Salad", "Pasta"],
    correctAnswer: "Pizza",
  },

  // 95 câu hỏi mới
  // Động vật
  {
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800",
    options: ["Dog", "Cat", "Bird", "Fish"],
    correctAnswer: "Cat",
  },
  {
    image: "https://images.unsplash.com/photo-1555169062-013468b47731?w=800",
    options: ["Horse", "Cow", "Sheep", "Goat"],
    correctAnswer: "Horse",
  },
  {
    image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800",
    options: ["Shark", "Dolphin", "Whale", "Turtle"],
    correctAnswer: "Turtle",
  },
  {
    image: "https://images.unsplash.com/photo-1598755257130-c4d1284319a2?w=800",
    options: ["Elephant", "Lion", "Giraffe", "Zebra"],
    correctAnswer: "Elephant",
  },
  {
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800",
    options: ["Panda", "Koala", "Bear", "Monkey"],
    correctAnswer: "Panda",
  },
  {
    image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800",
    options: ["Wolf", "Fox", "Bear", "Deer"],
    correctAnswer: "Fox",
  },
  {
    image: "https://images.unsplash.com/photo-1534568288833-913a0b06b6e4?w=800",
    options: ["Fish", "Crab", "Octopus", "Jellyfish"],
    correctAnswer: "Fish",
  },
  {
    image: "https://images.unsplash.com/photo-1497206365907-f5e630693df0?w=800",
    options: ["Parrot", "Eagle", "Owl", "Penguin"],
    correctAnswer: "Owl",
  },
  {
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800",
    options: ["Puppy", "Kitten", "Cub", "Fawn"],
    correctAnswer: "Puppy",
  },
  {
    image: "https://images.unsplash.com/photo-1589922582845-3978936274ca?w=800",
    options: ["Snake", "Lizard", "Crocodile", "Frog"],
    correctAnswer: "Frog",
  },

  // Trái cây & Rau củ
  {
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800",
    options: ["Apple", "Banana", "Cherry", "Date"],
    correctAnswer: "Banana",
  },
  {
    image: "https://images.unsplash.com/photo-1587393855524-087f83d95c9f?w=800",
    options: ["Grape", "Strawberry", "Blueberry", "Raspberry"],
    correctAnswer: "Strawberry",
  },
  {
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800",
    options: ["Pineapple", "Mango", "Papaya", "Kiwi"],
    correctAnswer: "Pineapple",
  },
  {
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800",
    options: ["Watermelon", "Cantaloupe", "Honeydew", "Melon"],
    correctAnswer: "Watermelon",
  },
  {
    image: "https://images.unsplash.com/photo-1582571862217-33744e5f483c?w=800",
    options: ["Lemon", "Lime", "Orange", "Grapefruit"],
    correctAnswer: "Orange",
  },
  {
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800",
    options: ["Carrot", "Potato", "Onion", "Garlic"],
    correctAnswer: "Carrot",
  },
  {
    image: "https://images.unsplash.com/photo-1570586922256-427c1332f399?w=800",
    options: ["Broccoli", "Cauliflower", "Cabbage", "Lettuce"],
    correctAnswer: "Broccoli",
  },
  {
    image: "https://images.unsplash.com/photo-1597362925123-518d3d5ac979?w=800",
    options: ["Corn", "Pea", "Bean", "Asparagus"],
    correctAnswer: "Corn",
  },
  {
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800",
    options: ["Mushroom", "Pepper", "Eggplant", "Potato"],
    correctAnswer: "Potato",
  },
  {
    image: "https://images.unsplash.com/photo-1601648764329-19543c798b2c?w=800",
    options: ["Tomato", "Cucumber", "Zucchini", "Pumpkin"],
    correctAnswer: "Tomato",
  },

  // Thiên nhiên
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    options: ["Mountain", "River", "Forest", "Desert"],
    correctAnswer: "River",
  },
  {
    image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800",
    options: ["Sun", "Moon", "Star", "Cloud"],
    correctAnswer: "Moon",
  },
  {
    image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800",
    options: ["Rain", "Snow", "Wind", "Fog"],
    correctAnswer: "Rain",
  },
  {
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800",
    options: ["Lake", "Ocean", "Pond", "Waterfall"],
    correctAnswer: "Lake",
  },
  {
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800",
    options: ["Jungle", "Forest", "Wood", "Grove"],
    correctAnswer: "Forest",
  },
  {
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800",
    options: ["Sunrise", "Sunset", "Dawn", "Dusk"],
    correctAnswer: "Sunrise",
  },
  {
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
    options: ["Rose", "Tulip", "Daisy", "Flower"],
    correctAnswer: "Flower",
  },
  {
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    options: ["Tree", "Bush", "Grass", "Leaf"],
    correctAnswer: "Tree",
  },
  {
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800",
    options: ["Plant", "Root", "Stem", "Branch"],
    correctAnswer: "Plant",
  },
  {
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800",
    options: ["Path", "Road", "Street", "Avenue"],
    correctAnswer: "Path",
  },

  // Đồ vật
  {
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800",
    options: ["Shoe", "Boot", "Sandal", "Slipper"],
    correctAnswer: "Shoe",
  },
  {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    options: ["Clock", "Watch", "Timer", "Alarm"],
    correctAnswer: "Watch",
  },
  {
    image: "https://images.unsplash.com/photo-1585336261022-680e2954a78b?w=800",
    options: ["Chair", "Table", "Sofa", "Bed"],
    correctAnswer: "Chair",
  },
  {
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800",
    options: ["Phone", "Tablet", "Laptop", "Desktop"],
    correctAnswer: "Laptop",
  },
  {
    image: "https://images.unsplash.com/photo-1515965655322-26f56156b245?w=800",
    options: ["Key", "Lock", "Door", "Window"],
    correctAnswer: "Key",
  },
  {
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800",
    options: ["Camera", "Lens", "Flash", "Tripod"],
    correctAnswer: "Camera",
  },
  {
    image: "https://images.unsplash.com/photo-1575024357670-2b5164f47061?w=800",
    options: ["Guitar", "Piano", "Violin", "Drum"],
    correctAnswer: "Guitar",
  },
  {
    image: "https://images.unsplash.com/photo-1583787035686-91b82ad5d810?w=800",
    options: ["Cup", "Mug", "Glass", "Bottle"],
    correctAnswer: "Mug",
  },
  {
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
    options: ["Sneakers", "Heels", "Flats", "Boots"],
    correctAnswer: "Sneakers",
  },
  {
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
    options: ["Glasses", "Sunglasses", "Goggles", "Monocle"],
    correctAnswer: "Glasses",
  },
  {
    image: "https://images.unsplash.com/photo-1620288627223-162123523226?w=800",
    options: ["Pen", "Pencil", "Marker", "Crayon"],
    correctAnswer: "Pen",
  },
  {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    options: ["Running Shoe", "Sandal", "Boot", "Loafer"],
    correctAnswer: "Running Shoe",
  },
  {
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
    options: ["Couch", "Armchair", "Bench", "Stool"],
    correctAnswer: "Couch",
  },
  {
    image: "https://images.unsplash.com/photo-1546484475-7f7b5f6ce1d5?w=800",
    options: ["Backpack", "Handbag", "Suitcase", "Wallet"],
    correctAnswer: "Backpack",
  },
  {
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    options: ["Headphones", "Earbuds", "Speaker", "Microphone"],
    correctAnswer: "Headphones",
  },
  {
    image: "https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?w=800",
    options: ["Keyboard", "Mouse", "Monitor", "Printer"],
    correctAnswer: "Keyboard",
  },
  {
    image: "https://images.unsplash.com/photo-1519734007358-e33157b43566?w=800",
    options: ["Bicycle", "Scooter", "Skateboard", "Rollerblade"],
    correctAnswer: "Bicycle",
  },
  {
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
    options: ["Bed", "Pillow", "Blanket", "Mattress"],
    correctAnswer: "Bed",
  },
  {
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800",
    options: ["Bottle", "Can", "Jar", "Box"],
    correctAnswer: "Bottle",
  },
  {
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
    options: ["Code", "Text", "Image", "Video"],
    correctAnswer: "Code",
  },

  // Thực phẩm & Đồ uống
  {
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800",
    options: ["Juice", "Milk", "Water", "Soda"],
    correctAnswer: "Juice",
  },
  {
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
    options: ["Soup", "Salad", "Sandwich", "Stew"],
    correctAnswer: "Salad",
  },
  {
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    options: ["Fries", "Burger", "Hotdog", "Taco"],
    correctAnswer: "Burger",
  },
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    options: ["Meal", "Dish", "Plate", "Cuisine"],
    correctAnswer: "Meal",
  },
  {
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    options: ["Pepperoni", "Mushroom", "Olive", "Cheese Pizza"],
    correctAnswer: "Cheese Pizza",
  },
  {
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    options: ["Grilled Chicken", "Fried Fish", "Steak", "Pork Chop"],
    correctAnswer: "Grilled Chicken",
  },
  {
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800",
    options: ["Ice Cream", "Cake", "Cookie", "Donut"],
    correctAnswer: "Ice Cream",
  },
  {
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
    options: ["Cheeseburger", "Hamburger", "Veggie Burger", "Fish Burger"],
    correctAnswer: "Cheeseburger",
  },
  {
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800",
    options: ["Coffee", "Tea", "Hot Chocolate", "Latte"],
    correctAnswer: "Coffee",
  },
  {
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800",
    options: ["Ingredients", "Spices", "Herbs", "Seasoning"],
    correctAnswer: "Ingredients",
  },

  // Địa điểm & Tòa nhà
  {
    image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800",
    options: ["House", "Apartment", "Castle", "Mansion"],
    correctAnswer: "House",
  },
  {
    image: "https://images.unsplash.com/photo-1562790331-90cb931e8ee2?w=800",
    options: ["School", "University", "Library", "College"],
    correctAnswer: "School",
  },
  {
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800",
    options: ["Shop", "Store", "Market", "Mall"],
    correctAnswer: "Shop",
  },
  {
    image: "https://images.unsplash.com/photo-1587213824987-a240b6df7856?w=800",
    options: ["Hospital", "Clinic", "Pharmacy", "Doctor Office"],
    correctAnswer: "Hospital",
  },
  {
    image: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=800",
    options: ["Airport", "Train Station", "Bus Stop", "Harbor"],
    correctAnswer: "Airport",
  },
  {
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    options: ["Restaurant", "Cafe", "Bar", "Diner"],
    correctAnswer: "Restaurant",
  },
  {
    image: "https://images.unsplash.com/photo-1531214159280-eff74342527b?w=800",
    options: ["Beach", "Coast", "Shore", "Seaside"],
    correctAnswer: "Beach",
  },
  {
    image: "https://images.unsplash.com/photo-1533109721025-d1ae7ee7c1e1?w=800",
    options: ["Bridge", "Tunnel", "Overpass", "Viaduct"],
    correctAnswer: "Bridge",
  },
  {
    image: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=800",
    options: ["Farm", "Ranch", "Orchard", "Vineyard"],
    correctAnswer: "Farm",
  },
  {
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
    options: ["City", "Town", "Village", "Metropolis"],
    correctAnswer: "City",
  },

  // Khác
  {
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    options: ["Money", "Coin", "Bill", "Cash"],
    correctAnswer: "Money",
  },
  {
    image: "https://images.unsplash.com/photo-1530026405182-273c32de5878?w=800",
    options: ["Fire", "Flame", "Blaze", "Ember"],
    correctAnswer: "Fire",
  },
  {
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800",
    options: ["Article", "Headline", "Paragraph", "Newspaper"],
    correctAnswer: "Newspaper",
  },
  {
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800",
    options: ["Writing", "Drawing", "Painting", "Sketching"],
    correctAnswer: "Writing",
  },
  {
    image: "https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?w=800",
    options: ["Map", "Globe", "Atlas", "Chart"],
    correctAnswer: "Map",
  },
  {
    image: "https://images.unsplash.com/photo-1581726707445-7523a451bdb4?w=800",
    options: ["Ball", "Sphere", "Globe", "Orb"],
    correctAnswer: "Ball",
  },
  {
    image: "https://images.unsplash.com/photo-1511871893375-6838c73b7599?w=800",
    options: ["Music", "Song", "Melody", "Rhythm"],
    correctAnswer: "Music",
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
    options: ["Team", "Group", "Crew", "Squad"],
    correctAnswer: "Team",
  },
  {
    image: "https://images.unsplash.com/photo-1633409361618-c1674c52a0a2?w=800",
    options: ["Light", "Lamp", "Bulb", "Lantern"],
    correctAnswer: "Light",
  },
  {
    image: "https://images.unsplash.com/photo-1506953823073-a72c6b41240b?w=800",
    options: ["Road", "Highway", "Street", "Lane"],
    correctAnswer: "Road",
  },
  {
    image: "https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=800",
    options: ["Desk", "Table", "Counter", "Bench"],
    correctAnswer: "Desk",
  },
  {
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800",
    options: ["Work", "Job", "Task", "Career"],
    correctAnswer: "Work",
  },
  {
    image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=800",
    options: ["Office", "Studio", "Workspace", "Cubicle"],
    correctAnswer: "Office",
  },
  {
    image: "https://images.unsplash.com/photo-1524678606370-a47601cb12db?w=800",
    options: ["Concert", "Show", "Performance", "Gig"],
    correctAnswer: "Concert",
  },
  {
    image: "https://images.unsplash.com/photo-1543353123-535799a61358?w=800",
    options: ["Gift", "Present", "Box", "Surprise"],
    correctAnswer: "Gift",
  },
];

// Hàm xáo trộn câu hỏi để mỗi lần chơi lại đều mới mẻ
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

export default function VocabularyGame() {
  // --- Quản lý trạng thái (State) của trò chơi ---
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Lưu câu trả lời người dùng đã chọn
  const [isAnswered, setIsAnswered] = useState(false); // Đã trả lời câu hỏi hiện tại chưa?
  const [isQuizOver, setIsQuizOver] = useState(false); // Trò chơi đã kết thúc chưa?

  // --- Khởi tạo hoặc chơi lại trò chơi ---
  const startGame = () => {
    setQuestions(shuffleArray(initialQuestions));
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsQuizOver(false);
  };

  // Sử dụng useEffect để bắt đầu game lần đầu tiên
  useEffect(() => {
    startGame();
  }, []);

  // --- Xử lý khi người dùng chọn một câu trả lời ---
  const handleAnswerClick = (answer) => {
    if (isAnswered) return; // Nếu đã trả lời rồi thì không làm gì cả

    const isCorrect = answer === questions[currentQuestionIndex].correctAnswer;
    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (isCorrect) {
      setScore(score + 1);
    }

    // Tự động chuyển sang câu hỏi tiếp theo sau 1.5 giây
    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setIsQuizOver(true);
      }
    }, 1500);
  };

  // --- Hàm để lấy class CSS động cho các nút lựa chọn ---
  const getButtonClass = (option) => {
    if (!isAnswered) {
      return "bg-white hover:bg-sky-100"; // Trạng thái mặc định
    }

    const isCorrectAnswer =
      option === questions[currentQuestionIndex].correctAnswer;
    const isSelectedAnswer = option === selectedAnswer;

    if (isCorrectAnswer) {
      return "bg-green-500 text-white"; // Câu trả lời đúng
    }
    if (isSelectedAnswer && !isCorrectAnswer) {
      return "bg-red-500 text-white"; // Câu trả lời sai đã chọn
    }

    return "bg-white opacity-60"; // Các câu trả lời còn lại khi đã chọn xong
  };

  // --- Giao diện (Render) ---

  // Màn hình chờ tải
  if (questions.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-2xl">Loading Game...</p>
      </div>
    );
  }

  // Màn hình kết thúc game
  if (isQuizOver) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-sky-500 text-white">
        <h2 className="text-5xl font-bold">Game Over!</h2>
        <p className="mt-4 text-2xl">Your final score is:</p>
        <p className="my-8 text-7xl font-extrabold">
          {score} / {questions.length}
        </p>
        <button
          onClick={startGame}
          className="rounded-full bg-white px-10 py-4 text-xl font-semibold text-sky-500 shadow-xl transition-transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    );
  }

  // Màn hình chơi game chính
  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">
        {/* Phần Header: Điểm số và tiến trình */}
        <div className="mb-6 flex justify-between text-lg font-semibold">
          <p className="text-sky-600">Score: {score}</p>
          <p className="text-gray-500">
            Question {currentQuestionIndex + 1} / {questions.length}
          </p>
        </div>

        {/* Phần câu hỏi: Hình ảnh */}
        <div className="mb-8">
          <img
            src={currentQuestion.image}
            alt="Quiz"
            className="h-64 w-full rounded-lg object-cover shadow-md"
          />
        </div>

        {/* Phần trả lời: Các lựa chọn */}
        <div className="grid grid-cols-2 gap-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerClick(option)}
              disabled={isAnswered}
              className={`rounded-lg p-4 text-xl font-medium shadow-sm transition-all duration-300 ${getButtonClass(
                option
              )}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
