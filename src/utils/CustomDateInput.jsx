import { forwardRef } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

const CustomDateInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <div
    onClick={onClick}
    ref={ref}
    className="w-full flex items-center border rounded px-3 py-2 cursor-pointer bg-white"
  >
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      readOnly // ✅ chặn gõ
      className="flex-grow outline-none bg-transparent cursor-pointer"
    />
    <FaRegCalendarAlt className="ml-2 text-gray-500 pointer-events-none" />
  </div>
));
export default CustomDateInput;
