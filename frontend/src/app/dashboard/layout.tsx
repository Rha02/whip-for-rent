import MyComponent from "@/lib/mycomponent";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <MyComponent />
            <section>{children}</section>
            <h1> THIS IS END of MY Layout</h1>
        </div>
    );
}