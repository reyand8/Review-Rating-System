import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, get, set } from 'firebase/database';

const initialState = {
    reviews: [],
    loading: false,
    error: null,
};

export const fetchReviews =
    createAsyncThunk('reviews/fetchReviews', async (userId) => {
    const db = getDatabase();
    const reviewsRef = ref(db, `user/${userId}/reviews/`);
    const snapshot = await get(reviewsRef);
    if (snapshot.exists()) {
        const reviewsData = snapshot.val();
        return Object.entries(reviewsData).map(([uid, review]) => ({
            uid,
            ...review,
        }));
    } else {
        return [];
    }
});

export const submitReview =
    createAsyncThunk('reviews/submitReview', async ({ userId, review }) => {
    const db = getDatabase();
    const reviewsRef = ref(db, `user/${userId}/reviews/${review.userId}`);
    await set(reviewsRef, review);
    return review;
});

export const deleteReview =
    createAsyncThunk('reviews/deleteReview', async ({ userId, reviewId }) => {
    const db = getDatabase();
    const reviewRef = ref(db, `user/${userId}/reviews/${reviewId}`);
    await set(reviewRef, null);
    return reviewId;
});

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(submitReview.fulfilled, (state, action) => {
                state.reviews.push(action.payload);
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.reviews = state.reviews.filter(review => review.uid !== action.payload);
            });
    },
});

export default reviewSlice.reducer;