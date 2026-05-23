import { styled } from '@mui/material/styles';

export const DrawerHeader = styled('div', {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    variants: [
        {
            props: ({ open }) => open,
            style: {
                justifyContent: 'flex-end',
            },
        },
        {
            props: ({ open }) => !open,
            style: {
                justifyContent: 'center',
            },
        }
    ]
}));

