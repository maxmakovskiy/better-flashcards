import { ReactNode } from 'react'
import Paper from '@mui/material/Paper'
import Markdown from 'react-markdown'

export interface QuestionGameCardProps {
    height: string;
    width: string;
    isBlurred?: boolean;
    content: string;
}

export default function QuestionGameCard({ height, width, isBlurred=false, content }: QuestionGameCardProps) {
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
            <Markdown>
                {content as string}
            </Markdown>
        </Paper>
    )
}