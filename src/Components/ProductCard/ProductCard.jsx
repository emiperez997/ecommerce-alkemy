function ProductCard({
  product: { id, title, category, image, price, rating },
  addProduct,
  checkProductInCart,
}) {
  const isProductInCart = checkProductInCart(id);

  return (
    <div className="h-96 w-72 md:w-56 relative flex flex-col items-center p-5 bg-gray-600 rounded-lg">
      <div className="absolute top-2 right-0 rounded-full bg-orange-800 text-white text-sm font-bold p-5">
        {parseFloat(rating.rate).toFixed(1)}
      </div>

      <div className="bg-transparent h-80 overflow-hidden flex flex-col justify-center items-center">
        <img src={image} alt={title} className="w-full object-fit" />
      </div>

      <div className="text-white w-full">
        <h3 className="text-md font-bold py-2">{title}</h3>
        <hr />
        <div className="flex justify-between py-2">
          <p>${price}</p>
          <p className="capitalize font-thin text-sm p-1 rounded-lg">
            {category}
          </p>
        </div>

        <div className="flex justify-center items-center">
          <button
            className={`  text-white font-bold py-2 px-4 rounded ${
              isProductInCart
                ? "cursor-not-allowed bg-gray-800"
                : "bg-blue-800 hover:bg-blue-900"
            }`}
            onClick={() => addProduct({ title, price, id, quantity: 1 })}
          >
            {isProductInCart ? "Already In Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export { ProductCard };
