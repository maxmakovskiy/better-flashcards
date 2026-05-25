import NextAuth from "next-auth"
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GGITHUB_SECRET as string,
        }),
    ],
    adapter: PrismaAdapter(prisma),
})
