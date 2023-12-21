import { IoMdCloseCircle } from "react-icons/io";

function History({ history, closeHistory }) {
  return (
    <div className="bg-gray-800 w-10/12 text-white py-5 text-center flex flex-col justify-around items-center fixed z-20">
      <div className="w-full flex justify-between items-center p-5">
        <h2 className="font-bold text-2xl">Checkout History</h2>
        <IoMdCloseCircle
          className="text-red-700 text-3xl self-end cursor-pointer hover:scale-125"
          onClick={closeHistory}
        />
      </div>

      {history.length > 0 ? (
        <div className="w-full h-72 flex flex-col justify-center items-center gap-5 overflow-y-auto overflow-x-hidden p-5">
          {history.length != 0 &&
            history.map((checkout, index) => {
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg py-2 text-black flex flex-col gap-2 p-2 w-full"
                >
                  <p className="text-md font-bold">{checkout.date}</p>
                  <div className="flex flex-row justify-between items-center p-2">
                    <p className="font-thin">
                      Products: {checkout.products.length}
                    </p>
                    <p className="font-bold">${checkout.totalPrice}</p>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <p className="text-2xl font-bold">No history yet</p>
      )}
    </div>
  );
}

export { History };
