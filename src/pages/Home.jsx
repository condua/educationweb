import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import CourseDashboard from "./Courses";
import CourseList from "./CourseList";
const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <div className="my-20 bg-blue-50 px-6 rounded-lg shadow-lg">
        <CourseList />
      </div>
      <Testimonials />
      {/* <Pricing /> */}
    </>
  );
};

export default Home;
