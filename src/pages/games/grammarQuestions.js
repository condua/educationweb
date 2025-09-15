// src/grammarQuestions.js
// Dữ liệu câu hỏi ngữ pháp được phân loại theo từng chủ đề.

export const grammarTopics = [
  {
    topic: "Tenses (Thì)",
    slug: "tenses",
    icon: "🕒",
    questions: [
      {
        preBlank: "The cat is ",
        postBlank: " on the mat.",
        options: ["sit", "sits", "sitting", "sat"],
        correctAnswer: "sitting",
        explanation:
          "Sử dụng thì Hiện tại Tiếp diễn (is + V-ing) để diễn tả hành động đang xảy ra.",
      },
      {
        preBlank: "The train ",
        postBlank: " at 8 AM tomorrow.",
        options: ["leave", "is leaving", "left", "has left"],
        correctAnswer: "is leaving",
        explanation:
          "Sử dụng thì Hiện tại Tiếp diễn để nói về một lịch trình hoặc kế hoạch chắc chắn trong tương lai gần.",
      },
      {
        preBlank: "They ",
        postBlank: " playing football now.",
        options: ["is", "are", "was", "be"],
        correctAnswer: "are",
        explanation: "Hiện tại tiếp diễn với chủ ngữ số nhiều dùng 'are'.",
      },
      {
        preBlank: "He ",
        postBlank: " to the gym every day.",
        options: ["go", "goes", "went", "gone"],
        correctAnswer: "goes",
        explanation:
          "Chủ ngữ số ít (he) và thói quen hàng ngày (every day) dùng thì Hiện tại đơn thêm -es.",
      },
      {
        preBlank: "The sun ",
        postBlank: " in the east.",
        options: ["rise", "rises", "rose", "risen"],
        correctAnswer: "rises",
        explanation: "Sự thật hiển nhiên dùng thì hiện tại đơn.",
      },
      {
        preBlank: "We ",
        postBlank: " to the cinema last night.",
        options: ["go", "went", "gone", "going"],
        correctAnswer: "went",
        explanation:
          "Thì Quá khứ đơn dùng cho hành động đã kết thúc trong quá khứ (last night).",
      },
      {
        preBlank: "He ",
        postBlank: " his leg while playing football.",
        options: ["break", "broke", "broken", "breaks"],
        correctAnswer: "broke",
        explanation:
          "Hành động xảy ra và kết thúc trong quá khứ dùng thì Quá khứ đơn. 'broke' là V2 của 'break'.",
      },
      {
        preBlank: "He ",
        postBlank: " in London when he was a child.",
        options: ["lives", "lived", "has lived", "living"],
        correctAnswer: "lived",
        explanation:
          "Quá khứ đơn diễn tả một hành động hoặc tình trạng đã kết thúc trong quá khứ.",
      },
      {
        preBlank: "He was reading a book while she ",
        postBlank: " dinner.",
        options: ["cook", "cooks", "was cooking", "cooked"],
        correctAnswer: "was cooking",
        explanation:
          "Thì Quá khứ tiếp diễn diễn tả hai hành động xảy ra song song trong quá khứ.",
      },
      {
        preBlank: "I was reading a book when the phone ",
        postBlank: ".",
        options: ["ring", "rung", "rang", "rings"],
        correctAnswer: "rang",
        explanation:
          "Một hành động đang diễn ra (was reading) thì một hành động khác xen vào (rang - Quá khứ đơn).",
      },
      {
        preBlank: "I haven't seen him ",
        postBlank: " last year.",
        options: ["for", "since", "ago", "in"],
        correctAnswer: "since",
        explanation:
          "Thì Hiện tại hoàn thành dùng 'since' với một mốc thời gian cụ thể (last year).",
      },
      {
        preBlank: "We haven't seen each other ",
        postBlank: " a long time.",
        options: ["for", "since", "in", "during"],
        correctAnswer: "for",
        explanation:
          "Thì Hiện tại hoàn thành dùng 'for' với một khoảng thời gian (a long time).",
      },
      {
        preBlank: "She hasn't finished her homework ",
        postBlank: ".",
        options: ["already", "yet", "still", "just"],
        correctAnswer: "yet",
        explanation:
          "'Yet' thường đứng cuối câu trong câu phủ định của thì Hiện tại Hoàn thành.",
      },
      {
        preBlank: "She is the most intelligent person I have ever ",
        postBlank: ".",
        options: ["meet", "meets", "met", "meeting"],
        correctAnswer: "met",
        explanation:
          "Thì Hiện tại hoàn thành (have + V3) dùng trong cấu trúc so sánh nhất để nói về trải nghiệm.",
      },
      {
        preBlank: "I can't find my keys. I must have ",
        postBlank: " them at home.",
        options: ["leave", "leaves", "left", "leaving"],
        correctAnswer: "left",
        explanation:
          "'Must have + V3' diễn tả một phỏng đoán chắc chắn về một sự việc trong quá khứ.",
      },
    ],
  },
  {
    topic: "Prepositions (Giới từ)",
    slug: "prepositions",
    icon: "📍",
    questions: [
      {
        preBlank: "My keys are ",
        postBlank: " the table.",
        options: ["in", "at", "on", "under"],
        correctAnswer: "on",
        explanation: "Sử dụng giới từ 'on' để chỉ vị trí trên một bề mặt.",
      },
      {
        preBlank: "We usually have lunch ",
        postBlank: " noon.",
        options: ["at", "in", "on", "by"],
        correctAnswer: "at",
        explanation:
          "'At' dùng cho các thời điểm cụ thể trong ngày (at noon, at midnight).",
      },
      {
        preBlank: "She is interested ",
        postBlank: " learning English.",
        options: ["in", "on", "at", "about"],
        correctAnswer: "in",
        explanation:
          "Cụm từ cố định (collocation) là 'interested in' + N/V-ing.",
      },
      {
        preBlank: "My brother is better ",
        postBlank: " maths than me.",
        options: ["at", "in", "on", "with"],
        correctAnswer: "at",
        explanation:
          "Cụm từ cố định là 'good at' / 'better at' để diễn tả giỏi về lĩnh vực nào đó.",
      },
      {
        preBlank: "The Eiffel Tower is ",
        postBlank: " Paris.",
        options: ["at", "in", "on", "to"],
        correctAnswer: "in",
        explanation:
          "Giới từ 'in' dùng cho các địa điểm lớn như thành phố, quốc gia.",
      },
      {
        preBlank: "I was born ",
        postBlank: " 1995.",
        options: ["in", "on", "at", "by"],
        correctAnswer: "in",
        explanation: "Giới từ 'in' dùng trước năm, tháng, mùa.",
      },
      {
        preBlank: "My birthday is ",
        postBlank: " May 5th.",
        options: ["in", "on", "at", "by"],
        correctAnswer: "on",
        explanation:
          "Giới từ 'on' dùng trước ngày cụ thể (ngày trong tháng, ngày trong tuần).",
      },
    ],
  },
  {
    topic: "Articles (Mạo từ)",
    slug: "articles",
    icon: "🅰️",
    questions: [
      {
        preBlank: "He bought ",
        postBlank: " new car yesterday.",
        options: ["a", "an", "the", "(no article)"],
        correctAnswer: "a",
        explanation:
          "Sử dụng mạo từ 'a' trước một danh từ đếm được số ít (car) được nhắc đến lần đầu tiên.",
      },
    ],
  },
  {
    topic: "Comparatives (So sánh)",
    slug: "comparatives",
    icon: "📊",
    questions: [
      {
        preBlank: "She is the ",
        postBlank: " student in the class.",
        options: ["tall", "taller", "tallest", "more tall"],
        correctAnswer: "tallest",
        explanation:
          "Dùng dạng so sánh nhất (the + adj-est) để chỉ người/vật cao nhất trong một nhóm.",
      },
      {
        preBlank: "She speaks more fluently ",
        postBlank: " before.",
        options: ["than", "as", "like", "to"],
        correctAnswer: "than",
        explanation: "So sánh hơn của trạng từ dài dùng 'more + adv + than'.",
      },
      {
        preBlank: "The book is not as interesting ",
        postBlank: " the movie.",
        options: ["than", "like", "as", "so"],
        correctAnswer: "as",
        explanation: "So sánh ngang bằng (phủ định): not as + adj + as.",
      },
    ],
  },
  {
    topic: "Conditionals & Wishes (Câu điều kiện & Câu ước)",
    slug: "conditionals-wishes",
    icon: "❓",
    questions: [
      {
        preBlank: "If I were you, I ",
        postBlank: " study harder.",
        options: ["will", "would", "can", "should have"],
        correctAnswer: "would",
        explanation:
          "Đây là câu điều kiện loại 2 (If + S + V2/Ved, S + would + V), diễn tả một giả định không có thật ở hiện tại.",
      },
      {
        preBlank: "I wish I ",
        postBlank: " taller.",
        options: ["am", "was", "were", "be"],
        correctAnswer: "were",
        explanation:
          "Câu ước ở hiện tại (wish + S + V2/Ved) dùng 'were' cho tất cả các ngôi.",
      },
      {
        preBlank: "If it rains, we ",
        postBlank: " at home.",
        options: ["stay", "will stay", "stayed", "staying"],
        correctAnswer: "will stay",
        explanation:
          "Câu điều kiện loại 1 (If + Hiện tại đơn, Tương lai đơn) diễn tả một khả năng có thể xảy ra.",
      },
    ],
  },
  {
    topic: "Quantifiers (Từ chỉ số lượng)",
    slug: "quantifiers",
    icon: "#️⃣",
    questions: [
      {
        preBlank: "There isn't ",
        postBlank: " milk left in the fridge.",
        options: ["some", "any", "many", "a lot"],
        correctAnswer: "any",
        explanation: "'Any' thường được dùng trong câu phủ định và câu hỏi.",
      },
    ],
  },
  {
    topic: "Adverbs & Adjectives (Trạng từ & Tính từ)",
    slug: "adverbs-adjectives",
    icon: "📝",
    questions: [
      {
        preBlank: "You speak English very ",
        postBlank: ".",
        options: ["good", "well", "best", "better"],
        correctAnswer: "well",
        explanation:
          "Dùng trạng từ 'well' để bổ nghĩa cho động từ 'speak'. 'Good' là một tính từ.",
      },
      {
        preBlank: "The movie was so ",
        postBlank: " that I fell asleep.",
        options: ["boring", "bored", "bores", "bore"],
        correctAnswer: "boring",
        explanation:
          "Tính từ đuôi '-ing' (boring) dùng để mô tả tính chất của sự vật, sự việc.",
      },
      {
        preBlank: "The test was easy, so I finished it ",
        postBlank: ".",
        options: ["quick", "quickly", "quicker", "quickest"],
        correctAnswer: "quickly",
        explanation: "Trạng từ 'quickly' bổ nghĩa cho động từ 'finished'.",
      },
      {
        preBlank: "The cake smells ",
        postBlank: ".",
        options: ["delicious", "deliciously", "delight", "delighted"],
        correctAnswer: "delicious",
        explanation:
          "Sau các động từ chỉ giác quan (linking verbs) như 'smell', 'taste', 'feel', ta dùng tính từ.",
      },
    ],
  },
  {
    topic: "Passive Voice (Câu bị động)",
    slug: "passive-voice",
    icon: "🗣️",
    questions: [
      {
        preBlank: "This book was written ",
        postBlank: " a famous author.",
        options: ["by", "with", "from", "for"],
        correctAnswer: "by",
        explanation:
          "Trong câu bị động, 'by' được dùng để chỉ tác nhân thực hiện hành động.",
      },
      {
        preBlank: "The cake was made ",
        postBlank: " my mom.",
        options: ["by", "from", "of", "with"],
        correctAnswer: "by",
        explanation:
          "Trong câu bị động, 'by' được dùng để chỉ người hoặc vật thực hiện hành động.",
      },
    ],
  },
  {
    topic: "Conjunctions (Liên từ)",
    slug: "conjunctions",
    icon: "🔗",
    questions: [
      {
        preBlank: "They went to the park ",
        postBlank: " it was raining.",
        options: ["although", "because", "but", "so"],
        correctAnswer: "although",
        explanation:
          "'Although' (mặc dù) dùng để nối hai mệnh đề có ý nghĩa tương phản.",
      },
      {
        preBlank: "We went out ",
        postBlank: " the rain.",
        options: ["although", "in spite of", "because", "so"],
        correctAnswer: "in spite of",
        explanation:
          "'In spite of' (mặc dù) + cụm danh từ. 'Although' + mệnh đề.",
      },
      {
        preBlank: "I was tired ",
        postBlank: " I went to bed early.",
        options: ["so", "because", "but", "although"],
        correctAnswer: "so",
        explanation:
          "'So' (vì vậy) dùng để chỉ kết quả của một hành động hoặc tình huống.",
      },
    ],
  },
  {
    topic: "Gerunds & Infinitives (Danh động từ & Động từ nguyên mẫu)",
    slug: "gerunds-infinitives",
    icon: "🏃‍♂️",
    questions: [
      {
        preBlank: "Don't forget ",
        postBlank: " the lights when you leave.",
        options: ["turn off", "to turn off", "turning off", "turned off"],
        correctAnswer: "to turn off",
        explanation:
          "'Forget to do something' nghĩa là quên phải làm một việc gì đó.",
      },
      {
        preBlank: "He hasn't decided what ",
        postBlank: " yet.",
        options: ["to do", "do", "doing", "done"],
        correctAnswer: "to do",
        explanation:
          "Sau các từ để hỏi như 'what', 'where', 'when' trong mệnh đề phụ, ta dùng 'to-infinitive'.",
      },
      {
        preBlank: "The teacher told us ",
        postBlank: " quiet.",
        options: ["be", "to be", "being", "been"],
        correctAnswer: "to be",
        explanation: "Cấu trúc 'tell someone to do something' (bảo ai làm gì).",
      },
    ],
  },
  {
    topic: "Phrasal Verbs (Cụm động từ)",
    slug: "phrasal-verbs",
    icon: "🚀",
    questions: [
      {
        preBlank: "Please turn ",
        postBlank: " the TV. I’m trying to study.",
        options: ["off", "on", "up", "down"],
        correctAnswer: "off",
        explanation: "'Turn off' là một cụm động từ có nghĩa là 'tắt'.",
      },
    ],
  },
  {
    topic: "Common Structures (Các cấu trúc thông dụng)",
    slug: "common-structures",
    icon: "🏛️",
    questions: [
      {
        preBlank: "I prefer tea ",
        postBlank: " coffee.",
        options: ["to", "than", "over", "for"],
        correctAnswer: "to",
        explanation:
          "Cấu trúc 'prefer something to something else' (thích cái gì hơn cái gì).",
      },
      {
        preBlank: "It is too cold ",
        postBlank: " go outside.",
        options: ["for", "to", "than", "so"],
        correctAnswer: "to",
        explanation:
          "Cấu trúc 'too + adj + to do something' (quá... để làm gì).",
      },
      {
        preBlank: "He is not old enough ",
        postBlank: " drive a car.",
        options: ["for", "to", "than", "so"],
        correctAnswer: "to",
        explanation:
          "Cấu trúc 'adj + enough + to do something' (đủ... để làm gì).",
      },
    ],
  },
];
