import React, { useState } from 'react';
import { Box, Link, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { validateSignUp, isValid } from '../../../utils/validation';
import { saveUserInfo } from '../../../features/userSlice/userSlice';
import {useDispatch} from 'react-redux';


const TextFieldBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        margin: '0 auto',
        maxWidth: '220px',
    },
    [theme.breakpoints.up('md')]: {
        maxWidth: '320px',
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: '320px',
    },
}));

/**
 * SignUp component for the registration.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.formState - Current state of the form.
 * @param {Function} props.setFormState - Function to set the form state.
 * @param {Function} props.handlerChange - Function to handle input changes.
 * @param {Function} props.setLogin - Function to set the login state.
 * @returns {JSX.Element} The rendered SignUp component.
 */

const SignUp = ({formState, setFormState, handlerChange, setLogin}) => {
    const [errors, setErrors] = useState({
        username: '', email: '', password: '', role: 'admin'});
    const [firebaseError, setFirebaseError] = useState('');
    const { email, username, role, password } = formState;
    const dispatch = useDispatch();

    /**
     * Handles Firebase auth errors.
     *
     * @param {Object} error - The error object from the Firebase.
     */
    const handleFirebaseError = (error) => {
        const errorCode = error.code;
        switch (errorCode) {
            case 'auth/invalid-email':
                setErrors((prev) =>
                    ({ ...prev, email: 'Invalid email format' }));
                break;
            case 'auth/weak-password':
                setErrors((prev) =>
                    ({ ...prev, password: 'Password should be at least 6 characters' }));
                break;
            case 'auth/email-already-in-use':
                setErrors((prev) =>
                    ({ ...prev, email: 'Email is already in use' }));
                break;
            default:
                setFirebaseError('An unexpected error occurred');
                break;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formValidation = validateSignUp(formState);
        setErrors(formValidation);

        if (isValid(formValidation)) {
            const auth = getAuth();
            try {
                const userCredential =
                    await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                dispatch(saveUserInfo(user.uid, username, email, role));
                setLogin(true);
                setFormState({
                    username: '',
                    email: '',
                    password: '',
                    role: 'user',
                });
            } catch (error) {
                handleFirebaseError(error);
            }
        }
    };

    return (
        <>
            <TextFieldBox component="form" onSubmit={onSubmit}>
                <TextField
                    label="Username"
                    placeholder="Enter username"
                    name="username"
                    variant="outlined"
                    fullWidth
                    required
                    value={username}
                    inputProps={{
                        pattern: '[A-Za-z]+',
                    }}
                    onChange={handlerChange}
                    error={!!errors.username}
                    helperText={errors.username}
                />
                <TextField
                    sx={{ marginY: '16px' }}
                    label="Email"
                    placeholder="Enter email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    required
                    value={email}
                    onChange={handlerChange}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    label="Password"
                    placeholder="Enter password"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    value={password}
                    onChange={handlerChange}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <Button
                    type="submit"
                    color="primary"
                    name="Sign Up"
                    variant="contained"
                    fullWidth
                    sx={{margin: '8px 0'}}
                >
                    <Typography>Sign up</Typography>
                </Button>
                {firebaseError && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {firebaseError}
                    </Typography>
                )}
            </TextFieldBox>
            <Box sx={{mt: 3, ml: 3, display: 'flex'}}>
                <Typography sx={{mt: 0.7}}>Do you have an account?</Typography>
                <Link>
                    <Button onClick={() => setLogin(true)}>
                        <Typography>Sign in</Typography>
                    </Button>
                </Link>
            </Box>
        </>
    );
};

export default SignUp;
