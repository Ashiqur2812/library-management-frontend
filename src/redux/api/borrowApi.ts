import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
    reducerPath: '/borrowApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api'
    }),
    endpoints: (build) => ({
        getBorrowBooks: build.query({
            query: () => '/borrow'
        })
    })
});

export const { useGetBorrowBooksQuery } = borrowApi;

