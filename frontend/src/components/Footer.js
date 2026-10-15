import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, UtensilsCrossed, Phone, Mail , MapPin } from "lucide-react";

function Footer() {
    return (
        <footer className=" pt-12 pb-6 border-t border-gray-300 "> 

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold font-serif mb-4">
                        <UtensilsCrossed size={25} className="text-[#EF6E2F] mr-1 inline" />
                        Urban<span className="text-[#EF6E2F]">Eats</span>
                    </h2>
                    <p className="text-xs text-gray-500 text-sm">
                        Delivering extraordinary culinary experiences to your doorstep since 2024.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-xs text-gray-500">
                        <li><Link to="/customer" className="hover:text-[#EF6E2F]">Home</Link></li>
                        <li><Link to="/customer/menu" className="hover:text-[#EF6E2F]">Menu</Link></li>
                        <li><Link to="/customer/orders" className="hover:text-[#EF6E2F]">Orders</Link></li>
                        <li><Link to="/customer/reservations" className="hover:text-[#EF6E2F]">Reservations</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold mb-4">Contact</h3>
                    <p className="flex items-center text-xs text-gray-500"><MapPin size={16} className="mr-2" /> 123 Food Street</p>
                    <p className="flex items-center text-xs text-gray-500"><Phone size={16} className="mr-2" /> +63 8664 4915</p>
                    <p className="flex items-center text-xs text-gray-500"><Mail  size={16} className="mr-2" /> support@foodhub.com</p>
                </div>

                {/* Social */}
                <div>
                    <h3 className="font-semibold mb-4">Follow Us</h3>

                    <div className="flex gap-4 text-gray-500">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#EF6E2F]">
                            <Facebook size={20} />
                        </a>

                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#EF6E2F]">
                            <Instagram size={20} />
                        </a>

                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#EF6E2F]">
                            <Twitter size={20} />
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-gray-300 mt-10 pt-6 text-center text-xs">
                <p className="text-gray-500 text-xs">© 2026 UrbanEats. All Rights Reserved.</p>
            </div>

        </footer>
    );
}

export default Footer;
