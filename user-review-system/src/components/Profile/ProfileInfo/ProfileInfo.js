import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Accordion, AccordionDetails, Box, Grid2, Link, TextField } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import defaultImage from '../../../assets/img/default_img.png';
import theme from '../../../assets/theme';
import { auth } from '../../../firebase/firebase';


const ProfileInfo = ({data}) => {
    const navigate = useNavigate();

    const onLogOutClick = () => {
        auth.signOut();
        navigate('/');
    };

    return (
        <>
            <Paper elevation={10} sx={{
                padding: 3,
                minHeight: '58vh',
                maxWidth: 660,
                margin: '60px auto',
            }}>
                <Grid2 align="center">
                    <Typography sx={{
                        fontSize: theme.typography.h2.fontSize,
                        fontWeight: 'bold',
                        mb: 4}}
                    >
                       Profile
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box>
                            <img src={defaultImage} alt="defaultImage" />
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Accordion sx={{ maxWidth: '440px', marginTop: '50px' }}>
                                    <AccordionDetails sx={{ height: '240px' }}>
                                        <Box component="form"
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                height: '150px' }}>
                                            <TextField
                                                name="email"
                                                value={data.email}
                                                variant="standard"
                                                disabled
                                                sx={{ mx: '20px', mt: '30px' }}
                                            />
                                            <TextField
                                                name="username"
                                                value={data.username}
                                                variant="standard"
                                                disabled
                                                sx={{ mx: '20px' }}
                                            />
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </Box>
                        <Link sx={{ marginTop: '98px'}}>
                            <Button variant="contained" size="large" onClick={onLogOutClick}>
                                <LogoutIcon />
                                <Typography sx={{ paddingLeft: '14px' }}>
                                    Log Out
                                </Typography>
                            </Button>
                        </Link>
                    </Box>
                </Grid2>
            </Paper>
        </>
    );
};

export default React.memo(ProfileInfo);