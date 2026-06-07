import { NextResponse } from 'next/server'
import { NextAuthRequest } from 'next-auth'
import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { StudySessionModel } from '@/../prisma/generated/prisma/models/StudySession'
import {
    eachDayOfInterval,
    format,
    startOfDay,
    subDays,
} from "date-fns"

// Computes streak: number of consecutive sessions (the one follows the other, day after day)
// within give pool
// Heavily influenced by ChatGPT
function getStreak(now: Date, sessions: StudySessionModel[]): number {
    const coveredDays = new Set<string>();

    for (const s of sessions) {
        if (!s.endedAt) {
            continue
        }
        for (
            const day of eachDayOfInterval({
            start: startOfDay(s.startedAt),
            end: startOfDay(s.endedAt),
        })
            ) {
            coveredDays.add(format(day, "yyyy-MM-dd"));
        }
    }

    const today = startOfDay(now);

    // Start from today if active today,
    // otherwise start from yesterday.
    let current = coveredDays.has(format(today, "yyyy-MM-dd"))
        ? today
        : subDays(today, 1);

    let streak = 0;

    while (coveredDays.has(format(current, "yyyy-MM-dd"))) {
        streak++;
        current = subDays(current, 1);
    }

    return streak;
}

// end point to create new study session connected to specific deck
export const GET = auth(async function GET(req: NextAuthRequest) {
    if (!req.auth) {
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 }
        )
    }
    try {
        const sessions: StudySessionModel[] = await prisma.studySession.findMany({
            where: {
                deck: {
                    userId: req.auth.user?.id
                }
            },
            orderBy: {
                startedAt: 'desc'
            }
        })

        return NextResponse.json({
            streak: getStreak(new Date(), sessions)
        })
    } catch (e) {
        console.error(e)
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
})


