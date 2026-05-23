'use client';

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FolderIcon from '@mui/icons-material/Folder'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import DeckCardMenu from '@/app/flashcards/_components/deck-card-menu'
import Link from '@mui/material/Link'

export default function DeckCard({ title, numOfCards }) {
    return (
        <Card
            onClick={() => console.log("hello, I'm ", title)}
            sx={{height:'100%', whiteSpace:'nowrap', '&:hover': {cursor:'pointer', opacity:0.9} }}
        >
            <CardContent>
                <Stack direction="row" sx={{ alignItems:'center', justifyContent:'space-between' }}>
                    <FolderIcon fontSize="small" />
                    <DeckCardMenu fontSize="small" />
                </Stack>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.primary',
                        textOverflow: 'ellipsis',
                        overflow:'hidden',
                        '&:hover': {
                            textDecoration:'underline'
                        }
                    }}
                    gutterBottom
                >
                    {title}
                </Typography>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems:'center' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{numOfCards} cards</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {`${Number(50)}%`}
                    </Typography>
                </Stack>
                <LinearProgress
                    variant="determinate"
                    value={50}
                />
            </CardContent>
        </Card>
    );
}
