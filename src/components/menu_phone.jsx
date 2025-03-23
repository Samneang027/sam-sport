 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
function Menu_phone() {
    return (
      <nav className='bg-secondary'>
        <div className='flex justify-between mr-8 ml-8'>
            <h1 className='font-bold text-2xl p-4'>SAM SPORT</h1>
            <div className='flex justify-between'>
                <a href="#" className='p-4 hover:text-primary hover:underline underline-offset-4'>Home</a>
                <a href="#" className='p-4 hover:text-primary hover:underline underline-offset-4'>Nike</a>
                <a href="#" className='p-4 hover:text-primary hover:underline underline-offset-4'>Puma</a>
                <a href="#" className='p-4 hover:text-primary hover:underline underline-offset-4'>Adidas</a>
            </div>
            <a href="" className='p-4'><FontAwesomeIcon icon={faCartShopping} /></a>
        </div>
      </nav>
    );
  }
  export default Menu_phone;