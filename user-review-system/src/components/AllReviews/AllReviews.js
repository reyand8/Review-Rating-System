import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import {getDatabase, ref, get} from "firebase/database";

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

const AllReviews = ({setUserId}) => {
    const [users, setUsers] = useState([]);

    const fetchAllUsers = async () => {
        const db = getDatabase();
        const usersRef = ref(db, 'user/');
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
            const usersObject = snapshot.val();
            return Object.entries(usersObject).map(([uid, user]) => ({
                uid,
                ...user.userInfo
            }));
        } else {
            return [];
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await fetchAllUsers();
            setUsers(usersData);
        };
        fetchUsers();
    }, []);

    const handleUserClick = (uid) => {
        setUserId(uid);
    };

    return (
        <UserListSection>
            <UserList spacing={2}>
                {users.map(user => (
                    <Paper key={user.uid} sx={{ padding: 2, width: '320px'}}
                           onClick={() => handleUserClick(user.uid)}>
                        <Typography sx={{fontWeight: 'bold'}}>{user.username}</Typography>
                        <Typography>Email: {user.email}</Typography>
                    </Paper>
                ))}
            </UserList>
        </UserListSection>
    );
};

export default AllReviews;