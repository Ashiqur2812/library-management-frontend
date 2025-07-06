import { motion } from "framer-motion";
import { FaBook, FaSave, FaArrowLeft } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { createBooksSchema, type CreateBooksInput } from "@/schema/book.schema";
import { useNavigate } from "react-router";
import { useCreateBooksMutation } from "@/redux/api/bookApi";
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";


const AddBook = () => {
    const navigate = useNavigate();
    const [createBook, { isLoading }] = useCreateBooksMutation();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<CreateBooksInput>({
        resolver: zodResolver(createBooksSchema),
        defaultValues: {
            available: true,
            copies: 1
        }
    });

    const imageUrl = watch("image");

    const onSubmit = async (data: CreateBooksInput) => {
        try {
            await createBook(data).unwrap();
            toast.success("Book created successfully!");
            navigate("/books");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create book");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Add New Book | BookHouse</title>
                <meta name="description" content="Add a new book to the library collection" />
            </Helmet>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-teal-500 to-sky-600 mb-6 shadow-lg">
                        <FaBook className="text-white text-3xl" />
                    </div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Add New Book to Library
                    </h1>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                    <div className="relative bg-gradient-to-r from-teal-600 to-sky-700 p-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg md:text-2xl font-bold text-white">Book Information</h2>
                            <button
                                onClick={() => navigate(-1)}
                                className="text-white/80 hover:text-white transition-colors flex items-center cursor-pointer"
                            >
                                <FaArrowLeft className="mr-2" />
                                Back
                            </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Title Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Book Title *
                                </label>
                                <div className="relative">
                                    <input
                                        {...register("title")}
                                        type="text"
                                        className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${errors.title ? "border-rose-500" : "border-gray-300 dark:border-gray-600"
                                            } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all`}
                                        placeholder="Enter book title"
                                    />
                                    <div className="absolute right-3 top-3 text-gray-400">
                                        <FaBook />
                                    </div>
                                </div>
                                {errors.title && (
                                    <p className="text-rose-500 text-sm mt-1">{errors.title.message}</p>
                                )}
                            </div>
                            {/* Author Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Author *
                                </label>
                                <input
                                    {...register("author")}
                                    type="text"
                                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${errors.author ? "border-rose-500" : "border-gray-300 dark:border-gray-600"
                                        } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all`}
                                    placeholder="Enter author name"
                                />
                                {errors.author && (
                                    <p className="text-rose-500 text-sm mt-1">{errors.author.message}</p>
                                )}
                            </div>
                            {/* Image Field with Preview */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Cover Image URL *
                                </label>
                                <input
                                    {...register("image")}
                                    type="url"
                                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${errors.image ? "border-rose-500" : "border-gray-300 dark:border-gray-600"
                                        } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all`}
                                    placeholder="https://example.com/book-cover.jpg"
                                    onChange={(e) => setPreviewImage(e.target.value)}
                                />
                                {errors.image && (
                                    <p className="text-rose-500 text-sm mt-1">{errors.image.message}</p>
                                )}
                                {(imageUrl || previewImage) && (
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden w-32 h-40">
                                            <img
                                                src={imageUrl || previewImage || ""}
                                                alt="Book cover preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = "https://via.placeholder.com/150?text=Invalid+URL";
                                                    e.currentTarget.alt = "Invalid image URL";
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Genre Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Genre *
                                </label>
                                <select
                                    {...register("genre")}
                                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${errors.genre ? "border-rose-500" : "border-gray-300 dark:border-gray-600"
                                        } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none appearance-none transition-all`}
                                >
                                    <option value="">Select a genre</option>
                                    <option value="FICTION">Fiction</option>
                                    <option value="NON_FICTION">Non-Fiction</option>
                                    <option value="SCIENCE">Science</option>
                                    <option value="HISTORY">History</option>
                                    <option value="BIOGRAPHY">Biography</option>
                                    <option value="FANTASY">Fantasy</option>
                                </select>
                                {errors.genre && (
                                    <p className="text-rose-500 text-sm mt-1">{errors.genre.message}</p>
                                )}
                            </div>
                            {/* ISBN Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    ISBN *
                                </label>
                                <input
                                    {...register("isbn")}
                                    type="text"
                                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${errors.isbn ? "border-rose-500" : "border-gray-300 dark:border-gray-600"
                                        } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all`}
                                    placeholder="Enter ISBN number"
                                />
                                {errors.isbn && (
                                    <p className="text-rose-500 text-sm mt-1">{errors.isbn.message}</p>
                                )}
                            </div>
                            {/* Copies Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Available Copies *
                                </label>
                                <input
                                    {...register("copies", { valueAsNumber: true })}
                                    type="number"
                                    min="1"
                                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border ${errors.copies ? "border-rose-500" : "border-gray-300 dark:border-gray-600"
                                        } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all`}
                                    placeholder="Enter number of copies"
                                />
                                {errors.copies && (
                                    <p className="text-rose-500 text-sm mt-1">{errors.copies.message}</p>
                                )}
                            </div>
                        </div>
                        {/* Description Field */}
                        <div className="mb-8">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    rows={5}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Enter book description (optional)"
                                ></textarea>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-700 w-full">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className={`flex cursor-pointer items-center justify-center px-6 py-3 w-full sm:w-auto rounded-lg font-medium transition-all ${isLoading
                                        ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-teal-600 to-sky-700 text-white hover:opacity-90 shadow-lg'
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adding Book...
                                    </>
                                ) : (
                                    <>
                                        <FaSave className="mr-2" />
                                        Add to Library
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AddBook;