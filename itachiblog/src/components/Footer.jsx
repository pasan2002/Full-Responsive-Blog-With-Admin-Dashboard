import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-logo_bg to-orange-300 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/3">
                        <h2 className="text-lg font-bold mb-4">About Us</h2>
                        <p className="text-sm">We are dedicated to providing high-quality content and services to our audience.</p>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h2 className="text-lg font-bold mb-4">Quick Links</h2>
                        <ul className="text-sm">
                            <li><a href="#" className="hover:text-gray-400">Home</a></li>
                            <li><a href="/about" className="hover:text-gray-400">About</a></li>
                            <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h2 className="text-lg font-bold mb-4">Connect With Us</h2>
                        <ul className="flex space-x-4">
                            <li><a href="Your Facebook Profile Link" target="_blank" className="text-white hover:text-gray-400"><FaFacebook /></a></li>
                            <li><a href="Your LinkedIn Profile Link" target="_blank" className="text-white hover:text-gray-400"><FaLinkedin /></a></li>
                            <li><a href="Your Instagram Profile Link" target="_blank" className="text-white hover:text-gray-400"><FaInstagram /></a></li>
                            <li><a href="Your Github Profile Link" target="_blank" className="text-white hover:text-gray-400"><FaGithub /></a></li>
                        </ul>
                    </div>
                </div>
                <hr className="my-8 border-gray-700" />
                <p className="text-sm text-center">&copy; {new Date().getFullYear()} ItachiBlog. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
