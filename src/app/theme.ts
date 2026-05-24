'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-noto-sans)',
    },
    palette: {
        primary: {
            main: '#474973',
            light: '#A69CAC',
            dark: '#161B33',
            contrastText: 'white',
        },
        secondary: {
            main: '#ADB5BD',
            light: '#CED4DA',
            dark: '#6C757D',
        }
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
