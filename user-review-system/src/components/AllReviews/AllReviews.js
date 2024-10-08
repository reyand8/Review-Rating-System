import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllUsers, selectUsers } from '../../features/userSlice/userSlice';

const UserListSection = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: '760px',
    position: 'sticky',
    top: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
}));

const UserList = styled(Stack)(({ theme }) => ({
    height: '100%',
    overflowY: 'scroll',
}));

const AllReviews = ({ setSelectedUserId }) => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const handleUserClick = (uid) => {
        setSelectedUserId(uid);
    };

    return (
        <UserListSection>
            <UserList spacing={2}>
                {users.map((user, index) => (
                    <Paper
                        key={index}
                        sx={{ padding: 2, width: '320px', cursor: 'pointer' }}
                        onClick={() => handleUserClick(user.uid)}
                    >
                        <Typography sx={{ fontWeight: 'bold' }}>{user.username}</Typography>
                        <Typography>Email: {user.email}</Typography>
                    </Paper>
                ))}
            </UserList>
        </UserListSection>
    );
};

export default AllReviews;