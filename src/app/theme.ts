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
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    color: '#474973',
                    borderRight: '2px solid #474973'
                }
            }
        },
    }
});

export default theme;
