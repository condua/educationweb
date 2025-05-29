import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CourseCard from "./CourseCard";

const CoursePreview = () => {
  const { id } = useParams();
  const course = useSelector((state) => state.courses.courseDetails[id]);
  console.log("CoursePreview - course:", course);
  return <div></div>;
};

export default CoursePreview;
