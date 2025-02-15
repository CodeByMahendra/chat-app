import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';


const Login = ({url}) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${url}/api/v1/user/login`; 
        console.log(apiUrl)
      const res = await axios.post(apiUrl, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log("response ",res)
  
      if (res && res.data) {
        dispatch(setAuthUser(res.data)); 
        navigate("/chat");
        console.log("Login successful:", res.data);
      } else {
        console.error("Unexpected API response:", res);
        toast.error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
  
      // ✅ Ensure error.response exists before accessing error.response.data
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("Server is not responding. Please try again later.");
      }
    }
  
    // ✅ Reset user state only if the request was successful
    setUser({
      username: "",
      password: ""
    });
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center"> {/* Gradient background */}
    <div className="max-w-md w-full mx-auto p-4 sm:p-6 bg-white bg-opacity-90 rounded-lg shadow-xl"> {/* White background with opacity */}
      <div className="w-full">
        <div className="p-6 sm:p-8 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-black bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">Login</h1> {/* Gradient text */}
          
          <form onSubmit={onSubmitHandler} className="mt-6">
            <div>
              <label className="label p-2">
                <span className="block text-gray-700 text-md font-bold mb-2">Username</span>
              </label>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full h-12 px-4 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-300 ease-in-out"
                type="text"
                placeholder="Enter your username"
              />
            </div>
  
            <div className="mt-4">
              <label className="label p-2">
                <span className="block text-gray-700 text-md font-bold mb-2">Password</span>
              </label>
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full h-12 px-4 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-300 ease-in-out"
                type="password"
                placeholder="Enter your password"
              />
            </div>
  
            <p className="text-center my-4 text-black">Don't have an account? <Link to="/signup" className="text-red-700 underline">Sign up</Link></p> {/* Text and link styling */}
  
            <div>
              <button
                type="submit"
                className="w-full h-12 mt-4 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  

    )
    }

export default Login