import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
    reducerPath: '/borrowApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api'
    }),
    tagTypes: ['Borrows', 'Books'],
    endpoints: (build) => ({
        getBorrowBooks: build.query({
            query: () => '/borrow',
            providesTags: ['Borrows', 'Books']
        }),
        createBorrow: build.mutation({
            query: (borrowData) => ({
                url: '/borrow',
                method: 'POST',
                body: borrowData
            }),
            invalidatesTags: ['Borrows', 'Books']
        })
    })
});

export const { useGetBorrowBooksQuery,useCreateBorrowMutation } = borrowApi;

