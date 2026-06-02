import { useState, MouseEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const itemHeight = 48;

export default function DeckCardMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreHorizIcon fontSize="small" />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: itemHeight * 4.5,
                            width: '20ch',
                        },
                    },
                    list: {
                        'aria-labelledby': 'long-button',
                    },
                }}
            >
                <MenuItem onClick={handleClose}>Review</MenuItem>
                <MenuItem onClick={handleClose}>Explore</MenuItem>
                <MenuItem onClick={handleClose}>Edit</MenuItem>
            </Menu>
        </div>
    );
}