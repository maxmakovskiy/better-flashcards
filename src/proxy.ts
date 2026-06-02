import { auth } from "@/auth"

export const proxy = auth((req) => {
    if (!req.auth) {
        const newUrl = new URL("/", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})

export const config = {
    matcher: [
        '/flashcards/(.)*'
    ],
}