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
    const linkStyle = "py-2 border-l border-r border-t rounded-t-lg grow text-center ";

    const links = [
        { href: "/admin/users", name: "Users", attrs: linkStyle + (isActive("/admin/users") ? "bg-red-500 text-white" : "text-red-500 border-red-500") },
        { href: "/admin/cars", name: "Cars", attrs: linkStyle + (isActive("/admin/cars") ? "bg-blue-500 text-white" :  "text-blue-500 border-blue-500")},
        { href: "/admin/reservations", name: "Reservations", attrs: linkStyle + (isActive("/admin/reservations") ? "bg-green-500 text-white" : "text-green-500 border-green-500")},
        { href: "/admin/locations", name: "Locations", attrs: linkStyle + (isActive("/admin/locations") ? "bg-yellow-500 text-white" : "text-yellow-500 border-yellow-500")}
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
                                    className={link.attrs}
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
        </div>
    );
}