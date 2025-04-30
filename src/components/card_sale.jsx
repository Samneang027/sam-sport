import shoeimage from "/public/image/Air Force Air Jordan Nike.png";
import { Link } from "react-router-dom";
function CardSale({uuid, name, brand, priceOut, images}) {
  return (
  <Link to={`/product/${uuid}`}>
    <div className="p-4">
        <div className="">
          <div className="bg-secondary hover:bg-gray w-40 h-40 flex items-center justify-center">
            <img
              src={images || shoeimage}
              alt={name || "Product Image"}
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
              {name || "New Product"}
            </label>
          </div>
          <label
            className="block font-bold text-lg text-custom"
            htmlFor="quote"
          >
            {brand || "Category"}
          </label>
          <label className="block font-bold text-lg text-black" htmlFor="price">
            {priceOut || "$0.00"}
          </label>
        </div>
    </div>
  </Link>
  );
}
export default CardSale;
