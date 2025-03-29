import CategoryCard from "./CategoryCard";
import {
  FaLaptopCode,
  FaPaintBrush,
  FaCamera,
  FaBusinessTime,
  FaTheaterMasks,
  FaLanguage,
} from "react-icons/fa";

const categories = [
  { title: "All", bgColor: "bg-gray-200 text-gray-700" }, // Thêm All để hiển thị tất cả khóa học
  {
    title: "Development",
    icon: <FaLaptopCode />,
    bgColor: "bg-blue-100 text-blue-600",
  },
  {
    title: "Language",
    icon: <FaLanguage />,
    bgColor: "bg-purple-100 text-purple-600",
  },
  {
    title: "Design",
    icon: <FaPaintBrush />,
    bgColor: "bg-pink-100 text-pink-600",
  },
  {
    title: "Photography",
    icon: <FaCamera />,
    bgColor: "bg-red-100 text-red-600",
  },
  {
    title: "Business",
    icon: <FaBusinessTime />,
    bgColor: "bg-green-100 text-green-600",
  },
  {
    title: "Acting",
    icon: <FaTheaterMasks />,
    bgColor: "bg-gray-100 text-gray-600",
  },
];

const CategorySection = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="py-10">
      <h2 className="text-2xl font-semibold text-center">
        Choose your favorite course from top categories
      </h2>
      <div className="flex justify-center gap-6 mt-6 flex-wrap">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`cursor-pointer px-6 py-3 rounded-lg flex items-center gap-2 font-semibold shadow-md 
              transition duration-300 ${cat.bgColor} 
              ${
                selectedCategory === cat.title
                  ? "border-2 border-black"
                  : "hover:opacity-80"
              }`}
            onClick={() => setSelectedCategory(cat.title)}
          >
            {cat.icon && <span className="text-xl">{cat.icon}</span>}
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
