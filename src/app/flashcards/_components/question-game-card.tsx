import { ReactNode } from "react"

import Paper from '@mui/material/Paper'

export interface QuestionGameCardProps {
    height: string;
    width: string;
    children: ReactNode;
}

export default function QuestionGameCard({ height, width, children }: QuestionGameCardProps) {
    return (
        <Paper
            elevate={0}
            sx={{
                border: 3,
                py: '1em',
                px: '2em',
                height: height,
                width: width,
                overflow: 'scroll'
            }}
        >
            {children}
        </Paper>
    )
}