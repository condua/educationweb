import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Home from "./pages/Home";
import Register from "./components/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CourseDashboard from "./pages/Courses";

// Component bảo vệ route (Private Route)
const PrivateRoute = ({ element }) => {
  const isAuthen = useSelector((state) => state.auth.isAuthen);
  return isAuthen ? element : <Navigate to="/login" />;
};

// Component chặn người dùng đã đăng nhập vào Login/Register
const AuthRoute = ({ element }) => {
  const isAuthen = useSelector((state) => state.auth.isAuthen);
  return isAuthen ? <Navigate to="/" /> : element;
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Routes không yêu cầu đăng nhập */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthRoute element={<Login />} />} />
        <Route
          path="/register"
          element={<AuthRoute element={<Register />} />}
        />

        {/* Routes yêu cầu đăng nhập */}
        <Route
          path="/courses"
          element={<PrivateRoute element={<CourseDashboard />} />}
        />

        {/* Route mặc định */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
