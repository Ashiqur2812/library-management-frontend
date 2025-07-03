import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook } from '../../../types';

export const bookApi = createApi({
    reducerPath: '/bookApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api'
    }),
    endpoints: (build) => ({
        getBooks: build.query<IBook, string>({
            query: () => '/books'
        })
    })
});

export const { useGetBooksQuery } = bookApi;