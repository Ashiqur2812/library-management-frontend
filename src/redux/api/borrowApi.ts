import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
    reducerPath: '/borrowApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://library-management-mvt99stxb-muhammad-ashiqur-rahmans-projects.vercel.app'
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

