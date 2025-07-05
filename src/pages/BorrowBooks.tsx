import BorrowSkeleton from "@/components/skeleton/BorrowSkeleton";
import { useGetBorrowBooksQuery } from "@/redux/api/borrowApi";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import type { BorrowProps } from "types";

export default function BorrowBooks() {
    const { data: borrows, isError, isLoading } = useGetBorrowBooksQuery(undefined);
    console.log(borrows)

    return (
        <div className="min-h-screen py-10 px-4 sm:px-8 lg:px-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <Helmet>
                <title>Borrow Summary | BookHouse</title>
                <meta name="description" content="View borrowed books summary" />
            </Helmet>

            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8"
            >
                Borrow Summary
            </motion.h1>

            {isLoading && <BorrowSkeleton />}
            {isError && (
                <p className="text-center text-rose-500 font-medium">
                    Failed to load borrow records.
                </p>
            )}

            {!isLoading && !isError && (
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {borrows?.data?.length === 0 ? (
                        <p className="text-center text-gray-500 col-span-full">
                            No borrowed books found.
                        </p>
                    ) : (
                        borrows.data.map((borrow: BorrowProps) => (
                            <motion.li
                                key={borrow._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition-all"
                            >
                                <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-2">
                                    {borrow.book.title}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <span className="font-medium text-gray-500 dark:text-gray-400">ISBN:</span> {borrow.book.isbn}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <span className="font-medium text-gray-500 dark:text-gray-400">Total Borrowed:</span> {borrow.totalQuantity}
                                </p>
                            </motion.li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}
