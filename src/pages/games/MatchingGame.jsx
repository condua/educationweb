import React, { useState, useEffect } from "react";

// --- Dữ liệu các cặp từ ---
const wordPairs = [
  { id: 1, english: "House", vietnamese: "Ngôi nhà" },
  { id: 2, english: "Water", vietnamese: "Nước" },
  { id: 3, english: "Computer", vietnamese: "Máy tính" },
  { id: 4, english: "Morning", vietnamese: "Buổi sáng" },
  { id: 5, english: "Library", vietnamese: "Thư viện" },
  { id: 6, english: "Bicycle", vietnamese: "Xe đạp" },
  { id: 7, english: "Weather", vietnamese: "Thời tiết" },
  { id: 8, english: "Student", vietnamese: "Học sinh" },
];

// --- Hàm tạo và xáo trộn bộ bài ---
const generateAndShuffleCards = () => {
  const cards = [];
  wordPairs.forEach((pair) => {
    cards.push({
      id: `en-${pair.id}`,
      pairId: pair.id,
      content: pair.english,
      lang: "en",
    });
    cards.push({
      id: `vi-${pair.id}`,
      pairId: pair.id,
      content: pair.vietnamese,
      lang: "vi",
    });
  });
  return cards.sort(() => Math.random() - 0.5);
};

export default function MatchingGame() {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairIds, setMatchedPairIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false); // Ngăn người dùng lật thẻ thứ 3

  // --- Logic chính của trò chơi ---
  const startGame = () => {
    setCards(generateAndShuffleCards());
    setFlippedIndices([]);
    setMatchedPairIds([]);
    setMoves(0);
    setIsChecking(false);
  };

  useEffect(() => {
    startGame();
  }, []);

  // Xử lý khi lật 2 thẻ
  useEffect(() => {
    if (flippedIndices.length === 2) {
      setIsChecking(true);
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.pairId === secondCard.pairId) {
        // Nếu trùng khớp
        setMatchedPairIds([...matchedPairIds, firstCard.pairId]);
        setFlippedIndices([]);
        setIsChecking(false);
      } else {
        // Nếu không trùng, úp lại sau 1.2 giây
        setTimeout(() => {
          setFlippedIndices([]);
          setIsChecking(false);
        }, 1200);
      }
    }
  }, [flippedIndices, cards, matchedPairIds, moves]);

  const handleCardClick = (index) => {
    // Không cho phép lật thẻ khi đang kiểm tra, hoặc lật thẻ đã lật/đã khớp
    if (
      isChecking ||
      flippedIndices.includes(index) ||
      isCardMatched(cards[index])
    ) {
      return;
    }
    setFlippedIndices([...flippedIndices, index]);
  };

  const isCardFlipped = (index) => flippedIndices.includes(index);
  const isCardMatched = (card) => matchedPairIds.includes(card.pairId);
  const isGameWon = matchedPairIds.length === wordPairs.length;

  if (isGameWon) {
    return (
      <div className="flex h-screen flex-col items-center justify-center text-white text-center p-4">
        <h2 className="text-5xl font-bold">🎉 You Won! 🎉</h2>
        <p className="mt-4 text-2xl">You found all pairs in</p>
        <p className="my-8 text-7xl font-extrabold">{moves} moves</p>
        <button
          onClick={startGame}
          className="rounded-full bg-white px-10 py-4 text-xl font-semibold text-teal-800 shadow-xl transition-transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="mb-2 text-4xl font-bold text-white">Lingo Match</h1>
        <p className="mb-8 text-2xl font-semibold text-teal-300">
          Moves: {moves}
        </p>

        <div
          className="grid grid-cols-4 gap-4"
          style={{ perspective: "1000px" }}
        >
          {cards.map((card, index) => {
            const isFlipped = isCardFlipped(index) || isCardMatched(card);
            return (
              <div
                key={card.id}
                className="h-28 md:h-32 w-full cursor-pointer"
                onClick={() => handleCardClick(index)}
              >
                <div
                  className="relative h-full w-full rounded-lg shadow-lg transition-transform duration-700"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "",
                  }}
                >
                  {/* Mặt úp */}
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-lg bg-teal-500"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="text-4xl">?</span>
                  </div>
                  {/* Mặt ngửa */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center rounded-lg p-2 ${
                      isCardMatched(card) ? "bg-green-500" : "bg-white"
                    }`}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <span
                      className={`text-xl md:text-2xl font-bold ${
                        card.lang === "en" ? "text-blue-800" : "text-red-800"
                      }`}
                    >
                      {card.content}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
