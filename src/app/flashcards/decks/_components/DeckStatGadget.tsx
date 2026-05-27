import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import SvgIcon from '@mui/material/SvgIcon'

export interface DeckStatGadgetProps {
    icon: any;
    title: string;
    description: string;
}

export default function DeckStatGadget({ icon, title, description }: DeckStatGadgetProps) {
    return (
        <Paper sx={{ px:'1em', py:'0.5em'}}>
            <Grid container sx={{ alignItems:'center'}}>
                <Grid size={4}>
                    {icon}
                </Grid>
                <Grid size={8}>
                    <Stack>
                        <Typography variant="h6">{title}</Typography>
                        <Typography variant="body2">{description}</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    )
}
