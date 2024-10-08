import { createTheme } from '@mui/material/styles'; // Исправленный импорт

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            xxl: 2160,
        },
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#6e4ba2',
            dark: '#9562ee',
            light: '#d4bcf3',
            contrastText: '#ffffff',
            messageText: '#969595',
            reviewBg: '#cecbcb',
        },
        secondary: {
            main: '#9c27b0',
        },
        error: {
            main: '#d32f2f',
            light: '#db5858',
            dark: '#932020',
            contrastText: '#ffffff',
        },
        success: {
            main: '#2b792f',
            light: '#559358',
            dark: '#1e5420',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#ed6c02',
            light: '#f08934',
            dark: '#a54b01',
            messageWarning: '#969595',
        },
        background: {
            default: '#cdb8ee',
        },
    },
    typography: {
        fontSize: 16,
        fontWeightLight: 300,
        h6: {
            fontSize: 15,
            fontWeight: 700,
        },
        h2: {
            fontSize: 24,
        },
        subtitle2: {
            fontWeight: 600,
            lineHeight: 1.21,
            fontSize: 14,
        },
        body1: {
            fontWeight: 500,
        },
    },
});

export default theme;
