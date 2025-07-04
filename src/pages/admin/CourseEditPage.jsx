// src/pages/CourseEditPage.js

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
  FaBook,
  FaFileSignature,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById, updateCourse } from "../../redux/coursesSlice";
import { createChapter, deleteChapter } from "../../redux/chapterSlice";
import { createLesson, deleteLesson } from "../../redux/lessonSlice";
import {
  fetchTestsByCourse,
  createTest,
  updateTest,
  deleteTest,
} from "../../redux/testSlice";

//======================================================================
// MODAL THÊM/SỬA BÀI HỌC (Responsive)
//======================================================================
const LessonModal = ({ isOpen, onClose, onSubmit, chapterId }) => {
  const initialState = {
    title: "",
    lectureUrl: "",
    pdfLecture: "",
    pdfExercise: "",
    content: "",
    time: 0,
    locked: false,
    chapter: chapterId,
  };
  const [lessonData, setLessonData] = useState(initialState);

  useEffect(() => {
    if (isOpen) {
      setLessonData({ ...initialState, chapter: chapterId });
    }
  }, [isOpen, chapterId]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <h2 className="text-xl md:text-2xl font-bold mb-6">Thêm bài học mới</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 overflow-y-auto flex-grow pr-2"
        >
          {/* Các trường input */}
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
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
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
              placeholder="http://googleusercontent.com/youtube.com/..."
              value={lessonData.lectureUrl}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="flex items-center justify-start pt-6">
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
          {/* Nút bấm */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
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
// COMPONENT CON CHO BÀI HỌC (Responsive)
//======================================================================
const LessonItem = ({ lesson, onDelete }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white rounded border border-gray-200 mb-2 gap-2">
    <div className="flex items-center">
      <FaFilm className="mr-3 text-gray-500 flex-shrink-0" />
      <span className="font-medium text-gray-800">{lesson.title}</span>
    </div>
    <div className="flex items-center justify-end space-x-1">
      <button
        title="Sửa bài học"
        className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
      >
        <FaPen size={14} />
      </button>
      <button
        title="Xóa bài học"
        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
        onClick={() => onDelete(lesson._id)}
      >
        <FaTrash size={14} />
      </button>
    </div>
  </div>
);

//======================================================================
// COMPONENT CON CHO CHƯƠNG (Responsive)
//======================================================================
const ChapterItem = ({ chapter, onDelete, onAddLesson, onDeleteLesson }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-gray-50 p-3 md:p-4 rounded-lg shadow-sm mb-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center flex-grow min-w-0">
          <FaGripVertical
            className="mr-3 text-gray-400 cursor-move flex-shrink-0"
            title="Kéo để sắp xếp"
          />
          <h3
            className="font-semibold text-base md:text-lg truncate"
            title={chapter.title}
          >
            {chapter.title}
          </h3>
        </div>
        <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
          <button
            title="Sửa chương"
            className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
            onClick={(e) => e.stopPropagation()}
          >
            <FaPen size={14} />
          </button>
          <button
            title="Xóa chương"
            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(chapter._id);
            }}
          >
            <FaTrash size={14} />
          </button>
          <span className="p-2 text-gray-500">
            {isOpen ? <FaArrowUp /> : <FaArrowDown />}
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="mt-4 pl-4 md:pl-6 border-l-2 border-gray-200">
          {chapter.lessons?.map((lesson) => (
            <LessonItem
              key={lesson._id}
              lesson={lesson}
              onDelete={onDeleteLesson}
            />
          ))}
          {chapter.lessons?.length === 0 && (
            <p className="text-sm text-gray-500 mb-3">
              Chương này chưa có bài học nào.
            </p>
          )}
          <button
            className="mt-2 text-blue-600 flex items-center p-2 hover:bg-blue-50 rounded-md font-medium text-sm"
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
// MODAL THÊM/SỬA BÀI KIỂM TRA (Responsive)
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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <h2 className="text-xl md:text-2xl font-bold mb-6">
          {existingTest ? "Chỉnh sửa bài kiểm tra" : "Thêm bài kiểm tra mới"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 overflow-y-auto flex-grow pr-2"
        >
          {/* Form fields */}
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
              rows="10"
              className="mt-1 block w-full px-3 py-2 border rounded-md font-mono text-sm bg-gray-50"
              placeholder="Dán cấu trúc JSON của các câu hỏi vào đây..."
            ></textarea>
          </div>
          {/* Action buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
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
// COMPONENT CHÍNH CỦA TRANG (Responsive)
//======================================================================
const CourseEditPage = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  // Redux selectors
  const { courseDetails, status } = useSelector((state) => state.courses);
  const { testsByCourse, status: testStatus } = useSelector(
    (state) => state.tests
  );

  const courseFromStore = courseDetails[courseId];
  const testsForThisCourse = testsByCourse[courseId] || [];

  // Local state
  const [localCourse, setLocalCourse] = useState(null);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);

  // Fetching data
  useEffect(() => {
    dispatch(fetchCourseById(courseId));
    dispatch(fetchTestsByCourse(courseId));
  }, [courseId, dispatch]);

  useEffect(() => {
    if (courseFromStore) {
      setLocalCourse(courseFromStore);
    }
  }, [courseFromStore]);

  // Refetching function
  const refetchAll = () => {
    dispatch(fetchCourseById(courseId));
    dispatch(fetchTestsByCourse(courseId));
  };

  // Handlers for Course Info
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    if (!localCourse) return;
    const { title, category, description, thumbnail } = localCourse;
    dispatch(
      updateCourse({
        id: courseId,
        updatedData: { title, category, description, thumbnail },
      })
    )
      .unwrap()
      .then(() => alert("Cập nhật thông tin cơ bản thành công!"))
      .catch((err) => alert(`Lỗi: ${err.message}`));
  };

  // Handlers for Chapters
  const handleAddChapter = () => {
    const title = prompt("Nhập tên chương mới:");
    if (title?.trim()) {
      dispatch(createChapter({ title, courseId })).unwrap().then(refetchAll);
    }
  };

  const handleDeleteChapter = (chapterId) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa chương này? Toàn bộ bài học bên trong cũng sẽ bị mất."
      )
    ) {
      dispatch(deleteChapter(chapterId)).unwrap().then(refetchAll);
    }
  };

  // Handlers for Lessons
  const handleOpenAddLessonModal = (chapterId) => {
    setCurrentChapterId(chapterId);
    setIsLessonModalOpen(true);
  };

  const handleCreateLesson = (lessonData) => {
    dispatch(createLesson(lessonData))
      .unwrap()
      .then(() => {
        setIsLessonModalOpen(false);
        refetchAll();
      })
      .catch((err) => alert(`Lỗi: ${err.message}`));
  };

  const handleDeleteLesson = (lessonId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài học này không?")) {
      dispatch(deleteLesson(lessonId)).unwrap().then(refetchAll);
    }
  };

  // Handlers for Tests
  const handleOpenAddTestModal = () => {
    setEditingTest(null);
    setIsTestModalOpen(true);
  };

  const handleOpenEditTestModal = (test) => {
    setEditingTest(test);
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
        refetchAll();
      })
      .catch((err) => alert(`Lỗi: ${err.message}`));
  };

  const handleDeleteTest = (testId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài kiểm tra này?")) {
      dispatch(deleteTest({ testId, courseId }))
        .unwrap()
        .then(refetchAll)
        .catch((err) => alert(`Lỗi: ${err.message}`));
    }
  };

  // Render logic
  if (status === "loading" && !localCourse)
    return (
      <div className="p-6 text-center text-lg font-semibold">Đang tải...</div>
    );
  if (!localCourse)
    return (
      <div className="p-6 text-center text-lg font-semibold text-red-500">
        Không tìm thấy khóa học.
      </div>
    );

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
        existingTest={editingTest}
      />

      <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link
              to="/admin/course"
              className="flex items-center text-blue-600 hover:underline font-medium"
            >
              <FaArrowLeft className="mr-2" /> Quay lại danh sách khóa học
            </Link>
          </div>

          {/* Section 1: Thông tin cơ bản */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaBook className="mr-3 text-blue-600" />
              Thông tin cơ bản
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="md:col-span-2">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  URL Ảnh bìa
                </label>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {localCourse.thumbnail && (
                    <img
                      src={localCourse.thumbnail}
                      alt="Xem trước"
                      className="w-full sm:w-40 h-auto sm:h-24 object-cover rounded-lg border bg-gray-200 flex-shrink-0"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                      onLoad={(e) => {
                        e.target.style.display = "block";
                      }}
                    />
                  )}
                  <div className="flex-grow w-full">
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
                className="w-full sm:w-auto bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Lưu thông tin
              </button>
            </div>
          </div>

          {/* Section 2: Nội dung khóa học */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
              <h2 className="text-xl font-bold flex items-center">
                <FaClipboardList className="mr-3 text-green-600" />
                Nội dung khóa học
              </h2>
              <button
                onClick={handleAddChapter}
                className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-green-700 font-medium"
              >
                <FaPlus className="mr-2" /> Thêm chương
              </button>
            </div>
            <div>
              {localCourse.chapters?.map((chapter) => (
                <ChapterItem
                  key={chapter._id}
                  chapter={chapter}
                  onDelete={handleDeleteChapter}
                  onAddLesson={handleOpenAddLessonModal}
                  onDeleteLesson={handleDeleteLesson}
                />
              ))}
              {localCourse.chapters?.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  Chưa có chương nào. Bấm "Thêm chương" để bắt đầu.
                </p>
              )}
            </div>
          </div>

          {/* Section 3: Bài kiểm tra */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
              <h2 className="text-xl font-bold flex items-center">
                <FaFileSignature className="mr-3 text-indigo-600" />
                Bài kiểm tra
              </h2>
              <button
                onClick={handleOpenAddTestModal}
                className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-indigo-700 font-medium"
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
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded border gap-3"
                >
                  <p className="font-semibold text-gray-800">
                    {test.title}{" "}
                    <span className="font-normal text-gray-500">
                      ({test.durationInMinutes} phút)
                    </span>
                  </p>
                  <div className="flex items-center justify-end space-x-1">
                    <Link
                      to={`/admin/course/${courseId}/test/${test._id}/attempts`}
                      title="Xem các bài làm"
                      className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-50"
                    >
                      <FaClipboardList size={16} />
                    </Link>
                    <button
                      onClick={() => handleOpenEditTestModal(test)}
                      title="Sửa"
                      className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
                    >
                      <FaPen size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteTest(test._id)}
                      title="Xóa"
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                    >
                      <FaTrash size={14} />
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
