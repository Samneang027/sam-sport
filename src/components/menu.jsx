
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useEffect, useState } from 'react';

function Menu({ searchTerm = "", setSearchTerm = () => {} }) {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("userData")));
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("userData"));
      setUser(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem("userData");
    localStorage.removeItem("userVerified");
    localStorage.removeItem("userUuid");
    localStorage.removeItem("isUser")
    setUser(null);
    navigate('/');
  };

  return (
    <nav className='bg-secondary p-4 lg:p-6 fixed top-0 left-0 w-full overflow-hidden z-50'>
      <div className='flex justify-between container mx-auto'>
        <div>
          <h1 className='aclonica font-bold text-xs md:text-lg lg:text-2xl p-2'>SAM SPORT</h1>
        </div>

        <div className='flex justify-between text-xs md:text-lg lg:text-2xl'>
          <NavLink to="/user-dashboard" className='p-2 hover:text-primary hover:underline underline-offset-4'>Home</NavLink>
          <NavLink to="/user-dashboard/nike" className='p-2 hover:text-primary hover:underline underline-offset-4'>Nike</NavLink>
          <NavLink to="/user-dashboard/puma" className='p-2 hover:text-primary hover:underline underline-offset-4'>Puma</NavLink>
          <NavLink to="/user-dashboard/adidas" className='p-2 hover:text-primary hover:underline underline-offset-4'>Adidas</NavLink>
        </div>

        <div className="relative hidden md:flex p-2 lg:text-xl">
          <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <input
            className="block bg-gray-100 pr-2 pl-8 text-md text-custom rounded-3xl border"
            type="search"
            name="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {!user && (
            <>
                <div className="relative p-2 text-xs md:text-lg lg:text-2xl">
                <NavLink to="/signin" className="hover:text-primary hover:underline underline-offset-4">Signin</NavLink>
                </div>
                <div className="p-2 text-xs md:text-lg lg:block lg:text-2xl">
                    <button
                        onClick={() => setShowLoginModal(true)}
                        className="hover:text-primary hover:underline underline-offset-4"
                    >
                        Login
                    </button>
                </div>
                {showLoginModal && (
                <div className="fixed inset-0 bg-sky-500/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
                    <h2 className="text-lg font-semibold mb-4">Choose Login Type</h2>
                    <div className="flex flex-col gap-3">
                        <NavLink
                        to="/login-cart"
                        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        onClick={() => setShowLoginModal(false)}
                        >
                        User Login
                        </NavLink>
                        <NavLink
                        to="/login"
                        className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
                        onClick={() => setShowLoginModal(false)}
                        >
                        Admin Login
                        </NavLink>
                        <button
                        onClick={() => setShowLoginModal(false)}
                        className="mt-2 text-sm text-gray-500 hover:underline"
                        >
                        Cancel
                        </button>
                    </div>
                    </div>
                </div>
                )}
            </>
        )}

        {user && (
          <>
            <div className='relative p-2 text-xs md:text-lg lg:text-2xl'>
              <NavLink to="/user-dashboard/cart" className='relative'>
                <FontAwesomeIcon icon={faCartShopping} />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </NavLink>
            </div>

            <div className='p-2 text-xs md:text-lg lg:block lg:text-2xl md:hover:text-primary md:hover:underline md:underline-offset-4'>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}
      </div>

      <div className='text-[11px] md:text-lg lg:text-xl text-left pl-2 text-primary'>
        {user ? (
          <p><FontAwesomeIcon icon={faUser} /> {user.username}</p>
        ) : (
          <p>Please sign in</p>
        )}
      </div>
    </nav>
  );
}

export default Menu;
