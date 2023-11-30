import Link from "next/link";
import { cookies } from "next/headers";

export default async function Navbar() {
    const isAuthenthicated = async(): Promise<boolean> => {
        // Cet cookie from client
        const cookieStore = cookies();

        // Get the authtoken value from cookie
        const authToken = cookieStore.get("authtoken")?.value;

        // Check if authToken value is null
        if(!authToken) {
            return false;
        };

        const host = process.env.SERVER_HOST;
        const res = await fetch(`${host}/users/checkauth`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            }
        });

        if(res.ok) {
            return true;
        } else {
            return false;
        }
    };

    const isAuth = await isAuthenthicated();

    return (
        // Navbar container
        <nav className="bg-blue-500 font-medium text-center text-white w-full flex flex-row justify-between box-border p-4">
            {/* Navbar Left Container */}
            <div className="flex my-auto">
                <Link href="/">
                    <p>Whip For Rent</p>
                </Link>
            </div>

            {/* Navbar Right Container */}
            <div className="flex">
                <ul className="flex flex-row box-border my-auto gap-2">
                    {/* Dashboard */}
                    <li>
                        <Link href="/dashboard">
                            <p>Dashboard</p>
                        </Link>
                    </li>

                    {/* "My Reservations" or "Log In" */}
                    <li>
                        {isAuth ? (
                            <Link href="/reservations">
                                My Reservations
                            </Link>
                        ) : (
                            <Link href="/login">
                                Login
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}