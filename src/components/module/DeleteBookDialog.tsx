import { useDeleteBookMutation } from "@/redux/api/bookApi";
import toast from "react-hot-toast";
import type { IBook } from "types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    book: IBook | null;
    onSuccess: () => void;
}

export default function DeleteBookDialog({
    open,
    onOpenChange,
    book,
    onSuccess
}: Props) {
    const [deleteBook, { isLoading }] = useDeleteBookMutation();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (!open) {
            // Reset states when dialog closes
            setIsDeleting(false);
            setShowSuccess(false);
        }
    }, [open]);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    const handleDelete = async () => {
        if (!book) return;

        setIsDeleting(true);

        try {
            await deleteBook(book._id).unwrap();

            // Show success state
            setShowSuccess(true);

            // Close after delay
            setTimeout(() => {
                onOpenChange(false);
                onSuccess();
                toast.success('Book deleted successfully');
            }, 1500);
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete book');
            setIsDeleting(false);
        }
    };

    const handleClose = () => {
        if (!isDeleting) {
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden">
                <div className="relative">
                    {/* Header with gradient background */}
                    <div className="bg-gradient-to-r from-rose-600 to-red-600 p-6">
                        <DialogHeader className="text-left">
                            <DialogTitle className="text-2xl font-bold text-white flex items-center">
                                <Trash2 className="mr-2 h-6 w-6" />
                                Confirm Deletion
                            </DialogTitle>
                        </DialogHeader>

                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white"
                            disabled={isDeleting}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="p-6">
                        {showSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-8"
                            >
                                <div className="bg-green-100 rounded-full p-4 mb-6">
                                    <div className="bg-emerald-600 rounded-full p-2">
                                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-center mb-2 text-emerald-600">
                                    Successfully Deleted!
                                </h3>
                                <p className="text-center text-gray-600 mb-6">
                                    The book <span className="font-semibold">"{book?.title}"</span> has been removed from the library.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="bg-rose-100 dark:bg-rose-900/30 rounded-full p-4 mb-4">
                                        <Trash2 className="h-12 w-12 text-rose-600 dark:text-rose-400" />
                                    </div>

                                    <h3 className="text-xl font-bold text-center mb-2">
                                        Delete <span className="text-rose-600">{book?.title}</span>?
                                    </h3>

                                    <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                                        This action cannot be undone. Are you sure you want to permanently remove this book from the library?
                                    </p>

                                    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 w-full">
                                        <div className="flex items-center space-x-4">
                                            {book?.image && (
                                                <img
                                                    src={book.image}
                                                    alt={book.title}
                                                    className="w-16 h-20 object-cover rounded"
                                                />
                                            )}
                                            <div>
                                                <p className="font-medium">{book?.title}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">by {book?.author}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {book?.copies} {book?.copies === 1 ? 'copy' : 'copies'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center gap-4 pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={handleClose}
                                        disabled={isDeleting}
                                        className="px-6 py-2 cursor-pointer"
                                    >
                                        Cancel
                                    </Button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                        className={`
                        px-6 py-2 rounded-lg font-medium text-white flex items-center cursor-pointer
                        ${isDeleting
                                                ? 'bg-rose-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 shadow-lg'}
                    `}
                                    >
                                        {isDeleting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Deleting...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 className="mr-2 h-5 w-5" />
                                                Delete Permanently
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}