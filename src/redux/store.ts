import { configureStore } from '@reduxjs/toolkit';
import { bookApi } from './api/bookApi';
import { borrowApi } from './api/borrowApi';

export const store = configureStore({
    reducer: {
        [bookApi.reducerPath]: bookApi.reducer,
        [borrowApi.reducerPath]: borrowApi.reducer
    },
    middleware: (GetDefaultMiddleware) =>
        GetDefaultMiddleware()
            .concat(bookApi.middleware)
            .concat(borrowApi.middleware),
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;