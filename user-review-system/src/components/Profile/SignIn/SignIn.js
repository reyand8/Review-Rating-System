import React, {useState} from 'react';
import {Box, Link, TextField} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {validateSignIn, isValid} from '../../../utils/validation';


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


const SignIn = ({formState, setFormState, handlerChange, setLogin, setAuth}) => {
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [firebaseError, setFirebaseError] = useState('');

    const handleFirebaseError = (error) => {
        const errorCode = error.code;
        switch (errorCode) {
            case 'auth/wrong-password':
                setFirebaseError('Invalid email or password');
                break;
            case 'auth/user-not-found':
                setFirebaseError('User not found');
                break;
            default:
                setFirebaseError('An unexpected error occurred');
                break;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formValidation = validateSignIn(formState);
        setErrors(formValidation);

        if (isValid(formValidation)) {
            const auth = getAuth();
            try {
                await signInWithEmailAndPassword(auth, formState.email, formState.password);
                setAuth(true);
                setFormState({username: '', email: '', password: ''});
            } catch (error) {
                handleFirebaseError(error);
            }
        }
    };

    return(
        <>
            <TextFieldBox component="form" onSubmit={onSubmit}>
                <TextField
                    sx={{mb: '16px'}}
                    label="Email"
                    placeholder="Enter email"
                    type="email"
                    variant="outlined"
                    name="email"
                    fullWidth required
                    value={formState.email}
                    onChange={handlerChange}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    variant="outlined"
                    name="password"
                    fullWidth required
                    value={formState.password}
                    onChange={handlerChange}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <FormControlLabel
                    control={<Checkbox name="checkedB" color="primary"/>}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    sx={{margin:'8px 0'}}>
                    <Typography>Sign in</Typography>
                </Button>
                {firebaseError && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {firebaseError}
                    </Typography>
                )}
                <Box sx={{mt: 3, display: 'flex'}}>
                    <Box sx={{marginY: '12px'}}>
                        <Link href="#" >
                            <Typography>Forgot password</Typography>
                        </Link>
                    </Box>
                    <Button sx={{ml: 2}} onClick={() => setLogin(prev => !prev)}>
                        <Typography>Sign up</Typography>
                    </Button>
                </Box>
            </TextFieldBox>
        </>
    );
};

export default SignIn;