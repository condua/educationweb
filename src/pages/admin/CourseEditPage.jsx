import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaPlus,
  FaPen,
  FaFilm,
  FaArrowUp,
  FaArrowDown,
  FaGripVertical,
  FaArrowLeft,
  FaClipboardList,
} from "react-icons/fa";
// Nhập các actions và hooks từ Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById, updateCourse } from "../../redux/coursesSlice"; // Giả sử file slice của bạn ở đây
import { createChapter, deleteChapter } from "../../redux/chapterSlice";
import { createLesson, deleteLesson } from "../../redux/lessonSlice";
import {
  fetchTestsByCourse,
  createTest,
  updateTest,
  deleteTest,
} from "../../redux/testSlice";
//======================================================================
// COMPONENT MỚI: MODAL ĐỂ THÊM/SỬA BÀI HỌC
//======================================================================
const LessonModal = ({ isOpen, onClose, onSubmit, chapterId }) => {
  // Initial state khớp với cấu trúc JSON đầy đủ
  const initialState = {
    title: "",
    lectureUrl: "",
    pdfLecture: "", // ✅ Đã thêm
    pdfExercise: "", // ✅ Đã thêm
    content: "",
    time: 0,
    locked: false,
    chapter: chapterId,
  };
  const [lessonData, setLessonData] = useState(initialState);

  // Reset form khi modal được mở cho chapter mới
  useEffect(() => {
    if (isOpen) {
      setLessonData({ ...initialState, chapter: chapterId });
    }
  }, [isOpen, chapterId]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Chuyển đổi giá trị của 'time' thành số
    const processedValue = name === "time" ? parseInt(value, 10) || 0 : value;
    setLessonData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : processedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(lessonData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Thêm bài học mới</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[80vh] overflow-y-auto pr-2"
        >
          {/* Tên bài học (bắt buộc) */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Tên bài học <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={lessonData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {/* URL Video */}
          <div>
            <label
              htmlFor="lectureUrl"
              className="block text-sm font-medium text-gray-700"
            >
              URL Video bài giảng
            </label>
            <input
              type="text"
              name="lectureUrl"
              placeholder="https://www.youtube.com/watch?v=..."
              value={lessonData.lectureUrl}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* ✅ ĐÃ THÊM: PDF Bài giảng */}
          <div>
            <label
              htmlFor="pdfLecture"
              className="block text-sm font-medium text-gray-700"
            >
              URL PDF Bài giảng (tùy chọn)
            </label>
            <input
              type="text"
              name="pdfLecture"
              placeholder="https://drive.google.com/file/..."
              value={lessonData.pdfLecture}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* ✅ ĐÃ THÊM: PDF Bài tập */}
          <div>
            <label
              htmlFor="pdfExercise"
              className="block text-sm font-medium text-gray-700"
            >
              URL PDF Bài tập (tùy chọn)
            </label>
            <input
              type="text"
              name="pdfExercise"
              placeholder="https://drive.google.com/file/..."
              value={lessonData.pdfExercise}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Nội dung */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Nội dung mô tả (tùy chọn)
            </label>
            <textarea
              name="content"
              value={lessonData.content}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            ></textarea>
          </div>

          {/* Các trường khác */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Thời lượng (giây)
              </label>
              <input
                type="number"
                name="time"
                value={lessonData.time}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                min="0"
              />
            </div>
            <div className="flex items-end pb-1">
              <div className="flex items-center h-full">
                <input
                  id="locked"
                  type="checkbox"
                  name="locked"
                  checked={lessonData.locked}
                  onChange={handleChange}
                  className="h-4 w-4 rounded"
                />
                <label
                  htmlFor="locked"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Yêu cầu mở khóa
                </label>
              </div>
            </div>
          </div>

          {/* Nút bấm */}
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
              Lưu bài học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
//======================================================================
// COMPONENT CON CHO BÀI HỌC
//======================================================================
const LessonItem = ({ lesson, onDelete }) => (
  <div className="flex items-center justify-between p-3 bg-white rounded border border-gray-200 mb-2">
    <div className="flex items-center">
      <FaFilm className="mr-3 text-gray-500" />
      <span>{lesson.title}</span>
    </div>
    <div className="flex items-center space-x-3">
      <button title="Sửa bài học" className="text-blue-600 hover:text-blue-800">
        <FaPen />
      </button>
      <button
        title="Xóa bài học"
        className="text-red-500 hover:text-red-700"
        onClick={() => onDelete(lesson._id)}
      >
        <FaTrash />
      </button>
    </div>
  </div>
);

//======================================================================
// COMPONENT CON CHO CHƯƠNG
//======================================================================
const ChapterItem = ({ chapter, onDelete, onAddLesson, onDeleteLesson }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
      {/* Header của chương */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <FaGripVertical
            className="mr-3 text-gray-400 cursor-move"
            title="Kéo để sắp xếp"
          />
          <h3 className="font-semibold text-lg">{chapter.title}</h3>
        </div>
        <div className="flex items-center space-x-3">
          <button
            title="Sửa chương"
            className="text-blue-600 hover:text-blue-800"
            onClick={(e) => e.stopPropagation()}
          >
            <FaPen />
          </button>
          <button
            title="Xóa chương"
            className="text-red-500 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(chapter._id);
            }}
          >
            <FaTrash />
          </button>
          {isOpen ? <FaArrowUp /> : <FaArrowDown />}
        </div>
      </div>
      {/* Nội dung các bài học */}
      {isOpen && (
        <div className="mt-4 pl-6 border-l-2 border-gray-200">
          {chapter.lessons &&
            chapter.lessons.map((lesson) => (
              <LessonItem
                key={lesson._id}
                lesson={lesson}
                onDelete={onDeleteLesson}
              />
            ))}
          <button
            className="mt-2 text-blue-600 flex items-center p-2 hover:bg-blue-50 rounded-md"
            onClick={() => onAddLesson(chapter._id)}
          >
            <FaPlus className="mr-2" /> Thêm bài học
          </button>
        </div>
      )}
    </div>
  );
};
//======================================================================
// ✅ COMPONENT MỚI: MODAL ĐỂ THÊM/SỬA BÀI KIỂM TRA
//======================================================================
const TestModal = ({ isOpen, onClose, onSubmit, courseId, existingTest }) => {
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
        // Chế độ sửa: điền dữ liệu đã có
        setTestData(existingTest);
        setQuestionsJson(JSON.stringify(existingTest.questionGroups, null, 2));
      } else {
        // Chế độ thêm: form trống
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
// COMPONENT CHÍNH CỦA TRANG
//======================================================================
const CourseEditPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const { courseDetails, status, error } = useSelector(
    (state) => state.courses
  );
  const { testsByCourse, status: testStatus } = useSelector(
    (state) => state.tests
  );

  const courseFromStore = courseDetails[courseId];
  const testsForThisCourse = testsByCourse[courseId] || [];

  const [localCourse, setLocalCourse] = useState(null);

  // State để quản lý modal thêm bài học
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  // ✅ 2. State để quản lý modal của Test
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null); // null: thêm mới, object: sửa

  useEffect(() => {
    dispatch(fetchCourseById(courseId));
    dispatch(fetchTestsByCourse(courseId)); // Fetch các bài test của khóa học
  }, [courseId, dispatch]);

  useEffect(() => {
    if (courseFromStore) {
      setLocalCourse(courseFromStore);
    }
  }, [courseFromStore]);

  const refetchCourseAndTests = () => {
    dispatch(fetchCourseById(courseId));
    dispatch(fetchTestsByCourse(courseId));
  };

  // --- HÀM XỬ LÝ CHO TEST ---
  const handleOpenAddTestModal = () => {
    setEditingTest(null); // Đảm bảo là chế độ thêm mới
    setIsTestModalOpen(true);
  };

  const handleOpenEditTestModal = (test) => {
    setEditingTest(test); // Đặt test cần sửa
    setIsTestModalOpen(true);
  };

  const handleSaveTest = (testData) => {
    const action = editingTest
      ? updateTest({ testId: editingTest._id, updatedData: testData })
      : createTest({ courseId, testData });

    dispatch(action)
      .unwrap()
      .then(() => {
        setIsTestModalOpen(false);
        refetchCourseAndTests();
      })
      .catch((err) => alert(`Lỗi: ${err.message}`));
  };

  const handleDeleteTest = (testId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài kiểm tra này?")) {
      dispatch(deleteTest({ testId, courseId }))
        .unwrap()
        .then(refetchCourseAndTests)
        .catch((err) => alert(`Lỗi: ${err.message}`));
    }
  };

  useEffect(() => {
    dispatch(fetchCourseById(courseId));
  }, [courseId, dispatch]);

  useEffect(() => {
    if (courseFromStore) {
      setLocalCourse(courseFromStore);
    }
  }, [courseFromStore]);

  const refetchCourse = () => {
    dispatch(fetchCourseById(courseId));
  };

  // --- HÀM XỬ LÝ ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    if (localCourse) {
      const { title, category, description, thumbnail } = localCourse;
      dispatch(
        updateCourse({
          id: courseId,
          updatedData: { title, category, description, thumbnail },
        })
      )
        .unwrap()
        .then(() => alert("Cập nhật thông tin cơ bản thành công!"))
        .catch((err) =>
          alert(`Lỗi khi cập nhật: ${err.message || "Vui lòng thử lại."}`)
        );
    }
  };

  const handleAddChapter = () => {
    const title = prompt("Nhập tên chương mới:");
    if (title && title.trim() !== "") {
      dispatch(createChapter({ title, courseId })).unwrap().then(refetchCourse);
    }
  };

  const handleDeleteChapter = (chapterId) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa chương này? Toàn bộ bài học bên trong cũng sẽ bị mất."
      )
    ) {
      dispatch(deleteChapter(chapterId)).unwrap().then(refetchCourse);
    }
  };

  const handleOpenAddLessonModal = (chapterId) => {
    setCurrentChapterId(chapterId);
    setIsLessonModalOpen(true);
  };

  const handleCreateLesson = (lessonData) => {
    dispatch(createLesson(lessonData))
      .unwrap()
      .then(() => {
        setIsLessonModalOpen(false); // Đóng modal sau khi thành công
        refetchCourse();
      })
      .catch((err) => alert(`Lỗi khi tạo bài học: ${err.message}`));
  };

  const handleDeleteLesson = (lessonId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài học này không?")) {
      dispatch(deleteLesson(lessonId)).unwrap().then(refetchCourse);
    }
  };

  // --- LOGIC RENDER ---

  if (status === "loading" && !localCourse) {
    return (
      <div className="p-6 text-center text-lg font-semibold">Đang tải...</div>
    );
  }

  if (!localCourse) {
    return (
      <div className="p-6 text-center text-lg font-semibold text-red-500">
        Không tìm thấy hoặc đang tải khóa học...
      </div>
    );
  }

  // --- Giao diện chính của trang ---
  return (
    <>
      <LessonModal
        isOpen={isLessonModalOpen}
        onClose={() => setIsLessonModalOpen(false)}
        onSubmit={handleCreateLesson}
        chapterId={currentChapterId}
      />
      <TestModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        onSubmit={handleSaveTest}
        courseId={courseId}
        existingTest={editingTest}
      />

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <Link
              to={`/admin/course`}
              className="flex items-center text-blue-600 hover:underline font-medium"
            >
              <FaArrowLeft className="mr-2" /> Quay lại quản lý khóa học
            </Link>
            <h2 className="text-xl font-bold mb-4">Thông tin cơ bản</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tên khóa học */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tên khóa học
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={localCourse.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              {/* Danh mục */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Danh mục
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={localCourse.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              {/* Mô tả khóa học */}
              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mô tả khóa học
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={localCourse.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border rounded-lg"
                ></textarea>
              </div>

              {/* ✅ PHẦN ĐƯỢC SỬA LẠI: URL Ảnh bìa và Xem trước */}
              <div className="md:col-span-2">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  URL Ảnh bìa
                </label>
                <div className="flex items-center gap-4">
                  {/* Hiển thị ảnh xem trước nếu có URL */}
                  {localCourse.thumbnail && (
                    <img
                      src={localCourse.thumbnail}
                      alt="Xem trước ảnh bìa"
                      className="w-40 h-24 object-cover rounded-lg border bg-gray-200 flex-shrink-0"
                      // Ẩn ảnh nếu URL không hợp lệ hoặc không tải được
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                      // Hiện lại ảnh nếu URL được sửa thành hợp lệ
                      onLoad={(e) => {
                        e.target.style.display = "block";
                      }}
                    />
                  )}
                  {/* Trường nhập liệu */}
                  <div className="flex-grow">
                    <input
                      type="text"
                      name="thumbnail"
                      id="thumbnail"
                      value={localCourse.thumbnail}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Dán một liên kết hình ảnh trực tiếp vào đây.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSaveChanges}
                className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Lưu thông tin
              </button>
            </div>
          </div>

          {/* SECTION 2: NỘI DUNG KHÓA HỌC */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Nội dung khóa học</h2>
              <button
                onClick={handleAddChapter}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
              >
                <FaPlus className="mr-2" /> Thêm chương mới
              </button>
            </div>
            <div>
              {localCourse.chapters &&
                localCourse.chapters.map((chapter) => (
                  <ChapterItem
                    key={chapter._id}
                    chapter={chapter}
                    onDelete={handleDeleteChapter}
                    onAddLesson={handleOpenAddLessonModal} // Mở modal khi bấm nút
                    onDeleteLesson={handleDeleteLesson}
                  />
                ))}
            </div>
          </div>

          {/* SECTION 3: BÀI KIỂM TRA (Tạm thời giữ nguyên) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Bài kiểm tra</h2>
              <button
                onClick={handleOpenAddTestModal}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700"
              >
                <FaPlus className="mr-2" /> Thêm bài kiểm tra
              </button>
            </div>
            <div className="space-y-3">
              {testStatus === "loading" && (
                <p>Đang tải danh sách bài kiểm tra...</p>
              )}
              {testsForThisCourse.map((test) => (
                <div
                  key={test._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded border"
                >
                  <p className="font-semibold">
                    {test.title} ({test.durationInMinutes} phút)
                  </p>
                  <div className="flex items-center space-x-4">
                    <Link
                      to={`/admin/course/${courseId}/test/${test._id}/attempts`}
                      title="Xem các bài làm"
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaClipboardList size={18} />
                    </Link>
                    <button
                      onClick={() => handleOpenEditTestModal(test)}
                      title="Sửa bài kiểm tra"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => handleDeleteTest(test._id)}
                      title="Xóa bài kiểm tra"
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
              {testsForThisCourse.length === 0 && testStatus !== "loading" && (
                <p className="text-center text-gray-500 py-4">
                  Chưa có bài kiểm tra nào.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseEditPage;
