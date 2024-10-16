import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Star } from '@mui/icons-material';

import { fetchReviews, submitReview, deleteReview } from '../../features/reviewSlice/reviewSlice';
import { fetchUserData } from '../../features/userSlice/userSlice';
import { auth } from '../../firebase/firebase';

const PaperWarning = styled(Paper)(({ theme }) => ({
    maxWidth: '820px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        width: '580px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '353px',
        padding: '10px',
    },
}));

const MainBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        maxWidth: '368px',
        width: '100%',
        marginX: 'auto',
        padding: theme.spacing(2),
    },
}));

const ReviewBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    border: '1px solid #ccc',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.reviewBg,
}));

const Review = ({ currUser, selectedUserId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { reviews } = useSelector(state => state.reviews);
    const userInfo = useSelector(state => state.user.userData);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [existingReview, setExistingReview] = useState(null);

    /**
     * Checks for an existing review.
     */
    const checkExistingReview = () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            navigate('/profile');
            return;
        }
        const currentUserId = currentUser.uid;
        const review = reviews.find(r => r.userId === currentUserId);
        setExistingReview(review);
        if (review) {
            setReviewText(review.text);
            setRating(review.rating);
        }
    };

    /**
     * Calculates the average rating.
     *
     * @param {Array} reviews - The list of reviews to calculate the average rating.
     * @returns {number} The average rating.
     */
    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / reviews.length;
    };

    useEffect(() => {
        dispatch(fetchReviews(selectedUserId));
        dispatch(fetchUserData(selectedUserId));
    }, [dispatch, selectedUserId]);

    useEffect(() => {
        checkExistingReview();
    }, [reviews]);

    /**
     * Handles the submission of a new review.
     */
    const handleSubmitReview = async () => {
        const currentUser = auth.currentUser;
        const review = {
            userId: currentUser.uid,
            username: currentUser.email,
            text: reviewText,
            rating: rating,
            createdAt: new Date().toISOString(),
        };

        if (existingReview) {
            await dispatch(deleteReview({ userId: selectedUserId, reviewId: existingReview.uid }));
        }

        await dispatch(submitReview({ userId: selectedUserId, review }));
        setReviewText('');
        setRating(0);
    };

    /**
     * Delete review.
     *
     * @param {string} reviewId - The ID of the review to delete.
     */
    const handleDeleteReview = async (reviewId) => {
        await dispatch(deleteReview({ userId: selectedUserId, reviewId }));
        setReviewText('');
        setRating(0);
    };

    /**
     * Renders stars based on the given rating.
     */
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Star key={i} style={{ color: i <= rating ? 'gold' : 'gray' }} />
            );
        }
        return stars;
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <PaperWarning>
                <MainBox sx={{mx: '190px', padding: '12px'}}>
                    {userInfo && (
                        <>
                            <Typography>Name: {userInfo.username}</Typography>
                            <Typography sx={{ my: 3 }}>Email: {userInfo.email}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography variant="subtitle1">Rating:</Typography>
                                <Box sx={{ display: 'flex', ml: 2 }}>
                                    {renderStars(Math.round(calculateAverageRating(reviews) || 0))}
                                </Box>
                            </Box>
                        </>
                    )}
                    <Box sx={{ mt: 10 }}>
                        <Typography variant="h6">Your Review: </Typography>
                        <TextField
                            multiline
                            rows={4}
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            variant="outlined"
                            fullWidth
                            placeholder="Write your review"
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Typography variant="subtitle1">Rating:</Typography>
                            <Box sx={{ display: 'flex', ml: 2 }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        onClick={() => setRating(star)}
                                        style={{
                                            cursor: 'pointer',
                                            color: rating >= star ? 'gold' : 'gray',
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                        <Button
                            onClick={handleSubmitReview}
                            variant="contained"
                            sx={{ mt: 2 }}
                            disabled={!reviewText}>
                            Send
                        </Button>
                    </Box>
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6">Reviews:</Typography>
                        {reviews.length > 0 ? (
                            reviews.map(({ username, text, rating, uid }, index) => (
                                <ReviewBox key={index}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        {username}
                                    </Typography>
                                    <Typography variant="body2" sx={{ my: 2 }}>
                                        {text}
                                    </Typography>
                                    <Box sx={{ display: 'flex', mt: 1 }}>
                                        {renderStars(rating)}
                                    </Box>
                                    {currUser === 'admin' && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDeleteReview(uid)}
                                            sx={{ mt: 2 }}
                                        >
                                            Delete Review
                                        </Button>
                                    )}
                                </ReviewBox>
                            ))
                        ) : (
                            <Typography variant="body2">No reviews yet.</Typography>
                        )}
                    </Box>
                </MainBox>
            </PaperWarning>
        </Box>
    );
};

export default Review;