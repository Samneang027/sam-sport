import shoeimage from "/public/image/Air Force Air Jordan Nike.png";

function CardSale({ title, slug, price, images}) {
  return (
    <div className="p-4">
      <a href="#">
        <div className="">
          <div className="bg-secondary hover:bg-gray w-40 h-40 flex items-center justify-center">
            <img
              src={images || shoeimage}
              alt={title || "Product Image"}
              className="max-w-full max-h-full"
            />
          </div>
        </div>
        <div className="pt-2">
          <div className="w-40 overflow-hidden whitespace-nowrap">
            <label
              className="block font-bold text-2xl text-title animate-scroll"
              htmlFor="nameproduct"
            >
              {title || "New Product"}
            </label>
          </div>
          <label
            className="block font-bold text-lg text-custom"
            htmlFor="quote"
          >
            {slug || "Category"}
          </label>
          <label className="block font-bold text-lg text-black" htmlFor="price">
            {price || "$0.00"}
          </label>
        </div>
      </a>
    </div>
  );
}
export default CardSale;
