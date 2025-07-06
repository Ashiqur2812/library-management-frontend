// import BorrowDialog from "@/components/module/BorrowDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useFetchBookByIdQuery } from "@/redux/api/bookApi";
// import { useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { BookOpen, LibraryBig, User, Hash, Copy, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/module/Loader";
// import { useGetBorrowBooksQuery } from "@/redux/api/borrowApi";

export default function BookDetails() {
    const { id } = useParams<{ id: string; }>();
    const navigate = useNavigate();
    // const [borrowOpen, setBorrowOpen] = useState(false);
    // const [page, setPage] = useState(1);
    // const limit = 9;

    const { data, isLoading, isError } = useFetchBookByIdQuery(id!);
    // const { refetch: refetchBorrows } = useGetBorrowBooksQuery(undefined);
    // const { refetch: refetchBooks } = useGetBooksQuery({ page, limit });

    const book = data?.books;
    console.log(book);

    // const handleBorrow = () => {
    //     setBorrowOpen(true);
    // };

    // useEffect(() => {
    //     setPage(1);
    // }, [page]);

    if (isLoading) return <Loader />;
    if (isError || !book)
        return (
            <div className="max-w-7xl mx-auto text-center min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-lime-50 dark:bg-gray-800 rounded-xl p-8 border-2 border-lime-200 dark:border-gray-700"
                >
                    <h2 className="text-2xl font-bold text-lime-800 dark:text-lime-200 mb-4">
                        The book is not found
                    </h2>
                    <p className="text-lime-700 dark:text-lime-300 mb-6">
                        Sorry, the book you looking for is not in the list
                    </p>
                    <Button
                        variant="outline"
                        className="border-lime-500 text-lime-700 hover:bg-lime-100 dark:hover:bg-lime-900 cursor-pointer"
                        onClick={() => navigate("/books")}
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Show All Books
                    </Button>
                </motion.div>
            </div>
        );

    return (
        <>
            <Helmet>
                <title>{book.title}</title>
                <meta name="description" content={book.description} />
            </Helmet>

            <div className="max-w-7xl mx-auto p-4 md:p-6">
                {/* Back button */}
                <Button
                    variant="ghost"
                    className="mb-4 text-lime-700 hover:bg-lime-100 dark:text-lime-300 dark:hover:bg-lime-900/50 cursor-pointer"
                    onClick={() => navigate("/books")}
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    All Books
                </Button>

                {/* Main book card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-lime-50 to-lime-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border-2 border-lime-200 dark:border-lime-800 overflow-hidden"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Book cover section */}
                        <div className="relative">
                            <div className="absolute top-4 right-4 z-10">
                                <Badge className={`text-sm px-3 py-1.5 rounded-full ${book.available ? "bg-green-600" : "bg-rose-600"}`}>
                                    {book.available ? 'available' : 'unavailable'}
                                </Badge>
                            </div>

                            <div className="h-full flex items-center justify-center p-6 md:p-10 bg-gradient-to-br from-lime-200/30 to-lime-100/30 dark:from-gray-700 dark:to-gray-800">
                                <div className="w-full max-w-xs h-auto shadow-2xl rounded-xl overflow-hidden border-4 border-white dark:border-gray-800">
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="w-full h-full object-cover aspect-[2/3]"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://via.placeholder.com/300x450?text=Book+Cover";
                                            e.currentTarget.alt = "Default book cover";
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Book details section */}
                        <div className="p-6 md:p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h1 className="text-3xl md:text-4xl font-bold text-lime-900 dark:text-lime-100 mb-3">
                                    {book.title}
                                </h1>

                                <div className="flex items-center text-lime-800 dark:text-lime-300 mb-6">
                                    <User className="mr-2 h-5 w-5" />
                                    <span className="text-lg font-medium">{book.author}</span>
                                </div>

                                <Separator className="bg-lime-300 dark:bg-lime-700 mb-6" />

                                {/* Book metadata */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-start">
                                        <LibraryBig className="mr-3 h-5 w-5 text-lime-700 dark:text-lime-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-lime-700 dark:text-lime-400">Genre</p>
                                            <p className="font-medium">{book.genre}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Hash className="mr-3 h-5 w-5 text-lime-700 dark:text-lime-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-lime-700 dark:text-lime-400">ISBN</p>
                                            <p className="font-medium">{book.isbn}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Copy className="mr-3 h-5 w-5 text-lime-700 dark:text-lime-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-lime-700 dark:text-lime-400">Copies</p>
                                            <p className="font-medium">{book.copies}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <BookOpen className="mr-3 h-5 w-5 text-lime-700 dark:text-lime-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-lime-700 dark:text-lime-400">Status</p>
                                            <p className={`font-medium ${book.available ? "text-green-600" : "text-rose-600"}`}>
                                                {book.available ? 'available' : 'unavailable'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Book description */}
                                <div className="mb-8">
                                    <h3 className="flex items-center text-xl font-semibold text-lime-900 dark:text-lime-100 mb-3">
                                        <BookOpen className="mr-2 h-5 w-5" />
                                        Description
                                    </h3>
                                    <div className="bg-lime-100/50 dark:bg-gray-700/50 rounded-lg p-4 border border-lime-200 dark:border-lime-800">
                                        <p className="text-lime-800 dark:text-lime-200 leading-relaxed whitespace-pre-line">
                                            {book.description || "No Description।"}
                                        </p>
                                    </div>
                                </div>

                                {/* Borrow button */}
                                {/* <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex justify-center"
                                >
                                    <Button
                                        onClick={handleBorrow}
                                        className={`w-full max-w-xs py-6 text-lg font-bold rounded-xl shadow-lg cursor-pointer ${book.available
                                            ? "bg-gradient-to-r from-lime-600 to-lime-800 hover:from-lime-700 hover:to-lime-900"
                                            : "bg-gray-400 cursor-not-allowed"
                                            }`}
                                        disabled={!book.available}
                                    >
                                        {book.available ? "Borrow Book" : "Unavailable now"}
                                    </Button>
                                </motion.div> */}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Borrow dialog */}
                {/* <BorrowDialog
                    book={book}
                    open={borrowOpen}
                    onOpenChange={setBorrowOpen}
                    onComplete={() => {
                        refetchBorrows();
                        refetch();
                        refetchBooks();
                    }}
                /> */}
            </div>
        </>
    );
}