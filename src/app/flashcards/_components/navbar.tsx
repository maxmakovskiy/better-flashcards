import Link from 'next/link'

export default function NavBar() {
    return (
        <nav>
            <Link href="/flashcards">Home</Link>
            <Link href="/flashcards/dashboard">Dashboard</Link>
            <Link href="/flashcards/decks">Decks</Link>
            <Link href="/">Go to welcome page</Link>
        </nav>
    );
}