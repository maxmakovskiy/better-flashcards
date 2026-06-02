import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token,
    },
})

export const config = {
    matcher: ["/flashcards/*"] // Add all protected routes here
}