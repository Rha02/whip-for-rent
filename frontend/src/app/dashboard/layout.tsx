import Navbar from "@/lib/components/server/navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-full">
            <Navbar />
            <section>{children}</section>
        </div>
    );
}