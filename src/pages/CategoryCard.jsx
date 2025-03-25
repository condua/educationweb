const CategoryCard = ({ title, icon, bgColor }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md text-center w-48">
      <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  );
};

export default CategoryCard;
