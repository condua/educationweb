import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/course/${course._id}`); // Điều hướng đến trang chi tiết khóa học
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md p-4 sm:w-80 cursor-pointer hover:shadow-lg transition"
      onClick={handleClick}
    >
      <img
        src={course.thumbnail}
        alt={course.title}
        className="rounded-lg w-full h-40 object-cover"
      />
      <div className="mt-4">
        <span className="text-sm text-gray-500">
          {course.category} • {course.duration}
        </span>
        <h3 className="font-semibold text-lg mt-2">{course.title}</h3>
        <p className="text-gray-500 text-sm">{course.description}</p>
        <div className="flex items-center mt-4">
          <img
            src={course.mentor.avatar}
            alt={course.mentor.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-sm">{course.mentor.name}</span>
          <span className="ml-auto text-lg font-bold text-blue-500">
            {course.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
