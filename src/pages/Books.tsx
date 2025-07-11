import BookCard from "@/components/module/BookCard";
import BorrowDialog from "@/components/module/BorrowDialog";
import DeleteBookDialog from "@/components/module/DeleteBookDialog";
import EditBookDialog from "@/components/module/EditBookDialog";
import CardSkeleton from "@/components/skeleton/CardSkeleton";
import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/api/bookApi";
import { useGetBorrowBooksQuery } from "@/redux/api/borrowApi";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router";
import type { IBook } from "types";


interface BookApi {
    books: IBook[],
    meta: {
        total: number,
        page: number,
        limit: number;
    };
}

const Books = () => {
    const [page, setPage] = useState(1);
    const limit = 9;

    const { data: booksData, isLoading, isError, refetch } = useGetBooksQuery({ page, limit }) as {
        data?: BookApi,
        isLoading: boolean,
        isError: boolean,
        refetch: () => void;
    };
    // console.log(booksData);

    const { refetch: refetchBorrows } = useGetBorrowBooksQuery(undefined);
    const [selectBook, setSelectBook] = useState<IBook | null>(null);
    const [borrowOpen, setBorrowOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const location = useLocation();

    const handleDelete = (book: IBook) => {
        setSelectBook(book);
        setDeleteOpen(true);
    };

    const handleBorrow = (book: IBook) => {
        setSelectBook(book);
        setBorrowOpen(true);
    };

    const handleEdit = (book: IBook) => {
        setSelectBook(book);
        setEditOpen(true);
    };


    const total = booksData?.meta?.total || 0;
    const totalPages = Math.ceil(total / limit);

    let slicedBooks;
    if (location.pathname !== '/books') {
        slicedBooks = booksData?.books?.slice(0, 6);
    } else {
        slicedBooks = booksData?.books;
    }

    if (isError)
        return (
            <p className="text-center text-destructive">Failed to load books.</p>
        );


    return (
        <div className='min-h-screen py-10'>
            {location.pathname === '/books' ? (
                <Helmet>
                    <title>All Books</title>
                    <meta name="description" content="Borrow Summary" />
                </Helmet>
            ) : (
                ""
            )}
            <div className="mb-6 flex justify-between ">
                {location.pathname === '/books' ? (
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold min-w-xs mx-auto text-center mb-5">All Books</h1>
                ) : (
                    <h1 className="text-2xl font-bold "></h1>
                )}

                {location.pathname !== '/books' && (
                    <Link
                        to='/books'
                        aria-label=""
                        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 dark:text-deep-purple-300 hover:text-deep-purple-800 dark:hover:text-deep-purple-500 mr-0 lg:mr-24"
                    >
                        All Books
                        <svg
                            className="inline-block w-3 ml-2"
                            fill="currentColor"
                            viewBox="0 0 12 12"
                        >
                            <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                        </svg>
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-y-16 lg:mx-20">
                {isLoading
                    ? Array.from({ length: 9 }).map((_, i) => <CardSkeleton key={i} />)
                    : slicedBooks?.map((book) => (
                        <BookCard
                            key={book._id}
                            book={book}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onBorrow={handleBorrow}
                        />
                    ))}
            </div>

            {/* Pagination */}
            {location.pathname === '/books' && totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <Button
                            key={p}
                            variant={p === page ? "default" : "outline"}
                            onClick={() => setPage(p)}
                        >
                            {p}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}

            {/* Dialogs */}
            <BorrowDialog
                book={selectBook}
                open={borrowOpen}
                onOpenChange={setBorrowOpen}
                onComplete={() => {
                    setSelectBook(null);
                    refetchBorrows();
                    refetch();
                }}
            />
            <EditBookDialog
                book={selectBook}
                open={editOpen}
                onOpenChange={setEditOpen}
                onSuccess={() => {
                    setSelectBook(null);
                    refetch();
                }}
            />
            <DeleteBookDialog
                book={selectBook}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                onSuccess={() => {
                    setSelectBook(null);
                    refetch();
                    refetchBorrows();
                }}
            />
        </div>
    );
};

export default Books;