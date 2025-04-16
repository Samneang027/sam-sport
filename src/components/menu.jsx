 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
 import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
 import {Link} from 'react-router-dom';
function Menu() {
    return (
        <nav className='bg-secondary p-2 lg:p-4 fixed top-0 left-0 w-full overflow-hidden z-50'>
            <div className='flex justify-between container mx-auto'>
                <h1 className='aclonica font-bold text-xs md:text-sm lg:text-xl p-2'>SAM SPORT</h1>
                <div className='flex justify-between text-xs md:text-sm lg:text-xl'>
                    <Link to="/" className='p-2 hover:text-primary hover:underline underline-offset-4'>Home</Link>
                    <Link to="/nike" className='p-2 hover:text-primary hover:underline underline-offset-4'>Nike</Link>
                    <Link to="/puma" className='p-2 hover:text-primary hover:underline underline-offset-4'>Puma</Link>
                    <Link to="/adidas" className='p-2 hover:text-primary hover:underline underline-offset-4'>Adidas</Link>
                </div>
                <div className="relative hidden md:flex p-2 lg:text-xl">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    <input className="block bg-gray-100 pr-2 pl-8 text-md text-custom rounded-3xl border" type="search" name="search" placeholder="Search"/>
                </div>
                <a href="#" className='p-2 text-xs md:text-sm lg:text-xl'><FontAwesomeIcon icon={faCartShopping} /></a>
                <div className='hidden md:block md:text-sm lg:text-xl md:p-2 md:hover:text-primary md:hover:underline md:underline-offset-4'>
                    <a href="#">Login</a>
                </div>
            </div>
        </nav>
    );
} export default Menu;