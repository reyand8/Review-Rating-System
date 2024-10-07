import React from 'react';
import {Box, Container, ThemeProvider} from "@mui/material";

import Header from "./Header/Header";
import theme from '../assets/theme';
import AppRoutes from "../routes/AppRoutes";


const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                backgroundColor: theme.palette.primary.light,
                minHeight: '100vh',
                padding: 2,
            }}>
                <Header />
                <Container maxWidth="xl">
                    <AppRoutes/>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default App;