"use client";

import { Car, User } from "@/lib/types";
import { CarRepo, UserRepo } from "@/repository";
import { useEffect, useState } from "react";

type UsersSearchQuery = {
    license?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
};

type UsersPageProps = {
    users: User[];
    onSearch: (query: UsersSearchQuery) => void;
};

const UsersPage = (props: UsersPageProps) => {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Build a query
        const query: UsersSearchQuery = {};
        const license = formData.get("license") as string;
        if (license && license.trim().length > 0) query.license = license.trim();

        const email = formData.get("email") as string;
        if (email && email.trim().length > 0) query.email = email.trim();

        const first_name = formData.get("first_name") as string;
        if (first_name && first_name.trim().length > 0) query.first_name = first_name.trim();

        const last_name = formData.get("last_name") as string;
        if (last_name && last_name.trim().length > 0) query.last_name = last_name.trim();

        console.log(query);
        props.onSearch(query);
    };
    
    return (
        <div>
            <div className="flex justify-center">
                <form onSubmit={handleSearch}>
                    <div className="flex flex-wrap justify-center gap-2">
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="license" className="px-1 py-0.5">Driver License</label>
                            <input name="license" type="text" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="last_name" className="px-1 py-0.5">Email</label>
                            <input name="last_name" type="email" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="first_name" className="px-1 py-0.5">First Name</label>
                            <input name="first_name" type="text" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div className="flex rounded-lg border border-gray-300 bg-gray-300 align-center">
                            <label htmlFor="last_name" className="px-1 py-0.5">Last Name</label>
                            <input name="last_name" type="text" className="px-1 bg-gray-50 w-28" />
                        </div>
                        <div></div>
                    </div>
                    <div className="flex justify-center my-4">
                        <button type="submit" className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition ease-in-out duration-150">
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className="">
                <div className="bg-gray-200 grid grid-cols-7 font-semibold">
                    <div className="border border-gray-600 px-2 py-1">
                        Driver license
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Email
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        First name
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Last name
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Role
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Created at
                    </div>
                    <div className="border border-gray-600 px-2 py-1"></div>
                </div>
                <div className="grid grid-cols-7 text-sm">
                    <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                        123456780
                    </div>
                    <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                        john.doe@wfr.loc
                    </div>
                    <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                        John
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Doe
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Client
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        November 10, 2023
                    </div>
                    <div className="border border-gray-600 px-2 py-1 flex justify-center gap-4">
                        <button className="px-2 bg-blue-600 text-white rounded">Edit</button>
                        <button className="px-2 bg-red-600 text-white rounded">Delete</button>
                    </div>
                </div>
                <div className="grid grid-cols-7 bg-gray-100 text-sm">
                    <div className="border border-gray-600 px-2 py-1">
                        8542698903245
                    </div>
                    <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                        boom.boombox@wfr.loc
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        John
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Doe
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        Client
                    </div>
                    <div className="border border-gray-600 px-2 py-1">
                        November 10, 2023
                    </div>
                    <div className="border border-gray-600 px-2 py-1 flex justify-center gap-4">
                        <button className="px-2 bg-blue-600 text-white rounded">Edit</button>
                        <button className="px-2 bg-red-600 text-white rounded">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function AdminDashboard() {
    type Page = "users" | "cars" | "reservations" | "locations";
    const [page, setPage] = useState<Page>("users");
    const [users, setUsers] = useState<User[]>([]);
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        UserRepo.getUsers({}).then((res) => setUsers(res)).catch((err) => console.log(err));
        CarRepo.getCars().then((res) => setCars(res)).catch((err) => console.log(err));
    }, []);

    const pageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const page = e.currentTarget.value as Page;
        setPage(page);
    };

    const handleSearch = (query: UsersSearchQuery) => {
        UserRepo.getUsers(query).then((res) => setUsers(res)).catch((err) => console.log(err));
    };

    return (
        <main className="flex justify-center">
            <div className="w-3/4">
                <nav className="flex justify-between border-b-2 border-gray-400 gap-2 px-4">
                    <button 
                        className={
                            `${page == "users" ? "bg-blue-500 text-white" : "text-blue-500"} 
                            py-2 border-l border-r border-t border-blue-500 rounded-t-lg grow`
                        } 
                        value={"users"} 
                        onClick={pageHandler}>
                        Users
                    </button>
                    <button 
                        className={
                            `${page == "cars" ? "bg-red-500 text-white" : "text-red-500"}
                            py-2 border-l border-r border-t border-red-500 rounded-t-lg grow`
                        }
                        value={"cars"} 
                        onClick={pageHandler}>
                        Cars
                    </button>
                    <button 
                        className={
                            `${page == "reservations" ? "bg-green-500 text-white" : "text-green-500"}
                            py-2 border-l border-r border-t border-green-500 rounded-t-lg grow`
                        }
                        value={"reservations"}
                        onClick={pageHandler}>
                        Reservations
                    </button>
                    <button 
                        className={
                            `${page == "locations" ? "bg-yellow-500 text-white" : "text-yellow-500"}
                            py-2 border-l border-r border-t border-yellow-500 rounded-t-lg grow`
                        }
                        value={"locations"}
                        onClick={pageHandler}>
                        Locations
                    </button>
                </nav>
                <div className="mt-4">
                    {page === "users" && (
                        <UsersPage users={users} onSearch={handleSearch} />
                    )}
                    {page === "cars" && cars.map((car) => (
                        <div key={car.id}>
                            
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}