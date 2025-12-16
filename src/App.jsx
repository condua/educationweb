import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser } from "./redux/userSlice"; // Import action fetchUser
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";
import VerifyCode from "./components/VerifyCode";
import ResetPassword from "./components/ResetPassword";
import Home from "./pages/Home";
import Register from "./components/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CourseDashboard from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Portfolio from "./pages/services/Project";
import Chatbot from "./components/Chatbox";
import BlogList from "./pages/blog/BlogList";
import BlogDetail from "./pages/blog/BlogDetail";
import CreateBlog from "./pages/blog/CreateBlog";
import ProfilePage from "./components/Profile";
import CoursePreview from "./pages/CoursePreview";
import ExamDo from "./pages/exams/ExamDo";
import ExamResultPage from "./pages/exams/ExamResultPage";
import ExamList from "./pages/exams/ExamList";
import CourseCalendar from "./pages/calendar/CourseCalendar";
import TestOverview from "./pages/calendar/TestOverview";
import TestTaking from "./pages/calendar/TestTaking.js";
import TestResults from "./pages/calendar/TestResults";
import Dashboard from "./pages/admin/Dashboard";
import StudentManagement from "./pages/admin/StudentManagement.jsx";
import CourseManagement from "./pages/admin/CourseManagement.jsx";
import CourseEditPage from "./pages/admin/CourseEditPage.jsx";
import TestAttemptsPage from "./pages/admin/TestAttemptsPage.jsx";
import TestAttemptResults from "./pages/admin/TestAttemptResults.jsx";
// Trong file src/index.js hoặc src/App.js
import "katex/dist/katex.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import CourseNewPage from "./pages/admin/CourseNewPage.jsx";
import TestPreviewPage from "./pages/admin/TestPreviewPage.jsx";
import ChatPage from "./pages/message/ChatPage.jsx";
// import games components
import GamesHome from "./pages/games/GamesHome.jsx"; // Import GamesHome component

import TypingGame from "./pages/games/TypingGame.jsx";
import GrammarGame from "./pages/games/GrammarGame.jsx";
import MatchingGame from "./pages/games/MatchingGame.jsx";
import WordfallGame from "./pages/games/WordfallGame.jsx";
import GalaxyGrammarGame from "./pages/games/GalaxyGrammarGame.jsx";
import DetectiveGame from "./pages/games/DetectiveGame.jsx";
import EnglishWordSprint from "./pages/games/EnglishWordSprint.jsx";
import MillionaireGame from "./pages/games/MillionaireGame .jsx";
import VocabularyGame from "./pages/games/VocabularyGame.jsx";
import ListeningGame from "./pages/games/ListeningGame.jsx";
import SentenceScrambleGame from "./pages/games/SentenceScrambleGame.jsx";
import GrammarTopic from "./pages/games/GrammarTopic.jsx";

const PrivateRoute = ({ element }) => {
  const isAuthen = useSelector((state) => state.auth.isAuthen);
  const location = useLocation();

  return isAuthen ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const AuthRoute = ({ element }) => {
  const isAuthen = useSelector((state) => state.auth.isAuthen);
  return isAuthen ? <Navigate to="/" /> : element;
};
// =================================================================
// 1. THÊM COMPONENT AdminRoute TẠI ĐÂY
// =================================================================
const AdminRoute = ({ element }) => {
  const isAuthen = useSelector((state) => state.auth.isAuthen);
  const { user } = useSelector((state) => state.user); // Lấy thông tin user từ Redux state
  const location = useLocation();

  // Nếu chưa đăng nhập, chuyển hướng đến trang login
  if (!isAuthen) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu đã đăng nhập nhưng không phải admin, chuyển hướng về trang chủ
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Nếu là admin, cho phép truy cập
  return element;
};
function App() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      await dispatch(fetchUser("me")); // Fetch thông tin user
      setIsLoading(false);
    };

    loadUser();
  }, [dispatch]);

  if (isLoading || status === "loading") {
    return (
      <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/login" element={<AuthRoute element={<Login />} />} />
        <Route
          path="/forget-password"
          element={<AuthRoute element={<ForgetPassword />} />}
        />
        <Route
          path="/verify-code"
          element={<AuthRoute element={<VerifyCode />} />}
        />

        <Route
          path="/reset-password"
          element={<AuthRoute element={<ResetPassword />} />}
        />
        <Route
          path="/register"
          element={<AuthRoute element={<Register />} />}
        />
        <Route path="/services" element={<Portfolio />} />
        <Route path="/games" element={<GamesHome />} />

        {/* Các game theo yêu cầu */}
        <Route path="/games/listening" element={<ListeningGame />} />
        <Route path="/vocabulary-game" element={<VocabularyGame />} />
        <Route path="/game2" element={<SentenceScrambleGame />} />
        <Route path="/listening-game" element={<ListeningGame />} />
        <Route path="/typing-game" element={<TypingGame />} />
        <Route path="/grammar-game" element={<GrammarGame />} />
        <Route path="/grammar-game/:slug" element={<GrammarTopic />} />
        <Route path="/matching-game" element={<MatchingGame />} />
        <Route path="/wordfall-game" element={<WordfallGame />} />
        <Route path="/galaxy-grammar-game" element={<GalaxyGrammarGame />} />
        <Route path="/detective-game" element={<DetectiveGame />} />
        <Route path="/english-word-sprint" element={<EnglishWordSprint />} />
        <Route path="/millionaire-game" element={<MillionaireGame />} />
        {/* Thêm route cho GamesHome */}
        <Route
          path="/profile"
          element={<PrivateRoute element={<ProfilePage />} />}
        />
        <Route
          path="/courses"
          element={<PrivateRoute element={<CourseDashboard />} />}
        />
        <Route
          path="/course/:id"
          element={<PrivateRoute element={<CourseDetail />} />}
        />
        <Route
          path="/course/preview/:id"
          element={<PrivateRoute element={<CoursePreview />} />}
        />
        <Route
          path="/course/:courseId/test/:testId"
          element={<PrivateRoute element={<TestOverview />} />}
        />
        <Route
          path="/course/:courseId/test/:testId/take"
          element={<PrivateRoute element={<TestTaking />} />}
        />
        <Route
          path="/course/:courseId/test/:testId/results/:attemptId"
          element={<PrivateRoute element={<TestResults />} />}
        />
        {/*Thêm các Route Chat Message*/}
        <Route path="/chat" element={<PrivateRoute element={<ChatPage />} />} />
        <Route path="/exams" element={<ExamList />} />
        <Route path="/exams/do/:examId" element={<ExamDo />} />
        <Route path="/exams/result/:examId" element={<ExamResultPage />} />
        <Route path="/calendar" element={<CourseCalendar />} />
        {/* ================================================================= */}
        {/* 2. SỬ DỤNG AdminRoute ĐỂ BẢO VỆ CÁC ROUTE CỦA ADMIN            */}
        {/* ================================================================= */}
        <Route path="/admin" element={<AdminRoute element={<Dashboard />} />} />
        <Route
          path="/admin/student"
          element={<AdminRoute element={<StudentManagement />} />}
        />
        <Route
          path="/admin/course"
          element={<AdminRoute element={<CourseManagement />} />}
        />
        <Route
          path="/admin/course/new"
          element={<AdminRoute element={<CourseNewPage />} />}
        />
        <Route
          path="/admin/course/:courseId"
          element={<AdminRoute element={<CourseEditPage />} />}
        />
        <Route
          path="/admin/course/:courseId/test/:testId/attempts"
          element={<AdminRoute element={<TestAttemptsPage />} />}
        />
        <Route
          path="/admin/course/:courseId/test/:testId/attempt/:attemptId"
          element={<AdminRoute element={<TestAttemptResults />} />}
        />
        <Route
          path="/admin/course/:courseId/test/:testId/preview"
          element={<AdminRoute element={<TestPreviewPage />} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Chatbot />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
