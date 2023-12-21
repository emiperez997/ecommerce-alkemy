import { IoMdCloseCircle } from "react-icons/io";
import { ProductCart } from "../ProductCart/ProductCart";
import { useState } from "react";
import Storage from "../../utils/Storage";

function Checkout({ closeModal, checkout, setCart, closeCart, setHistory }) {
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setSuccess(true);
    setCart([]);
    closeCart();
    setHistory((history) => {
      const newHistory = {
        products: checkout.products,
        totalPrice: checkout.totalPrice,
        date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      };

      Storage.set("history", JSON.stringify([...history, newHistory]));
      return [...history, newHistory];
    });
  };

  return (
    <>
      {!success ? (
        <div className="w-10/12 max-h-screen p-10 bg-gray-800 flex flex-col text-white z-50 rounded-lg ">
          <div className="flex justify-between items-center w-full p-5">
            <h2 className="font-bold text-2xl">Checkout</h2>
            <IoMdCloseCircle
              className="text-red-700 text-3xl self-end cursor-pointer hover:scale-125"
              onClick={closeModal}
            />
          </div>
          <div className="w-full h-72 flex flex-col justify-center items-center gap-5 overflow-y-auto overflow-x-hidden p-5">
            {checkout.products &&
              checkout.products.map((product) => {
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg py-2 text-black flex flex-col gap-2 p-2 w-full"
                  >
                    <p className="text-md font-bold">{product.title}</p>
                    <div className="flex flex-row justify-between items-center p-2">
                      <p className="font-thin">${product.price}</p>
                      <p className="font-bold">{product.quantity}</p>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="flex flex-col justify-between items-center py-5 gap-5 w-full">
            <div className="flex flex-row justify-between items-center w-full">
              <p className="font-bold">Total:</p>
              <p className="font-bold">${checkout.totalPrice}</p>
            </div>
            <div className="w-full flex justify-between">
              <button
                className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                onClick={handleCheckout}
              >
                Checkout
              </button>

              <button
                className="bg-red-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : loading ? (
        <div className="w-10/12 p-10 bg-gray-800 flex flex-col justify-center items-center text-white z-50 rounded-lg gap-5">
          <h2 className="text-2xl font-bold">Processing your order...</h2>

          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="w-10/12 p-10 bg-gray-800 flex flex-col justify-center items-center text-white z-50 rounded-lg gap-5">
          <h2 className="font-bold text-2xl">Success Checkout</h2>

          <p className="text-center text-xl">
            Thank you for your purchase, we will send you a confirmation email
            with the details of your order.
          </p>

          <button
            className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded mt-5"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

export { Checkout };
