import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditNoteIcon from '@mui/icons-material/EditNote'
import Button from '@mui/material/Button'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Typography from '@mui/material/Typography'

export interface CardsTableProps {
    cards: [any];
}

export default function CardsTable({ cards }: CardsTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><Typography variant="h6">#</Typography></TableCell>
                        <TableCell><Typography variant="h6">Front</Typography></TableCell>
                        <TableCell><Typography variant="h6">back</Typography></TableCell>
                        <TableCell><Typography variant="h6">Status</Typography></TableCell>
                        <TableCell><Typography variant="h6">Last review</Typography></TableCell>
                        <TableCell align="center"><Typography variant="h6">Actions</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards.map(c => (
                        <TableRow
                            hover
                            key={c.flashcardNum}
                            onClick={() => console.log("Opening modal window in order")}
                            sx={{ cursor:'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Typography variant="body2">{c.flashcardNum}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">{c.frontText}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1">{c.backText}</Typography>
                            </TableCell>
                            <TableCell>
                                {/* TODO: replace with actual status */}
                                <Typography variant="body2">In progress</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">{c.lastReviewAt}</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Button>
                                    <EditNoteIcon />
                                </Button>
                                <Button>
                                    <DeleteForeverIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
