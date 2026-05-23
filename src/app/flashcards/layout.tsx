'use client';

import { useState, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Drawer } from '@/app/flashcards/_components/drawer'
import { DrawerHeader } from '@/app/flashcards/_components/drawer-header'
import HomeIcon from '@mui/icons-material/Home'
import BackupTableIcon from '@mui/icons-material/BackupTable';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NextLink from '@/app/_components/Link'

const drawerWidth: number = 240

const menuItems = new Map<string, object>([
    ["Home", {icon: <HomeIcon color='primary' />, url: "/flashcards"}],
    ["Dashboard", {icon: <DashboardIcon color='primary' />, url: "/flashcards/dashboard"}],
    ["Decks", {icon: <BackupTableIcon color='primary' />, url: "/flashcards/decks"}],
])

export default function FlashcardsLayout({children}: {children: ReactNode}) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
                <DrawerHeader open={open}>
                    {!open ?
                        <IconButton color="primary" onClick={() => setOpen(true)}>
                            <ChevronRightIcon />
                        </IconButton>
                        :
                        <IconButton color="primary" onClick={() => setOpen(false)}>
                            <ChevronLeftIcon />
                            <Typography color="primary" >Close</Typography>
                        </IconButton>
                    }
                </DrawerHeader>
                <Divider sx={{border: '1px solid #474973'}}/>
                <List>
                    {[...menuItems].map(([text, {icon, url}]) => (
                        <ListItem
                            key={text}
                            href={url}
                            component={NextLink}
                            sx={{ display: 'block' }}
                            disablePadding
                        >
                            <ListItemButton
                                sx={[
                                    {
                                        minHeight: 48,
                                        px: 2.5,
                                    },
                                    open
                                        ? {
                                            justifyContent: 'initial',
                                        }
                                        : {
                                            justifyContent: 'center',
                                        },
                                ]}
                            >
                                <ListItemIcon
                                    sx={[
                                        {
                                            minWidth: 0,
                                            justifyContent: 'center',
                                        },
                                        open
                                            ? {
                                                mr: 3,
                                            }
                                            : {
                                                mr: 'auto',
                                            },
                                    ]}
                                >
                                    {icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={text}
                                    sx={[
                                        open
                                            ? {
                                                opacity: 1,
                                            }
                                            : {
                                                opacity: 0,
                                            },
                                    ]}
                                />
                            </ListItemButton>
                            <Divider sx={{border: '1px solid #474973'}}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    );
}
