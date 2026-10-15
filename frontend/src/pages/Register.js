import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, User, UserPlus, } from 'lucide-react';
import Toast from '../components/Toast';
function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password || !role) {
            Toast.error("Please fill all fields");
            return;
        }
        if (password.length < 6) {
            Toast.error("Password must be at least 6 characters");
            return;
        }
        setLoading(true);
        const API_BASE = process.env.REACT_APP_API_URL || 'https://urban-eats-backk.onrender.com/api';
        axios.post(`${API_BASE}/users/register`, { name, email, password, role })
            .then(response => {
                console.log('Registration successful:', response.data);
                Toast.success("Registration successful! Please login.");
                navigate('/');
            })
            .catch(error => {
                console.log("FULL ERROR:", error);
                console.log("BACKEND RESPONSE:", error.response?.data);

                const message =
                    error.response?.data?.error ||
                    error.response?.data?.message ||
                    "Registration failed";

                Toast.error(message);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <div className='bg-[#FAF7F5] min-h-screen flex items-center justify-center p-4'>
            <div className="bg-white rounded-xl shadow-2xl px-10 py-6 transform transition-transform w-full max-w-md">
                <h1 className="  text-2xl font-bold text-center flex items-center justify-center gap-2">Create Account</h1>
                <p className="text-center text-gray-600 text-36">Join Tastebite today</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
                    <label className='font-semibold text-sm'>Full Name</label>
                    <div className="relative w-full">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-[#FAF7F5] w-full border p-2 pl-10 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200 transition"
                        />
                    </div>
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
                    <label className='font-semibold text-sm'>Role</label>

                    <div className="relative w-full">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

                        {/* Selected Box */}
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-[#FAF7F5] w-full border p-2 pl-10 pr-4 rounded-xl border-gray-300 
        focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 
        transition cursor-pointer"
                        >
                            {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Select Role"}
                        </div>

                        {/* Dropdown Options */}
                        {isOpen && (
                            <div className="absolute w-full mt-1 bg-white border rounded-xl shadow-lg z-10">
                                <div
                                    onClick={() => {
                                        setRole("customer");
                                        setIsOpen(false);
                                    }}
                                    className="p-2 hover:bg-orange-100 cursor-pointer rounded-t-xl"
                                >
                                    Customer
                                </div>

                                <div
                                    onClick={() => {
                                        setRole("admin");
                                        setIsOpen(false);
                                    }}
                                    className="p-2 hover:bg-orange-100 cursor-pointer rounded-b-xl"
                                >
                                    Admin
                                </div>
                            </div>
                        )}
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
                    <p className="text-gray-600 text-sm">At least 6 characters</p>
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-1 flex items-center justify-center gap-2 
           bg-[#F97015] 
           p-2 rounded-lg
           hover:bg-[#F97015]/90
           transition"

                    >
                        {loading ? 'Creating account...' : (
                            <>
                                <UserPlus size={20} className="text-black-700" />
                                Create Account
                            </>
                        )}
                    </button>

                    <p className="text-center text-sm text-gray-600">Already have an account? <a href="/" className='text-[#F97015]'>Sign in</a></p>
                </form>
            </div>
        </div>
    )
}

export default Register
