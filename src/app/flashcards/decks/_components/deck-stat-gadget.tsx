import { ReactNode } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Tooltip from '@mui/material/Tooltip'

export interface DeckStatGadgetProps {
    icon: ReactNode;
    title: string | number | ReactNode;
    description: string | ReactNode;
    withTooltip?: boolean
}

export default function DeckStatGadget({ icon, title, description, withTooltip=false }: DeckStatGadgetProps) {
    return (
        <Paper sx={{ px:'1em', py:'0.5em', height:'100%'}}>
            <Grid container sx={{ height:'100%', alignItems:'center'}} spacing={2}>
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
                        <Typography variant='body2'>{description}</Typography>
                        {withTooltip
                            ?
                                <Tooltip
                                    title={title}
                                >
                                    <Typography
                                        variant='h6'
                                        sx={{
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                </Tooltip>
                            :
                                <Typography
                                    variant='h6'
                                    sx={{
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {title}
                                </Typography>
                        }
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    )
}
