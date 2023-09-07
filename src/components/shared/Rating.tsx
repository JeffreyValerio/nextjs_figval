import { FaStar } from "react-icons/fa";

const Rating = ({ value, max }: any) => {
  return (
    <div className="flex items-center gap-[2px]">
      {/* Renderizar estrellas llenas */}
      {[...Array(value)].map((_, index) => (
        <FaStar key={index} className="h-3 w-3 text-orange" />
      ))}
      {/* Renderizar estrellas vacías */}
      {[...Array(max - value)].map((_, index) => (
        <FaStar key={index} className="h-3 w-3 text-black" />
      ))}
    </div>
  );
};

export default Rating