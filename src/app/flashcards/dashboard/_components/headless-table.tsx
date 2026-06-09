import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

export interface HeadlessTableProps {
    data: { key: string; value: string | number }[]
}

export default function HeadlessTable({ data }: HeadlessTableProps) {
    return (
        <Table size="small">
            <TableBody>
                {data.map(row => (
                    <TableRow
                        key={row.key}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                        <Typography variant="subtitle2">
                                {row.key}
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="body1">
                                {row.value}
                            </Typography>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}