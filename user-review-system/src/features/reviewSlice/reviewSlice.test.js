import { configureStore } from '@reduxjs/toolkit';
import reviewReducer, {
    fetchReviews,
    submitReview,
} from './reviewSlice';
import { getDatabase, ref, get, set } from 'firebase/database';


jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(),
    ref: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
}));

describe('Review Slice', () => {
    let store;

    beforeEach(() => {
        store = configureStore({ reducer: { reviews: reviewReducer } });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch reviews successfully', async () => {
        const mockReviews = {
            review1: { content: 'Great!' },
            review2: { content: 'Good!' },
        };

        const userId = 'myUser';
        get.mockResolvedValueOnce({
            exists: jest.fn(() => true),
            val: jest.fn(() => mockReviews),
        });

        await store.dispatch(fetchReviews(userId));

        const state = store.getState().reviews;
        expect(state.loading).toBe(false);
        expect(state.reviews).toEqual([
            { uid: 'review1', content: 'Great!' },
            { uid: 'review2', content: 'Good!' },
        ]);
    });

    test('should return empty array', async () => {
        const userId = 'user123';
        get.mockResolvedValueOnce({
            exists: jest.fn(() => false),
        });

        await store.dispatch(fetchReviews(userId));

        const state = store.getState().reviews;
        expect(state.loading).toBe(false);
        expect(state.reviews).toEqual([]);
    });

    test('should handle error during fetch', async () => {
        const userId = 'myUser';
        get.mockRejectedValueOnce(new Error('Fetch error'));

        await store.dispatch(fetchReviews(userId));

        const state = store.getState().reviews;
        expect(state.loading).toBe(false);
        expect(state.error).toBe('Fetch error');
    });

    test('should submit a review successfully', async () => {
        const userId = 'myUser';
        const review = { userId: 'review1', content: 'Great!' };

        await store.dispatch(submitReview({ userId, review }));

        const state = store.getState().reviews;
        expect(state.reviews).toContainEqual(review);
        expect(set).toHaveBeenCalledWith(ref(getDatabase(), `user/${userId}/reviews/${review.userId}`), review);
    });
});
