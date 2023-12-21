import { FaCartShopping } from "react-icons/fa6";
import { BsBagCheckFill } from "react-icons/bs";

function Navbar({ openCart, openModalHistory, totalProducts, setSearch }) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 justify-between w-6/12 items-center">
      <h1 className="text-center font-bold text-2xl underline underline-offset-4">
        Ecommerce
      </h1>

      <div className="flex flex-row justify-center items-center gap-5">
        <input
          type="text"
          className="border-2 border-gray-700 rounded-lg px-2 py-1 text-black w-80"
          placeholder="Search..."
          onChange={handleSearch}
        />
      </div>

      <div className="relative flex justify-center items-center gap-5">
        <BsBagCheckFill
          className="text-xl cursor-pointer hover:scale-125 transition-all"
          onClick={openModalHistory}
        />

        <FaCartShopping
          className="text-xl cursor-pointer hover:scale-125 transition-all"
          onClick={openCart}
        />

        {totalProducts > 0 && (
          <div className="absolute -top-3 -right-3 bg-red-700 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs">
            {totalProducts}
          </div>
        )}
      </div>
    </div>
  );
}

export { Navbar };
