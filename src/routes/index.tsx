import App from "@/App";
import AddBook from "@/pages/AddBook";
import BookDetails from "@/pages/BookDetails";
import Books from "@/pages/Books";
import BorrowBooks from "@/pages/BorrowBooks";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/books',
                Component: Books
            },
            {
                path: '/add-book',
                Component: AddBook
            },
            {
                path: '/borrow-book',
                Component: BorrowBooks
            },
            {
                path: '/books/:id',
                Component: BookDetails
            }
        ]
    }
]);

export default router;