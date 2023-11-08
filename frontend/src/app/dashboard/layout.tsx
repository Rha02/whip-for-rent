import { Navbar } from "@/lib/components";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-full">
            <Navbar />
            <section>{children}</section>
            <h1> THIS IS END of MY Layout</h1>
        </div>
    );
}