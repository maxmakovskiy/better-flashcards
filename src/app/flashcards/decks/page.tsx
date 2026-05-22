import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

export default function DecksPage() {
    return (
        <Box>
            All decks Page
                <Fab
                    color='primary'
                    sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16
                }}>
                    <AddIcon />
                </Fab>
        </Box>
    );
}
