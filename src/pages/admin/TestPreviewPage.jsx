import React, { useState, useEffect, useMemo, useRef } from "react"; // ✅ Thêm useRef
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPen,
  FaPlus,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTestWithAnswers,
  updateTest,
  fetchTestsByCourse,
} from "../../redux/testSlice";
import { v4 as uuidv4 } from "uuid";

// Import react-katex và CSS của nó
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

//======================================================================
// MathRenderer component (Được đặt trong cùng file TestPreviewPage)
// Dùng để phân tích và hiển thị chuỗi LaTeX với react-katex
//======================================================================
const MathRenderer = ({ text }) => {
  if (typeof text !== "string" || !text) return null;
  const mathRegex = /(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g;
  const parts = text.split(mathRegex);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          return <BlockMath key={index} math={part.slice(2, -2)} />;
        } else if (part.startsWith("$") && part.endsWith("$")) {
          return <InlineMath key={index} math={part.slice(1, -1)} />;
        } else {
          return (
            <span key={index}>
              {part.split("\n").map((line, i, arr) => (
                <React.Fragment key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </span>
          );
        }
      })}
    </>
  );
};

//======================================================================
// QuestionEditor (Component con để chỉnh sửa từng câu hỏi)
// Đã được cập nhật để sử dụng MathRenderer mới và toggle preview
// ✅ Đã thêm Debounce cho onUpdate
//======================================================================
const QuestionEditor = ({ question, onUpdate, onDelete }) => {
  const [qData, setQData] = useState(question);
  const [showPreview, setShowPreview] = useState(true);
  const debounceTimeoutRef = useRef(null); // ✅ Ref để lưu timeout

  useEffect(() => {
    setQData(question);
  }, [question]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Cập nhật state cục bộ ngay lập tức để input không bị lag
    setQData((prev) => ({ ...prev, [name]: value }));

    // ✅ Clear timeout cũ và đặt timeout mới
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      onUpdate({ ...qData, [name]: value }); // Gửi giá trị mới nhất sau khi debounce
    }, 300); // Debounce 300ms
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...qData.options];
    newOptions[index] = value;
    // Cập nhật state cục bộ ngay lập tức
    setQData((prev) => ({ ...prev, options: newOptions }));

    // ✅ Clear timeout cũ và đặt timeout mới
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      onUpdate({ ...qData, options: newOptions }); // Gửi giá trị mới nhất sau khi debounce
    }, 300); // Debounce 300ms
  };

  const handleAddOption = () => {
    const newOptions = [...qData.options, ""];
    setQData((prev) => ({ ...prev, options: newOptions }));
    // Kích hoạt update ngay lập tức hoặc sau một debounce ngắn
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    onUpdate({ ...qData, options: newOptions }); // Có thể muốn update ngay lập tức khi thêm option
  };

  const handleRemoveOption = (index) => {
    const newOptions = qData.options.filter((_, i) => i !== index);
    setQData((prev) => ({ ...prev, options: newOptions }));
    // Kích hoạt update ngay lập tức hoặc sau một debounce ngắn
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    onUpdate({ ...qData, options: newOptions }); // Có thể muốn update ngay lập tức khi xóa option
  };

  const handleCorrectAnswerChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQData((prev) => ({
      ...prev,
      correctAnswer: value,
    }));
    // Kích hoạt update ngay lập tức khi chọn đáp án đúng
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    onUpdate({ ...qData, correctAnswer: value });
  };

  // ✅ Cleanup timeout khi component unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="border border-gray-200 p-4 rounded-md bg-white shadow-sm mb-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-md">Câu hỏi</h4>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="text-gray-500 hover:text-gray-700"
            title={showPreview ? "Ẩn xem trước" : "Hiện xem trước"}
          >
            {showPreview ? <FaEyeSlash /> : <FaEye />}
          </button>
          <button
            type="button"
            onClick={() => onDelete(qData.id)}
            className="text-red-500 hover:text-red-700"
            title="Xóa câu hỏi này"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Nội dung câu hỏi
        </label>
        <textarea
          name="question"
          value={qData.question}
          onChange={handleChange}
          rows="2"
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          placeholder="Nhập câu hỏi, có thể dùng LaTeX ví dụ: $x^2 + y^2 = r^2$"
          required
        ></textarea>
        {showPreview && qData.question && (
          <div className="mt-2 p-2 border rounded bg-gray-50 text-sm">
            <p className="font-medium text-gray-600 mb-1">Xem trước:</p>
            <MathRenderer text={qData.question} />
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Các lựa chọn:
        </label>
        {qData.options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="radio"
              name={`correctAnswer-${qData.id}`}
              value={index}
              checked={qData.correctAnswer === index}
              onChange={handleCorrectAnswerChange}
              className="mr-2"
            />
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="flex-grow px-3 py-2 border rounded-md"
              placeholder={`Lựa chọn ${String.fromCharCode(65 + index)}`}
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveOption(index)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddOption}
          className="mt-2 text-blue-600 flex items-center text-sm hover:underline"
        >
          <FaPlus className="mr-1" /> Thêm lựa chọn
        </button>
        {showPreview && qData.options.some((opt) => opt) && (
          <div className="mt-2 p-2 border rounded bg-gray-50 text-sm">
            <p className="font-medium text-gray-600 mb-1">
              Xem trước lựa chọn:
            </p>
            {qData.options.map((option, index) => (
              <p key={`preview-${index}`}>
                {String.fromCharCode(65 + index)}.{" "}
                <MathRenderer text={option} />
              </p>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Giải thích đáp án
        </label>
        <textarea
          name="explanation"
          value={qData.explanation}
          onChange={handleChange}
          rows="1"
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          placeholder="Giải thích, có thể dùng LaTeX."
        ></textarea>
        {showPreview && qData.explanation && (
          <div className="mt-2 p-2 border rounded bg-gray-50 text-sm">
            <p className="font-medium text-gray-600 mb-1">Xem trước:</p>
            <MathRenderer text={qData.explanation} />
          </div>
        )}
      </div>
    </div>
  );
};

//======================================================================
// QuestionGroupEditor (Component con để chỉnh sửa nhóm câu hỏi)
// Đã được cập nhật để sử dụng MathRenderer mới và toggle preview
// ✅ Đã thêm Debounce cho onUpdate
//======================================================================
const QuestionGroupEditor = ({ group, onUpdate, onDelete }) => {
  const [groupData, setGroupData] = useState(group);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showGroupPreview, setShowGroupPreview] = useState(true);
  const debounceTimeoutRef = useRef(null); // ✅ Ref để lưu timeout

  useEffect(() => {
    setGroupData(group);
  }, [group]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupData((prev) => ({ ...prev, [name]: value }));

    // ✅ Debounce
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      onUpdate({ ...groupData, [name]: value });
    }, 300); // Debounce 300ms
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: -1,
      explanation: "",
    };
    const updatedQuestions = [...groupData.group_questions, newQuestion];
    setGroupData((prev) => ({ ...prev, group_questions: updatedQuestions }));
    // Kích hoạt update ngay lập tức khi thêm câu hỏi
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    onUpdate({ ...groupData, group_questions: updatedQuestions });
  };

  const handleUpdateQuestion = (updatedQuestion) => {
    const updatedQuestions = groupData.group_questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setGroupData((prev) => ({ ...prev, group_questions: updatedQuestions }));
    // ✅ Kích hoạt debounce update cho toàn bộ group khi một câu hỏi con thay đổi
    // Để tránh re-render quá nhiều, có thể debounce cả phần này
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      onUpdate({ ...groupData, group_questions: updatedQuestions });
    }, 300);
  };

  const handleDeleteQuestion = (questionId) => {
    const updatedQuestions = groupData.group_questions.filter(
      (q) => q.id !== questionId
    );
    setGroupData((prev) => ({ ...prev, group_questions: updatedQuestions }));
    // Kích hoạt update ngay lập tức khi xóa câu hỏi
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    onUpdate({ ...groupData, group_questions: updatedQuestions });
  };

  // ✅ Cleanup timeout khi component unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="border border-blue-300 p-5 rounded-lg bg-blue-50 shadow-md mb-6">
      <div
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-bold text-blue-800">
          Nhóm câu hỏi: {groupData.title || "Chưa có tiêu đề"}
        </h3>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowGroupPreview(!showGroupPreview);
            }}
            className="text-gray-500 hover:text-gray-700"
            title={
              showGroupPreview ? "Ẩn xem trước nhóm" : "Hiện xem trước nhóm"
            }
          >
            {showGroupPreview ? <FaEyeSlash /> : <FaEye />}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(groupData.id);
            }}
            className="text-red-600 hover:text-red-800"
            title="Xóa nhóm câu hỏi này"
          >
            <FaTrash size={18} />
          </button>
          {isExpanded ? <FaArrowUp /> : <FaArrowDown />}
        </div>
      </div>

      {isExpanded && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tiêu đề nhóm
              </label>
              <input
                type="text"
                name="title"
                value={groupData.title}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Loại nhóm
              </label>
              <select
                name="type"
                value={groupData.type}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              >
                <option value="multiple_choice_group">
                  Trắc nghiệm đọc hiểu
                </option>
                {/* Có thể thêm các loại khác sau này */}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Hướng dẫn
            </label>
            <textarea
              name="instructions"
              value={groupData.instructions}
              onChange={handleChange}
              rows="2"
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              placeholder="Nhập hướng dẫn, có thể chứa LaTeX."
            ></textarea>
            {showGroupPreview && groupData.instructions && (
              <div className="mt-2 p-2 border rounded bg-gray-50 text-sm">
                <p className="font-medium text-gray-600 mb-1">Xem trước:</p>
                <MathRenderer text={groupData.instructions} />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Đoạn văn (nếu có)
            </label>
            <textarea
              name="passage"
              value={groupData.passage}
              onChange={handleChange}
              rows="5"
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              placeholder="Dán đoạn văn vào đây, có thể chứa công thức toán học LaTeX như: Phương trình $E=mc^2$."
            ></textarea>
            {showGroupPreview && groupData.passage && (
              <div className="mt-2 p-2 border rounded bg-gray-50 text-sm">
                <p className="font-medium text-gray-600 mb-1">Xem trước:</p>
                <MathRenderer text={groupData.passage} />
              </div>
            )}
          </div>

          <h4 className="text-lg font-bold mb-3 text-blue-700">
            Các câu hỏi trong nhóm:
          </h4>
          {groupData.group_questions.length === 0 && (
            <p className="text-gray-600 mb-3">
              Chưa có câu hỏi nào trong nhóm này.
            </p>
          )}
          {groupData.group_questions.map((q) => (
            <QuestionEditor
              key={q.id}
              question={q}
              onUpdate={handleUpdateQuestion}
              onDelete={handleDeleteQuestion}
            />
          ))}

          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 mt-4"
          >
            <FaPlus className="mr-2" /> Thêm câu hỏi
          </button>
        </>
      )}
    </div>
  );
};

//======================================================================
// TestModal (Vẫn dùng JSON textarea để chỉnh sửa cấu trúc câu hỏi)
//======================================================================
const TestModal = ({ isOpen, onClose, onSubmit, existingTest }) => {
  const emptyTest = {
    title: "",
    description: "",
    durationInMinutes: 15,
    questionGroups: [],
  };

  const [testData, setTestData] = useState(emptyTest);
  const [questionsJson, setQuestionsJson] = useState("[]");

  useEffect(() => {
    if (isOpen) {
      if (existingTest) {
        setTestData(existingTest);
        setQuestionsJson(JSON.stringify(existingTest.questionGroups, null, 2));
      } else {
        setTestData(emptyTest);
        setQuestionsJson("[]");
      }
    }
  }, [isOpen, existingTest]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleJsonChange = (e) => {
    setQuestionsJson(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const questionGroups = JSON.parse(questionsJson);
      onSubmit({ ...testData, questionGroups });
    } catch (error) {
      alert("Lỗi cú pháp JSON trong cấu trúc câu hỏi. Vui lòng kiểm tra lại.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">
          {existingTest ? "Chỉnh sửa bài kiểm tra" : "Thêm bài kiểm tra mới"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[80vh] overflow-y-auto pr-2"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Tiêu đề bài kiểm tra
            </label>
            <input
              type="text"
              name="title"
              value={testData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Mô tả
            </label>
            <textarea
              name="description"
              value={testData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="durationInMinutes"
              className="block text-sm font-medium text-gray-700"
            >
              Thời gian làm bài (phút)
            </label>
            <input
              type="number"
              name="durationInMinutes"
              value={testData.durationInMinutes}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              min="1"
              required
            />
          </div>
          <div>
            <label
              htmlFor="questionGroups"
              className="block text-sm font-medium text-gray-700"
            >
              Cấu trúc câu hỏi (JSON)
            </label>
            <textarea
              name="questionGroups"
              value={questionsJson}
              onChange={handleJsonChange}
              rows="15"
              className="mt-1 block w-full px-3 py-2 border rounded-md font-mono text-sm bg-gray-50"
              placeholder="Dán cấu trúc JSON của các câu hỏi vào đây..."
            ></textarea>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Lưu bài kiểm tra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

//======================================================================
// TestPreviewPage (Đã sửa đổi để thêm nút toggle ẩn/hiện preview)
//======================================================================
const TestPreviewPage = () => {
  const { courseId, testId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    currentTest: test,
    status: testStatus,
    error: testError,
  } = useSelector((state) => state.tests);

  const [localQuestionGroups, setLocalQuestionGroups] = useState([]);
  const [isEditQuestionsModalOpen, setIsEditQuestionsModalOpen] =
    useState(false);

  useEffect(() => {
    if (!test || test._id !== testId) {
      dispatch(fetchTestWithAnswers(testId));
    }
  }, [testId, dispatch, test]);

  useEffect(() => {
    if (test && test._id === testId) {
      setLocalQuestionGroups(
        JSON.parse(JSON.stringify(test.questionGroups || []))
      );
    }
  }, [test, testId]);

  const handleUpdateQuestionGroup = (updatedGroup) => {
    setLocalQuestionGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === updatedGroup.id ? updatedGroup : group
      )
    );
  };

  const handleDeleteQuestionGroup = (groupId) => {
    setLocalQuestionGroups((prevGroups) =>
      prevGroups.filter((group) => group.id !== groupId)
    );
  };

  const handleAddQuestionGroup = () => {
    const newGroup = {
      id: uuidv4(),
      type: "multiple_choice_group",
      title: "Nhóm câu hỏi mới",
      instructions: "",
      passage: "",
      group_questions: [],
    };
    setLocalQuestionGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const handleSaveAllChanges = () => {
    if (test) {
      const updatedTestData = {
        ...test,
        questionGroups: localQuestionGroups,
      };
      dispatch(updateTest({ testId: test._id, updatedData: updatedTestData }))
        .unwrap()
        .then(() => {
          alert("Cập nhật cấu trúc bài kiểm tra thành công!");
          dispatch(fetchTestWithAnswers(testId));
        })
        .catch((err) => alert(`Lỗi khi cập nhật bài kiểm tra: ${err.message}`));
    }
  };

  const handleSaveTestFromModal = (updatedTestData) => {
    if (test && test._id) {
      dispatch(updateTest({ testId: test._id, updatedData: updatedTestData }))
        .unwrap()
        .then(() => {
          alert("Cập nhật cấu trúc bài kiểm tra bằng JSON thành công!");
          setIsEditQuestionsModalOpen(false);
          dispatch(fetchTestWithAnswers(testId));
        })
        .catch((err) => alert(`Lỗi khi cập nhật bài kiểm tra: ${err.message}`));
    }
  };

  if (testStatus === "loading" || !test) {
    return (
      <div className="p-6 text-center text-lg font-semibold">
        Đang tải bài kiểm tra...
      </div>
    );
  }

  if (testError) {
    return (
      <div className="p-6 text-center text-lg font-semibold text-red-500">
        Lỗi khi tải bài kiểm tra:{" "}
        {testError.message || JSON.stringify(testError)}
      </div>
    );
  }

  if (test._id !== testId) {
    return (
      <div className="p-6 text-center text-lg font-semibold">
        Đang tải bài kiểm tra khác...
      </div>
    );
  }

  return (
    <>
      <TestModal
        isOpen={isEditQuestionsModalOpen}
        onClose={() => setIsEditQuestionsModalOpen(false)}
        onSubmit={handleSaveTestFromModal}
        existingTest={test}
      />

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <Link
            to={`/admin/course/${courseId}`}
            className="flex items-center text-blue-600 hover:underline font-medium mb-6"
          >
            <FaArrowLeft className="mr-2" /> Quay lại chỉnh sửa khóa học
          </Link>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Xem trước & Chỉnh sửa: {test.title}
          </h2>
          <p className="text-gray-600 mb-2">
            Mô tả: {test.description || "Không có mô tả."}
          </p>
          <p className="text-gray-600 mb-6">
            Thời gian làm bài: {test.durationInMinutes} phút
          </p>

          <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            <button
              onClick={handleAddQuestionGroup}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-700"
              title="Thêm nhóm câu hỏi mới"
            >
              <FaPlus className="mr-2" /> Thêm nhóm câu hỏi
            </button>
            <button
              onClick={handleSaveAllChanges}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
              title="Lưu tất cả thay đổi cấu trúc câu hỏi"
            >
              <FaPen className="mr-2" /> Lưu tất cả thay đổi
            </button>
            <button
              onClick={() => {
                setIsEditQuestionsModalOpen(true);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-gray-600"
              title="Chỉnh sửa toàn bộ cấu trúc câu hỏi bằng JSON (cho người nâng cao)"
            >
              <FaPen className="mr-2" /> JSON Editor (Nâng cao)
            </button>
          </div>

          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Cấu trúc câu hỏi:
          </h3>
          {localQuestionGroups && localQuestionGroups.length > 0 ? (
            <div className="space-y-6">
              {localQuestionGroups.map((group) => (
                <QuestionGroupEditor
                  key={group.id}
                  group={group}
                  onUpdate={handleUpdateQuestionGroup}
                  onDelete={handleDeleteQuestionGroup}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">
              Bài kiểm tra này chưa có cấu trúc câu hỏi nào. Hãy thêm một nhóm
              câu hỏi.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TestPreviewPage;
