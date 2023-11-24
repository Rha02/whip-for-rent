"use client";
import { User } from "@/lib/types";
import { UserRepo } from "@/repository";
import { useEffect, useState } from "react";

export default function UsersPanel() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        UserRepo.getUsers({}).then((res) => setUsers(res)).catch((err) => console.log(err));
    }, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Build a query
        const query = {} as any;
        const license = formData.get("license") as string;
        if (license && license.trim().length > 0) query.license = license.trim();

        const email = formData.get("email") as string;
        if (email && email.trim().length > 0) query.email = email.trim();

        const first_name = formData.get("first_name") as string;
        if (first_name && first_name.trim().length > 0) query.first_name = first_name.trim();

        const last_name = formData.get("last_name") as string;
        if (last_name && last_name.trim().length > 0) query.last_name = last_name.trim();

        UserRepo.getUsers(query).then((res) => setUsers(res)).catch((err) => console.log(err));
    };

    const roles = [
        "Admin",
        "Moderator",
        "Client"
    ];

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
                            <label htmlFor="email" className="px-1 py-0.5">Email</label>
                            <input name="email" type="email" className="px-1 bg-gray-50 w-28" />
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
                {users.map((user, idx) => (
                    <div key={user.id} className="grid grid-cols-7 text-sm">
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {user.id}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {user.email}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 overflow-hidden">
                            {user.first_name}
                        </div>
                        <div className="border border-gray-600 px-2 py-1">
                            {user.last_name}
                        </div>
                        <div className="border border-gray-600 px-2 py-1">
                            {roles[user.access_level-1]}
                        </div>
                        <div className="border border-gray-600 px-2 py-1">
                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : ""}
                        </div>
                        <div className="border border-gray-600 px-2 py-1 flex justify-center gap-4">
                            <button className="px-2 bg-blue-600 text-white rounded">Edit</button>
                            <button className="px-2 bg-red-600 text-white rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}