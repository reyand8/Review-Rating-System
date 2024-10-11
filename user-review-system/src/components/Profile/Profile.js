import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid2, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import SignUp from './SignUp/SignUp';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import SignIn from './SignIn/SignIn';
import { authListener } from '../../features/userSlice/userSlice';

const paperStyle = { padding: 20, minHeight: '36vh', maxWidth: 360, margin: '60px auto' };

const AuthTitle = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.h2.fontSize,
    fontWeight: 'bold',
}));

const Profile = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, userData } = useSelector(state => state.user);
    const [login, setLogin] = useState(false);
    const [formState, setFormState] = useState({
        username: '',
        role: 'user',
        email: '',
        password: '',
    });
    console.log(isAuthenticated, userData);
    const handlerChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        dispatch(authListener());
    }, [dispatch]);

    return (
        <>
            {userData && isAuthenticated ? (
                <ProfileInfo data={userData} />
            ) : (
                <Grid2>
                    <Paper elevation={10} style={paperStyle}>
                        <Box align="center" sx={{ mb: 4 }}>
                            <h2>
                                {login ? <AuthTitle>Sign In</AuthTitle> : <AuthTitle>Sign Up</AuthTitle>}
                            </h2>
                        </Box>
                        {login ? (
                            <SignIn
                                handlerChange={handlerChange}
                                formState={formState}
                                setLogin={setLogin}
                                setFormState={setFormState}
                            />
                        ) : (
                            <SignUp
                                handlerChange={handlerChange}
                                formState={formState}
                                setFormState={setFormState}
                                setLogin={setLogin}
                            />
                        )}
                    </Paper>
                </Grid2>
            )}
        </>
    );
};

export default Profile;