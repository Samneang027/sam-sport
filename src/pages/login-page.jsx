import React, {useState} from 'react'
import profilelogin from "/public/image/welcome-login.jpg";
import ButtonBack from '../components/button_back';
import ButtonLogin from '../components/button_login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import SidebarMenu from '../components/sidebar-menu';
import UserListPage from './user-list-page';
import SupplierPage from './supplier-page';
import SupplierListPage from './supplier-list-page';
import BrandPage from './brand-page';
import BrandListPage from './brand-list-page';
import CategoryPage from './category-page';
import CategoryListPage from './category-list-page';
import ProductPage from './product-page';
import ProductListPage from './product-list-page';
export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='content-center mt-10 mr-20 ml-20'>
        <div className='flex'>
            <div>
                <img className='h-150' src={profilelogin} alt="welcome-login" />
            </div>
            <div className='bg-primary p-4 w-250'>
                <ButtonBack/>
                <h1 className='text-center text-4xl font-bold text-white p-6'>USER LOGIN</h1>
                <div className='p-6'>
                    <label className="block mb-2 text-md md:text-lg lg:text-2xl font-medium text-white dark:text-white" htmlFor="username">Username</label>
                    <input className="bg-gray-50 border border-gray-300 text-md md:text-lg lg:text-2xl rounded-lg block w-full p-2.5" type="text" id="username"/>
                </div>
                <div className='p-6 relative'>
                <label className="block mb-2 text-md md:text-lg lg:text-2xl font-medium text-white dark:text-white" htmlFor="password">Password</label>
                <input className="bg-gray-50 border border-gray-300 text-md md:text-lg lg:text-2xl rounded-lg block w-full p-2.5" type={showPassword ? "text" : "password"} id="password"/>
                    <span
                        className="absolute right-8 top-23 transform -translate-y-1/2 cursor-pointer text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                </div>
                <ButtonLogin/>
            </div>
        </div>
        <UserListPage/>
        <SupplierPage/>
        <SupplierListPage/>
        <BrandPage/>
        <BrandListPage/>
        <CategoryPage/>
        <CategoryListPage/>
        <ProductPage/>
        <ProductListPage/>
    </div>
  )
}
