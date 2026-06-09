import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { redirect } from 'next/navigation'
import { signOut, auth } from '@/auth'

export default async function ProfilePage() {
    const session = await auth()

    if (!session) {
        return redirect('/')
    }

    return (
        <Stack sx={{ p:'3em', alignItems:'flex-start' }} spacing={2}>

            <Typography variant='h5'>Account & Application Settings</Typography>

            <Paper elevation={3} sx={{ px:'2em', py:'1em', minWidth: '50%'}}>
                <Stack>
                    <Typography gutterBottom variant='h6'>Profile & Account</Typography>
                    <Grid container spacing={3}>
                        <Grid size={3}>
                            <Stack spacing={1} sx={{alignItems:'center'}}>
                                <AccountCircleIcon sx={{ fontSize:'64px'}}/>
                                <Typography variant='body1'>{session?.user?.name}</Typography>
                            </Stack>
                        </Grid>
                        <Grid size={9}>
                            <Stack spacing={1}>
                                <Typography variant='body1'>Identified with GitHub</Typography>
                                <TextField disabled defaultValue={session?.user?.email} />
                                <Button
                                    onClick={async () => { 
                                        'use server'
                                        await signOut()
                                    }}
                                    variant='contained'
                                    sx={{ alignSelf:'flex-end'}}
                                >
                                    Log-out
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </Paper>
        </Stack>
    )
}
