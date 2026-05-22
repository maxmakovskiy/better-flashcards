'use client';

import { useState, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AppBar } from '@/app/flashcards/_components/appbar'
import { Drawer } from '@/app/flashcards/_components/drawer'
import { DrawerHeader } from '@/app/flashcards/_components/drawer-header'
import HomeIcon from '@mui/icons-material/Home'
import BackupTableIcon from '@mui/icons-material/BackupTable';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NextLink from '@/app/_components/Link'

const drawerWidth: number = 240

const menuItems = new Map<string, object>([
    ["Home", {icon: <HomeIcon />, url: "/flashcards"}],
    ["Dashboard", {icon: <DashboardIcon />, url: "/flashcards/dashboard"}],
    ["Decks", {icon: <BackupTableIcon />, url: "/flashcards/decks"}],
])

export default function FlashcardsLayout({children}: {children: ReactNode}) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(!open)}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
                <DrawerHeader>
                    <IconButton onClick={() => setOpen(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {[...menuItems].map(([text, {icon, url}]) => (
                        <ListItem
                            key={text}
                            component={NextLink}
                            href={url}
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
                            <Divider />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}
