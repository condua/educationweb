import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import Register from "./components/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CourseDashboard from "./pages/Courses";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<CourseDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
