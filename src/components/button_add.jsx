
import { useCart } from '../contexts/CartContext';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { addToCartAPI } from '/service/product';

function ButtonAdd({ content }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    try {
      await addToCartAPI({
        userUuid: userData.uuid,
        productUuid: content.uuid,
        quantity: 1,
      });

      addToCart(content);

      Swal.fire({
        title: 'Added!',
        text: 'Product added to your cart.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });

      navigate('/user-dashboard');
    } catch (error) {
      console.error("Add to cart failed:", error.message);
      Swal.fire({
        title: 'Error',
        text: error.message || 'Failed to add product to cart.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
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

