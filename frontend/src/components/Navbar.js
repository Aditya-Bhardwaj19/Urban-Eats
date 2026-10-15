import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../pages/customer/context/CartContext';
import { UtensilsCrossed, ShoppingCart, Menu, X } from "lucide-react"

function Navbar() {
    const { token, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-2xl text-black px-4 py-3">
            <div className="flex justify-between items-center">

                {/* Logo */}
                <div className='flex items-center'>
                    <UtensilsCrossed size={25} className="text-[#EF6E2F] mr-1" />
                    <Link to="/customer" className='font-medium font-serif text-xl'>
                        Urban <span className='text-[#EF6E2F]'>Eats</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/customer">Home</Link>
                    <Link to="/customer/menu">Menu</Link>

                    {token && <Link to="/customer/orders">Orders</Link>}
                    {/* {token && <Link to="/customer/reservations">Reservations</Link>} */}
                    {token && <Link to="/customer/favorites">Favorites</Link>}

                    {token && (
                        <Link to="/customer/cart">
                            <div className="relative">
                                <ShoppingCart size={24} />
                                <span className="absolute -top-2 -right-2 bg-[#EF6E2F] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartItems.length}
                                </span>
                            </div>
                        </Link>
                    )}

                    {token ? (
                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-4">
                    <Link to="/customer" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/customer/menu" onClick={() => setIsOpen(false)}>Menu</Link>

                    {token && <Link to="/customer/orders" onClick={() => setIsOpen(false)}>Orders</Link>}
                    {/* {token && <Link to="/customer/reservations" onClick={() => setIsOpen(false)}>Reservations</Link>} */}
                    {token && <Link to="/customer/favorites" onClick={() => setIsOpen(false)}>Favorites</Link>}

                    {token && (
                        <Link to="/customer/cart" onClick={() => setIsOpen(false)}>
                            <div className="flex items-center gap-2">
                                <ShoppingCart size={22} />
                                <span className="bg-[#EF6E2F] text-white text-xs px-2 py-1 rounded-full">
                                    {cartItems.length}
                                </span>
                            </div>
                        </Link>
                    )}

                    {token ? (
                        <button
                            onClick={() => {
                                logout();
                                setIsOpen(false);
                            }}
                            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded w-fit"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/" onClick={() => setIsOpen(false)}>Login</Link>
                            <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar;