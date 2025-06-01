import React, { useState } from 'react';
import profilelogin from "/public/image/welcome-login.jpg";
import ButtonBack from '../components/button_back';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Login } from '/service/login';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ButtonLoginCart from '../components/button_login_cart';

export default function LoginCartPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const userData = {
                email,
                password
            };

            const response = await Login(userData);

            const isUser = response.user.roles.some(role => role.name === "USER");
            
            if (!isUser) {
                throw new Error("Access denied. User privileges required.");
            }
            
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('userData', JSON.stringify(response.user));
            localStorage.setItem('isUser', 'true');
            
            await Swal.fire({
                title: 'Login Successful!',
                text: `Welcome back, User ${response.user.username}!`,
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });

            navigate('/user-dashboard');

        } catch (error) {
            await Swal.fire({
                title: 'Login Failed',
                text: error.message || 'Invalid email or password',
                icon: 'error',
                confirmButtonColor: '#3085d6',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="hidden md:block">
                    <img 
                        className="h-96 object-cover" 
                        src={profilelogin} 
                        alt="welcome-login" 
                    />
                </div>
                
                <div className="bg-blue-800 p-8 w-full md:w-96">
                    <ButtonBack />
                    <h1 className="text-center text-4xl font-bold text-white py-6">USER LOGIN</h1>
                    
                    <div className="space-y-6">
                        <div>
                            <label 
                                className="block mb-2 text-lg font-medium text-white" 
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input 
                                className="bg-gray-50 border border-gray-300 text-lg rounded-lg block w-full p-3" 
                                type="email" 
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <div className="relative">
                            <label 
                                className="block mb-2 text-lg font-medium text-white" 
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input 
                                className="bg-gray-50 border border-gray-300 text-lg rounded-lg block w-full p-3 pr-10" 
                                type={showPassword ? "text" : "password"} 
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="absolute right-3 top-[52px] cursor-pointer text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </span>
                        </div>
                        
                        <ButtonLoginCart onClick={handleLogin} loading={loading} />
                    </div>
                </div>
            </div>
        </div>
    );
}