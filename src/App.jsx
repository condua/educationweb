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
          path="/register"
          element={<AuthRoute element={<Register />} />}
        />
        <Route path="/services" element={<Portfolio />} />
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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Chatbot />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
