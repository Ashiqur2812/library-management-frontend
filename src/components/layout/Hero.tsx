import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import image from '../../assets/Book lover-bro.svg';

const Hero = () => {
    return (
        <div className="relative overflow-hidden py-16 mx-auto w-11/12 px-4">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
                <motion.div
                    className="flex flex-col justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="max-w-xl mb-8 relative">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-block mb-6"
                        >                
                                <span className="px-4 py-1 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-sky-600 rounded-full shadow-lg inline-block animate-pulse">
                                    📚 Explore New Horizons
                                </span> 
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.7 }}
                            className="max-w-lg mb-6 font-bold tracking-tight text-gray-900 dark:text-white text-4xl sm:text-5xl md:text-6xl leading-tight"
                        >
                            Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-sky-600">Library Experience</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-lg md:text-xl text-gray-700 dark:text-gray-300  mb-8"
                        >
                            Discover the future of library management with our intuitive platform.
                            Effortlessly organize, track, and manage your entire collection while
                            providing an exceptional experience for your readers.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            
                            <Link
                                to="/books"
                                className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white rounded-full group shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-600 to-sky-600 group-hover:from-teal-700 group-hover:to-sky-700 transition-all"></span>
                                <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white/20 to-transparent opacity-10 h-1/3"></span>
                                <span className="relative flex items-center">
                                    Explore Books
                                    <svg
                                        className="ml-2 w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 12 12"
                                    >
                                        <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                                    </svg>
                                </span>
                            </Link>
                            <Link
                                to="/borrow-book"
                                className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold rounded-full group shadow-lg border-2 border-sky-600 text-sky-600 dark:text-sky-300 dark:border-sky-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all duration-300"
                            >
                                <span className="relative flex items-center">
                                    View Borrows
                                    <svg
                                        className="ml-2 w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 12 12"
                                    >
                                        <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                                    </svg>
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4"
                    >
                        {[
                            { label: "Books", value: "10K+" },
                            { label: "Users", value: "5K+" },
                            { label: "Borrows", value: "25K+" },
                            { label: "Libraries", value: "500+" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-sky-600">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-sky-600/30 z-10"></div>
                        <div className="relative w-full h-full md:h-[550px]">
                            <img src={image} alt="" />
                        </div>
                    </div>
                </motion.div>
            </div>
            {/* Animated floating elements */}
            <motion.div
                className="absolute top-1/4 right-1/3 w-8 h-8 rounded-full bg-purple-500/30 blur-md"
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            ></motion.div>
            <motion.div
                className="absolute bottom-1/3 left-1/4 w-6 h-6 rounded-full bg-sky-500/30 blur-md"
                animate={{
                    y: [0, -15, 0],
                    x: [0, -10, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                }}
            ></motion.div>
        </div>
    );
}; 

export default Hero;