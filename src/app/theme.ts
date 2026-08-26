'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-noto-sans)',
    },
    palette: {
        mode: 'light',
        background:{
            default: '#F8F9FA',
        },
        primary: {
            main: '#474973',
            light: '#A69CAC',
            dark: '#161B33',
            contrastText: 'white',
        },
        secondary: {
            main: '#ADB5BD',
            light: '#F8F9FA',
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
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: '1.2em'
                }
            }
        }
    }
});

export default theme;
