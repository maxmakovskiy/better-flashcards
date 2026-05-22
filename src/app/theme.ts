'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-noto-sans)',
    },
    palette: {
        primary: {
            main: '#474973',
            contrastText: 'white',
        },
    },
});

export default theme;
