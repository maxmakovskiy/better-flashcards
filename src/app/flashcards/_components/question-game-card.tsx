import { ReactNode } from 'react'
import Paper from '@mui/material/Paper'

export interface QuestionGameCardProps {
    height: string;
    width: string;
    isBlurred?: boolean;
    children: ReactNode;
}

export default function QuestionGameCard({ height, width, isBlurred=false, children }: QuestionGameCardProps) {
    return (
        <Paper
            elevation={3}
            sx={[
            isBlurred && { filter: 'blur(10px)' },
            {
                border: 3,
                py: '1em',
                px: '2em',
                height: height,
                width: width,
                overflow: 'scroll'
            }]}
        >
            {children}
        </Paper>
    )
}