import { useEffect, useState } from "react";
import { Cart } from "../Components/Cart/Cart";
import { ProductCard } from "../Components/ProductCard/ProductCard";
import { ProductList } from "../Components/ProductList/ProductList";

import { Checkout } from "../Components/Checkout/Checkout";
import { Modal } from "../Components/Modal/Modal";
import { History } from "../Components/History/History";
import Storage from "../utils/Storage";
import { Navbar } from "../Components/Navbar/Navbar";

function App() {
  const [showCart, setShowCart] = useState(false);

  const [modalCheckout, setModalCheckout] = useState(false);

  const [modalHistory, setModalHistory] = useState(false);

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(false);

  const [checkout, setCheckout] = useState({});

  const [history, setHistory] = useState([]);

  const [search, setSearch] = useState("");

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  const closeModalCheckout = () => setModalCheckout(false);
  const openModalCheckout = () => setModalCheckout(true);

  const openModalHistory = () => setModalHistory(true);
  const closeModalHistory = () => setModalHistory(false);

  const totalProducts = cart.length;

  const showProducts = () => {
    if (search.length === 0) {
      return products;
    }

    return products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  const addProduct = (product) => {
    setCart([...cart, product]);
  };

  const checkProductInCart = (id) => {
    return cart.some((product) => product.id === id);
  };

  const deleteProduct = (id) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
  };

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_API)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });

    const historyLocalStorage = Storage.get("history");

    if (historyLocalStorage) {
      setHistory(JSON.parse(historyLocalStorage));
    }
  }, []);

  console.log(search);

  return (
    <>
      {modalCheckout || modalHistory ? (
        <Modal>
          {modalCheckout ? (
            <Checkout
              closeModal={closeModalCheckout}
              checkout={checkout}
              setCart={setCart}
              closeCart={closeCart}
              setHistory={setHistory}
            />
          ) : (
            <History history={history} closeHistory={closeModalHistory} />
          )}
        </Modal>
      ) : (
        ""
      )}

      {showCart && (
        <Cart
          closeCart={closeCart}
          cart={cart}
          deleteProduct={deleteProduct}
          setCart={setCart}
          openCheckout={openModalCheckout}
          setCheckout={setCheckout}
        />
      )}

      <div
        className={`bg-gray-800 w-full text-white py-5 text-center flex justify-around items-center fixed z-20 ${
          showCart || modalCheckout ? "blur-sm" : "blur-none"
        }`}
      >
        <Navbar
          openCart={openCart}
          openModalHistory={openModalHistory}
          totalProducts={totalProducts}
          setSearch={setSearch}
        />
      </div>

      <main
        className={`h-screen w-full flex flex-col items-center ${
          showCart || modalCheckout ? "blur-sm" : "blur-none"
        }`}
      >
        <div className="mt-52 lg:mt-20 w-10/12 flex justify-center items-center">
          {!loading ? (
            <ProductList>
              {showProducts().map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addProduct={addProduct}
                  checkProductInCart={checkProductInCart}
                />
              ))}
            </ProductList>
          ) : (
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
