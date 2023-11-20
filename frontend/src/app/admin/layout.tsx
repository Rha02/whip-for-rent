"use client";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    // Get current page from server-side
    const isActive = (href: string) => pathname === href;

    const links = [
        { href: "/admin/users", name: "Users", color: "blue-500" },
        { href: "/admin/cars", name: "Cars", color: "red-500" },
        { href: "/admin/reservations", name: "Reservations", color: "green-500" },
        { href: "/admin/locations", name: "Locations", color: "yellow-500" }
    ];

    return (
        <div>
            <nav className="flex gap-4">
                <a href="/">WhipForRent</a>
                <a href="/dashboard">Dashboard</a>
                <a href="/admin">Administration</a>
            </nav>
            <section>
                <main className="flex justify-center">
                    <div className="w-3/4">
                        <nav className="flex justify-between border-b-2 border-gray-400 gap-2 px-4 font-bold">
                            {links.map((link, idx) => (
                                <a key={idx}
                                    className={
                                        `${isActive(link.href) ? "bg-"+link.color+" text-white" : "text-"+link.color} 
                                        py-2 border-l border-r border-t border-${link.color} rounded-t-lg grow text-center`
                                    }
                                    href={link.href}>
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                        <div className="mt-4">
                            {children}
                        </div>
                    </div>
                </main>
            </section>
            <h1> THIS IS END of MY ADMIN LAYOUT</h1>
        </div>
    );
}