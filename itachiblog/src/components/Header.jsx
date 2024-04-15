import React, { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full">
            <header className="flex justify-center items-center h-24 bg-gradient-to-r from-logo_bg to-orange-300 py-4 w-full">
            <img
                src="icon.png"
                alt="Itachi Blog Logo"
                className="w-20 h-20 rounded-full object-cover shadow-md mx-4"
            />
                <h1 className="text-3xl font-bold tracking-wide text-white">Itachi Blog</h1>
                <button onClick={toggleMenu} className="md:hidden mx-3">
                    <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
                        />
                    </svg>
                </button>
            </header>
            <nav className="bg-navbar_color md:block hidden">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <ul className="flex flex-row font-medium mt-0 space-x-4 md:space-x-8 text-sm">
                        <li>
                            <a href="/" className="hover:underline" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="/english" className="hover:underline">English Movies</a>
                        </li>
                        <li>
                            <a href="/indian" className="hover:underline">Indian Movies</a>
                        </li>
                        <li>
                            <a href="/anime" className="hover:underline">Anime</a>
                        </li>
                        <li>
                            <a href="/about" className="hover:underline">About</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:underline">Contact</a>
                        </li>
                        <li>
                            <a href="/adminlogin" className="hover:underline">Admin</a>
                        </li>
                    </ul>
                </div>
            </nav>
            {isOpen && (
                <div className="md:hidden">
                    <ul className="bg-navbar_color">
                        <li>
                            <a href="/" className="block py-2 px-4 hover:bg-gray-200">Home</a>
                        </li>
                        <li>
                            <a href="/english" className="block py-2 px-4 hover:bg-gray-200">English Movies</a>
                        </li>
                        <li>
                            <a href="/indian" className="block py-2 px-4 hover:bg-gray-200">Indian Movies</a>
                        </li>
                        <li>
                            <a href="/anime" className="block py-2 px-4 hover:bg-gray-200">Anime</a>
                        </li>
                        <li>
                            <a href="/about" className="block py-2 px-4 hover:bg-gray-200">About</a>
                        </li>
                        <li>
                            <a href="/contact" className="block py-2 px-4 hover:bg-gray-200">Contact</a>
                        </li>
                        <li>
                            <a href="/adminlogin" className="block py-2 px-4 hover:bg-gray-200">Admin</a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
