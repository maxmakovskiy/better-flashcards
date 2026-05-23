import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import BrainIcon from '@/app/_components/BrainIcon'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

export default function HomePage() {
    return (
        <Grid container spacing={1}>
            <Grid size={6}>
                <Stack spacing={2} sx={{ bgcolor:'pink', p:'1em' }}>
                    <Box sx={{ display:'flex', alignItems:'center'}}>
                        <BrainIcon color="primary" fontSize="large" />
                        <Typography variant="h5">BrainPulse</Typography>
                    </Box>
                    <Divider />

                    <Typography variant="h5">Welcome back, "name" !</Typography>
                    <Divider />

                    <Grid container spacing={2}  sx={{ alignItems:'stretch'}}>
                        <Paper size={4} elevation={3} sx={{py:'0.5em', px:'1em'}}>
                            <Stack >
                                <Typography variant="body1">Cards to review today</Typography>
                                <Stack direction="row" sx={{ justifyContent: 'space-between', mt:'0.5em' }}>
                                        <Typography variant="h4">42</Typography>
                                        <CircularProgress
                                            enableTrackSlot
                                            variant="determinate"
                                            value={70}
                                        />
                                </Stack>
                            </Stack>
                       </Paper>
                        <Paper size={4} elevation={3} sx={{py:'0.5em', px:'1em'}}>
                            <Stack>
                                <Typography variant="body1">Study streak</Typography>
                                <Typography variant="h4">15 Days</Typography>
                            </Stack>
                        </Paper>
                        <Paper  size={4} elevation={3} sx={{py:'0.5em', px:'1em'}}>
                            <Stack>
                                <Typography variant="body1">New Cards Learned</Typography>
                                <Typography variant="h4">118</Typography>
                            </Stack>
                        </Paper>
                    </Grid>

                    <Stack direction="row" sx={{ justifyContent:'space-between', alignItems:'center'}}>
                        <Typography variant="h6">Your Decks</Typography>
                        <Button variant="contained" startIcon={<AddIcon />}>Create New Deck</Button>
                    </Stack>
                </Stack>
            </Grid>
            <Grid size={6}>game</Grid>
        </Grid>
    );
}
