import { FaFilter } from "react-icons/fa";

const FilterSection = () => {
  return (
    <aside className="md:w-1/4 border rounded-xl p-4 h-fit shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        <FaFilter className="text-gray-400" />
      </div>

      {/* Categories */}
      <div className="mb-5">
        <h4 className="font-medium mb-2">Categories</h4>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li className="hover:text-black cursor-pointer">T-shirts</li>
          <li className="hover:text-black cursor-pointer">Shirts</li>
          <li className="hover:text-black cursor-pointer">Shorts</li>
          <li className="hover:text-black cursor-pointer">Hoodies</li>
          <li className="hover:text-black cursor-pointer">Jeans</li>
        </ul>
      </div>

      {/* Price */}
      <div className="mb-5">
        <h4 className="font-medium mb-2">Price</h4>
        <input
          type="range"
          min="50"
          max="300"
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>$50</span>
          <span>$300</span>
        </div>
      </div>

      {/* Colors */}
      <div className="mb-5">
        <h4 className="font-medium mb-2">Colors</h4>
        <div className="flex flex-wrap gap-2">
          {["red", "green", "blue", "yellow", "orange", "pink", "black"].map(
            (color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full border-2 border-white shadow`}
                style={{ backgroundColor: color }}
              />
            )
          )}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-5">
        <h4 className="font-medium mb-2">Size</h4>
        <div className="flex flex-wrap gap-2">
          {["S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className="border px-3 py-1 rounded-md text-sm hover:bg-black hover:text-white transition"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
        Apply Filter
      </button>
    </aside>
  );
};

export default FilterSection;
