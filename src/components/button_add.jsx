// import { useCart } from '../contexts/CartContext';
// import { useNavigate } from "react-router-dom";

// function ButtonAdd({content}) {
//     const {addToCart} = useCart();
//     const navigate = useNavigate();
//     const handleAddToCart = () => {
//         addToCart(content);
//         navigate('/');
//     };
//     return (
//         <div className="mt-4 mb-4">
//             <button onClick={handleAddToCart} className=" bg-primary p-4 w-35 md:w-50 lg:w-70 rounded-full items-center text-md md:text-xl lg:text-3xl text-white font-semibold hover:bg-secondary hover:text-black" type="button">Add to Bag</button>
//         </div>
//     );
// }export default ButtonAdd;

import { useCart } from '../contexts/CartContext';
import { useNavigate } from "react-router-dom";

function ButtonAdd({ content }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    // ✅ Check email verification
    const isVerified = localStorage.getItem("userVerified") === "true";

    if (!isVerified) {
      alert("Please verify your email before adding products to the cart.");
      return;
    }

    // ✅ Proceed if verified
    addToCart(content);
    navigate('/');
  };

  return (
    <div className="mt-4 mb-4">
      <button
        onClick={handleAddToCart}
        className="bg-primary p-4 w-35 md:w-50 lg:w-70 rounded-full items-center text-md md:text-xl lg:text-3xl text-white font-semibold hover:bg-secondary hover:text-black"
        type="button"
      >
        Add to Bag
      </button>
    </div>
  );
}

export default ButtonAdd;
