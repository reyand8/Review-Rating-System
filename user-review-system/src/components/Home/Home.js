import { useEffect, useState } from 'react';
import { Grid2 } from '@mui/material';
import Review from '../Review/Review';
import AllReviews from '../AllReviews/AllReviews';
import EmptySection from '../Status/EmptySection';
import { useDispatch, useSelector } from 'react-redux';
import { authListener, fetchAllUsers } from '../../features/userSlice/userSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { users, userId } = useSelector(state => state.user);
    const [currUserRole, setCurrUserRole] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');

    useEffect(() => {
        dispatch(authListener());
        dispatch(fetchAllUsers());
    }, [dispatch]);

    useEffect(() => {
        const currentUser = users.find(user => user.uid === userId);
        if (currentUser) {
            setCurrUserRole(currentUser.role);
        }
    }, [userId, users]);

    return (
        <Grid2 container spacing={2} sx={{ flexGrow: 1, my: 9 }}>
            <Grid2 item xs={12} md={3.5}>
                <AllReviews setSelectedUserId={setSelectedUserId}/>
            </Grid2>
            <Grid2 item xs={12} md={8.5}>
                {selectedUserId
                    ? <Review currUser={currUserRole} selectedUserId={selectedUserId} />
                    : <EmptySection />}
            </Grid2>
        </Grid2>
    );
};

export default Home;