import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo.png';
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "All Books", path: "/books" },
        { name: "Add Book", path: "/add-book" },
        { name: "Borrow Summary", path: "/borrow-book" },
    ];

    return (
        <header className="sticky top-0 left-0 z-50 w-full backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 lg:py-5">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="w-16 h-auto"
                    >
                        <img src={logo} alt="" />
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-8 text-lg font-medium text-gray-500">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-teal-600"
                                        : "hover:text-teal-600 transition"
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>
                    <ModeToggle />

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-800 hover:text-teal-600 focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d={
                                        isOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Mobile Dropdown */}
                {isOpen && (
                    <div className="md:hidden mt-2 space-y-2 pb-4">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-md text-gray-700 hover:bg-teal-100 ${isActive ? "text-teal-600 font-semibold" : ""
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
