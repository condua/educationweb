import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const PrivateRoute = ({ element }) => {
  const isAuthen = useSelector((state) => state.auth.isAuthen);
  return isAuthen ? element : <Navigate to="/login" />;
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
    return <div>Đang tải...</div>; // Hiển thị loading trong lúc fetch user
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthRoute element={<Login />} />} />
        <Route
          path="/register"
          element={<AuthRoute element={<Register />} />}
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
      <Footer />
    </BrowserRouter>
  );
}

export default App;
