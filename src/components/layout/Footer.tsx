import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaPinterestP } from 'react-icons/fa';
import { IoBookSharp, IoLocationSharp, IoCallSharp, IoMailSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';
import bookImage from '../../assets/book.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-20 pb-10">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/5 to-transparent"></div>
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>

            {/* Floating books */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute hidden lg:block"
                    style={{
                        top: `${10 + i * 15}%`,
                        left: `${5 + i * 15}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                    }}
                >
                    <div className={`w-8 h-10 rounded-md ${i % 3 === 0 ? 'bg-yellow-400/90' :
                        i % 3 === 1 ? 'bg-red-500/90' : 'bg-blue-500/90'
                        } shadow-lg rotate-12`}></div>
                </motion.div>
            ))}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                    {/* Logo and description */}
                    <div>
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-purple-600 to-sky-600 w-12 h-12 rounded-lg flex items-center justify-center">
                                <IoBookSharp className="text-white text-2xl" />
                            </div>
                            <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-sky-400">
                                BOOKHOUSE
                            </span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Your premier destination for literary treasures. We connect readers with stories that inspire, educate, and entertain.
                        </p>
                        <div className="flex space-x-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaPinterestP].map((Icon, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-600 transition-colors"
                                    whileHover={{ y: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Icon className="text-gray-300 hover:text-white" />
                                </motion.a>
                            ))}
                        </div>
                        <div className='w-20 mt-8'>
                            <img src={bookImage} alt="" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 relative inline-block">
                            Quick Links
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-sky-500"></span>
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { text: "All Books", link: "/books" },
                                { text: "New Arrivals", link: "/new" },
                                { text: "Best Sellers", link: "/bestsellers" },
                                { text: "Featured Authors", link: "/authors" },
                                { text: "Borrow Summary", link: "/borrow-book" },
                                { text: "Book Categories", link: "/categories" },
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    whileHover={{ x: 5 }}
                                >
                                    <a
                                        href={item.link}
                                        className="text-gray-400 hover:text-sky-400 transition-colors flex items-center"
                                    >
                                        <span className="w-2 h-2 bg-sky-500 rounded-full mr-3"></span>
                                        {item.text}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 relative inline-block">
                            Contact Us
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-sky-500"></span>
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <IoLocationSharp className="text-sky-400 text-xl mt-1 mr-4" />
                                <span className="text-gray-400">
                                    123 Library Lane, Bookville<br />
                                    Literary District, BK 12345
                                </span>
                            </li>
                            <li className="flex items-center">
                                <IoCallSharp className="text-sky-400 text-xl mr-4" />
                                <span className="text-gray-400">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <IoMailSharp className="text-sky-400 text-xl mr-4" />
                                <span className="text-gray-400">info@bookhouse.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 relative inline-block">
                            Newsletter
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-sky-500"></span>
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Subscribe to our newsletter for the latest updates, book releases, and exclusive offers.
                        </p>
                        <form className="space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-sky-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {["Fiction", "Non-Fiction", "Science", "History", "Biography", "Fantasy"].map((tag, index) => (
                                <motion.span
                                    key={index}
                                    className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full"
                                    whileHover={{
                                        scale: 1.1,
                                        backgroundColor: "rgba(99, 102, 241, 0.2)"
                                    }}
                                >
                                    #{tag}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-10"></div>

                {/* Bottom footer */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-500 text-sm mb-4 md:mb-0">
                        © {currentYear} BOOKHOUSE. All rights reserved.
                    </div>

                    <div className="flex space-x-6">
                        {["Privacy Policy", "Terms of Service", "Cookies"].map((item, index) => (
                            <a
                                key={index}
                                href="#"
                                className="text-gray-500 hover:text-sky-400 transition-colors text-sm"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="mt-4 md:mt-0 flex items-center">
                        <span className="text-gray-500 text-sm mr-2">Secure payment:</span>
                        <div className="flex space-x-2">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-800 w-8 h-8 rounded-md flex items-center justify-center"
                                >
                                    <div className="bg-gray-700 border border-gray-600 rounded w-6 h-4"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating decoration */}
            <motion.div
                className="absolute bottom-10 right-10 w-12 h-16 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-md shadow-lg rotate-12"
                animate={{
                    y: [0, -15, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-md"></div>
            </motion.div>
        </footer>
    );
};

export default Footer;