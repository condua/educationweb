import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      {/* <Pricing /> */}
    </>
  );
};

export default Home;
