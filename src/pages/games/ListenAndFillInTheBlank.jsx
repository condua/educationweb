import React, { useState, useEffect } from "react";
import {
  PlayCircle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Music,
  Sparkles,
  Heart,
} from "lucide-react";

// Cập nhật Database: Thêm trường fullSentence để đọc đầy đủ, displaySentence để hiển thị
const SENTENCE_DB = [
  {
    id: 1,
    displaySentence: "The quick brown fox jumps over the lazy ___.",
    fullSentence: "The quick brown fox jumps over the lazy dog.",
    answer: "dog",
    options: ["cat", "dog", "mouse", "cow"],
    translation: "Con cáo nâu nhanh nhẹn nhảy qua con chó lười biếng.",
    ipa: "/ðə kwɪk braʊn fɒks dʒʌmps ˈəʊvə ðə ˈleɪzi dɒg/",
    hint: "Man's best friend. 🐶",
  },
  {
    id: 2,
    displaySentence: "I would like a cup of ___ with milk, please.",
    fullSentence: "I would like a cup of coffee with milk, please.",
    answer: "coffee",
    options: ["tea", "water", "coffee", "juice"],
    translation: "Làm ơn cho tôi một tách cà phê với sữa.",
    ipa: "/aɪ wʊd laɪk ə kʌp əv ˈkɒfi wɪð mɪlk, pliːz/",
    hint: "A popular caffeinated morning drink. ☕",
  },
  {
    id: 3,
    displaySentence: "She is wearing a beautiful red ___ to the party.",
    fullSentence: "She is wearing a beautiful red dress to the party.",
    answer: "dress",
    options: ["shirt", "pants", "hat", "dress"],
    translation: "Cô ấy đang mặc một chiếc váy đỏ tuyệt đẹp đến bữa tiệc.",
    ipa: "/ʃi ɪz ˈweərɪŋ ə ˈbjuːtɪfʊl rɛd drɛs tuː ðə ˈpɑːti/",
    hint: "A one-piece garment for women. 👗",
  },
  {
    id: 4,
    displaySentence: "Could you tell me the ___ to the nearest train station?",
    fullSentence: "Could you tell me the way to the nearest train station?",
    answer: "way",
    options: ["way", "time", "price", "reason"],
    translation: "Bạn có thể chỉ cho tôi đường đến ga tàu gần nhất không?",
    ipa: "/kʊd juː tɛl miː ðə weɪ tuː ðə ˈnɪərɪst treɪn ˈsteɪʃən/",
    hint: "Direction or path. 🗺️",
  },
  {
    id: 5,
    displaySentence: "He plays the ___ very well in the school band.",
    fullSentence: "He plays the guitar very well in the school band.",
    answer: "guitar",
    options: ["guitar", "football", "computer", "kitchen"],
    translation: "Anh ấy chơi guitar rất giỏi trong ban nhạc của trường.",
    ipa: "/hi pleɪz ðə gɪˈtɑː ˈvɛri wɛl ɪn ðə skuːl bænd/",
    hint: "A stringed musical instrument. 🎸",
  },
  {
    id: 6,
    displaySentence:
      "We need to buy some fresh ___ and vegetables for the salad.",
    fullSentence:
      "We need to buy some fresh fruits and vegetables for the salad.",
    answer: "fruits",
    options: ["fruits", "meat", "bread", "candy"],
    translation:
      "Chúng ta cần mua một ít trái cây và rau quả tươi cho món salad.",
    ipa: "/wi niːd tuː baɪ sʌm frɛʃ fruːts ænd ˈvɛʤɪtəb(ə)lz fɔː ðə ˈsæləd/",
    hint: "Apples, bananas, oranges... 🍎",
  },
  {
    id: 7,
    displaySentence: "The ___ is shining brightly in the clear blue sky.",
    fullSentence: "The sun is shining brightly in the clear blue sky.",
    answer: "sun",
    options: ["moon", "star", "sun", "cloud"],
    translation: "Mặt trời đang chiếu sáng rực rỡ trên bầu trời xanh trong.",
    ipa: "/ðə sʌn ɪz ˈʃaɪnɪŋ ˈbraɪtli ɪn ðə klɪə bluː skaɪ/",
    hint: "The star around which the earth orbits. ☀️",
  },
  {
    id: 8,
    displaySentence:
      "Please remember to lock the ___ before you leave the house.",
    fullSentence:
      "Please remember to lock the door before you leave the house.",
    answer: "door",
    options: ["window", "door", "car", "safe"],
    translation: "Vui lòng nhớ khóa cửa trước khi bạn rời khỏi nhà.",
    ipa: "/pliːz rɪˈmɛmbə tuː lɒk ðə dɔː bɪˈfɔː juː liːv ðə haʊs/",
    hint: "The main entrance to a room or building. 🚪",
  },
  {
    id: 9,
    displaySentence: "I enjoy reading a good ___ before going to sleep.",
    fullSentence: "I enjoy reading a good book before going to sleep.",
    answer: "book",
    options: ["movie", "book", "song", "game"],
    translation: "Tôi thích đọc một cuốn sách hay trước khi đi ngủ.",
    ipa: "/aɪ ɪnˈʤɔɪ ˈriːdɪŋ ə gʊd bʊk bɪˈfɔː ˈgəʊɪŋ tuː sliːp/",
    hint: "Contains pages with text. 📖",
  },
  {
    id: 10,
    displaySentence: "They are traveling to Paris by ___ tomorrow morning.",
    fullSentence: "They are traveling to Paris by plane tomorrow morning.",
    answer: "plane",
    options: ["bus", "train", "plane", "bicycle"],
    translation: "Họ sẽ đi du lịch đến Paris bằng máy bay vào sáng ngày mai.",
    ipa: "/ðeɪ ɑː ˈtrævlɪŋ tuː ˈpærɪs baɪ pleɪn təˈmɒrəʊ ˈmɔːnɪŋ/",
    hint: "It flies in the sky. ✈️",
  },
];

export default function ListenAndFillInTheBlank() {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [shuffledSentences, setShuffledSentences] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Audio settings
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [systemVoices, setSystemVoices] = useState([]);

  useEffect(() => {
    startNewGame();
    initSpeechSynthesis();
  }, []);

  const initSpeechSynthesis = () => {
    if ("speechSynthesis" in window) {
      const loadVoices = () => {
        let voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const enVoices = voices.filter((voice) =>
            voice.lang.startsWith("en"),
          );
          enVoices.sort((a, b) => {
            const aIsGoogle = a.name.includes("Google");
            const bIsGoogle = b.name.includes("Google");
            if (aIsGoogle && !bIsGoogle) return -1;
            if (!aIsGoogle && bIsGoogle) return 1;
            return 0;
          });
          setSystemVoices(enVoices.length > 0 ? enVoices : voices);
          if (!selectedVoice && enVoices.length > 0) {
            setSelectedVoice(enVoices[0]);
          }
        }
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    } else {
      setSpeechSupported(false);
    }
  };

  const startNewGame = () => {
    const shuffled = [...SENTENCE_DB].sort(() => 0.5 - Math.random());
    setShuffledSentences(shuffled);
    setCurrentSentenceIndex(0);
    setScore(0);
    setGameOver(false);
    resetTurn();
  };

  const resetTurn = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
  };

  const handleOptionSelect = (option) => {
    if (selectedAnswer !== null) return;
    const currentData = shuffledSentences[currentSentenceIndex];
    const correct = option === currentData.answer;

    setSelectedAnswer(option);
    setIsCorrect(correct);
    if (correct) setScore((prev) => prev + 1);
  };

  const nextSentence = () => {
    if (currentSentenceIndex < shuffledSentences.length - 1) {
      setCurrentSentenceIndex((prev) => prev + 1);
      resetTurn();
    } else {
      setGameOver(true);
    }
  };

  const playAudio = () => {
    if (!speechSupported || shuffledSentences.length === 0) return;
    window.speechSynthesis.cancel();

    const currentData = shuffledSentences[currentSentenceIndex];

    // YÊU CẦU MỚI: Luôn đọc fullSentence (câu hoàn chỉnh)
    const textToSpeak = currentData.fullSentence;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = 0.85;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (e) => {
      console.error("Speech synthesis error", e);
      setSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const renderSentenceWithBlank = (displaySentence) => {
    const parts = displaySentence.split("___");
    return (
      <span className="text-xl md:text-2xl font-bold text-slate-700 leading-relaxed tracking-wide">
        {parts[0]}
        <span
          className={`inline-block border-b-4 mx-2 text-center min-w-[90px] font-black transition-colors duration-300 ${
            selectedAnswer === null
              ? "border-pink-300 text-transparent"
              : isCorrect
                ? "border-green-400 text-green-500 drop-shadow-sm"
                : "border-red-400 text-red-500 drop-shadow-sm"
          }`}
        >
          {selectedAnswer !== null ? selectedAnswer : "____"}
        </span>
        {parts[1]}
      </span>
    );
  };

  if (shuffledSentences.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-pink-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-pink-400"></div>
      </div>
    );
  }

  const currentData = shuffledSentences[currentSentenceIndex];
  const isAnswered = selectedAnswer !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-blue-100 font-sans text-slate-800 p-4 md:p-8 flex flex-col items-center relative overflow-hidden">
      {/* CSS Animations cho phong cách Anime */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-5deg); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 6s ease-in-out infinite; animation-delay: 1.5s; }
        .glass-panel {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 2px solid rgba(255, 255, 255, 1);
        }
      `}</style>

      {/* Decorative Anime Elements */}
      <div className="absolute top-[10%] left-[5%] text-4xl animate-float opacity-70 pointer-events-none select-none">
        🌸
      </div>
      <div className="absolute top-[20%] right-[10%] text-3xl animate-float-delayed opacity-70 pointer-events-none select-none">
        ✨
      </div>
      <div className="absolute bottom-[15%] left-[10%] text-5xl animate-float-delayed opacity-60 pointer-events-none select-none">
        🍡
      </div>
      <div className="absolute bottom-[20%] right-[8%] text-4xl animate-float opacity-70 pointer-events-none select-none">
        🎀
      </div>

      {/* Header */}
      <div className="w-full max-w-3xl flex flex-col sm:flex-row justify-between items-center mb-8 glass-panel p-4 px-6 rounded-full shadow-[0_8px_32px_rgba(255,182,193,0.3)] z-10">
        <h1 className="text-2xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent flex items-center gap-2 mb-3 sm:mb-0">
          <Music className="text-pink-500" size={28} />
          Listen & Learn! ✧
        </h1>
        <div className="flex items-center gap-4">
          <div className="text-pink-600 font-bold bg-pink-100 px-4 py-1.5 rounded-full text-sm border border-pink-200 shadow-sm flex items-center gap-1">
            <Heart size={14} className="fill-pink-500" /> Score:{" "}
            <span className="text-purple-600 text-lg ml-1">{score}</span>
          </div>
          <div className="text-slate-500 font-bold bg-white/50 px-3 py-1.5 rounded-full text-sm">
            {currentSentenceIndex + 1} / {shuffledSentences.length}
          </div>
        </div>
      </div>

      {gameOver ? (
        <div className="w-full max-w-2xl glass-panel rounded-[2rem] shadow-[0_8px_40px_rgba(255,182,193,0.4)] p-10 text-center z-10 relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-6xl animate-bounce">
            🎉
          </div>
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4 mt-4">
            Sugoi! (Great Job!)
          </h2>
          <div className="text-7xl font-black text-pink-500 mb-6 drop-shadow-md">
            {Math.round((score / shuffledSentences.length) * 100)}%
          </div>
          <p className="text-lg text-slate-600 mb-8 font-medium">
            You got{" "}
            <span className="font-bold text-pink-500 text-xl">{score}</span> out
            of{" "}
            <span className="font-bold text-xl">
              {shuffledSentences.length}
            </span>{" "}
            correct.
          </p>
          <button
            onClick={startNewGame}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-full transition-all shadow-[0_4px_15px_rgba(236,72,153,0.4)] hover:shadow-[0_6px_20px_rgba(236,72,153,0.6)] hover:-translate-y-1 active:scale-95 text-lg"
          >
            <RefreshCw size={22} />
            Play Again
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl flex flex-col gap-6 z-10">
          {/* Main Card */}
          <div className="glass-panel rounded-[2.5rem] shadow-[0_12px_40px_rgba(200,150,220,0.3)] overflow-hidden">
            {/* Top Section - Audio Controls */}
            <div className="bg-white/40 border-b border-white/50 p-4 px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-sm font-bold text-purple-400 uppercase tracking-wider">
                  Voice
                </span>
                <select
                  value={selectedVoice ? selectedVoice.name : ""}
                  onChange={(e) => {
                    const voice = systemVoices.find(
                      (v) => v.name === e.target.value,
                    );
                    if (voice) setSelectedVoice(voice);
                  }}
                  className="bg-white/80 border-2 border-pink-100 text-slate-700 text-sm font-medium rounded-xl focus:ring-pink-400 focus:border-pink-400 block p-2 outline-none w-full sm:max-w-xs cursor-pointer truncate shadow-sm hover:border-pink-300 transition-colors"
                  disabled={systemVoices.length === 0}
                >
                  {systemVoices.length === 0 ? (
                    <option>Loading voices...</option>
                  ) : (
                    systemVoices.map((voice, idx) => (
                      <option key={`${voice.name}-${idx}`} value={voice.name}>
                        {voice.name} ({voice.lang}){" "}
                        {voice.localService ? "" : "☁️"}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {!speechSupported && (
                <div className="flex items-center gap-1 text-red-500 font-medium text-sm bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                  <AlertCircle size={16} /> Text-to-speech not supported
                </div>
              )}
            </div>

            {/* Sentence & Play Button Area */}
            <div className="p-8 md:p-12 flex flex-col items-center relative">
              {/* Play Button - Anime Style */}
              <button
                onClick={playAudio}
                disabled={!speechSupported}
                className="group relative mb-10"
                aria-label="Play audio"
              >
                <div
                  className={`absolute inset-0 bg-pink-400 rounded-full blur-md transition-opacity duration-300 ${speaking ? "opacity-80 animate-pulse" : "opacity-40 group-hover:opacity-70"}`}
                ></div>
                <div
                  className={`relative h-24 w-24 flex items-center justify-center rounded-full transition-all transform group-hover:scale-105 active:scale-95 border-4 border-white ${
                    speaking
                      ? "bg-gradient-to-tr from-purple-400 to-pink-400 text-white shadow-inner"
                      : "bg-gradient-to-tr from-pink-400 to-purple-400 text-white shadow-xl"
                  }`}
                >
                  <PlayCircle
                    size={56}
                    className={`${speaking ? "animate-pulse" : ""}`}
                  />
                </div>
              </button>

              <div className="text-center mb-10 select-none bg-white/60 p-6 rounded-3xl border border-white shadow-sm w-full">
                {renderSentenceWithBlank(currentData.displaySentence)}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
                {currentData.options.map((option, index) => {
                  let buttonClass =
                    "px-6 py-5 rounded-2xl font-bold text-lg border-2 transition-all duration-200 ";

                  if (!isAnswered) {
                    buttonClass +=
                      "bg-white/80 border-pink-100 text-slate-600 hover:border-pink-400 hover:bg-pink-50 hover:shadow-[0_4px_15px_rgba(244,114,182,0.3)] hover:-translate-y-1 active:bg-pink-100 cursor-pointer";
                  } else {
                    buttonClass += "cursor-default ";
                    if (option === currentData.answer) {
                      buttonClass +=
                        "bg-green-100 border-green-400 text-green-700 shadow-md relative scale-105 z-10";
                    } else if (option === selectedAnswer) {
                      buttonClass +=
                        "bg-red-50 border-red-300 text-red-500 opacity-90";
                    } else {
                      buttonClass +=
                        "bg-white/50 border-slate-100 text-slate-400 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      className={buttonClass}
                      disabled={isAnswered}
                    >
                      {option}
                      {isAnswered && option === currentData.answer && (
                        <CheckCircle2
                          size={24}
                          className="absolute top-1/2 right-4 -translate-y-1/2 text-green-500 animate-bounce"
                        />
                      )}
                      {isAnswered &&
                        option === selectedAnswer &&
                        option !== currentData.answer && (
                          <XCircle
                            size={24}
                            className="absolute top-1/2 right-4 -translate-y-1/2 text-red-400"
                          />
                        )}
                    </button>
                  );
                })}
              </div>

              {/* Hint System */}
              {!isAnswered && (
                <div className="mt-8 w-full max-w-lg text-center">
                  {showHint ? (
                    <div className="bg-yellow-50/90 text-yellow-800 p-4 rounded-2xl border-2 border-yellow-200 text-sm font-medium shadow-sm animate-fade-in flex items-center justify-center gap-2">
                      <Sparkles size={18} className="text-yellow-500" />
                      <span>
                        <strong className="font-black text-yellow-600">
                          Hint:
                        </strong>{" "}
                        {currentData.hint}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowHint(true)}
                      className="text-pink-400 hover:text-pink-600 flex items-center gap-2 mx-auto text-sm font-bold transition-colors bg-white/50 px-4 py-2 rounded-full hover:bg-white"
                    >
                      <Lightbulb size={18} /> Show Hint ✨
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Post-Answer Result Area */}
            {isAnswered && (
              <div
                className={`p-6 border-t-2 animate-slide-up ${
                  isCorrect
                    ? "bg-green-50/90 border-green-100"
                    : "bg-red-50/90 border-red-100"
                }`}
              >
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {isCorrect ? (
                        <div className="bg-gradient-to-br from-green-400 to-emerald-500 text-white p-3 rounded-full shadow-lg shadow-green-200">
                          <CheckCircle2 size={28} />
                        </div>
                      ) : (
                        <div className="bg-gradient-to-br from-red-400 to-rose-500 text-white p-3 rounded-full shadow-lg shadow-red-200">
                          <XCircle size={28} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3
                        className={`font-black text-xl mb-3 flex items-center gap-2 ${isCorrect ? "text-green-700" : "text-red-700"}`}
                      >
                        {isCorrect
                          ? "Yatta! Correct! 🎉"
                          : "Oh no! Try again! 🌸"}
                      </h3>

                      {/* Learning Content */}
                      <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-white/50 space-y-4">
                        <div>
                          <div className="text-xs font-black text-purple-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                            <Sparkles size={12} /> Full Sentence
                          </div>
                          <p className="text-slate-800 font-bold text-lg">
                            {currentData.fullSentence}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t-2 border-slate-50">
                          <div>
                            <div className="text-xs font-black text-pink-400 uppercase tracking-widest mb-1.5">
                              Pronunciation
                            </div>
                            <p className="text-purple-700 font-mono text-sm bg-purple-50 px-3 py-1.5 rounded-lg inline-block border border-purple-100 font-semibold">
                              {currentData.ipa}
                            </p>
                          </div>
                          <div>
                            <div className="text-xs font-black text-blue-400 uppercase tracking-widest mb-1.5">
                              Vietnamese
                            </div>
                            <p className="text-slate-600 text-sm font-medium bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                              "{currentData.translation}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={nextSentence}
                      className="flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] hover:-translate-y-1 active:scale-95"
                    >
                      {currentSentenceIndex < shuffledSentences.length - 1
                        ? "Next Question"
                        : "See Results"}
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
