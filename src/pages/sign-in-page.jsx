
import React, { useState } from 'react';
import Menu from '../components/menu';
import Footer from '../components/footer';
import ButtonSignin from '../components/button_signin';
import { InsertUser } from '/service/user';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import VerifyModal from '../components/verify_modal';
import { BASE_URL } from "/service/api";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [linkAddress, setLinkAddress] = useState("");
  const [status, setStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [insertedUser, setInsertedUser] = useState(null);
  
  const handleSignin = async () => {
    setLoading(true);
    const userData = {
      username,
      phoneNumber,
      email,
      password,
      confirmPassword,
      address: {
        addressLine1: "",
        addressLine2: "",
        road: "",
        linkAddress,
      },
      profile: null,
    };


    try {
        const result = await InsertUser(userData);
    
        const user = result?.user;
    
        if (user?.emailVerified) {
          localStorage.setItem("userVerified", "true");
          localStorage.setItem("userUuid", user.uuid);
          localStorage.setItem("userData", JSON.stringify(user));
    
          setStatus("success");
          setTimeout(() => navigate("/home"), 1500);
        } else {
          setInsertedUser(user);
          setShowVerifyModal(true);
        }
      } catch (error) {
        setStatus("error");
        console.error("Sign-in error:", error);
      } finally {
        setLoading(false);
      }
    };

    
    const handleVerify = async (token) => {
        try {
          const response = await fetch(`${BASE_URL}/api/v1/users/verify-email?token=${token}`,{
            method: 'post'
          });
          
          if (!response.ok) {
            // Get more detailed error message from backend
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Verification failed");
          }
      
          const data = await response.json();
          
          if (!data?.user?.emailVerified) {
            throw new Error("Email verification not completed");
          }
      
          // Store user data
          localStorage.setItem("userVerified", "true");
          localStorage.setItem("userUuid", data.user.uuid);
          localStorage.setItem("userData", JSON.stringify(data.user));
      
          setStatus("success");
          setShowVerifyModal(false);
      
          setTimeout(() => navigate("/"), 1500);
        } catch (error) {
          setStatus("error");
          console.error("Verification error:", error.message);
          // Show user-friendly error message
          alert(`Verification failed: ${error.message}`);
        }
      };
      
  return (
    <div>
      <Menu />
      <section className='mt-30 p-4 md:p-8 lg:p-12'>
        <h1 className='p-4 text-title font-bold text-center text-2xl lg:text-4xl'>INFORMATION SHIPPING</h1>

        <div className='p-2 md:p-4'>
          <label className="block mb-2 text-md md:text-lg lg:text-2xl font-medium text-gray-900 dark:text-white" htmlFor="username">Username</label>
          <input className="bg-gray-50 border border-gray-300 text-md md:text-lg lg:text-2xl rounded-lg block w-full p-2.5" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className='p-2 md:p-4'>
          <label className="block mb-2 text-md md:text-lg lg:text-2xl font-medium text-gray-900 dark:text-white" htmlFor="telephone">Telephone</label>
          <input className="bg-gray-50 border border-gray-300 text-md md:text-lg lg:text-2xl rounded-lg block w-full p-2.5" type="text" id="telephone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>

        <div className='p-2 md:p-4'>
          <label className="block mb-2 text-md md:text-lg lg:text-2xl font-medium text-gray-900 dark:text-white" htmlFor="email">Email</label>
          <input className="bg-gray-50 border border-gray-300 text-md md:text-lg lg:text-2xl rounded-lg block w-full p-2.5" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className='p-2 md:p-4 relative'>
          <label className="block mb-2 text-md md:text-lg lg:text-2xl font-medium text-gray-900 dark:text-white" htmlFor="password">Password</label>
          <input className="bg-gray-50 border border-gray-300 text-md md:text-lg lg:text-2xl rounded-lg block w-full p-2.5" type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <span
                className="absolute right-8 top-21 transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
        </div>

        <div className='p-2 md:p-4 relative'>
          <label className="block mb-2 text-md md:text-lg lg:text-2xl font-medium text-gray-900 dark:text-white" htmlFor="confirm">Confirm Password</label>
          <input className="bg-gray-50 border border-gray-300 text-md md:text-lg lg:text-2xl rounded-lg block w-full p-2.5" type={showConfirmPassword ? "text" : "password"} id="confirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <span
                className="absolute right-8 top-21 transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </span>
        </div>

        <div className='p-2 md:p-4'>
          <label className="block mb-2 text-md md:text-lg lg:text-2xl font-medium text-gray-900 dark:text-white" htmlFor="location">Link Address</label>
          <input className="bg-gray-50 border border-gray-300 text-md md:text-lg lg:text-2xl rounded-lg block w-full p-2.5" type="text" id="location" value={linkAddress} onChange={(e) => setLinkAddress(e.target.value)} />
        </div>

        <ButtonSignin onSignin={handleSignin} loading={loading}/>

        {status === "success" && (
          <div className="bg-green-500 text-white text-center p-4 mt-4 rounded">Sign in successful! Redirecting...</div>
        )}
        {status === "error" && (
          <div className="bg-red-500 text-white text-center p-4 mt-4 rounded">Sign in failed. Please try again.</div>
        )}

        <VerifyModal
          visible={showVerifyModal}
          onClose={() => setShowVerifyModal(false)}
          onVerify={handleVerify}
        />
      </section>
      <Footer />
    </div>
  );
}

