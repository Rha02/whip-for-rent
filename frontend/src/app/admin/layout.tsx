export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <nav className="flex gap-4">
                <a href="/">WhipForRent</a>
                <a href="/dashboard">Dashboard</a>
                <a href="/admin">Administration</a>
            </nav>
            <section>{children}</section>
            <h1> THIS IS END of MY ADMIN LAYOUT</h1>
        </div>
    );
}