import { FaRegTrashAlt } from "react-icons/fa";

function ProductCart({
  product,
  addQuantity,
  subtractQuantity,
  deleteProduct,
}) {
  return (
    <div className="bg-white rounded-lg text-black flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-md font-bold">{product.title}</p>
        <p>
          <FaRegTrashAlt
            className="text-red-800 font-bold text-xl cursor-pointer hover:scale-125"
            onClick={() => deleteProduct(product.id)}
          />
        </p>
      </div>
      <div className="flex flex-row justify-between items-center p-2">
        <p className="font-thin">${product.price}</p>
      </div>
      {/* badge with quantity and two buttons to add and rest */}
      <div className="flex flex-row justify-between items-center p-2">
        <button
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4  rounded-full"
          onClick={() => subtractQuantity(product.id)}
        >
          -
        </button>
        <p className="font-bold">{product.quantity}</p>
        <button
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => addQuantity(product.id)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export { ProductCart };
