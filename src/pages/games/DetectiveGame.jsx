import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- ✨ THAY ĐỔI 1: Thêm hiệu ứng âm thanh ---
// Tạo sẵn các đối tượng Audio để tái sử dụng, giúp tăng hiệu năng.
const correctSound = new Audio(
  "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581169/answer-correct_izdhpx.mp3"
);
const incorrectSound = new Audio(
  "https://res.cloudinary.com/dy9yts4fa/video/upload/v1754581291/answer-wrong_vjm3vq.mp3                                 "
);
correctSound.volume = 0.5;
incorrectSound.volume = 0.4;

// --- Dữ liệu "Vụ án" (Không thay đổi) ---
const caseFiles = [
  {
    id: 1,
    title: "The Weekend Plan",
    context: "Một đoạn tin nhắn giữa hai người bạn. Hãy tìm ra lỗi sai.",
    textWithMistake:
      "I am going to the movies with my friends tomorrow. We will having a great time.",
    error: {
      word: "having",
      correction: "have",
      options: ["have", "had", "to have"],
      explanation:
        "Sau động từ khuyết thiếu 'will', chúng ta sử dụng động từ nguyên thể không 'to'.",
    },
  },
  {
    id: 2,
    title: "The Study Session",
    context:
      "Một người đang kể về bạn của mình. Lỗi sai nằm ở sự hòa hợp chủ-vị.",
    textWithMistake: "One of my friends are coming over to study.",
    error: {
      word: "are",
      correction: "is",
      options: ["is", "were", "be"],
      explanation:
        "Chủ ngữ chính là 'One' (Một trong những người bạn), là số ít. Vì vậy, động từ phải là 'is'.",
    },
  },
  {
    id: 3,
    title: "The Unlikely Advice",
    context:
      "Một người bạn đang đưa ra lời khuyên. Có gì đó không đúng trong câu giả định...",
    textWithMistake: "If I was you, I would take that job opportunity.",
    error: {
      word: "was",
      correction: "were",
      options: ["were", "am", "be"],
      explanation:
        "Trong câu điều kiện loại 2 (giả định trái với sự thật ở hiện tại), ta luôn dùng 'were' cho tất cả các ngôi.",
    },
  },
  {
    id: 4,
    title: "The Confusing Trip",
    context:
      "Email kể về một chuyến đi. Hãy tìm ra điểm bất hợp lý về thời gian.",
    textWithMistake: "Last year, we visit the beautiful city of Paris.",
    error: {
      word: "visit",
      correction: "visited",
      options: ["visited", "will visit", "are visiting"],
      explanation:
        "'Last year' là dấu hiệu của quá khứ, vì vậy động từ phải ở thì Quá khứ đơn (V-ed).",
    },
  },
  {
    id: 5,
    title: "The Eager Student",
    context:
      "Một học sinh đang nói về sở thích của mình. Sai lầm nằm ở giới từ.",
    textWithMistake: "I am very interested on learning about space.",
    error: {
      word: "on",
      correction: "in",
      options: ["in", "at", "about"],
      explanation:
        "Cụm từ cố định (collocation) chính xác là 'to be interested in something'.",
    },
  },
  {
    id: 6,
    title: "The Daily Routine",
    context: "Ai đó đang mô tả thói quen buổi sáng của họ. Động từ có vấn đề.",
    textWithMistake: "She always drink coffee in the morning.",
    error: {
      word: "drink",
      correction: "drinks",
      options: ["drinks", "drunk", "is drinking"],
      explanation:
        "Với chủ ngữ ngôi thứ ba số ít ('She') ở thì hiện tại đơn, động từ phải thêm 's' hoặc 'es'.",
    },
  },
  {
    id: 7,
    title: "The Missing Item",
    context:
      "Một người đang hỏi về chiếc chìa khóa bị mất. Vấn đề nằm ở danh từ đếm được/không đếm được.",
    textWithMistake: "The police gave me an advice about securing my home.",
    error: {
      word: "an advice",
      correction: "some advice",
      options: ["some advice", "advices", "the advice"],
      explanation:
        "'Advice' là một danh từ không đếm được. Chúng ta không thể dùng 'a/an' với nó. Thay vào đó, dùng 'some advice' hoặc 'a piece of advice'.",
    },
  },
  {
    id: 8,
    title: "The Language Skill",
    context:
      "Mô tả khả năng nói tiếng Anh của một người. Tính từ và trạng từ đang bị nhầm lẫn.",
    textWithMistake: "He speaks English very good.",
    error: {
      word: "good",
      correction: "well",
      options: ["well", "fluent", "better"],
      explanation:
        "'Good' là một tính từ, nhưng ở đây chúng ta cần một trạng từ để bổ nghĩa cho động từ 'speaks'. Trạng từ tương ứng là 'well'.",
    },
  },
  {
    id: 9,
    title: "The Comparison",
    context:
      "So sánh chiều cao giữa hai người. Cấu trúc so sánh hơn đang bị sai.",
    textWithMistake: "My sister is more taller than me.",
    error: {
      word: "more taller",
      correction: "taller",
      options: ["taller", "tallest", "as tall"],
      explanation:
        "'Tall' là một tính từ ngắn. Để tạo dạng so sánh hơn, chúng ta chỉ cần thêm đuôi '-er' (taller), không cần dùng 'more'.",
    },
  },
  {
    id: 10,
    title: "The Arrival",
    context:
      "Một người kể lại một sự kiện trong quá khứ. Thì của động từ chưa chính xác.",
    textWithMistake: "When I arrived at the party, he already leave.",
    error: {
      word: "leave",
      correction: "had left",
      options: ["had left", "left", "was leaving"],
      explanation:
        "Hành động 'rời đi' (leave) xảy ra trước hành động 'đến' (arrived) trong quá khứ. Chúng ta phải dùng thì Quá khứ hoàn thành (had + V3/V-ed).",
    },
  },
  {
    id: 11,
    title: "The Hobby",
    context:
      "Chia sẻ về một hoạt động yêu thích. Dạng của động từ theo sau 'enjoy' chưa đúng.",
    textWithMistake: "I really enjoy to watch science fiction movies.",
    error: {
      word: "to watch",
      correction: "watching",
      options: ["watching", "watch", "watched"],
      explanation:
        "Sau động từ 'enjoy', chúng ta sử dụng danh động từ (V-ing).",
    },
  },
  {
    id: 12,
    title: "The Committee's Decision",
    context:
      "Thông báo về quyết định của một nhóm. Động từ không hợp với chủ ngữ.",
    textWithMistake: "The committee have made a decision.",
    error: {
      word: "have",
      correction: "has",
      options: ["has", "is", "are"],
      explanation:
        "'The committee' (ủy ban) được xem như một danh từ tập hợp số ít khi nó hành động như một khối thống nhất. Vì vậy, động từ phải là 'has'.",
    },
  },
  {
    id: 13,
    title: "The Appointment",
    context: "Sắp xếp một cuộc hẹn. Giới từ chỉ thời gian bị dùng sai.",
    textWithMistake: "Let's meet on 3 PM next Tuesday.",
    error: {
      word: "on",
      correction: "at",
      options: ["at", "in", "by"],
      explanation: "Chúng ta dùng giới từ 'at' với một giờ cụ thể.",
    },
  },
  {
    id: 14,
    title: "The Shopping Trip",
    context: "Kể về một chuyến đi mua sắm. Đại từ nhân xưng bị nhầm lẫn.",
    textWithMistake: "Me and my mom went to the supermarket.",
    error: {
      word: "Me",
      correction: "My mom and I",
      options: ["My mom and I", "I and my mom", "Us"],
      explanation:
        "Khi 'I' là một trong những chủ ngữ của câu, nó phải ở dạng chủ ngữ. Theo quy tắc lịch sự, chúng ta đặt người khác lên trước 'I'.",
    },
  },
  {
    id: 15,
    title: "The News Report",
    context: "Một bản tin thời sự. Chủ ngữ và động từ không hòa hợp.",
    textWithMistake: "The news from the war zone are very disturbing.",
    error: {
      word: "are",
      correction: "is",
      options: ["is", "was", "be"],
      explanation:
        "'News' (tin tức) là một danh từ không đếm được và luôn đi với động từ số ít.",
    },
  },
  {
    id: 16,
    title: "The University Student",
    context: "Giới thiệu về một người. Mạo từ đang bị dùng sai.",
    textWithMistake: "He is studying at a university in the London.",
    error: {
      word: "the London",
      correction: "London",
      options: ["London", "a London", "an London"],
      explanation:
        "Chúng ta không dùng mạo từ 'the' trước tên của hầu hết các thành phố.",
    },
  },
  {
    id: 17,
    title: "The Question",
    context: "Một người đang hỏi về số lượng. Từ để hỏi chưa chính xác.",
    textWithMistake: "How much eggs do we need for the cake?",
    error: {
      word: "much",
      correction: "many",
      options: ["many", "a lot of", "some"],
      explanation:
        "'Eggs' là danh từ đếm được số nhiều. Chúng ta dùng 'many' để hỏi về số lượng cho danh từ đếm được, và 'much' cho danh từ không đếm được.",
    },
  },
  {
    id: 18,
    title: "The Prohibition",
    context: "Một quy định trong thư viện. Động từ khuyết thiếu không đúng.",
    textWithMistake: "You mustn't to talk loudly in the library.",
    error: {
      word: "to talk",
      correction: "talk",
      options: ["talk", "talking", "talked"],
      explanation:
        "Sau các động từ khuyết thiếu như 'must', 'can', 'should', chúng ta dùng động từ nguyên thể không 'to'.",
    },
  },
  {
    id: 19,
    title: "The Misplaced Book",
    context:
      "Ai đó không thể tìm thấy cuốn sách của mình. Có một sự phủ định kép trong câu.",
    textWithMistake: "I can't find my book nowhere.",
    error: {
      word: "nowhere",
      correction: "anywhere",
      options: ["anywhere", "somewhere", "everywhere"],
      explanation:
        "Tiếng Anh chuẩn không sử dụng phủ định kép. Vì 'can't' đã mang nghĩa phủ định, chúng ta phải dùng 'anywhere' thay vì 'nowhere'.",
    },
  },
  {
    id: 20,
    title: "The Listener",
    context: "Mô tả một hành động. Thiếu giới từ cần thiết.",
    textWithMistake: "She is listening the new podcast.",
    error: {
      word: "listening the",
      correction: "listening to the",
      options: ["listening to the", "listening at the", "listens the"],
      explanation:
        "Động từ 'listen' luôn đi kèm với giới từ 'to' khi có một tân ngữ theo sau.",
    },
  },
  {
    id: 21,
    title: "The Best Student",
    context: "Khen ngợi một học sinh. Dạng so sánh nhất bị sai.",
    textWithMistake: "He is the most smart student in the class.",
    error: {
      word: "most smart",
      correction: "smartest",
      options: ["smartest", "smarter", "more smart"],
      explanation:
        "Với tính từ ngắn một âm tiết như 'smart', dạng so sánh nhất được tạo bằng cách thêm đuôi '-est'.",
    },
  },
  {
    id: 22,
    title: "The Irregular Verb",
    context: "Kể lại một hành động đã xảy ra. Động từ bất quy tắc bị chia sai.",
    textWithMistake: "Yesterday, I buyed a new phone.",
    error: {
      word: "buyed",
      correction: "bought",
      options: ["bought", "did buy", "have bought"],
      explanation:
        "'Buy' là một động từ bất quy tắc. Dạng quá khứ đơn của nó là 'bought', không phải 'buyed'.",
    },
  },
  {
    id: 23,
    title: "The Team Effort",
    context:
      "Nói về sự hợp tác của một nhóm. Đại từ phản thân không chính xác.",
    textWithMistake: "The team congratulated theirselves on the victory.",
    error: {
      word: "theirselves",
      correction: "themselves",
      options: ["themselves", "themself", "theirself"],
      explanation:
        "Đại từ phản thân chính xác cho 'they' hoặc một danh từ số nhiều như 'the team' là 'themselves'. 'Theirselves' không phải là một từ đúng trong tiếng Anh.",
    },
  },
  {
    id: 24,
    title: "The Future Prediction",
    context:
      "Dự đoán về thời tiết dựa trên bằng chứng hiện tại. Cách dùng thì tương lai chưa hợp lý.",
    textWithMistake: "Look at those dark clouds! It will rain soon.",
    error: {
      word: "will rain",
      correction: "is going to rain",
      options: ["is going to rain", "rains", "can rain"],
      explanation:
        "Khi đưa ra một dự đoán dựa trên bằng chứng rõ ràng ở hiện tại (những đám mây đen), chúng ta thường dùng cấu trúc 'be going to'.",
    },
  },
  {
    id: 25,
    title: "The Wrong Person",
    context: "Hỏi về một người. Đại từ nghi vấn 'who' và 'whom' bị nhầm.",
    textWithMistake: "Whom do you think will win the game?",
    error: {
      word: "Whom",
      correction: "Who",
      options: ["Who", "Which", "Whose"],
      explanation:
        "Trong câu này, chúng ta cần một chủ ngữ cho động từ 'will win'. 'Who' là đại từ nghi vấn đóng vai trò chủ ngữ, trong khi 'whom' đóng vai trò tân ngữ.",
    },
  },
  {
    id: 26,
    title: "The Bored Cat",
    context: "Mô tả một con mèo. Thiếu mạo từ.",
    textWithMistake: "I have cat. Cat is sleeping on the sofa.",
    error: {
      word: "cat",
      correction: "a cat",
      options: ["a cat", "the cat", "an cat"],
      explanation:
        "Khi giới thiệu một danh từ đếm được số ít lần đầu tiên, chúng ta phải dùng mạo từ 'a' hoặc 'an'.",
    },
  },
  {
    id: 27,
    title: "The Dependent Plan",
    context: "Nói về một kế hoạch phụ thuộc vào điều kiện. Giới từ bị sai.",
    textWithMistake: "Our picnic plan depends of the weather.",
    error: {
      word: "of",
      correction: "on",
      options: ["on", "in", "about"],
      explanation: "Cụm động từ chính xác là 'to depend on something'.",
    },
  },
  {
    id: 28,
    title: "The Quiet Child",
    context: "Mô tả hành vi của một đứa trẻ. Trạng từ bị đặt sai vị trí.",
    textWithMistake: "The child sat at the table quiet.",
    error: {
      word: "quiet",
      correction: "quietly",
      options: ["quietly", "more quiet", "quietness"],
      explanation:
        "Chúng ta cần một trạng từ ('quietly') để bổ nghĩa cho động từ 'sat', không phải một tính từ ('quiet').",
    },
  },
  {
    id: 29,
    title: "The Requirement",
    context: "Nói về một yêu cầu bắt buộc. Đại từ không hòa hợp.",
    textWithMistake:
      "Each of the students must submit their homework by Friday.",
    error: {
      word: "their",
      correction: "his or her",
      options: ["his or her", "our", "its"],
      explanation:
        "'Each' là một đại từ số ít. Về mặt ngữ pháp chặt chẽ, đại từ sở hữu phải là 'his or her'. (Lưu ý: 'their' số ít ngày càng được chấp nhận trong văn nói).",
    },
  },
  {
    id: 30,
    title: "The Lost Opportunity",
    context: "Nói về sự hối tiếc. Cấu trúc câu điều kiện loại 3 bị sai.",
    textWithMistake: "If I would have known, I would have helped you.",
    error: {
      word: "would have known",
      correction: "had known",
      options: ["had known", "knew", "did know"],
      explanation:
        "Trong mệnh đề 'If' của câu điều kiện loại 3 (diễn tả một điều không có thật trong quá khứ), chúng ta dùng thì Quá khứ hoàn thành (had + V3/V-ed).",
    },
  },
  {
    id: 31,
    title: "The Uncountable Furniture",
    context: "Liệt kê đồ đạc. Danh từ không đếm được bị dùng sai.",
    textWithMistake: "We bought several new furnitures for our apartment.",
    error: {
      word: "furnitures",
      correction: "pieces of furniture",
      options: ["pieces of furniture", "furniture", "furnishing"],
      explanation:
        "'Furniture' là một danh từ không đếm được và không có dạng số nhiều. Để chỉ số lượng, ta dùng 'pieces of furniture'.",
    },
  },
  {
    id: 32,
    title: "The Urgent Call",
    context: "Yêu cầu ai đó làm gì. Thiếu động từ.",
    textWithMistake: "I need you to calling me back as soon as possible.",
    error: {
      word: "calling",
      correction: "call",
      options: ["call", "called", "to call"],
      explanation:
        "Cấu trúc là 'need someone to do something'. Sau 'to' là động từ nguyên thể.",
    },
  },
  {
    id: 33,
    title: "The Location",
    context: "Hỏi về vị trí. Giới từ bị nhầm lẫn.",
    textWithMistake: "Where are you at?",
    error: {
      word: "at",
      correction: "(remove 'at')",
      options: ["(remove 'at')", "in", "on"],
      explanation:
        "Trong câu hỏi 'Where are you?', giới từ 'at' ở cuối câu là thừa và không cần thiết trong văn viết chuẩn.",
    },
  },
  {
    id: 34,
    title: "The Different Opinion",
    context: "Thể hiện sự khác biệt. Giới từ sai.",
    textWithMistake: "My opinion is different than yours.",
    error: {
      word: "than",
      correction: "from",
      options: ["from", "to", "as"],
      explanation:
        "Cụm từ đúng là 'different from'. 'Different to' cũng được chấp nhận trong tiếng Anh-Anh, nhưng 'different than' thường được coi là không trang trọng hoặc không đúng.",
    },
  },
  {
    id: 35,
    title: "The Experience",
    context: "Kể về một trải nghiệm quá khứ. Thì hiện tại hoàn thành dùng sai.",
    textWithMistake: "I have gone to Japan in 2019.",
    error: {
      word: "have gone",
      correction: "went",
      options: ["went", "had gone", "was going"],
      explanation:
        "Khi có một thời gian cụ thể trong quá khứ ('in 2019'), chúng ta phải dùng thì Quá khứ đơn, không dùng Hiện tại hoàn thành.",
    },
  },
  {
    id: 36,
    title: "The Careful Driver",
    context: "Mô tả cách một người lái xe. Tính từ và trạng từ bị nhầm.",
    textWithMistake: "She drives very careful.",
    error: {
      word: "careful",
      correction: "carefully",
      options: ["carefully", "cared", "carefulness"],
      explanation:
        "Chúng ta cần một trạng từ ('carefully') để bổ nghĩa cho động từ 'drives'.",
    },
  },
  {
    id: 37,
    title: "The Reason",
    context: "Giải thích lý do. Cấu trúc câu bị lặp.",
    textWithMistake: "The reason I'm late is because the traffic was bad.",
    error: {
      word: "because",
      correction: "that",
      options: ["that", "due to", "since"],
      explanation:
        "Cấu trúc 'The reason is...' đã bao hàm ý nghĩa của 'because'. Sử dụng 'The reason is that...' là đúng ngữ pháp hơn và tránh lặp từ.",
    },
  },
  {
    id: 38,
    title: "The Accomplishment",
    context: "Nói về việc hoàn thành một việc gì đó. Dạng động từ sai.",
    textWithMistake: "They succeeded to finish the project on time.",
    error: {
      word: "to finish",
      correction: "in finishing",
      options: ["in finishing", "finishing", "finished"],
      explanation:
        "Động từ 'succeed' đi với giới từ 'in' và một danh động từ (V-ing).",
    },
  },
  {
    id: 39,
    title: "The Two Options",
    context: "So sánh hai sự lựa chọn. Sai cấu trúc so sánh.",
    textWithMistake: "Of the two choices, this one is the best.",
    error: {
      word: "best",
      correction: "better",
      options: ["better", "good", "more good"],
      explanation:
        "Khi so sánh giữa hai vật hoặc hai người, chúng ta dùng dạng so sánh hơn ('better'), không dùng dạng so sánh nhất ('best').",
    },
  },
  {
    id: 40,
    title: "The Confused Pronoun",
    context: "Nhắc đến một đồ vật. Đại từ sở hữu không đúng.",
    textWithMistake: "The dog wagged it's tail happily.",
    error: {
      word: "it's",
      correction: "its",
      options: ["its", "it", "their"],
      explanation:
        "'It's' là dạng viết tắt của 'it is'. Đại từ sở hữu là 'its' (không có dấu nháy đơn).",
    },
  },
  {
    id: 41,
    title: "The Number of People",
    context: "Mô tả số lượng người. Chủ ngữ và động từ không hợp nhau.",
    textWithMistake: "There's many people waiting outside.",
    error: {
      word: "There's",
      correction: "There are",
      options: ["There are", "There is", "There were"],
      explanation:
        "'There's' là viết tắt của 'There is', dùng cho danh từ số ít. Vì 'many people' là số nhiều, chúng ta phải dùng 'There are'.",
    },
  },
  {
    id: 42,
    title: "The Anxious Wait",
    context: "Mô tả một cảm xúc. Tính từ -ed và -ing bị nhầm.",
    textWithMistake: "I am so exciting about the concert tomorrow!",
    error: {
      word: "exciting",
      correction: "excited",
      options: ["excited", "excite", "excitement"],
      explanation:
        "Tính từ đuôi '-ed' ('excited') dùng để mô tả cảm xúc của một người. Tính từ đuôi '-ing' ('exciting') dùng để mô tả bản chất của sự vật, sự việc (ví dụ: 'The concert is exciting').",
    },
  },
  {
    id: 43,
    title: "The Reduced Amount",
    context: "Nói về số lượng ít hơn. Từ chỉ số lượng không đúng.",
    textWithMistake: "There are less people in the park today.",
    error: {
      word: "less",
      correction: "fewer",
      options: ["fewer", "little", "much"],
      explanation:
        "'Less' được dùng với danh từ không đếm được (e.g., less water). 'Fewer' được dùng với danh từ đếm được số nhiều (e.g., fewer people).",
    },
  },
  {
    id: 44,
    title: "The Mistake",
    context: "Thừa nhận một lỗi lầm. Động từ không đúng.",
    textWithMistake: "I think I've did a mistake.",
    error: {
      word: "did",
      correction: "made",
      options: ["made", "done", "got"],
      explanation:
        "Chúng ta dùng cụm từ 'to make a mistake', không dùng 'to do a mistake'.",
    },
  },
  {
    id: 45,
    title: "The Historical Event",
    context: "Mô tả một sự kiện trong lịch sử. Thì của động từ sai.",
    textWithMistake: "The Second World War has ended in 1945.",
    error: {
      word: "has ended",
      correction: "ended",
      options: ["ended", "had ended", "was ending"],
      explanation:
        "Sự kiện đã kết thúc tại một thời điểm xác định trong quá khứ nên phải dùng thì Quá khứ đơn.",
    },
  },
  {
    id: 46,
    title: "The Tall Building",
    context: "Hỏi về chiều cao. Từ để hỏi không phù hợp.",
    textWithMistake: "How long is the Eiffel Tower?",
    error: {
      word: "long",
      correction: "high",
      options: ["high", "tall", "big"],
      explanation:
        "Chúng ta dùng 'how high' hoặc 'how tall' để hỏi về chiều cao theo phương thẳng đứng. 'How long' dùng để hỏi về chiều dài.",
    },
  },
  {
    id: 47,
    title: "The Good Job",
    context: "Khen ngợi ai đó. Trạng từ và tính từ bị nhầm.",
    textWithMistake: "You did the presentation real good.",
    error: {
      word: "real",
      correction: "really",
      options: ["really", "very", "so"],
      explanation:
        "'Real' là một tính từ. Để bổ nghĩa cho một tính từ khác ('good') hoặc một trạng từ ('well'), chúng ta cần dùng trạng từ 'really'.",
    },
  },
  {
    id: 48,
    title: "The Permission",
    context: "Xin phép làm gì đó. Động từ khuyết thiếu bị nhầm.",
    textWithMistake: "Can I to borrow your pen for a moment?",
    error: {
      word: "to borrow",
      correction: "borrow",
      options: ["borrow", "borrowing", "borrowed"],
      explanation:
        "Sau động từ khuyết thiếu 'can', chúng ta dùng động từ nguyên thể không 'to'.",
    },
  },
  {
    id: 49,
    title: "The Destination",
    context: "Kể về một chuyến đi. Giới từ bị thừa.",
    textWithMistake: "Last summer, we went to abroad for our vacation.",
    error: {
      word: "to",
      correction: "(remove 'to')",
      options: ["(remove 'to')", "at", "in"],
      explanation:
        "'Abroad' là một trạng từ chỉ nơi chốn, nó có nghĩa là 'đến/ở nước ngoài'. Chúng ta không cần giới từ 'to' phía trước. (Ví dụ: go home, go abroad).",
    },
  },
  {
    id: 50,
    title: "The Happy Couple",
    context: "Mô tả một cặp đôi. Động từ sai.",
    textWithMistake: "They have been married since ten years.",
    error: {
      word: "since",
      correction: "for",
      options: ["for", "in", "from"],
      explanation:
        "'For' được dùng với một khoảng thời gian (for ten years). 'Since' được dùng với một mốc thời gian cụ thể (since 2014).",
    },
  },
  {
    id: 51,
    title: "The First Time",
    context: "Kể về một trải nghiệm lần đầu. Thì của động từ chưa đúng.",
    textWithMistake: "This is the first time I eat sushi.",
    error: {
      word: "eat",
      correction: "have eaten",
      options: ["have eaten", "ate", "am eating"],
      explanation:
        "Cấu trúc 'This is the first/second/third... time' thường đi với thì Hiện tại hoàn thành để diễn tả một trải nghiệm.",
    },
  },
  {
    id: 52,
    title: "The Information Desk",
    context: "Hỏi thông tin. Danh từ không đếm được bị dùng sai.",
    textWithMistake:
      "Can you give me some informations about the train schedule?",
    error: {
      word: "informations",
      correction: "information",
      options: ["information", "info", "a information"],
      explanation:
        "'Information' là một danh từ không đếm được và không có dạng số nhiều.",
    },
  },
  {
    id: 53,
    title: "The Allergy",
    context: "Nói về bệnh dị ứng. Giới từ sai.",
    textWithMistake: "I am allergic for cats.",
    error: {
      word: "for",
      correction: "to",
      options: ["to", "with", "from"],
      explanation: "Cụm từ đúng là 'to be allergic to something'.",
    },
  },
  {
    id: 54,
    title: "The Boring Film",
    context: "Bày tỏ cảm xúc về một bộ phim. Tính từ -ed/-ing bị nhầm.",
    textWithMistake: "I was very boring during the movie.",
    error: {
      word: "boring",
      correction: "bored",
      options: ["bored", "bore", "boredom"],
      explanation:
        "Dùng 'bored' (đuôi -ed) để diễn tả cảm xúc của bản thân. Dùng 'boring' (đuôi -ing) để mô tả bản chất của sự vật, sự việc (the movie was boring).",
    },
  },
  {
    id: 55,
    title: "The Late Arrival",
    context: "Giải thích lý do đến muộn. Giới từ sai.",
    textWithMistake: "I apologize for be late.",
    error: {
      word: "be",
      correction: "being",
      options: ["being", "to be", "am"],
      explanation:
        "Sau giới từ (ví dụ: 'for', 'in', 'at'), chúng ta phải dùng danh động từ (V-ing).",
    },
  },
  {
    id: 56,
    title: "The Heavy Traffic",
    context: "Kẹt xe. Danh từ không đếm được bị dùng sai.",
    textWithMistake: "There were too many traffic on the highway this morning.",
    error: {
      word: "many",
      correction: "much",
      options: ["much", "a lot", "some"],
      explanation:
        "'Traffic' là danh từ không đếm được. Chúng ta dùng 'much' với danh từ không đếm được và 'many' với danh từ đếm được.",
    },
  },
  {
    id: 57,
    title: "The Unique Animal",
    context: "Mô tả một con vật. Mạo từ không đúng.",
    textWithMistake: "I saw an unicorn in my dream.",
    error: {
      word: "an",
      correction: "a",
      options: ["a", "the", "(no article)"],
      explanation:
        "Việc dùng 'a' hay 'an' phụ thuộc vào âm thanh bắt đầu của từ theo sau, không phải chữ cái. 'Unicorn' bắt đầu bằng âm /'ju:/ (giống như 'you'), là một phụ âm. Vì vậy, ta dùng 'a'.",
    },
  },
  {
    id: 58,
    title: "The Slow Runner",
    context: "Mô tả tốc độ. Trạng từ và tính từ bị nhầm.",
    textWithMistake: "He runs very slow.",
    error: {
      word: "slow",
      correction: "slowly",
      options: ["slowly", "slower", "slowness"],
      explanation:
        "Để bổ nghĩa cho động từ 'runs', chúng ta cần một trạng từ ('slowly'). 'Slow' là một tính từ. (Lưu ý: 'slow' đôi khi được dùng như một trạng từ trong văn nói không trang trọng).",
    },
  },
  {
    id: 59,
    title: "The Wrong Key",
    context: "Mô tả một đối tượng. Đại từ sở hữu sai.",
    textWithMistake: "This isn't my key. It must be her's.",
    error: {
      word: "her's",
      correction: "hers",
      options: ["hers", "her", "she's"],
      explanation:
        "Đại từ sở hữu như 'hers', 'yours', 'ours', 'theirs' không bao giờ có dấu nháy đơn.",
    },
  },
  {
    id: 60,
    title: "The Future Condition",
    context:
      "Nói về một điều kiện trong tương lai. Cấu trúc câu điều kiện loại 1 bị sai.",
    textWithMistake: "If I will see her, I'll give her the message.",
    error: {
      word: "will see",
      correction: "see",
      options: ["see", "saw", "am seeing"],
      explanation:
        "Trong mệnh đề 'if' của câu điều kiện loại 1, chúng ta dùng thì Hiện tại đơn, không dùng thì Tương lai đơn.",
    },
  },
  {
    id: 61,
    title: "The Agreement",
    context: "Bày tỏ sự đồng tình. Động từ không chính xác.",
    textWithMistake: "I am agree with your proposal.",
    error: {
      word: "am agree",
      correction: "agree",
      options: ["agree", "have agreed", "agreement"],
      explanation:
        "'Agree' là một động từ, không phải là một tính từ. Vì vậy, không cần động từ 'to be' (am, is, are) đi trước nó.",
    },
  },
  {
    id: 62,
    title: "The Equipment",
    context: "Nói về trang thiết bị. Danh từ không đếm được bị dùng sai.",
    textWithMistake: "The gym has a lot of modern equipments.",
    error: {
      word: "equipments",
      correction: "equipment",
      options: ["equipment", "pieces of equipment", "equips"],
      explanation:
        "'Equipment' là một danh từ không đếm được, nó không có dạng số nhiều.",
    },
  },
  {
    id: 63,
    title: "The Marriage",
    context: "Nói về tình trạng hôn nhân. Giới từ sai.",
    textWithMistake: "She is married with a doctor.",
    error: {
      word: "with",
      correction: "to",
      options: ["to", "at", "by"],
      explanation: "Cụm từ đúng là 'to be married to someone'.",
    },
  },
  {
    id: 64,
    title: "The Impossible Situation",
    context: "Ước một điều trái với hiện tại. Động từ sai.",
    textWithMistake: "I wish I can fly.",
    error: {
      word: "can",
      correction: "could",
      options: ["could", "would", "will"],
      explanation:
        "Sau cấu trúc 'I wish' để diễn tả một điều ước không có thật ở hiện tại, chúng ta lùi động từ về dạng quá khứ. 'Can' trở thành 'could'.",
    },
  },
  {
    id: 65,
    title: "The Graduation",
    context: "Nói về việc tốt nghiệp. Giới từ sai.",
    textWithMistake: "He graduated from university on last year.",
    error: {
      word: "on",
      correction: "(remove 'on')",
      options: ["(remove 'on')", "in", "at"],
      explanation:
        "Khi dùng các cụm từ chỉ thời gian như 'last year', 'next month', 'yesterday', chúng ta không cần dùng giới từ (in, on, at) phía trước.",
    },
  },
  {
    id: 66,
    title: "The Confusing Weather",
    context: "Hỏi về thời tiết. Từ để hỏi bị nhầm.",
    textWithMistake: "How is the weather like today?",
    error: {
      word: "How",
      correction: "What",
      options: ["What", "Which", "Why"],
      explanation:
        "Có hai cách hỏi đúng: 'What is the weather like?' hoặc 'How is the weather?'. Kết hợp cả 'how' và 'like' là sai.",
    },
  },
  {
    id: 67,
    title: "The Scared Dog",
    context: "Mô tả một con chó. Tính từ -ing và -ed bị nhầm.",
    textWithMistake: "The loud noise made the dog feeling frightened.",
    error: {
      word: "feeling",
      correction: "feel",
      options: ["feel", "to feel", "felt"],
      explanation:
        "Sau cấu trúc 'make someone do something' (khiến ai đó làm gì), chúng ta dùng động từ nguyên thể không 'to'.",
    },
  },
  {
    id: 68,
    title: "The Good Athlete",
    context: "Khen ngợi khả năng của một người. Giới từ sai.",
    textWithMistake: "She is very good for playing tennis.",
    error: {
      word: "for",
      correction: "at",
      options: ["at", "in", "with"],
      explanation:
        "Cụm từ cố định là 'to be good at something' (giỏi về việc gì đó).",
    },
  },
  {
    id: 69,
    title: "The Explanation",
    context: "Giải thích điều gì đó. Động từ không có tân ngữ trực tiếp.",
    textWithMistake: "Can you explain me this grammar rule?",
    error: {
      word: "explain me",
      correction: "explain to me",
      options: ["explain to me", "explain for me", "explaining me"],
      explanation:
        "Động từ 'explain' không đi trực tiếp với một tân ngữ chỉ người. Cấu trúc đúng là 'explain something to someone'.",
    },
  },
  {
    id: 70,
    title: "The Person in Charge",
    context: "Nói về người có trách nhiệm. Giới từ sai.",
    textWithMistake: "Who is responsible of this department?",
    error: {
      word: "of",
      correction: "for",
      options: ["for", "to", "in"],
      explanation: "Cụm từ đúng là 'to be responsible for something'.",
    },
  },
  {
    id: 71,
    title: "The Night Shift",
    context: "Kể về một thói quen. Động từ sai.",
    textWithMistake: "I am not used to work at night.",
    error: {
      word: "work",
      correction: "working",
      options: ["working", "to working", "worked"],
      explanation:
        "Cấu trúc 'to be used to' (quen với việc gì) được theo sau bởi một danh động từ (V-ing).",
    },
  },
  {
    id: 72,
    title: "The Unnecessary Word",
    context: "Thảo luận một chủ đề. Có từ bị thừa.",
    textWithMistake: "Let's discuss about the project details.",
    error: {
      word: "about",
      correction: "(remove 'about')",
      options: ["(remove 'about')", "on", "over"],
      explanation:
        "Động từ 'discuss' có nghĩa là 'thảo luận về', vì vậy nó không cần giới từ 'about' theo sau. Chúng ta 'discuss something'.",
    },
  },
  {
    id: 73,
    title: "The High Price",
    context: "Nhận xét về giá cả. Tính từ sai.",
    textWithMistake: "The price of this car is too expensive.",
    error: {
      word: "expensive",
      correction: "high",
      options: ["high", "big", "much"],
      explanation:
        "Một đồ vật có thể 'expensive' (đắt), nhưng giá cả ('price') thì 'high' (cao) hoặc 'low' (thấp).",
    },
  },
  {
    id: 74,
    title: "The TV Show",
    context: "Mô tả một chương trình TV. Trạng từ vị trí sai.",
    textWithMistake: "I watch sometimes that show.",
    error: {
      word: "watch sometimes",
      correction: "sometimes watch",
      options: ["sometimes watch", "am sometimes watching", "watch ever"],
      explanation:
        "Trạng từ chỉ tần suất như 'sometimes', 'always', 'often' thường đứng trước động từ chính.",
    },
  },
  {
    id: 75,
    title: "The Old Photo",
    context: "Nhớ lại một kỷ niệm. Động từ không chính xác.",
    textWithMistake: "This photo reminds me my childhood.",
    error: {
      word: "reminds me",
      correction: "reminds me of",
      options: ["reminds me of", "remembers me", "reminds to me"],
      explanation:
        "Cấu trúc đúng là 'remind someone of something' (gợi cho ai nhớ về điều gì).",
    },
  },
  {
    id: 76,
    title: "The Luggage",
    context: "Nói về hành lý. Danh từ không đếm được bị dùng sai.",
    textWithMistake: "I have too many luggages to carry.",
    error: {
      word: "luggages",
      correction: "luggage",
      options: ["luggage", "pieces of luggage", "bags"],
      explanation:
        "'Luggage' (hoặc 'baggage') là một danh từ không đếm được và không có dạng số nhiều.",
    },
  },
  {
    id: 77,
    title: "The Arrival Time",
    context: "Hỏi về thời gian đến. Thì của động từ sai.",
    textWithMistake: "What time the train arrives?",
    error: {
      word: "the train arrives",
      correction: "does the train arrive",
      options: [
        "does the train arrive",
        "is the train arriving",
        "train arrives",
      ],
      explanation:
        "Trong câu hỏi ở thì Hiện tại đơn (với động từ thường), chúng ta cần dùng trợ động từ 'do' hoặc 'does' đứng trước chủ ngữ.",
    },
  },
  {
    id: 78,
    title: "The Fast Car",
    context: "Mô tả tốc độ của xe. Trạng từ sai.",
    textWithMistake: "The car goes very fastly.",
    error: {
      word: "fastly",
      correction: "fast",
      options: ["fast", "faster", "quick"],
      explanation:
        "'Fast' vừa là tính từ, vừa là trạng từ. 'Fastly' không phải là một từ đúng trong tiếng Anh.",
    },
  },
  {
    id: 79,
    title: "The Homework",
    context: "Nói về bài tập. Danh từ không đếm được.",
    textWithMistake: "The teacher gave us too many homeworks.",
    error: {
      word: "homeworks",
      correction: "homework",
      options: ["homework", "assignments", "piece of homework"],
      explanation:
        "'Homework' là một danh từ không đếm được. Chúng ta có thể nói 'too much homework' hoặc 'many assignments'.",
    },
  },
  {
    id: 80,
    title: "The Preference",
    context: "So sánh sở thích. Cấu trúc sai.",
    textWithMistake: "I prefer coffee than tea.",
    error: {
      word: "than",
      correction: "to",
      options: ["to", "over", "more than"],
      explanation:
        "Cấu trúc đúng để so sánh với động từ 'prefer' là 'prefer something to something else'.",
    },
  },
  {
    id: 81,
    title: "The Hard Worker",
    context: "Mô tả một người. Trạng từ sai.",
    textWithMistake: "He works very hardly.",
    error: {
      word: "hardly",
      correction: "hard",
      options: ["hard", "harder", "strong"],
      explanation:
        "'Hard' vừa là tính từ, vừa là trạng từ (chăm chỉ, vất vả). 'Hardly' cũng là một trạng từ nhưng có nghĩa là 'hầu như không'.",
    },
  },
  {
    id: 82,
    title: "The Angry Manager",
    context: "Mô tả một người. Tính từ và trạng từ bị nhầm.",
    textWithMistake: "The manager looked at him angry.",
    error: {
      word: "angry",
      correction: "angrily",
      options: ["angrily", "anger", "more angry"],
      explanation:
        "Ở đây, chúng ta cần một trạng từ ('angrily') để bổ nghĩa cho động từ 'looked'. Nếu nói 'The manager looked angry', nó sẽ mô tả trạng thái của người quản lý, không phải cách ông ta nhìn.",
    },
  },
  {
    id: 83,
    title: "The Last Minute Change",
    context: "Kể về một sự thay đổi. Thì quá khứ hoàn thành dùng sai.",
    textWithMistake: "By the time we got there, the movie already started.",
    error: {
      word: "started",
      correction: "had started",
      options: ["had started", "was starting", "has started"],
      explanation:
        "Hành động 'bắt đầu' xảy ra trước hành động 'đến'. Cấu trúc 'By the time + S + V(quá khứ đơn), S + V(quá khứ hoàn thành)'.",
    },
  },
  {
    id: 84,
    title: "The Recommendation",
    context: "Gợi ý một hành động. Động từ không đúng.",
    textWithMistake: "I suggest you to take a break.",
    error: {
      word: "to take",
      correction: "take",
      options: ["take", "taking", "should take"],
      explanation:
        "Sau động từ 'suggest', chúng ta có thể dùng cấu trúc 'suggest (that) someone (should) do something' hoặc 'suggest doing something'. Dùng 'suggest someone to do something' là sai.",
    },
  },
  {
    id: 85,
    title: "The Journey",
    context: "Hỏi về thời gian. Từ để hỏi không phù hợp.",
    textWithMistake: "How many time does it take to get to the airport?",
    error: {
      word: "many",
      correction: "much",
      options: ["much", "long", "far"],
      explanation:
        "'Time' trong trường hợp này là không đếm được. Chúng ta dùng 'How much time...?' hoặc 'How long...?'.",
    },
  },
  {
    id: 86,
    title: "The Old House",
    context: "Mô tả một ngôi nhà cũ. Động từ sai.",
    textWithMistake: "This house was built since 100 years ago.",
    error: {
      word: "since",
      correction: "(remove 'since')",
      options: ["(remove 'since')", "for", "in"],
      explanation:
        "Cụm từ '... ago' đã chỉ rõ thời điểm trong quá khứ so với hiện tại, không cần dùng 'since'. Câu đúng là 'This house was built 100 years ago'.",
    },
  },
  {
    id: 87,
    title: "The Funny Joke",
    context: "Phản ứng với một câu chuyện đùa. Động từ sai.",
    textWithMistake: "Everyone laughed on his joke.",
    error: {
      word: "on",
      correction: "at",
      options: ["at", "about", "for"],
      explanation:
        "Chúng ta 'laugh at' một câu chuyện đùa hoặc một điều gì đó/ai đó.",
    },
  },
  {
    id: 88,
    title: "The European Trip",
    context: "Kể về một chuyến đi. Mạo từ sai.",
    textWithMistake:
      "We are planning a trip to the United Kingdom and a France.",
    error: {
      word: "a France",
      correction: "France",
      options: ["France", "the France", "some France"],
      explanation:
        "Chúng ta không dùng mạo từ 'a/an' trước tên của hầu hết các quốc gia. Tuy nhiên, một số quốc gia có 'the' như 'the United Kingdom', 'the USA'.",
    },
  },
  {
    id: 89,
    title: "The Wrong Pronoun",
    context: "Nói về một nhóm người. Đại từ sai.",
    textWithMistake: "The teacher told we to be quiet.",
    error: {
      word: "we",
      correction: "us",
      options: ["us", "our", "ourselves"],
      explanation:
        "Sau động từ 'told', chúng ta cần một tân ngữ. Tân ngữ của 'we' là 'us'.",
    },
  },
  {
    id: 90,
    title: "The Promise",
    context: "Hứa sẽ làm gì đó. Động từ theo sau không đúng.",
    textWithMistake: "He promised helping me with my project.",
    error: {
      word: "helping",
      correction: "to help",
      options: ["to help", "help", "that he would help"],
      explanation:
        "Sau động từ 'promise', chúng ta dùng động từ nguyên thể có 'to' (to-infinitive).",
    },
  },
  {
    id: 91,
    title: "The Empty Room",
    context: "Mô tả một căn phòng. Chủ ngữ và động từ không hòa hợp.",
    textWithMistake:
      "Neither the students nor the teacher are in the classroom.",
    error: {
      word: "are",
      correction: "is",
      options: ["is", "were", "be"],
      explanation:
        "Khi dùng cấu trúc 'neither...nor...', động từ sẽ chia theo chủ ngữ gần nó nhất. Trong trường hợp này, 'the teacher' là danh từ số ít, vì vậy động từ phải là 'is'.",
    },
  },
  {
    id: 92,
    title: "The Late Sleeper",
    context: "Mô tả một thói quen. Trạng từ sai.",
    textWithMistake: "I usually go to bed lately.",
    error: {
      word: "lately",
      correction: "late",
      options: ["late", "later", "last"],
      explanation:
        "'Late' vừa là tính từ vừa là trạng từ (muộn, trễ). 'Lately' là một trạng từ khác có nghĩa là 'gần đây'.",
    },
  },
  {
    id: 93,
    title: "The Impossible Past",
    context: "Ước một điều trái với quá khứ. Động từ sai.",
    textWithMistake: "I wish I didn't say that.",
    error: {
      word: "didn't say",
      correction: "hadn't said",
      options: ["hadn't said", "wouldn't say", "not said"],
      explanation:
        "Sau 'I wish' để diễn tả một điều hối tiếc trong quá khứ, chúng ta dùng thì Quá khứ hoàn thành (had + V3/V-ed).",
    },
  },
  {
    id: 94,
    title: "The Search",
    context: "Tìm kiếm một thứ gì đó. Thiếu giới từ.",
    textWithMistake: "I am looking my keys.",
    error: {
      word: "looking",
      correction: "looking for",
      options: ["looking for", "looking at", "searching"],
      explanation:
        "Cụm động từ 'to look for' có nghĩa là tìm kiếm. 'To look at' có nghĩa là nhìn vào.",
    },
  },
  {
    id: 95,
    title: "The Smartest Person",
    context: "Mô tả một người. So sánh nhất bị sai.",
    textWithMistake: "She is one of the most intelligent person I know.",
    error: {
      word: "person",
      correction: "people",
      options: ["people", "persons", "person's"],
      explanation:
        "Cấu trúc 'one of the...' phải được theo sau bởi một danh từ số nhiều. Dạng số nhiều của 'person' là 'people'.",
    },
  },
  {
    id: 96,
    title: "The Arrival Question",
    context: "Hỏi về sự có mặt của ai đó. Thì của động từ sai.",
    textWithMistake: "Did he arrived yet?",
    error: {
      word: "Did he arrived",
      correction: "Has he arrived",
      options: ["Has he arrived", "Is he arrived", "Does he arrive"],
      explanation:
        "Từ 'yet' thường được dùng trong câu hỏi và câu phủ định của thì Hiện tại hoàn thành để hỏi về một hành động được mong đợi đã xảy ra hay chưa.",
    },
  },
  {
    id: 97,
    title: "The Phone Call",
    context: "Kể về một cuộc điện thoại. Dạng động từ sai.",
    textWithMistake: "I look forward to hear from you soon.",
    error: {
      word: "hear",
      correction: "hearing",
      options: ["hearing", "to hearing", "heard"],
      explanation:
        "Cụm từ 'to look forward to' được theo sau bởi một danh động từ (V-ing). 'To' ở đây là một giới từ, không phải là một phần của động từ nguyên thể.",
    },
  },
  {
    id: 98,
    title: "The Amount of Money",
    context: "Nói về tiền bạc. Chủ ngữ và động từ không hòa hợp.",
    textWithMistake: "Five hundred dollars are a lot of money for a ticket.",
    error: {
      word: "are",
      correction: "is",
      options: ["is", "be", "were"],
      explanation:
        "Khi một cụm từ chỉ số tiền, thời gian, hoặc khoảng cách được xem như một khối thống nhất, nó sẽ đi với động từ số ít.",
    },
  },
  {
    id: 99,
    title: "The Confused Feelings",
    context: "Mô tả một tình huống gây bối rối. Tính từ -ed/-ing bị nhầm.",
    textWithMistake: "The instructions were very confused.",
    error: {
      word: "confused",
      correction: "confusing",
      options: ["confusing", "confuse", "confusion"],
      explanation:
        "Tính từ đuôi '-ing' ('confusing') được dùng để mô tả bản chất của sự vật (lời hướng dẫn). Tính từ đuôi '-ed' ('confused') được dùng để mô tả cảm xúc của người ('I was confused').",
    },
  },
  {
    id: 100,
    title: "The Question Tag",
    context: "Thêm một câu hỏi đuôi. Trợ động từ sai.",
    textWithMistake: "He's from Canada, isn't it?",
    error: {
      word: "it",
      correction: "he",
      options: ["he", "she", "that"],
      explanation:
        "Câu hỏi đuôi phải lặp lại chủ ngữ của mệnh đề chính. Chủ ngữ là 'He', vì vậy câu hỏi đuôi phải là 'isn't he?'.",
    },
  },
  {
    id: 101,
    title: "The Childhood Memory",
    context: "Hồi tưởng về quá khứ. Cấu trúc câu sai.",
    textWithMistake: "I remember how was my first day of school.",
    error: {
      word: "how was my",
      correction: "how my",
      options: ["how my", "what was my", "how my was"],
      explanation:
        "Trong câu tường thuật hoặc mệnh đề danh từ, trật tự từ phải là 'từ để hỏi + chủ ngữ + động từ', không đảo động từ lên trước chủ ngữ như trong câu hỏi trực tiếp.",
    },
  },
  {
    id: 102,
    title: "The Professional",
    context: "Mô tả công việc của ai đó. Cấu trúc 'as' và 'like' bị nhầm lẫn.",
    textWithMistake: "She works like a doctor.",
    error: {
      word: "like",
      correction: "as",
      options: ["as", "to be", "for"],
      explanation:
        "Chúng ta dùng 'as' để nói về công việc hoặc chức năng của một người (She works as a doctor - Cô ấy là một bác sĩ). Chúng ta dùng 'like' để so sánh (She works like a machine - Cô ấy làm việc như một cái máy).",
    },
  },
  {
    id: 103,
    title: "The Denial",
    context: "Phủ nhận một hành động. Dạng động từ sai.",
    textWithMistake: "He denied to steal the money.",
    error: {
      word: "to steal",
      correction: "stealing",
      options: ["stealing", "steal", "stole"],
      explanation: "Sau động từ 'deny', chúng ta dùng danh động từ (V-ing).",
    },
  },
  {
    id: 104,
    title: "The Bad Weather",
    context: "Mô tả một cơn bão. Tính từ và trạng từ bị nhầm.",
    textWithMistake: "The wind was blowing strong.",
    error: {
      word: "strong",
      correction: "strongly",
      options: ["strongly", "strength", "stronger"],
      explanation:
        "Chúng ta cần một trạng từ ('strongly') để bổ nghĩa cho động từ 'was blowing'.",
    },
  },
  {
    id: 105,
    title: "The Whole Group",
    context: "Nói về cả nhóm. Chủ ngữ và động từ không hòa hợp.",
    textWithMistake: "Everybody in the room are listening carefully.",
    error: {
      word: "are",
      correction: "is",
      options: ["is", "am", "be"],
      explanation:
        "Các đại từ bất định như 'everybody', 'everyone', 'someone', 'nobody' luôn đi với động từ số ít.",
    },
  },
];
const Word = ({ text, onClick, isSelected, isDisabled }) => {
  const baseClasses =
    "inline-block cursor-pointer rounded-lg px-2 py-1 transition-all duration-200 ease-in-out";
  const selectedClasses =
    "bg-amber-400 text-slate-900 ring-2 ring-amber-500 scale-105";
  const disabledClasses = "cursor-not-allowed text-slate-400";
  const normalClasses = "text-slate-300 hover:bg-slate-700";

  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.span
      variants={variants}
      onClick={isDisabled ? undefined : onClick}
      className={`${baseClasses} ${
        isDisabled
          ? disabledClasses
          : isSelected
          ? selectedClasses
          : normalClasses
      }`}
    >
      {text}
    </motion.span>
  );
};

export default function DetectiveGame() {
  const [cases, setCases] = useState([]);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [gamePhase, setGamePhase] = useState("identifying");
  const [selectedWordInfo, setSelectedWordInfo] = useState(null);
  const [isCorrectAttempt, setIsCorrectAttempt] = useState(null);
  const [score, setScore] = useState(0);

  const currentCase = useMemo(
    () => cases[currentCaseIndex],
    [cases, currentCaseIndex]
  );
  const sentenceWords = useMemo(
    () => currentCase?.textWithMistake.split(" ") || [],
    [currentCase]
  );

  useEffect(() => {
    setCases(caseFiles.sort(() => Math.random() - 0.5));
  }, []);

  const handleNextCase = () => {
    if (currentCaseIndex < cases.length - 1) {
      setCurrentCaseIndex(currentCaseIndex + 1);
      setGamePhase("identifying");
      setSelectedWordInfo(null);
      setIsCorrectAttempt(null);
    } else {
      setGamePhase("gameOver");
    }
  };

  const restartGame = () => {
    setCases(caseFiles.sort(() => Math.random() - 0.5));
    setCurrentCaseIndex(0);
    setGamePhase("identifying");
    setSelectedWordInfo(null);
    setIsCorrectAttempt(null);
    setScore(0);
  };

  const handleWordClick = (word, index) => {
    if (gamePhase !== "identifying") return;
    const cleanedWord = word.replace(/[,.]/g, "");
    setSelectedWordInfo({ word: cleanedWord, index });
    if (cleanedWord === currentCase.error.word) {
      // ✨ THAY ĐỔI 2: Phát âm thanh ĐÚNG khi tìm ra lỗi
      correctSound.play();
      setTimeout(() => setGamePhase("correcting"), 500);
    } else {
      // ✨ THAY ĐỔI 3: Phát âm thanh SAI khi chọn sai
      incorrectSound.play();
    }
  };

  const handleCorrection = (option) => {
    if (gamePhase !== "correcting") return;
    setGamePhase("result");
    if (option === currentCase.error.correction) {
      // ✨ THAY ĐỔI 4: Phát âm thanh ĐÚNG khi sửa lỗi thành công
      correctSound.play();
      setIsCorrectAttempt(true);
      setScore((s) => s + 1);
    } else {
      // ✨ THAY ĐỔI 5: Phát âm thanh SAI khi sửa lỗi thất bại
      incorrectSound.play();
      setIsCorrectAttempt(false);
    }
  };

  if (cases.length === 0)
    return (
      <div className="bg-slate-900 h-screen w-screen flex items-center justify-center text-white">
        Loading Detective Files...
      </div>
    );

  if (gamePhase === "gameOver") {
    return (
      <div className="h-screen w-screen bg-slate-900 flex items-center justify-center text-white">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-8 bg-slate-800 rounded-xl shadow-lg"
        >
          <h1 className="text-4xl font-bold text-amber-400">
            All Cases Closed!
          </h1>
          <p className="text-2xl mt-4">
            Final Score: {score}/{cases.length}
          </p>
          <button
            onClick={restartGame}
            className="mt-8 rounded-lg bg-amber-500 px-6 py-3 text-xl font-bold text-slate-900 hover:bg-amber-400 transition-colors"
          >
            Start a New Investigation
          </button>
        </motion.div>
      </div>
    );
  }

  const sentenceContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 },
    },
  };
  const actionPanelVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-2 sm:p-4 font-sans">
      <div className="w-full max-w-2xl h-full sm:h-[95vh] sm:max-h-[750px] bg-slate-800/50 backdrop-blur-sm ring-1 ring-white/10 rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <header className="flex-shrink-0 p-4 border-b border-white/10 flex justify-between items-center">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">
              Dialogue Detective
            </h1>
            <p className="text-sm text-amber-400">Case #{currentCase?.id}</p>
          </div>
          <div className="text-right">
            <p className="text-lg sm:text-xl font-bold text-white">{score}</p>
            <p className="text-sm text-slate-400">Score</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={currentCase?.id}
          >
            <div className="bg-black/20 p-4 rounded-lg mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-amber-400 mb-2">
                {currentCase?.title}
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                <strong>Tình huống:</strong> <i>{currentCase?.context}</i>
              </p>
            </div>
            <motion.div
              key={currentCase?.id + "-sentence"}
              variants={sentenceContainerVariants}
              initial="hidden"
              animate="visible"
              className="bg-black/20 min-h-[12rem] rounded-lg p-4 sm:p-6 text-2xl sm:text-3xl leading-relaxed space-x-2"
            >
              {sentenceWords.map((word, index) => (
                <Word
                  key={`${index}-${word}`}
                  text={word}
                  onClick={() => handleWordClick(word, index)}
                  isSelected={selectedWordInfo?.index === index}
                  isDisabled={gamePhase !== "identifying"}
                />
              ))}
            </motion.div>
          </motion.div>
        </main>

        {/* Action Panel */}
        <footer className="flex-shrink-0 p-4 border-t border-white/10 bg-black/20 rounded-b-2xl">
          <div className="w-full min-h-[140px]">
            <AnimatePresence mode="wait">
              {gamePhase === "identifying" && (
                <motion.div
                  key="identifying"
                  variants={actionPanelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center flex flex-col items-center justify-center h-full"
                >
                  <p className="text-lg text-amber-400 font-semibold">
                    FIND THE MISTAKE
                  </p>
                  <p className="text-slate-400 mt-2">
                    Chạm vào từ bạn cho là sai trong đoạn văn bản trên.
                  </p>
                </motion.div>
              )}
              {gamePhase === "correcting" && (
                <motion.div
                  key="correcting"
                  variants={actionPanelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <p className="text-lg text-amber-400 font-semibold mb-3 text-center">
                    Correct the word: "
                    <span className="text-white">{selectedWordInfo?.word}</span>
                    "
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentCase?.error.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleCorrection(option)}
                        className="w-full rounded-lg bg-slate-600 p-3 text-lg text-white transition-colors hover:bg-slate-500"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              {gamePhase === "result" && (
                <motion.div
                  key="result"
                  variants={actionPanelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`p-4 rounded-lg text-white ${
                    isCorrectAttempt
                      ? "bg-green-600/30 ring-1 ring-green-500"
                      : "bg-red-600/30 ring-1 ring-red-500"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">
                    {isCorrectAttempt ? "Excellent!" : "Incorrect."}
                  </h3>
                  <p className="text-base mb-4">
                    {currentCase?.error.explanation}
                  </p>
                  <button
                    onClick={handleNextCase}
                    className="w-full rounded-lg bg-slate-100 py-3 text-lg font-bold text-slate-900 transition-colors hover:bg-white"
                  >
                    Next Case →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </footer>
      </div>
    </div>
  );
}
