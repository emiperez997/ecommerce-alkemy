import "./Cart.css";

import { IoMdCloseCircle } from "react-icons/io";
import { ProductCart } from "../ProductCart/ProductCart";

function Cart({
  closeCart,
  cart,
  deleteProduct,
  setCart,
  openCheckout,
  setCheckout,
}) {
  const addQuantity = (id) => {
    const newCart = cart.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setCart(newCart);
  };

  const subtractQuantity = (id) => {
    const newCart = cart.map((product) => {
      if (product.id === id) {
        if (product.quantity === 1) {
          return product;
        }
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    setCart(newCart);
  };

  const totalPrice = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const totalProducts = cart.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  const handleCheckout = () => {
    const checkout = {
      products: cart,
      totalPrice,
    };
    setCheckout(checkout);
    openCheckout();
    closeCart();
  };

  return (
    <aside className="fixed w-96 bg-gray-800 h-screen flex flex-col justify-between items-center right-0 text-white z-30">
      <div className="flex justify-between items-center w-full p-5">
        <h2 className="font-bold text-2xl">Cart</h2>
        <IoMdCloseCircle
          className="text-red-700 text-3xl self-end cursor-pointer hover:scale-125"
          onClick={closeCart}
        />
      </div>

      <div className="w-80 flex flex-col justify-start gap-5 overflow-y-auto p-3  overflow-x-hidden">
        {cart.map((product) => {
          return (
            <ProductCart
              key={product.id}
              product={product}
              addQuantity={addQuantity}
              subtractQuantity={subtractQuantity}
              deleteProduct={deleteProduct}
            />
          );
        })}
      </div>

      <div className="flex flex-col justify-between items-center p-5 gap-3 w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row justify-between items-center">
            <p className="mr-2">Price:</p>
            <p className="font-bold">
              $
              {totalPrice
                ? (Math.round(totalPrice * 100) / 100).toFixed(2)
                : "0.00"}
            </p>
          </div>

          <div className="flex flex-row justify-between items-center">
            <p className="mr-2">Products:</p>
            <p className="font-bold">{totalProducts}</p>
          </div>
        </div>
        <button
          className={`w-full block text-white font-bold py-2 px-4 rounded ${
            totalProducts === 0
              ? "cursor-not-allowed bg-gray-900 hover:bg-gray-950"
              : "bg-green-700 hover:bg-green-900"
          }}`}
          onClick={() => totalProducts > 0 && handleCheckout()}
        >
          Checkout
        </button>
      </div>
    </aside>
  );
}

export { Cart };
