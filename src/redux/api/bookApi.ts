import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook } from '../../../types';
import type { CreateBooksInput } from "@/schema/book.schema";

interface GetBooksParameter {
    page?: number;
    limit?: number;
}

interface GetBooksResponse {
    books: IBook[];
    total: number;
    page: number;
    limit: number;
}

export const bookApi = createApi({
    reducerPath: '/bookApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://library-management-mvt99stxb-muhammad-ashiqur-rahmans-projects.vercel.app/api/'
    }),
    tagTypes: ['books', 'borrows'],
    endpoints: (build) => ({
        getBooks: build.query<GetBooksResponse, GetBooksParameter | void>({
            query: ({ page = 1, limit = 6 } = {}) =>
                `books?page=${page}&limit=${limit}`,
            providesTags: ['books']
        }),
        createBooks: build.mutation<void, CreateBooksInput>({
            query: (bookData) => ({
                url: 'books',
                method: 'POST',
                body: bookData
            }),
            invalidatesTags: ['books', 'borrows']
        }),
        fetchBookById: build.query({
            query: (id) => `books/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'books', id }]
        }),
        updateBook: build.mutation<void, { id: string; data: Partial<IBook>; }>({
            query: ({ id, data }) => ({
                url: `books/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['books', 'borrows']
        }),
        deleteBook: build.mutation({
            query: (id) => ({
                url: `books/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['books', 'borrows']
        })
    })
});

export const {
    useGetBooksQuery,
    useCreateBooksMutation,
    useDeleteBookMutation,
    useFetchBookByIdQuery,
    useUpdateBookMutation
} = bookApi;