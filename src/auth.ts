import NextAuth from "next-auth"
import GitHub from 'next-auth/providers/github'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [GitHub],
    adapter: PrismaAdapter(prisma),
})
