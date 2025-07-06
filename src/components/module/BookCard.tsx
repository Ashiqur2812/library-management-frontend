import type { IBook } from "types";
import { Button } from "../ui/button";
import { Pencil, Trash2, BookOpen, Bookmark } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router";

interface BookProps {
    book: IBook,
    onEdit: (book: IBook) => void,
    onDelete: (book: IBook) => void,
    onBorrow: (book: IBook) => void;
}

function BookCard({
    book,
    onEdit,
    onDelete,
    onBorrow
}: BookProps) {

    console.log(book);
    return (
        <motion.div
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.98 }}
            className=" lg:w-11/12 lg:mx-auto"
        >
            <Card className="rounded-2xl border-0 shadow-xl overflow-hidden h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <CardContent className="p-0 h-full flex flex-col">
                    {/* Book Cover with Glossy Effect */}
                    <div className="relative overflow-hidden ">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
                        <div className="absolute top-4 left-4 z-10">
                            <div className={`px-2 py-1 rounded-full text-xs font-bold ${book.available ? "bg-emerald-500/90 text-white" : "bg-rose-500/90 text-white"}`}>
                                {book.available ? "Available" : "Unavailable"}
                            </div>
                        </div>
                        <img
                            src={book?.image}
                            alt={book?.title}
                            className="w-full h-96 object-cover"
                        />
                    </div>

                    {/* Book Details */}
                    <div className="p-5 flex-grow flex flex-col ">
                        <div className="mb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                                        {book.title}
                                    </h2>
                                </div>
                                <Bookmark className="text-gray-400 hover:text-amber-500 cursor-pointer" />
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                by <span className="font-medium text-primary">{book.author}</span>
                            </p>
                        </div>

                        {/* Book Metadata */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="flex items-center">
                                <BookOpen className="w-4 h-4 text-sky-500 mr-2" />
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                    Genre: <span className="font-bold">{book.genre}</span>
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                    ISBN: <span className="font-mono font-bold">{book.isbn}</span>
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                    Copies: <span className="font-bold">{book.copies}</span>
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                    Published: <span className="font-bold">2023</span>
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <Button
                                    onClick={() => onBorrow(book)}
                                    className="cursor-pointer bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-700 hover:to-purple-700 text-white shadow-lg shadow-sky-500/20 dark:shadow-sky-700/30 mr-2"
                                >
                                    Borrow Book
                                </Button>

                                <div className="flex flex-col md:flex-row gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => onEdit(book)}
                                        className="border-sky-500 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 cursor-pointer"
                                    >
                                        <Pencil className="w-4 h-4 mr-1" />
                                    </Button>
                                    <Link to={`/books/${book._id}`}>
                                        <Button className="cursor-pointer" variant="outline">
                                            {/* <ListCollapse className="w-4 h-4 mr-1  " /> */}
                                            Details
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 cursor-pointer"
                                        onClick={() => onDelete(book)}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default BookCard;