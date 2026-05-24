'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import BrainIcon from '@/app/_components/BrainIcon'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

import Paper from '@mui/material/Paper'
import { useEffect, ReactNode } from "react"
import { animate, motion, useMotionValue, useTransform } from "motion/react"

interface GameCardProps {
    answerRevealedHandler: () => void;
    children: ReactNode;
    width: string;
    height: string;
}

export default function AnswerGameCard({answerRevealedHandler, children, width, height}: GameCardProps) {
    const count = useMotionValue(10)
    const blur = useTransform(count, [10, 0], ["blur(10px)", "blur(0px)"])
    // const scale = useTransform(count, [10, 0], [0.9, 1])

    useEffect(() => {
        const controls = animate(count, 0, { duration: 10 })
        return () => {
            controls.stop();
            answerRevealedHandler();
        }
    }, []);

    return (
        <Paper
            component={motion.div}
            elevation={0}
            // style={{filter: blur, scale: scale}}
            style={{filter: blur}}
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