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
      <CourseList />
      <Testimonials />
      {/* <Pricing /> */}
    </>
  );
};

export default Home;
