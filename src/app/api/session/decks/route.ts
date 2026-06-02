import { auth } from "@/auth"
import { NextResponse } from "next/server"
// import { prisma } from '@/prisma'

// endpoint to retrieve decks that need to be reviewed
export const GET = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 }
        )
    }
    return NextResponse.json({ data: [] })
})
