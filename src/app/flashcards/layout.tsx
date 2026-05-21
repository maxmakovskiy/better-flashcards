import SideNav from '@/app/flashcards/_components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <SideNav />
            <div>{children}</div>
        </div>
    );
}
