 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
 import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
function Menu() {
    return (
        <nav className='bg-secondary p-2 lg:p-4'>
            <div className='flex justify-between'>
                <h1 className='aclonica font-bold text-xs md:text-sm lg:text-xl p-2'>SAM SPORT</h1>
                <div className='flex justify-between text-xs md:text-sm lg:text-xl'>
                    <a href="#" className='p-2 hover:text-primary hover:underline underline-offset-4'>Home</a>
                    <a href="#" className='p-2 hover:text-primary hover:underline underline-offset-4'>Nike</a>
                    <a href="#" className='p-2 hover:text-primary hover:underline underline-offset-4'>Puma</a>
                    <a href="#" className='p-2 hover:text-primary hover:underline underline-offset-4'>Adidas</a>
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