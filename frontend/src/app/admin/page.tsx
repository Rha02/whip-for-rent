"use client";

import { Car, User } from "@/lib/types";
import { CarRepo, UserRepo } from "@/repository";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    type Page = "users" | "cars" | "reservations" | "locations";
    const [page, setPage] = useState<Page>("users");
    const [users, setUsers] = useState<User[]>([]);
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        UserRepo.getUsers().then((res) => setUsers(res)).catch((err) => console.log(err));
        CarRepo.getCars().then((res) => setCars(res)).catch((err) => console.log(err));
    }, []);

    const pageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const page = e.currentTarget.value as Page;
        setPage(page);
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
                <div>
                    {page === "users" && users.map((user) => (
                        <div key={user.id}>
                            {user.email}
                        </div>
                    ))}
                    {page === "cars" && cars.map((car) => (
                        <div key={car.id}>
                            {car.make} {car.model}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}