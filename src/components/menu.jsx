 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
 import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
 import { faUser } from '@fortawesome/free-solid-svg-icons';
 import {NavLink} from 'react-router-dom';
 import { useCart } from '../contexts/CartContext';
function Menu({searchTerm = "", setSearchTerm = () => {}}) {
    const {cartItems} = useCart();
    const user = JSON.parse(localStorage.getItem("userData"));
    return (
        <nav className='bg-secondary p-4 lg:p-6 fixed top-0 left-0 w-full overflow-hidden z-50'>
            <div className='flex justify-between container mx-auto'>
                <div>
                    <h1 className='aclonica font-bold text-xs md:text-lg lg:text-2xl p-2'>SAM SPORT</h1>
                </div>
                <div className='flex justify-between text-xs md:text-lg lg:text-2xl'>
                    <NavLink to="/" className='p-2 hover:text-primary hover:underline underline-offset-4'>Home</NavLink>
                    <NavLink to="/nike" className='p-2 hover:text-primary hover:underline underline-offset-4'>Nike</NavLink>
                    <NavLink to="/puma" className='p-2 hover:text-primary hover:underline underline-offset-4'>Puma</NavLink>
                    <NavLink to="/adidas" className='p-2 hover:text-primary hover:underline underline-offset-4'>Adidas</NavLink>
                </div>
                <div className="relative hidden md:flex p-2 lg:text-xl">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <input className="block bg-gray-100 pr-2 pl-8 text-md text-custom rounded-3xl border" type="search" name="search" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
                <div className='relative p-2 text-xs md:block md:text-lg lg:text-2xl md:hover:text-primary md:hover:underline md:underline-offset-4'>
                    <NavLink to="/signin">Signin</NavLink>
                </div>
                <div className='hidden lg:block lg:text-2xl lg:p-2 md:hover:text-primary md:hover:underline md:underline-offset-4'>
                    <NavLink to="/login">Login</NavLink>
                </div>
                <div className='relative p-2'>
                  <NavLink to="/cart" className='text-xs md:text-lg lg:text-2xl'><FontAwesomeIcon icon={faCartShopping} />{cartItems.length > 0 && 
                      (<span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                          {cartItems.length}
                      </span>)}
                  </NavLink>
                </div>
            </div>
            <div className='text-[11px] md:text-lg lg:text-xl text-left pl-2 text-primary'>
                {user ? <p><FontAwesomeIcon icon={faUser} /> {user.username}</p> : <p>Please sign in</p>}
            </div>
        </nav>
    );
} export default Menu;