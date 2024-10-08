import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice/userSlice';
import reviewReducer from './reviewSlice/reviewSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        reviews: reviewReducer,
    },
});

export default store;