import { ReactNode } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'

export interface DeckStatGadgetProps {
    icon: ReactNode;
    title: string | number;
    description: string;
}

export default function DeckStatGadget({ icon, title, description }: DeckStatGadgetProps) {
    return (
        <Paper sx={{ px:'1em', py:'0.5em', height:'100%'}}>
            <Grid container sx={{ alignItems:'center'}} spacing={2}>
                <Grid size={3}
                      sx={{
                          display:'flex',
                          justifyContent:'center',
                          alignItems:'center'
                      }}
                >
                        {icon}
                </Grid>
                <Grid size={9}>
                    <Stack>
                        <Typography variant="h6">{title}</Typography>
                        <Typography variant="body2">{description}</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    )
}
