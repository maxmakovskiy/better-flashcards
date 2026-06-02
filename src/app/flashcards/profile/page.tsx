import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import TextField from '@mui/material/TextField'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'

import { signOut, auth } from "@/auth"

function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button type="submit">SignOut</button>
        </form>
    )
}

export default async function ProfilePage() {
    const session = await auth()

    return (
        <Stack sx={{ p:'3em', alignItems:'flex-start' }} spacing={2}>
            <Typography variant="h5">Account & Application Settings</Typography>
            <Paper elevation={3} sx={{ px:'2em', py:'1em', minWidth: '50%'}}>
                <Stack>
                    <Typography gutterBottom variant="h6">Profile & Account</Typography>
                    <Grid container spacing={3}>
                        <Grid size={3}>
                            <Stack spacing={1} sx={{alignItems:'center'}}>
                                <AccountCircleIcon sx={{ fontSize:'64px'}}/>
                                <Typography variant="body1">{session?.user?.name}</Typography>
                            </Stack>
                        </Grid>
                        <Grid size={9}>
                            <Stack spacing={1}>
                                <Typography variant="body1">Identified with IndentityProvider</Typography>
                                <TextField disabled defaultValue={session?.user?.email} />
                                {/*<Button variant="contained" sx={{ alignSelf:'flex-end'}}>Log-out</Button>*/}
                                <SignOut />
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </Paper>

            <Paper elevation={3} sx={{ px:'2em', py:'1em', minWidth: '50%'}}>
                <Typography variant="h5">Account & Application Settings</Typography>
                <Stack>
                    <Typography variant="body1">New Cards Limit per Day</Typography>
                    {/* TODO: define meaningful min max */}
                    <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                    <Typography variant="body1">Ease Factor Adjustment</Typography>
                    <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                </Stack>

            </Paper>


        </Stack>
    );
}
