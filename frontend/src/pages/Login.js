import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      Toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    const API_BASE = process.env.REACT_APP_API_URL || 'https://urban-eats-backk.onrender.com/api';
    axios.post(`${API_BASE}/users/login`, { email, password })
      .then(response => {
        console.log('Login successful:', response.data);

        // Save user + token in Context
        login(response.data);
console.log(response.data.user.role);
        // Redirect based on role
        if (response.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/customer");
        }
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
        const errorMessage = error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : 'Login failed';
        Toast.error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className='bg-[#FAF7F5] min-h-screen flex items-center justify-center p-4'>
      <div className="bg-white rounded-xl shadow-lg px-10 py-8 transform transition-transform w-full max-w-md">
        <h1 className="  text-2xl font-bold text-center flex items-center justify-center gap-2">Welcome Back</h1>
        <p className="text-center text-gray-600 text-36">Sign in to your account</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
          <label className='font-semibold text-sm'>Email</label>
          <div className="relative w-full">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#FAF7F5] w-full border p-2 pl-10 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200 transition"
            />
          </div>
          <label className='font-semibold text-sm'>Password</label>
          <div className="relative w-full">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              placeholder=".........."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#FAF7F5] w-full border p-2 pl-10 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200 transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex items-center justify-center gap-2 
               bg-[#F97015] 
               p-2 rounded-lg 
               hover:bg-[#F97015]/90
               transition"

          >
            {loading ? 'Signing in...' : (
              <>
                <LogIn size={20} className="text-black-700" />
                Sign In
              </>
            )}

          </button>

          <p className="text-center text-sm text-gray-600">Don't have an account? <a href="/register" className='text-[#F97015]'>Sign up</a></p>
        </form>
      </div>
    </div>
  )

}

export default Login
